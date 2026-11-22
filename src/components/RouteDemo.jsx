import { createElement, useState } from 'react';
import { AlertCircle, ArrowDown, ArrowRight, Bell, BellOff, Bike, Bus, Check, CheckCircle2, ChevronRight, Clock3, Cloud, Droplets, Footprints, HeartPulse, Info, Leaf, Lightbulb, MapPin, Minus, Navigation, ShieldCheck, Sparkles, TrendingDown, Wind, Zap } from 'lucide-react';
import { COMMUTES, TIME_SLOTS, VEHICLES } from '../data/mockData';
import { formatNumber, getAqiInfo, getExposureComparison, getGreenEstimate } from '../lib/exposure';
import HanoiMap from './HanoiMap';
import ForecastChart from './ForecastChart';
import { DemoNote, IconBox, SectionHeading } from './Ui';

function RouteCard({ type, selected, metrics, comparison, onSelect }) {
  const clean = type === 'clean';
  const info = getAqiInfo(metrics.aqi);
  return (
    <button className={`route-card ${selected ? `route-card--selected route-card--${clean ? 'clean' : 'fast'}` : ''}`} onClick={() => onSelect(type)} aria-pressed={selected}>
      <div className="route-card__header">
        <span className={`route-card__radio ${selected ? 'is-selected' : ''}`}>{selected && <Check size={12} strokeWidth={3} />}</span>
        <span className="route-card__name">{clean ? 'Tuyến không khí sạch' : 'Tuyến nhanh nhất'}</span>
        {clean ? <span className="ai-label"><Sparkles size={11} /> AI gợi ý</span> : <span className="route-baseline-label">Đối chứng</span>}
      </div>
      <div className="route-card__main">
        <div className="route-time"><strong>{metrics.time}</strong><span>phút</span></div>
        <div className="route-distance">{formatNumber(metrics.distance)} km</div>
        <span className="route-aqi-pill" style={{ color: info.color, background: info.bg }}>AQI {metrics.aqi}</span>
      </div>
      <div className="route-card__detail">{clean ? `${comparison.reduction}% ít phơi nhiễm hơn tuyến nhanh` : `${getAqiInfo(metrics.aqi).label} · Nhiều điểm nóng`}</div>
      <div className={`route-card__bar ${clean ? 'is-clean' : 'is-fast'}`}><span style={{ width: `${Math.min(100, metrics.aqi / 2)}%` }} /></div>
    </button>
  );
}

function HealthPanel({ slot, savedDose }) {
  const [notifications, setNotifications] = useState(false);
  return (
    <section className="health-card" aria-labelledby="health-title">
      <div className="card-heading"><div className="card-heading__icon-title"><IconBox><HeartPulse size={19} /></IconBox><div><h3 id="health-title">Một lựa chọn tốt cho hôm nay</h3><p>Gợi ý sức khỏe & di chuyển xanh</p></div></div><span className="health-card__weather"><Cloud size={18} />{slot.weather}</span></div>
      <div className="health-highlight"><ShieldCheck size={24} /><div><strong>Bạn giảm ước tính {formatNumber(savedDose)} µg·phút/m³ PM2.5</strong><span>so với tuyến nhanh nhất trong chuyến đi này.</span></div></div>
      <div className="health-advice"><div className="health-advice__title"><Lightbulb size={16} /><strong>{slot.health}</strong></div><ul>{slot.advice.map((advice) => <li key={advice}><CheckCircle2 size={15} />{advice}</li>)}</ul></div>
      <button className={`notification-toggle ${notifications ? 'is-active' : ''}`} onClick={() => setNotifications((value) => !value)} aria-pressed={notifications}>{notifications ? <Bell size={17} /> : <BellOff size={17} />}<span>{notifications ? 'Đã bật thông báo mô phỏng' : 'Thử thông báo khi AQI tăng'}</span><span className="toggle-track"><span /></span></button>
      {notifications && <p className="inline-feedback" role="status">Bản mẫu sẽ hiển thị cảnh báo tại đây. Không có thông báo thực được gửi.</p>}
      <p className="health-disclaimer"><Info size={12} />Thông tin tham khảo, không thay thế tư vấn y tế.</p>
    </section>
  );
}

function GreenCommute({ commute, selectedRoute }) {
  const [vehicleId, setVehicleId] = useState('ev');
  const [saved, setSaved] = useState(false);
  const { co2, distance, vehicle } = getGreenEstimate(commute, selectedRoute, vehicleId);
  const alternatives = [
    { id: 'ev', label: 'Xe máy điện', Icon: Zap },
    { id: 'bus', label: 'Xe buýt', Icon: Bus },
    { id: 'bicycle', label: 'Xe đạp', Icon: Bike },
  ];
  return (
    <section className="green-commute-card" aria-labelledby="green-title">
      <div className="green-commute__intro"><div className="green-commute__icon"><Leaf size={27} /></div><div><span className="section-kicker">Nhịp điệu xanh</span><h3 id="green-title">Mỗi chuyến đi là một thay đổi.</h3><p>Ước tính lượng CO₂ tránh được khi chuyển từ xe máy xăng sang phương tiện xanh hơn.</p></div></div>
      <div className="green-commute__body">
        <div className="vehicle-options" aria-label="Chọn phương tiện thay thế">{alternatives.map((alternative) => <button key={alternative.id} className={vehicleId === alternative.id ? 'is-selected' : ''} onClick={() => { setVehicleId(alternative.id); setSaved(false); }} aria-pressed={vehicleId === alternative.id}>{createElement(alternative.Icon, { size: 21 })}<span>{alternative.label}</span>{vehicleId === alternative.id && <CheckCircle2 size={14} className="vehicle-check" />}</button>)}</div>
        <div className="green-impact"><div><span>CO₂ tránh được / chuyến</span><strong>−{formatNumber(co2, 2)} <small>kg</small></strong><p>Trên quãng đường {formatNumber(distance)} km bằng {vehicle.label.toLowerCase()}</p></div><div className="green-impact__tree"><Leaf size={26} /><span>Góp thêm một<br />chút xanh cho Hà Nội</span></div></div>
        <button className="save-trip-button" onClick={() => setSaved(true)}>{saved ? <Check size={16} /> : <ArrowDown size={16} />}{saved ? 'Đã ghi nhận chuyến đi mô phỏng' : 'Ghi nhận chuyến đi mô phỏng'}</button>
        {saved && <p className="green-feedback" role="status">Lựa chọn đã được ghi nhận trong phiên demo này, không lưu dữ liệu cá nhân.</p>}
        <p className="green-method"><Info size={12} />Giả định: xe máy xăng 72 g CO₂/km; xe máy điện 18 g; xe buýt 25 g/km·người; xe đạp 0 g. Không phải phép đo thực tế.</p>
      </div>
    </section>
  );
}

export default function RouteDemo() {
  const [commuteId, setCommuteId] = useState(COMMUTES[0].id);
  const [timeIndex, setTimeIndex] = useState(0);
  const [selectedRoute, setSelectedRoute] = useState('clean');
  const [vehicleId, setVehicleId] = useState('motorbike');
  const [sensitive, setSensitive] = useState(false);
  const commute = COMMUTES.find((item) => item.id === commuteId);
  const slot = TIME_SLOTS[timeIndex];
  const comparison = getExposureComparison(commute, timeIndex, vehicleId);
  const selectedMetrics = comparison[selectedRoute === 'clean' ? 'clean' : 'fastest'];
  const selectedInfo = getAqiInfo(selectedMetrics.aqi);
  const selectedName = selectedRoute === 'clean' ? 'AirRoute AI' : 'Tuyến nhanh nhất';

  return (
    <section id="demo" className="demo-section page-section">
      <div className="section-shell">
        <SectionHeading eyebrow="Trải nghiệm bản mẫu" title="Đi nhanh hơn, hay thở nhẹ hơn?" description="Chọn một hành trình để thấy cách AI cân bằng thời gian di chuyển và lượng bụi mịn bạn hít vào." />
        <div className="demo-toolbar"><span><Navigation size={15} />Ba hành trình thường ngày tại Hà Nội</span><DemoNote>Không phải dữ liệu thời gian thực</DemoNote></div>
        <div className="commute-tabs" role="group" aria-label="Chọn hành trình mô phỏng">{COMMUTES.map((item) => <button key={item.id} className={commuteId === item.id ? 'is-selected' : ''} onClick={() => setCommuteId(item.id)} aria-pressed={commuteId === item.id}><span className="commute-tabs__route"><span>{item.origin}</span><ArrowRight size={15} /><span>{item.destination}</span></span><small>{item.purpose}</small></button>)}</div>
        <div className="time-control">
          <div className="time-control__top"><div><Clock3 size={18} /><strong>Chọn thời điểm khởi hành</strong></div><span className="time-control__current"><strong>{slot.label}</strong><span>{slot.period}</span></span></div>
          <div className="time-slider"><input type="range" min="0" max="3" step="1" value={timeIndex} onChange={(event) => setTimeIndex(Number(event.target.value))} aria-label="Thời điểm khởi hành" aria-valuetext={slot.aria} style={{ '--time-progress': `${(timeIndex / 3) * 100}%` }} /><div className="time-slider__labels">{TIME_SLOTS.map((item, index) => <button key={item.label} className={timeIndex === index ? 'is-selected' : ''} onClick={() => setTimeIndex(index)} aria-label={`Chọn ${item.aria}, ${item.period}`} aria-pressed={timeIndex === index}><strong>{item.label}</strong><span>{item.shortPeriod}</span></button>)}</div></div>
          <div className="weather-context"><span><Wind size={14} />Gió {slot.direction} <strong>{slot.wind} m/s</strong></span><span><Droplets size={14} />Độ ẩm <strong>{slot.humidity}%</strong></span><span className="weather-context__note">Bối cảnh thời tiết mô phỏng</span></div>
        </div>
        <div className="demo-grid">
          <div className="map-panel">
            <div className="map-panel__header"><div><span className="live-dot" />Mạng lưới không khí Hà Nội</div><span>Chạm vào các điểm để khám phá</span></div>
            <HanoiMap commute={commute} timeIndex={timeIndex} selectedRoute={selectedRoute} onRouteChange={setSelectedRoute} />
            <div className="map-legend"><span><i className="legend-line is-clean" />AirRoute AI</span><span><i className="legend-line is-fast" />Tuyến nhanh nhất</span><span><span className="legend-dot is-hot"><AlertCircle size={10} /></span>Điểm nóng</span><span><span className="legend-dot is-clean"><Leaf size={10} /></span>Hành lang xanh</span></div>
          </div>
          <div className="route-panel">
            <div className="route-panel__heading"><span>So sánh hai lựa chọn</span><span className="vehicle-label">{VEHICLES[vehicleId].label}</span></div>
            <div className="route-cards"><RouteCard type="fast" selected={selectedRoute === 'fast'} metrics={comparison.fastest} comparison={comparison} onSelect={setSelectedRoute} /><RouteCard type="clean" selected={selectedRoute === 'clean'} metrics={comparison.clean} comparison={comparison} onSelect={setSelectedRoute} /></div>
            <div className="exposure-result"><div className="exposure-result__top"><span><TrendingDown size={16} />Ước tính phơi nhiễm PM2.5</span><span className="exposure-badge">−{comparison.reduction}%</span></div><div className="exposure-result__numbers"><div><span>Tuyến nhanh</span><strong>{formatNumber(comparison.fastest.dose)}</strong></div><ArrowRight size={20} /><div className="is-clean"><span>AirRoute AI</span><strong>{formatNumber(comparison.clean.dose)}</strong></div><small>µg·phút/m³</small></div><p>Chỉ thêm <strong>{comparison.extraTime} phút</strong>, giảm <strong>{formatNumber(comparison.savedDose)} µg·phút/m³</strong> bụi mịn ước tính.</p></div>
            <div className="trip-preferences"><label htmlFor="vehicle-select"><Bike size={15} />Phương tiện</label><select id="vehicle-select" value={vehicleId} onChange={(event) => setVehicleId(event.target.value)}>{Object.entries(VEHICLES).map(([id, vehicle]) => <option key={id} value={id}>{vehicle.fullLabel}</option>)}</select><label className="sensitive-toggle"><input type="checkbox" checked={sensitive} onChange={(event) => setSensitive(event.target.checked)} /><span>Nhóm nhạy cảm</span></label></div>
            {sensitive && <div className="sensitive-note" role="status"><HeartPulse size={16} /><span>Nếu bạn thuộc nhóm nhạy cảm, hãy ưu tiên giảm thời gian ngoài trời và tham khảo ý kiến chuyên môn y tế.</span></div>}
            <div className="selected-route-detail"><div className="selected-route-detail__title"><Navigation size={15} /><strong>Lộ trình {selectedName}</strong><span style={{ color: selectedInfo.color, background: selectedInfo.bg }}>{selectedInfo.label}</span></div><div className="route-steps"><div><span className="route-step-dot is-start" /><span>{commute.origin}</span></div><div className="route-road-list">{commute[selectedRoute].roads.map((road) => <span key={road}><ChevronRight size={12} />{road}</span>)}</div><div><MapPin size={13} /><span>{commute.destination}</span></div></div></div>
          </div>
        </div>
        <div className="demo-insights"><ForecastChart commute={commute} timeIndex={timeIndex} labels={slot.forecastLabels ?? ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00']} selectedRoute={selectedRoute} /><HealthPanel slot={slot} savedDose={comparison.savedDose} /></div>
        <GreenCommute commute={commute} selectedRoute={selectedRoute} />
      </div>
    </section>
  );
}
