import wmataMap from "../../assets/wmata-map.svg";
import { MAP_VIEWBOX, PORTFOLIO_STATIONS } from "./stations";

export default function MiniMap({ activeSection, onNavigateToSection }) {
  return (
    <nav className="mini-map" aria-label="Mini map navigation">
      <div className="mini-map-frame">
        <img
          src={wmataMap}
          alt=""
          className="mini-map-image"
          aria-hidden="true"
        />
        {PORTFOLIO_STATIONS.map((s) => {
          const leftPct = (s.x / MAP_VIEWBOX.w) * 100;
          const topPct = (s.y / MAP_VIEWBOX.h) * 100;
          const isActive = activeSection === s.section;
          return (
            <button
              key={s.section}
              type="button"
              className={`mini-map-dot${isActive ? " mini-map-dot--active" : ""}`}
              style={{
                left: `${leftPct}%`,
                top: `${topPct}%`,
                "--dot-color": s.color,
              }}
              onClick={() => onNavigateToSection?.(s.section)}
              title={s.label}
              aria-label={`Go to ${s.label} section${isActive ? " (current)" : ""}`}
              aria-current={isActive ? "true" : undefined}
            />
          );
        })}
      </div>
    </nav>
  );
}
