export default function LineManifest({ lineCode, color, label, textColor = "#fff" }) {
  return (
    <div className="line-manifest" aria-hidden="true">
      <span className="lm-badge" style={{ background: color, color: textColor }}>
        {lineCode}
      </span>
      <span className="lm-bar" style={{ background: color }} />
      <span className="lm-text">{label}</span>
    </div>
  );
}
