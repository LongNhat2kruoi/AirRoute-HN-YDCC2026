import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, BrainCircuit, Check, ChevronRight, Clock3, Code2, Database, Github, HeartPulse, Leaf, Menu, Navigation, Play, Route, ShieldCheck, Sparkles, TrendingDown, Wind, X } from 'lucide-react';
import RouteDemo from './components/RouteDemo';
import Architecture from './components/Architecture';
import Roadmap from './components/Roadmap';
import HanoiMap from './components/HanoiMap';
import { AirRouteLogo } from './components/Ui';
import { COMMUTES } from './data/mockData';

const navigation = [
  { id: 'demo', label: 'Trải nghiệm Demo', number: '01' },
  { id: 'kien-truc', label: 'Kiến trúc AI', number: '02' },
  { id: 'lo-trinh', label: 'Lộ trình 36h', number: '03' },
];

function App() {
  const [activeTab, setActiveTab] = useState('demo');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  function navigate(id) {
    setActiveTab(id);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Chuyển đến nội dung chính</a>
      <div className="top-notice"><div className="site-container"><span><span className="top-notice__spark" />Urban Air-chitects · YDCC 2026</span><span className="top-notice__right">Một ý tưởng nhỏ cho những hơi thở lớn hơn.<span className="top-notice__divider" />Concept Prototype</span></div></div>
      <header className="site-header"><div className="site-container header-inner"><button className="brand" onClick={() => navigate('demo')} aria-label="AirRoute HN — Về trang chủ"><AirRouteLogo /><span><strong>AirRoute <span>HN</span></strong><small>Urban air intelligence</small></span></button><nav className="desktop-nav" aria-label="Điều hướng chính">{navigation.map((item) => <button key={item.id} className={activeTab === item.id ? 'is-active' : ''} onClick={() => navigate(item.id)} aria-current={activeTab === item.id ? 'page' : undefined}>{item.label}{activeTab === item.id && <span />}</button>)}</nav><div className="header-actions"><a className="github-link" href="https://github.com/LongNhat2kruoi/AirRoute-HN-YDCC2026" target="_blank" rel="noreferrer" aria-label="Xem mã nguồn trên GitHub"><Github size={18} /><span>Mã nguồn</span></a><button className="header-demo-button" onClick={() => navigate('demo')}>Khám phá Demo<ArrowUpRight size={16} /></button><button className="mobile-menu-button" onClick={() => setMobileMenu((value) => !value)} aria-label={mobileMenu ? 'Đóng menu' : 'Mở menu'} aria-expanded={mobileMenu} aria-controls="mobile-navigation">{mobileMenu ? <X size={23} /> : <Menu size={23} />}</button></div></div>{mobileMenu && <nav className="mobile-nav" id="mobile-navigation" aria-label="Điều hướng di động">{navigation.map((item) => <button key={item.id} className={activeTab === item.id ? 'is-active' : ''} onClick={() => navigate(item.id)}><span>{item.number}</span>{item.label}<ChevronRight size={18} /></button>)}<a href="https://github.com/LongNhat2kruoi/AirRoute-HN-YDCC2026" target="_blank" rel="noreferrer"><Github size={17} />Xem mã nguồn trên GitHub<ArrowUpRight size={16} /></a></nav>}</header>

      <main id="main-content">
        {activeTab === 'demo' && <>
          <section className="hero-section"><div className="hero-background" aria-hidden="true"><span className="hero-orbit hero-orbit--one" /><span className="hero-orbit hero-orbit--two" /><span className="hero-leaf hero-leaf--one" /><span className="hero-leaf hero-leaf--two" /></div><div className="site-container hero-grid"><div className="hero-copy"><div className="hero-badge"><span className="hero-badge__icon"><Sparkles size={13} /></span>YDCC 2026 Concept Prototype<span className="hero-badge__separator" />Urban Air-chitects</div><h1>Đổi đường một chút.<br /><span>Dễ thở hơn nhiều.</span></h1><p className="hero-tagline">Kiến tạo lộ trình xanh, giảm phơi nhiễm bụi mịn đô thị.</p><p className="hero-description">AirRoute HN dùng AI để gợi ý những con đường ít bụi mịn hơn cho ngườidi chuyển tại Hà Nội. Vì con đường nhanh nhất không phải lúc nào cũng là con đường tốt nhất cho phổi của bạn.</p><div className="hero-ctas"><button className="primary-button" onClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth', block: 'start' })}>Trải nghiệm lộ trình sạch<ArrowRight size={18} /></button><button className="secondary-button" onClick={() => navigate('kien-truc')}><BrainCircuit size={18} />Khám phá công nghệ</button></div><div className="hero-trust"><span><Database size={14} />Dữ liệu mở</span><span><ShieldCheck size={14} />Không cần đăng nhập</span><span><Code2 size={14} />100% Front-end</span></div></div><div className="hero-visual"><div className="hero-visual__caption"><span><span className="live-dot" />Một góc Hà Nội, một lựa chọn mới</span><span>07:00 · Cầu Giấy → Hoàn Kiếm</span></div><HanoiMap commute={COMMUTES[0]} timeIndex={0} selectedRoute="clean" onRouteChange={() => {}} hero /><div className="hero-floating-note hero-floating-note--top"><Wind size={17} /><div><strong>AI Nowcasting</strong><span>Dự báo PM2.5 trước 6 giờ</span></div></div><div className="hero-floating-note hero-floating-note--bottom"><div className="hero-floating-note__icon"><HeartPulse size={19} /></div><div><strong>Ưu tiên điều quan trọng hơn</strong><span>Sức khỏe của bạn, không chỉ tốc độ.</span></div></div><div className="hero-visual__foot"><span><span className="legend-line is-clean" />Tuyến AirRoute AI</span><span><span className="legend-line is-fast" />Tuyến nhanh nhất</span><span className="hero-visual__mock">Dữ liệu mô phỏng</span></div></div></div><div className="site-container hero-metrics"><div className="hero-metric"><span className="hero-metric__icon"><TrendingDown size={23} /></span><div><strong>−32<span>%</span></strong><p>Phơi nhiễm PM2.5 trung bình</p><small>Mục tiêu trên các tuyến mô phỏng</small></div></div><div className="hero-metric"><span className="hero-metric__icon"><Clock3 size={23} /></span><div><strong>6<span> giờ</span></strong><p>Dự báo không khí trước</p><small>Chủ động cho hành trình tiếp theo</small></div></div><div className="hero-metric"><span className="hero-metric__icon"><Route size={23} /></span><div><strong>2<span> lựa chọn</span></strong><p>Một hành trình, hai trải nghiệm</p><small>Cân bằng thờigian và sức khỏe</small></div></div><button className="hero-scroll-hint" onClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth' })}><span>Cuộn để khám phá</span><ArrowDown size={17} /></button></div></section>
          <section className="problem-strip"><div className="site-container problem-strip__inner"><span className="problem-strip__label">AQI không chỉ là một con số.</span><p>Đó là quyết định bạn đưa ra trên mỗi hành trình.</p><div className="problem-strip__tags"><span><Leaf size={15} />Ngườidân</span><span><Navigation size={15} />Giao thông</span><span><BrainCircuit size={15} />Công nghệ</span></div></div></section>
          <RouteDemo />
        </>}
        {activeTab === 'kien-truc' && <Architecture />}
        {activeTab === 'lo-trinh' && <Roadmap />}
      </main>

      <footer className="site-footer"><div className="site-container footer-top"><div className="footer-brand"><div className="footer-brand__title"><AirRouteLogo size={40} /><span>AirRoute HN</span></div><p>Vì mỗi ngườidi chuyển đều xứng đáng<br />có một hành trình dễ thở hơn.</p><span className="footer-location">Thiết kế cho Hà Nội, Việt Nam</span></div><div className="footer-nav"><h3>Khám phá</h3>{navigation.map((item) => <button key={item.id} onClick={() => navigate(item.id)}>{item.label}<ArrowUpRight size={13} /></button>)}<a href="https://github.com/LongNhat2kruoi/AirRoute-HN-YDCC2026" target="_blank" rel="noreferrer">Mã nguồn GitHub<Github size={13} /></a></div><div className="footer-challenge"><span className="footer-challenge__badge">YDCC 2026</span><h3>Youth Digital Citizen Challenge</h3><p>Chủ đề: Urban Air-chitects — Designing Healthier Air for Cities.</p><span>Một sáng kiến hướng đến<br />UNDP SDG 3 · SDG 11 · SDG 13</span></div></div><div className="site-container footer-bottom"><span>© 2026 AirRoute HN · Concept & Mock-up Showcase</span><button onClick={() => setInfoOpen(true)}>Về dữ liệu bản mẫu<ArrowUpRight size={13} /></button><span>Được xây dựng với sự quan tâm đến từng hơi thở.<Leaf size={13} /></span></div></footer>

      {infoOpen && <div className="modal-backdrop" onClick={() => setInfoOpen(false)}><section className="info-modal" role="dialog" aria-modal="true" aria-labelledby="info-modal-title" onClick={(event) => event.stopPropagation()}><button className="icon-button info-modal__close" onClick={() => setInfoOpen(false)} aria-label="Đóng thông tin dữ liệu" autoFocus><X size={20} /></button><span className="info-modal__icon"><Database size={25} /></span><h2 id="info-modal-title">Đây là một Concept Prototype</h2><p>Toàn bộ AQI, PM2.5, thờigian di chuyển, thờitiết và kết quả sức khỏe trong ứng dụng là <strong>dữ liệu mô phỏng minh họa</strong>, không phải số liệu trực tiếp hoặc dự báo từ mô hình AI đã huấn luyện.</p><ul><li><Check size={16} />Ứng dụng chạy hoàn toàn trên trình duyệt, không cần backend hoặc API key.</li><li><Check size={16} />Không thu thập vị trí, tài khoản hoặc thông tin cá nhân.</li><li><Check size={16} />Chỉ số giảm phơi nhiễm là ước tính mô phỏng, không phải kết quả thử nghiệm lâm sàng.</li></ul><p>Kiến trúc AI và lộ trình 36 giờ mô tả hướng triển khai dự kiến cho YDCC 2026.</p><button className="primary-button" onClick={() => setInfoOpen(false)}>Tôi đã hiểu<Check size={17} /></button></section></div>}
    </div>
  );
}

export default App;
