// Charcoal departures board. rows: [{ color, dest, sub, status, statusColor, onClick }]
export default function DepartureBoard({ rows, clock = "09:45", className = "" }) {
  return (
    <div className={`board ${className}`}>
      <div className="board-head" aria-hidden="true">
        <span className="board-head-t">Departures</span>
        <span className="board-head-clk">{clock}</span>
      </div>
      <ul className="board-rows">
        {rows.map((r) => (
          <li key={r.dest}>
            <button type="button" className="brow" onClick={r.onClick} aria-label={`Go to ${r.dest}`}>
              <span className="bbullet" style={{ background: r.color }} aria-hidden="true" />
              <span className="bdest">{r.dest}</span>
              {r.sub ? <span className="binfo">{r.sub}</span> : null}
              <span className="bstat" style={{ color: r.statusColor || "var(--board-accent)" }}>{r.status}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
