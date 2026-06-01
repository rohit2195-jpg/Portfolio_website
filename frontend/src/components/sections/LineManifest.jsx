export default function LineManifest({ color, label }) {
  // Single 1-letter section badge lives in SectionHeader (Roundel); the manifest
  // keeps only the colored bar + label so each section shows one badge, not two.
  return (
    <div className="line-manifest" aria-hidden="true">
      <span className="lm-bar" style={{ background: color }} />
      <span className="lm-text">{label}</span>
    </div>
  );
}
