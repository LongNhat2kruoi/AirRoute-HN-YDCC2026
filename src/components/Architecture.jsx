import { createElement, useState } from 'react';
import { ArrowDown, ArrowRight, BrainCircuit, Building2, Camera, Check, ChevronRight, CircleDot, CloudSun, Code2, Database, GitBranch, Globe2, HeartPulse, Layers3, Leaf, Map, Network, Radio, Route, Satellite, ShieldCheck, Smartphone, Sparkles, TrendingDown, Users, Wind, Zap } from 'lucide-react';
import { DemoNote, IconBox, SectionHeading } from './Ui';

const stages = [
  {
    number: '01', title: 'Thu thập & chuẩn hóa', subtitle: 'Data Ingestion', Icon: Database, color: 'blue',
    description: 'Kết nối những nguồn dữ liệu mở đã có, biến tín hiệu rời rạc thành một bức tranh không khí theo thời gian và không gian.',
    sources: [
      { Icon: Radio, title: 'Cảm biến chất lượng không khí', detail: 'OpenAQ · PAM Air · Trạm quan trắc', value: 'PM2.5 / PM10 / AQI' },
      { Icon: Camera, title: 'Mật độ giao thông', detail: 'Computer Vision đếm phương tiện', value: 'Xe/phút · Tốc độ dòng xe' },
      { Icon: CloudSun, title: 'Khí tượng', detail: 'Open-Meteo · Dữ liệu thời tiết mở', value: 'Gió · Độ ẩm · Mưa' },
    ],
    outputs: ['Đồng bộ múi giờ & vị trí', 'Làm sạch ngoại lai', 'Lưới dữ liệu 500 m'],
    footer: 'Cập nhật mục tiêu: 5–15 phút',
  },
  {
    number: '02', title: 'Mô hình AI & dẫn đường', subtitle: 'AI Core', Icon: BrainCircuit, color: 'green',
    description: 'Dự báo bụi mịn theo từng khu vực, rồi chuyển kết quả thành trọng số động cho từng đoạn đường.',
    model: { title: 'Spatio-Temporal Forecasting', detail: 'Đồ thị không gian + chuỗi thời gian', tags: ['Graph Neural Network', 'Temporal Fusion', '6h Nowcasting'] },
    formula: 'J(e) = α × Thờigian(e) + β × Phơinhiễm(e)',
    outputs: ['PM2.5 theo lưới & khoảng tin cậy', 'Trọng số cạnh động', 'Giải thích lý do chọn tuyến'],
    footer: 'Ưu tiên giải thích được, không chỉ tối ưu',
  },
  {
    number: '03', title: 'Công dân & hoạch định', subtitle: 'Citizen & Policy Layer', Icon: Users, color: 'amber',
    description: 'Một nền tảng dữ liệu, hai trải nghiệm: hành trình an toàn hơn cho người dân và bằng chứng rõ hơn cho đô thị.',
    audiences: [
      { Icon: Smartphone, title: 'Ngườidi chuyển', detail: 'Gợi ý lộ trình ít phơi nhiễm', tags: ['Web / Mobile', 'Cảnh báo cá nhân', 'Nudge xanh'] },
      { Icon: Building2, title: 'Nhà hoạch định', detail: 'Bản đồ nhiệt điểm nóng đô thị', tags: ['Hotspot Heatmap', 'Xu hướng', 'Kịch bản can thiệp'] },
    ],
    outputs: ['Không thu vị trí danh tính', 'Dữ liệu tổng hợp', 'API phục vụ cộng đồng'],
    footer: 'Thiết kế bảo mật ngay từ đầu',
  },
  {
    number: '04', title: 'Tác động & bền vững', subtitle: 'Impact & Sustainability', Icon: Globe2, color: 'purple',
    description: 'Đo giá trị bằng sự thay đổi có thể kiểm chứng: ít bụi hơn trên mỗi hành trình, nhiều lựa chọn xanh hơn mỗi ngày.',
    impacts: [
      { Icon: HeartPulse, sdg: 'SDG 3', title: 'Sức khỏe', metric: 'Giảm phơi nhiễm / chuyến' },
      { Icon: Building2, sdg: 'SDG 11', title: 'Đô thị bền vững', metric: 'Điểm nóng được can thiệp' },
      { Icon: Leaf, sdg: 'SDG 13', title: 'Khí hậu', metric: 'CO₂ tránh được ước tính' },
    ],
    outputs: ['Đối chứng trước / sau', 'Công khai giả định tính toán', 'Không phóng đại tác động'],
    footer: 'Từ một hành trình đến một thói quen',
  },
];

function StageDetail({ stage }) {
  const Icon = stage.Icon;
  return (
    <div className={`architecture-detail architecture-detail--${stage.color}`}>
      <div className="architecture-detail__intro"><div className={`architecture-detail__number is-${stage.color}`}>{stage.number}</div><div><span>{stage.subtitle}</span><h3>{stage.title}</h3><p>{stage.description}</p></div></div>
      <div className="architecture-detail__content">
        <div className="architecture-detail__main">
          {stage.sources && <div className="source-list">{stage.sources.map((source) => <div className="source-item" key={source.title}><IconBox>{createElement(source.Icon, { size: 21 })}</IconBox><div><strong>{source.title}</strong><span>{source.detail}</span></div><code>{source.value}</code></div>)}</div>}
          {stage.model && <div className="ai-model"><div className="ai-model__header"><BrainCircuit size={22} /><div><strong>{stage.model.title}</strong><span>{stage.model.detail}</span></div><span className="model-status"><span />Prototype</span></div><div className="ai-model__diagram"><div><Radio size={16} /><span>Sensor<br />signals</span></div><ArrowRight size={17} /><div className="ai-model__node"><Network size={24} /><span>Spatial<br />graph</span></div><ArrowRight size={17} /><div className="ai-model__node"><Layers3 size={24} /><span>Temporal<br />layers</span></div><ArrowRight size={17} /><div><Map size={16} /><span>6h PM2.5<br />forecast</span></div></div><div className="ai-model__tags">{stage.model.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>}
          {stage.formula && <div className="routing-formula"><div><Route size={19} /><span>Dynamic Edge-Weight Routing Engine</span></div><code>{stage.formula}</code><p>α và β được điều chỉnh theo mức ưu tiên thờigian / sức khỏe của ngườidùng.</p></div>}
          {stage.audiences && <div className="audience-grid">{stage.audiences.map((audience) => <div className="audience-card" key={audience.title}><IconBox>{createElement(audience.Icon, { size: 23 })}</IconBox><h4>{audience.title}</h4><p>{audience.detail}</p><div>{audience.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>)}</div>}
          {stage.impacts && <div className="impact-grid">{stage.impacts.map((impact) => <div className="impact-item" key={impact.sdg}><span>{impact.sdg}</span>{createElement(impact.Icon, { size: 24 })}<h4>{impact.title}</h4><p>{impact.metric}</p></div>)}</div>}
        </div>
        <div className="architecture-detail__aside"><h4>Kết quả đầu ra</h4><ul>{stage.outputs.map((output) => <li key={output}><Check size={14} />{output}</li>)}</ul><div className="architecture-detail__footer"><Zap size={14} />{stage.footer}</div></div>
      </div>
    </div>
  );
}

export default function Architecture() {
  const [activeStage, setActiveStage] = useState(0);
  const stage = stages[activeStage];
  return (
    <section id="kien-truc" className="architecture-section page-section">
      <div className="section-shell">
        <SectionHeading eyebrow="Đằng sau mỗi gợi ý" title={<>Dữ liệu mở. AI có trách nhiệm.<br />Tác động thật.</>} description="Một hệ thống bốn lớp biến dữ liệu đô thị rờirạc thành quyết định di chuyển dễ hiểu và có thể hành động." />
        <div className="architecture-layout">
          <div className="architecture-stages" role="tablist" aria-label="Bốn lớp kiến trúc hệ thống" aria-orientation="vertical">{stages.map((item, index) => { const Icon = item.Icon; return <button key={item.number} role="tab" id={`stage-tab-${index}`} aria-selected={activeStage === index} aria-controls={`stage-panel-${index}`} tabIndex={activeStage === index ? 0 : -1} className={`architecture-stage ${activeStage === index ? 'is-selected' : ''}`} onClick={() => setActiveStage(index)} onKeyDown={(event) => { let next = index; if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % stages.length; else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + stages.length) % stages.length; else if (event.key === 'Home') next = 0; else if (event.key === 'End') next = stages.length - 1; else return; event.preventDefault(); setActiveStage(next); document.getElementById(`stage-tab-${next}`)?.focus(); }}><span className={`architecture-stage__icon is-${item.color}`}><Icon size={23} /></span><span className="architecture-stage__copy"><span>{item.number} · {item.subtitle}</span><strong>{item.title}</strong></span><ChevronRight size={18} /></button>; })}</div>
          <div className="architecture-flow" aria-hidden="true"><span>Dữ liệu</span><ArrowRight size={15} /><span>Hiểu</span><ArrowRight size={15} /><span>Hành động</span><ArrowRight size={15} /><span>Tác động</span></div>
          <div role="tabpanel" id={`stage-panel-${activeStage}`} aria-labelledby={`stage-tab-${activeStage}`} className="architecture-panel" key={activeStage}><StageDetail stage={stage} /></div>
        </div>
        <div className="architecture-principles"><div><ShieldCheck size={22} /><div><strong>Privacy by design</strong><p>Chỉ dùng dữ liệu tổng hợp, không cần tài khoản cho bản mẫu.</p></div></div><div><Code2 size={22} /><div><strong>Open by default</strong><p>Ưu tiên dữ liệu mở, mã nguồn mở và giả định minh bạch.</p></div></div><div><HeartPulse size={22} /><div><strong>Human in the loop</strong><p>AI hỗ trợ lựa chọn; ngườidùng luôn giữ quyền quyết định.</p></div></div></div>
        <div className="architecture-caption"><DemoNote>Kiến trúc đề xuất cho MVP</DemoNote><span>Các mô hình, nguồn dữ liệu và chỉ số trên trang là thiết kế khái niệm; chưa phải hệ thống AI đã huấn luyện.</span></div>
      </div>
    </section>
  );
}
