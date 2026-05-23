import { useEffect, useState } from "react";
import { LINES } from "../data/transitMessages";

export default function StatusFlap() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState("idle");

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase("out");
      setTimeout(() => {
        setIdx((i) => (i + 1) % LINES.length);
        setPhase("in");
        setTimeout(() => setPhase("idle"), 500);
      }, 500);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const current = LINES[idx];

  return (
    <div className="status-flap" aria-live="polite" aria-atomic="true">
      <span className="status-flap-dot" style={{ background: current.color }} />
      <div
        className={`status-flap-card ${phase === "out" ? "status-flap-card--out" : ""} ${phase === "in" ? "status-flap-card--in" : ""}`}
      >
        <span className="status-flap-line" style={{ color: current.color }}>
          {current.line}
        </span>
        <span className="status-flap-status">{current.status}</span>
        <span className="status-flap-detail">{current.detail}</span>
      </div>
    </div>
  );
}
