import { useState } from 'react';
import { AlertTriangle, Check, Leaf, MapPin, Minus, Navigation, Plus, RotateCcw, X } from 'lucide-react';
import { getAqiInfo } from '../lib/exposure';

const blocks = [
  'M60 230l72-15 26 35-17 62-84 8z', 'M248 80l65-18 51 32-9 50-85 16z',
  'M380 65l74 8 9 67-64 19-29-41z', 'M472 162l70-7 21 54-48 36-54-23z',
  'M165 287l61-10 33 39-32 42-65-14z', 'M365 186l67-3 21 37-54 22-39-15z',
  'M371 298l62-7 31 35-30 45-67-15z', 'M471 426l78-22 40 36-25 61-82 5z',
  'M83 488l62-25 36 37-17 51-70 3z', 'M261 495l74-20 39 24-18 49-65 17z',
  'M597 378l65-27 24 33-17 61-66-7z', 'M48 93l58-17 24 34-35 45-57-12z',
];

const streets = [
  'M 10 275 Q 190 245 350 265 T 750 245', 'M 35 355 Q 210 325 390 342 T 730 305',
  'M 0 475 Q 195 425 380 450 T 730 420', 'M 82 575 Q 126 400 92 250 T 120 0',
  'M 264 590 Q 247 460 273 350 T 260 0', 'M 407 590 Q 385 450 415 315 T 408 0',
  'M 538 590 Q 528 465 559 345 T 539 0', 'M 654 570 Q 641 435 676 310 T 654 0',
  'M 0 120 Q 190 178 335 144 T 704 109', 'M 22 410 Q 203 355 354 389 T 710 342',
  'M 190 590 Q 310 477 442 495 T 720 488', 'M 345 0 Q 330 135 356 219 T 338 515',
  'M 595 0 Q 579 110 601 190 T 579 374', 'M 10 530 Q 150 480 200 375 T 352 170',
  'M 450 570 Q 468 471 489 377 T 504 125',
];

function MapSpot({ spot, value, type, onSelect }) {
  const info = getAqiInfo(value);
  const isHot = type === 'hot';
  const Icon = isHot ? AlertTriangle : Leaf;
  return (
    <g
      className="map-spot"
      transform={`translate(${spot.x} ${spot.y})`}
      role="button"
      tabIndex="0"
      aria-label={`${spot.name}: AQI mô phỏng ${value}, ${info.label}`}
      onClick={() => onSelect({ ...spot, value, info, type })}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect({ ...spot, value, info, type });
        }
      }}
    >
      <circle r="24" fill="transparent" />
      <circle r="18" fill={isHot ? '#dc6550' : '#22966b'} opacity="0.13" />
      <circle r="12" fill={isHot ? '#c95742' : '#218d65'} stroke="#fff" strokeWidth="2.5" />
      <Icon x="-6" y="-6" width="12" height="12" color="#fff" strokeWidth="2.4" />
      <g transform={`translate(${spot.dx} ${spot.dy})`}>
        <rect x="-51" y="-13" width="102" height="26" rx="7" fill="#fff" stroke="#dce5dd" />
        <text textAnchor="middle" y="-1" className="map-spot__name">{spot.name}</text>
        <text textAnchor="middle" y="8" className="map-spot__aqi">AQI {value}</text>
      </g>
    </g>
  );
}

export default function HanoiMap({ commute, timeIndex, selectedRoute, onRouteChange, className = '', hero = false }) {
  const [zoom, setZoom] = useState(1);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const isClean = selectedRoute === 'clean';
  const active = commute[selectedRoute];
  const aqiInfo = getAqiInfo(active.aqi[timeIndex]);
  const startX = commute.start[0];
  const startY = commute.start[1];
  const endX = commute.end[0];
  const endY = commute.end[1];

  return (
    <div className={`hanoi-map ${hero ? 'hanoi-map--hero' : ''} ${className}`}>
      <div className="map-topline">
        <span><MapPin size={13} /> Hà Nội, Việt Nam</span>
        <span className="map-scale">Bản đồ minh họa · Không theo tỷ lệ</span>
      </div>
      <svg viewBox="0 0 760 590" className="hanoi-map__svg" role="group" aria-label={`Bản đồ minh họa tuyến ${commute.origin} đến ${commute.destination}`}>
        <defs>
          <pattern id={`map-grid-${hero ? 'hero' : 'main'}`} width="35" height="35" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
            <path d="M 35 0 L 0 0 0 35" fill="none" stroke="#dfe7dd" strokeWidth="0.7" />
          </pattern>
          <filter id={`route-shadow-${hero ? 'hero' : 'main'}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#274f3e" floodOpacity="0.13" />
          </filter>
        </defs>
        <g className="map-zoom-layer" style={{ transform: `scale(${zoom})` }}>
          <rect x="-300" y="-300" width="1400" height="1200" fill="#eef2e9" />
          <rect x="-300" y="-300" width="1400" height="1200" fill={`url(#map-grid-${hero ? 'hero' : 'main'})`} />
          <path d="M34 10Q105 0 154 42L211 56 233 120 212 177 160 208 83 195 34 152 19 78Z" fill="#d7e8e7" stroke="#c4dddd" strokeWidth="2" />
          <path d="M247 114Q264 95 279 111L290 144 279 183 257 185 246 151Z" fill="#d7e8e7" stroke="#c4dddd" strokeWidth="2" />
          <path d="M604 159Q620 145 637 158L650 184 646 215 625 235 608 221 598 193Z" fill="#d7e8e7" stroke="#c4dddd" strokeWidth="2" />
          <path d="M724 0Q688 98 720 166T700 323Q679 394 718 473L735 590H800V0Z" fill="#d3e7e8" />
          <path d="M720 0Q689 104 717 170T696 325Q680 395 713 472L730 590" fill="none" stroke="#b8d9db" strokeWidth="2" />
          <path d="M495 355Q524 328 556 345L571 377 548 401 511 392Z" fill="#dcebd7" />
          <path d="M177 452Q207 435 237 449L245 480 208 490 181 475Z" fill="#dcebd7" />
          {blocks.map((path) => <path key={path} d={path} fill="#e6ebdf" stroke="#e0e6d8" />)}
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            {streets.map((path) => <path key={path} d={path} stroke="#dfe5da" strokeWidth="10" />)}
            {streets.map((path) => <path key={path} d={path} stroke="#fff" strokeWidth="6" />)}
            <path d="M-10 355Q205 325 390 342T740 305M264 590Q247 460 273 350T260-10" stroke="#e0e4d8" strokeWidth="18" />
            <path d="M-10 355Q205 325 390 342T740 305M264 590Q247 460 273 350T260-10" stroke="#fff" strokeWidth="12" />
          </g>
          <g className="map-street-labels" fill="#8c988c" fontSize="10">
            <text x="78" y="130" transform="rotate(18 78 130)">Hồ Tây</text>
            <text x="254" y="143" transform="rotate(87 254 143)" fontSize="8">Trúc Bạch</text>
            <text x="617" y="193" transform="rotate(85 617 193)" fontSize="9">Hồ Gươm</text>
            <text x="690" y="295" transform="rotate(85 690 295)">Sông Hồng</text>
            <text x="284" y="213" transform="rotate(-87 284 213)">Đường Láng</text>
            <text x="413" y="248" transform="rotate(42 413 248)">Chùa Bộc</text>
            <text x="173" y="364" transform="rotate(-10 173 364)">Nguyễn Trãi</text>
            <text x="442" y="463" transform="rotate(-10 442 463)">Lê Văn Lương</text>
            <text x="500" y="365" fontSize="8">Công viên Thống Nhất</text>
            <text x="61" y="390">CẦU GIẤY</text><text x="69" y="540">HÀ ĐÔNG</text>
            <text x="330" y="469">THANH XUÂN</text><text x="476" y="293">HAI BÀ TRƯNG</text>
            <text x="553" y="98">HOÀN KIẾM</text>
          </g>
          <path d={commute.clean.path} fill="none" stroke="#fff" strokeWidth="11" strokeLinecap="round" />
          <path d={commute.fast.path} fill="none" stroke="#fff" strokeWidth="11" strokeLinecap="round" />
          <path d={commute.clean.path} fill="none" stroke={isClean ? '#10b981' : '#9dc8b7'} strokeWidth={isClean ? '5.5' : '3'} strokeLinecap="round" filter={`url(#route-shadow-${hero ? 'hero' : 'main'})`} />
          <path d={commute.fast.path} fill="none" stroke={!isClean ? '#d76649' : '#d6a18c'} strokeWidth={!isClean ? '5.5' : '3'} strokeLinecap="round" strokeDasharray={isClean ? '7 7' : undefined} />
          {!hero && (
            <>
              <path d={commute.fast.path} fill="none" stroke="transparent" strokeWidth="28" className="route-hit" role="button" tabIndex="0" aria-label={`Chọn tuyến nhanh nhất, ${commute.fast.time[timeIndex]} phút, AQI ${commute.fast.aqi[timeIndex]}`} onClick={() => onRouteChange('fast')} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onRouteChange('fast'); } }} />
              <path d={commute.clean.path} fill="none" stroke="transparent" strokeWidth="28" className="route-hit" role="button" tabIndex="0" aria-label={`Chọn AirRoute AI, ${commute.clean.time[timeIndex]} phút, AQI ${commute.clean.aqi[timeIndex]}`} onClick={() => onRouteChange('clean')} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onRouteChange('clean'); } }} />
              {commute.hotspots.map((spot) => <MapSpot key={spot.name} spot={spot} value={Math.max(1, commute.fast.aqi[timeIndex] + spot.aqiOffset)} type="hot" onSelect={setSelectedSpot} />)}
              {commute.greenSpots.map((spot) => <MapSpot key={spot.name} spot={spot} value={Math.max(1, commute.clean.aqi[timeIndex] + spot.aqiOffset)} type="clean" onSelect={setSelectedSpot} />)}
            </>
          )}
          <g transform={`translate(${startX} ${startY})`} className="map-origin">
            <circle r="17" fill="#fff" stroke="#dce6df" strokeWidth="1.5" />
            <circle r="7" fill="#163e33" />
            <g transform="translate(-13 23)"><rect width="87" height="24" rx="7" fill="#fff" /><text x="43.5" y="16" textAnchor="middle" className="map-endpoint-label">{commute.origin}</text></g>
          </g>
          <g transform={`translate(${endX} ${endY})`} className="map-destination">
            <circle r="19" fill="#fff" stroke="#dce6df" strokeWidth="1.5" />
            <circle r="13" fill="#163e33" />
            <MapPin x="-7" y="-7" width="14" height="14" color="#fff" />
            <g transform="translate(-9 -40)"><rect width="87" height="24" rx="7" fill="#fff" /><text x="43.5" y="16" textAnchor="middle" className="map-endpoint-label">{commute.destination}</text></g>
          </g>
        </g>
      </svg>
      <div className="map-compass" aria-hidden="true"><Navigation size={14} fill="currentColor" /><span>N</span></div>
      {!hero && (
        <div className="map-controls" aria-label="Điều khiển thu phóng bản đồ">
          <button onClick={() => setZoom((value) => Math.min(1.4, value + 0.2))} disabled={zoom >= 1.4} aria-label="Phóng to bản đồ" title="Phóng to"><Plus size={17} /></button>
          <button onClick={() => setZoom((value) => Math.max(0.8, value - 0.2))} disabled={zoom <= 0.8} aria-label="Thu nhỏ bản đồ" title="Thu nhỏ"><Minus size={17} /></button>
          <button onClick={() => { setZoom(1); setSelectedSpot(null); }} aria-label="Đặt lại bản đồ" title="Đặt lại bản đồ"><RotateCcw size={16} /></button>
        </div>
      )}
      {hero ? (
        <div className="hero-map-card">
          <div className="hero-map-card__top"><span><Leaf size={15} /> AirRoute AI</span><span className="aqi-tag" style={{ color: aqiInfo.color, background: aqiInfo.bg }}>AQI {active.aqi[timeIndex]}</span></div>
          <div className="hero-map-card__metrics"><span><strong>{active.time[timeIndex]}</strong> phút</span><span><strong>{commute.clean.dose[timeIndex] < commute.fast.dose[timeIndex] ? Math.round((1 - commute.clean.dose[timeIndex] / commute.fast.dose[timeIndex]) * 100) : 0}%</strong> ít bụi hơn</span></div>
          <div className="hero-map-card__bottom"><span className="live-dot" />Đã tránh 3 điểm nóng giao thông</div>
        </div>
      ) : (
        <div className="map-bottomline">
          <span className={`map-selected-dot ${isClean ? 'is-clean' : 'is-fast'}`} />
          <span>{isClean ? 'AirRoute AI' : 'Tuyến nhanh nhất'}</span><strong>AQI {active.aqi[timeIndex]}</strong><span>{aqiInfo.label}</span>
        </div>
      )}
      {selectedSpot && !hero && (
        <div className="map-tooltip" role="status">
          <button className="icon-button map-tooltip__close" onClick={() => setSelectedSpot(null)} aria-label="Đóng thông tin địa điểm"><X size={15} /></button>
          <span className="map-tooltip__type">{selectedSpot.type === 'hot' ? 'Điểm nóng giao thông' : 'Hành lang không khí sạch'}</span>
          <strong>{selectedSpot.name}</strong>
          <div><b>AQI {selectedSpot.value}</b><span style={{ color: selectedSpot.info.color }}>{selectedSpot.info.label}</span></div>
          <p>Chỉ số mô phỏng tại {['07:00', '12:00', '17:30', '22:00'][timeIndex]}.</p>
        </div>
      )}
    </div>
  );
}
