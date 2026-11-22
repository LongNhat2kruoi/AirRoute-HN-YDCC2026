import { createElement, useState } from 'react';
import { ArrowUpRight, BarChart3, Check, CheckCircle2, ChevronDown, Circle, Clock3, Code2, Database, Download, Flag, Github, HeartPulse, Layers3, Lightbulb, ListChecks, MapPinned, Presentation, Rocket, ShieldCheck, Sparkles, Target, Users } from 'lucide-react';
import { DemoNote, IconBox, SectionHeading } from './Ui';

const phases = [
  {
    range: '00—06h', title: 'Hiểu bài toán & dựng nền', subtitle: 'Từ giả thuyết đến một hành trình có thể kiểm chứng', Icon: Lightbulb,
    tasks: ['Chốt chân dung ngườidùng: ngườidi làm bằng xe máy tại Hà Nội', 'Xác định phạm vi 3 tuyến mẫu và tiêu chí thành công', 'Khảo sát OpenAQ, Open-Meteo, OpenStreetMap và dữ liệu PAM Air', 'Dựng design system, repository và data schema dùng chung'],
    deliverable: 'Một problem statement, bộ khung giao diện và danh mục dữ liệu được cả đội thống nhất.',
  },
  {
    range: '06—16h', title: 'Dữ liệu & mô hình dự báo', subtitle: 'Tạo tín hiệu PM2.5 theo không gian và thờigian', Icon: Database,
    tasks: ['Thu thập, chuẩn hóa thờigian và nội suy dữ liệu trạm', 'Xây baseline PM2.5: persistence và trung bình trượt', 'Thử mô hình chuỗi thờigian với đặc trưng gió, độ ẩm, giờ trong ngày', 'Đánh giá hold-out theo thờigian; ghi lại MAE / RMSE và hạn chế'],
    deliverable: 'Forecast 6 giờ cho khu vực mẫu, kèm baseline và kết quả đánh giá minh bạch.',
  },
  {
    range: '16—27h', title: 'Routing & trải nghiệm ngườidùng', subtitle: 'Biến dự báo thành một lựa chọn có ý nghĩa', Icon: MapPinned,
    tasks: ['Dựng đồ thị đường bộ từ OpenStreetMap và ước tính thờigian cạnh', 'Gán trọng số PM2.5; chạy thuật toán Dijkstra / A* đa mục tiêu', 'Kết nối bản đồ, bộ chọn giờ, so sánh phơi nhiễm và gợi ý sức khỏe', 'Thử responsive, keyboard navigation và trạng thái dữ liệu thiếu'],
    deliverable: 'MVP end-to-end: chọn hành trình → xem hai tuyến → hiểu đánh đổi thờigian và phơi nhiễm.',
  },
  {
    range: '27—36h', title: 'Đo lường, hoàn thiện & thuyết trình', subtitle: 'Một câu chuyện rõ ràng, một demo chạy được', Icon: Presentation,
    tasks: ['Kiểm tra chéo số liệu giữa bản đồ, biểu đồ và kết quả routing', 'Đóng gói static build, tài liệu cài đặt và quy trình tái lập thí nghiệm', 'Chuẩn bị demo dự phòng ngoại tuyến; ghi rõ dữ liệu mô phỏng / thực', 'Luyện pitch 5 phút: vấn đề → insight → demo → kiến trúc → tác động'],
    deliverable: 'Sản phẩm nộp bài, pitch deck, video ngắn và kế hoạch thử nghiệm sau hackathon.',
  },
];

const datasetSources = [
  { name: 'OpenAQ / PAM Air', type: 'Chất lượng không khí', use: 'PM2.5 lịch sử & hiện tại', Icon: Database },
  { name: 'Open-Meteo', type: 'Khí tượng', use: 'Gió, độ ẩm, mưa', Icon: Layers3 },
  { name: 'OpenStreetMap', type: 'Giao thông', use: 'Đồ thị đường bộ Hà Nội', Icon: MapPinned },
  { name: 'Traffic camera', type: 'Mật độ xe', use: 'Đếm xe bằng Computer Vision', Icon: BarChart3 },
];

export default function Roadmap() {
  const [activePhase, setActivePhase] = useState(0);
  const phase = phases[activePhase];
  const PhaseIcon = phase.Icon;
  return (
    <section id="lo-trinh" className="roadmap-section page-section">
      <div className="section-shell">
        <SectionHeading eyebrow="Từ ý tưởng đến sản phẩm" title="36 giờ. Một MVP có thể chạm vào." description="Không xây mọi thứ. Tập trung vào một hành trình hoàn chỉnh, một mô hình có thể đánh giá và một câu chuyện có sức thuyết phục." />
        <div className="roadmap-overview"><div><Clock3 size={20} /><span><strong>4 giai đoạn</strong> có mục tiêu rõ ràng</span></div><div><ListChecks size={20} /><span><strong>1 MVP</strong> end-to-end</span></div><div><Target size={20} /><span><strong>3 chỉ số</strong> đánh giá cốt lõi</span></div><DemoNote>Kế hoạch dự kiến</DemoNote></div>
        <div className="roadmap-timeline" role="tablist" aria-label="Bốn giai đoạn hackathon">{phases.map((item, index) => <button key={item.range} role="tab" id={`phase-tab-${index}`} aria-selected={activePhase === index} aria-controls={`phase-panel-${index}`} tabIndex={activePhase === index ? 0 : -1} className={`roadmap-phase ${activePhase === index ? 'is-selected' : ''} ${activePhase > index ? 'is-complete' : ''}`} onClick={() => setActivePhase(index)} onKeyDown={(event) => { let next = index; if (event.key === 'ArrowRight') next = (index + 1) % phases.length; else if (event.key === 'ArrowLeft') next = (index - 1 + phases.length) % phases.length; else if (event.key === 'Home') next = 0; else if (event.key === 'End') next = phases.length - 1; else return; event.preventDefault(); setActivePhase(next); document.getElementById(`phase-tab-${next}`)?.focus(); }}><span className="roadmap-phase__range">{item.range}</span><span className="roadmap-phase__dot">{activePhase > index ? <Check size={14} /> : <span />}</span><strong>{item.title}</strong></button>)}</div>
        <div className="roadmap-detail" role="tabpanel" id={`phase-panel-${activePhase}`} aria-labelledby={`phase-tab-${activePhase}`} key={activePhase}><div className="roadmap-detail__intro"><IconBox><PhaseIcon size={26} /></IconBox><span className="roadmap-detail__time">{phase.range}</span><h3>{phase.title}</h3><p>{phase.subtitle}</p><div className="roadmap-detail__deliverable"><Flag size={18} /><div><strong>Kết quả bàn giao</strong><p>{phase.deliverable}</p></div></div></div><ol className="roadmap-detail__tasks">{phase.tasks.map((task, index) => <li key={task}><span>{String(index + 1).padStart(2, '0')}</span><p>{task}</p><CheckCircle2 size={16} /></li>)}</ol></div>
        <div className="execution-bottom"><div className="dataset-card"><div className="card-heading"><div><span className="section-kicker">Nguồn nguyên liệu</span><h3>Dữ liệu mở để bắt đầu</h3></div><Database size={23} /></div><div className="dataset-list">{datasetSources.map((source) => <div key={source.name}>{createElement(source.Icon, { size: 19 })}<div><strong>{source.name}</strong><span>{source.type}</span></div><span>{source.use}</span></div>)}</div><p className="dataset-note">Phạm vi và chất lượng dữ liệu phụ thuộc vào tính khả dụng tại thời điểm triển khai; có phương án dữ liệu mô phỏng dự phòng.</p></div><div className="metrics-card"><div className="card-heading"><div><span className="section-kicker">Đo điều quan trọng</span><h3>Thành công được kiểm chứng</h3></div><BarChart3 size={23} /></div><div className="validation-metrics"><div><strong>MAE / RMSE</strong><p>Độ chính xác dự báo PM2.5 trên tập hold-out theo thời gian.</p><span>So sánh với persistence baseline</span></div><div><strong>Δ Phơi nhiễm</strong><p>Mức giảm liều hít ước tính so với tuyến nhanh nhất.</p><span>µg·phút/m³ trên mỗi hành trình</span></div><div><strong>Δ Thời gian</strong><p>Chi phí thời gian thêm vào khi chọn tuyến sạch hơn.</p><span>Phút & % thời gian tăng thêm</span></div></div></div></div>
        <div className="post-hackathon"><div className="post-hackathon__icon"><Rocket size={26} /></div><div><span className="section-kicker">Sau 36 giờ</span><h3>Từ MVP đến thí điểm thực tế tại Hà Nội</h3><p>Hiệu chuẩn cảm biến → thử nghiệm với ngườidi chuyển → đánh giá thay đổi hành vi → mở rộng dữ liệu và đối tác đô thị.</p></div><span className="post-hackathon__tag">Tầm nhìn dài hạn</span></div>
      </div>
    </section>
  );
}
