export function AirRouteLogo({ size = 42, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect width="48" height="48" rx="14" fill="#103d31" />
      <path d="M14 33V21a9 9 0 0 1 18 0v6a6.5 6.5 0 0 1-13 0V15" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <circle cx="19" cy="14" r="3.5" fill="#34d399" />
      <circle cx="14" cy="34" r="3.5" fill="#34d399" />
    </svg>
  );
}

export function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`section-heading ${align === 'center' ? 'section-heading--center' : ''}`}>
      {eyebrow && <div className="section-kicker">{eyebrow}</div>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function DemoNote({ children = 'Dữ liệu mô phỏng' }) {
  return <span className="demo-note"><span aria-hidden="true" />{children}</span>;
}

export function IconBox({ children, className = '' }) {
  return <span className={`icon-box ${className}`} aria-hidden="true">{children}</span>;
}
