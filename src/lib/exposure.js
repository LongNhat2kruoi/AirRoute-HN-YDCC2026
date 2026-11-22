import { VEHICLES } from '../data/mockData';

export const CHART_COLORS = {
  fastest: '#eb6834',
  clean: '#2a78d6',
};

export function formatNumber(value, digits = 1) {
  return Number(value).toLocaleString('vi-VN', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function getRouteMetrics(commute, routeType, timeIndex, vehicleId = 'motorbike') {
  const route = commute[routeType];
  const vehicle = VEHICLES[vehicleId] ?? VEHICLES.motorbike;
  return {
    time: Math.round(route.time[timeIndex] * vehicle.timeFactor),
    distance: route.distance,
    aqi: route.aqi[timeIndex],
    dose: route.dose[timeIndex] * vehicle.timeFactor * vehicle.doseFactor,
    vehicle,
  };
}

export function getExposureComparison(commute, timeIndex, vehicleId = 'motorbike') {
  const fastest = getRouteMetrics(commute, 'fast', timeIndex, vehicleId);
  const clean = getRouteMetrics(commute, 'clean', timeIndex, vehicleId);
  const reduction = Math.round(((fastest.dose - clean.dose) / fastest.dose) * 100);
  return {
    fastest,
    clean,
    reduction,
    savedDose: fastest.dose - clean.dose,
    extraTime: clean.time - fastest.time,
  };
}

export function getGreenEstimate(commute, routeType, vehicleId) {
  const distance = commute[routeType].distance;
  const vehicle = VEHICLES[vehicleId] ?? VEHICLES.ev;
  const co2 = ((VEHICLES.motorbike.emissions - vehicle.emissions) * distance) / 1000;
  return { co2, distance, vehicle };
}

export function pm25ToAqi(pm25) {
  const breakpoints = [
    [0, 12, 0, 50], [12.1, 35.4, 51, 100], [35.5, 55.4, 101, 150],
    [55.5, 150.4, 151, 200], [150.5, 250.4, 201, 300], [250.5, 500.4, 301, 500],
  ];
  const range = breakpoints.find(([low, high]) => pm25 >= low && pm25 <= high);
  if (!range) return pm25 < 0 ? 0 : 500;
  const [low, high, aqiLow, aqiHigh] = range;
  return Math.round(((aqiHigh - aqiLow) / (high - low)) * (pm25 - low) + aqiLow);
}

export function getAqiInfo(aqi) {
  if (aqi <= 50) return { label: 'Tốt', color: '#238a64', bg: '#e3f5eb', icon: 'check' };
  if (aqi <= 100) return { label: 'Trung bình', color: '#8a6200', bg: '#fff4d8', icon: 'moderate' };
  if (aqi <= 150) return { label: 'Không tốt cho nhóm nhạy cảm', color: '#ad582d', bg: '#fff0e6', icon: 'warning' };
  if (aqi <= 200) return { label: 'Không lành mạnh', color: '#b84740', bg: '#fff0ed', icon: 'warning' };
  if (aqi <= 300) return { label: 'Rất không lành mạnh', color: '#8b477b', bg: '#f9eaf6', icon: 'warning' };
  return { label: 'Nguy hại', color: '#8e3030', bg: '#fbe8e8', icon: 'warning' };
}
