export default function LineHeader({ color, letter }) {
  return (
    <div className="line-header" aria-hidden="true">
      <div className="line-header-bar" style={{ background: color }} />
      <div className="line-header-station">
        {letter ? <span className="line-header-letter">{letter}</span> : null}
      </div>
    </div>
  );
}
