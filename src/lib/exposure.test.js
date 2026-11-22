import { describe, expect, it } from 'vitest';
import { COMMUTES, TIME_SLOTS, VEHICLES } from '../data/mockData';
import { getAqiInfo, getExposureComparison, getGreenEstimate, getRouteMetrics, pm25ToAqi } from '../lib/exposure';

describe('AirRoute mock simulation', () => {
  it('starts with the requested Cầu Giấy comparison', () => {
    const result = getExposureComparison(COMMUTES[0], 0);
    expect(result.fastest.time).toBe(22);
    expect(result.clean.time).toBe(25);
    expect(result.fastest.aqi).toBe(168);
    expect(result.clean.aqi).toBe(82);
    expect(result.reduction).toBe(35);
    expect(result.extraTime).toBe(3);
  });

  it('keeps every route and time internally consistent', () => {
    COMMUTES.forEach((commute) => {
      TIME_SLOTS.forEach((_, timeIndex) => {
        const { fastest, clean, reduction, extraTime } = getExposureComparison(commute, timeIndex);
        expect(fastest.dose).toBeGreaterThan(clean.dose);
        expect(reduction).toBeGreaterThan(0);
        expect(extraTime).toBeGreaterThan(0);
        expect(commute.forecast.fast[timeIndex]).toHaveLength(7);
        expect(commute.forecast.clean[timeIndex]).toHaveLength(7);
      });
    });
  });

  it('applies the declared vehicle assumptions consistently', () => {
    const bicycle = getRouteMetrics(COMMUTES[0], 'clean', 0, 'bicycle');
    const motorcycle = getRouteMetrics(COMMUTES[0], 'clean', 0);
    expect(bicycle.time).toBe(Math.round(motorcycle.time * VEHICLES.bicycle.timeFactor));
    expect(bicycle.dose).toBeCloseTo(motorcycle.dose * VEHICLES.bicycle.timeFactor * VEHICLES.bicycle.doseFactor);
  });

  it('estimates emissions savings against a gasoline motorbike', () => {
    expect(getGreenEstimate(COMMUTES[0], 'clean', 'ev').co2).toBeCloseTo(0.5076);
    expect(getGreenEstimate(COMMUTES[0], 'clean', 'bus').co2).toBeCloseTo(0.4418);
    expect(getGreenEstimate(COMMUTES[0], 'clean', 'bicycle').co2).toBeCloseTo(0.6768);
  });

  it('uses standard AQI breakpoints and readable labels', () => {
    expect(pm25ToAqi(80.7)).toBe(164);
    expect(pm25ToAqi(27.5)).toBe(83);
    expect(pm25ToAqi(0)).toBe(0);
    expect(getAqiInfo(82).label).toBe('Trung bình');
    expect(getAqiInfo(168).label).toBe('Không lành mạnh');
  });
});
