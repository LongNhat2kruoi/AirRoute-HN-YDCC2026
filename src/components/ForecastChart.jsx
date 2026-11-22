import { useState } from 'react';
import { Table2, TrendingDown, X } from 'lucide-react';
import { CHART_COLORS, formatNumber } from '../lib/exposure';

const WIDTH = 720;
const HEIGHT = 270;
const PADDING = { top: 24, right: 24, bottom: 41, left: 42 };

export default function ForecastChart({ commute, timeIndex, labels, selectedRoute }) {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [tableOpen, setTableOpen] = useState(false);
  const series = [
    { id: 'fast', name: 'Tuyến nhanh nhất', color: CHART_COLORS.fastest, values: commute.forecast.fast[timeIndex], dash: '6 4' },
    { id: 'clean', name: 'AirRoute AI', color: CHART_COLORS.clean, values: commute.forecast.clean[timeIndex] },
  ];
  const maxValue = Math.ceil(Math.max(...series.flatMap((item) => item.values)) / 20) * 20;
  const chartWidth = WIDTH - PADDING.left - PADDING.right;
  const chartHeight = HEIGHT - PADDING.top - PADDING.bottom;
  const x = (index) => PADDING.left + (index / 6) * chartWidth;
  const y = (value) => PADDING.top + chartHeight - (value / maxValue) * chartHeight;
  const pathFor = (values) => values.map((value, index) => `${index ? 'L' : 'M'} ${x(index)} ${y(value)}`).join(' ');
  const activeIndex = hoverIndex ?? 0;
  const ticks = [0, maxValue / 4, maxValue / 2, (maxValue * 3) / 4, maxValue];

  function onPointerMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = ((event.clientX - rect.left) / rect.width) * WIDTH;
    const index = Math.round(((relativeX - PADDING.left) / chartWidth) * 6);
    setHoverIndex(Math.max(0, Math.min(6, index)));
  }

  return (
    <section className="forecast-card" aria-labelledby="forecast-title">
      <div className="card-heading forecast-card__heading">
        <div>
          <div className="forecast-title-line"><h3 id="forecast-title">Nhìn trước 6 giờ, chủ động hơn</h3><TrendingDown size={18} /></div>
          <p>Nồng độ PM2.5 dự báo dọc tuyến đường (µg/m³)</p>
        </div>
        <button className="text-button" onClick={() => setTableOpen((value) => !value)} aria-expanded={tableOpen} aria-controls="forecast-table"><Table2 size={15} />{tableOpen ? 'Ẩn bảng' : 'Xem bảng'}</button>
      </div>
      <div className="chart-legend" aria-label="Chú giải biểu đồ">
        {series.map((item) => <span key={item.id}><svg width="24" height="10" aria-hidden="true"><path d="M1 5H23" stroke={item.color} strokeWidth="2.5" strokeDasharray={item.dash} /></svg>{item.name}</span>)}
        <span className="chart-simulation-tag">Mô phỏng AI</span>
      </div>
      <div className="forecast-chart-wrap">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="forecast-chart" role="img" aria-labelledby="forecast-title forecast-description">
          <desc id="forecast-description">Hai đường dự báo PM2.5 trong sáu giờ tiếp theo. AirRoute AI có nồng độ thấp hơn tuyến nhanh nhất tại mọi thời điểm.</desc>
          {ticks.map((tick) => <g key={tick}><line x1={PADDING.left} x2={WIDTH - PADDING.right} y1={y(tick)} y2={y(tick)} stroke="#e6ece7" strokeWidth="1" /><text x={PADDING.left - 12} y={y(tick) + 4} textAnchor="end" className="chart-axis-text">{tick}</text></g>)}
          {labels.map((label, index) => <text key={`${label}-${index}`} x={x(index)} y={HEIGHT - 15} textAnchor="middle" className={`chart-axis-text ${index === activeIndex ? 'is-active' : ''}`}>{label}</text>)}
          {series.filter((item) => item.id !== selectedRoute).map((item) => <path key={item.id} d={pathFor(item.values)} fill="none" stroke={item.color} strokeWidth="2.5" strokeDasharray={item.dash} strokeLinecap="round" strokeLinejoin="round" />)}
          {series.filter((item) => item.id === selectedRoute).map((item) => <g key={item.id}><path d={`${pathFor(item.values)} L ${x(6)} ${y(0)} L ${x(0)} ${y(0)} Z`} fill={item.color} opacity="0.055" /><path d={pathFor(item.values)} fill="none" stroke={item.color} strokeWidth="3" strokeDasharray={item.dash} strokeLinecap="round" strokeLinejoin="round" /><circle cx={x(0)} cy={y(item.values[0])} r="5" fill={item.color} stroke="#fff" strokeWidth="2" /><circle cx={x(6)} cy={y(item.values[6])} r="5" fill={item.color} stroke="#fff" strokeWidth="2" /></g>)}
          {hoverIndex !== null && <line x1={x(hoverIndex)} x2={x(hoverIndex)} y1={PADDING.top} y2={y(0)} stroke="#9caea3" strokeWidth="1" />}
          {hoverIndex !== null && series.map((item) => <circle key={item.id} cx={x(hoverIndex)} cy={y(item.values[hoverIndex])} r="5" fill={item.color} stroke="#fff" strokeWidth="2" />)}
          <rect x={PADDING.left} y={PADDING.top} width={chartWidth} height={chartHeight} fill="transparent" className="chart-hit" onPointerMove={onPointerMove} onPointerLeave={() => setHoverIndex(null)} />
          {labels.map((label, index) => <g key={`focus-${index}`} role="button" tabIndex="0" aria-label={`${label}: AirRoute AI ${formatNumber(series[1].values[index])} µg/m³; tuyến nhanh nhất ${formatNumber(series[0].values[index])} µg/m³`} onFocus={() => setHoverIndex(index)} onBlur={() => setHoverIndex(null)} onKeyDown={(event) => { if (event.key === 'Escape') { setHoverIndex(null); event.currentTarget.blur(); } }}><rect x={x(index) - 25} y={PADDING.top} width="50" height={chartHeight} fill="transparent" /></g>)}
        </svg>
        {hoverIndex !== null && (
          <div className={`chart-tooltip ${hoverIndex > 3 ? 'chart-tooltip--left' : ''}`} style={{ left: `${(x(hoverIndex) / WIDTH) * 100}%` }}>
            <strong>{labels[hoverIndex]}</strong>
            {series.map((item) => <div key={item.id}><svg width="20" height="8" aria-hidden="true"><path d="M1 4H19" stroke={item.color} strokeWidth="2" strokeDasharray={item.dash} /></svg><span>{item.name}</span><b>{formatNumber(item.values[hoverIndex])}</b></div>)}
            <small>µg/m³ · Dữ liệu mô phỏng</small>
          </div>
        )}
      </div>
      <div className="forecast-note"><span className="forecast-note__line" /><span>Khung giờ có PM2.5 thấp nhất trên AirRoute AI: <strong>{labels[series[1].values.indexOf(Math.min(...series[1].values))]}</strong></span></div>
      {tableOpen && (
        <div className="forecast-table-wrap" id="forecast-table">
          <table><caption className="sr-only">Dữ liệu mô phỏng PM2.5 theo giờ, đơn vị µg/m³</caption><thead><tr><th scope="col">Thời gian</th>{series.map((item) => <th key={item.id} scope="col">{item.name}</th>)}</tr></thead><tbody>{labels.map((label, index) => <tr key={label}><th scope="row">{label}</th>{series.map((item) => <td key={item.id}>{formatNumber(item.values[index])} µg/m³</td>)}</tr>)}</tbody></table>
        </div>
      )}
    </section>
  );
}
