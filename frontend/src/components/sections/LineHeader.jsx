export default function LineHeader({ color }) {
  return (
    <div className="line-header" aria-hidden="true">
      <div className="line-header-bar" style={{ background: color }} />
      <div className="line-header-station" />
    </div>
  );
}
