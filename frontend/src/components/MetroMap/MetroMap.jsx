import wmataMap from "../../assets/wmata-map.svg";
import { PORTFOLIO_STATIONS, MAP_VIEWBOX } from "./stations";

export default function MetroMap({ onNavigateToSection }) {
  const handleClick = (section) => {
    if (onNavigateToSection) onNavigateToSection(section);
  };

  const handleKey = (e, section) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(section);
    }
  };

  return (
    <section id="map" className="metro-map" aria-labelledby="metro-map-hint">
      <div
        className="metro-map-frame"
        style={{ aspectRatio: `${MAP_VIEWBOX.w} / ${MAP_VIEWBOX.h}` }}
      >
        <img
          src={wmataMap}
          alt="Washington DC Metro map"
          className="metro-map-image"
        />
        <nav className="metro-map-overlay" aria-label="Portfolio sections">
          {PORTFOLIO_STATIONS.map((s) => {
            const leftPct = (s.x / MAP_VIEWBOX.w) * 100;
            const topPct = (s.y / MAP_VIEWBOX.h) * 100;
            return (
              <button
                key={s.section}
                type="button"
                className={`metro-marker metro-marker--label-${s.labelAnchor}`}
                style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                onClick={() => handleClick(s.section)}
                onKeyDown={(e) => handleKey(e, s.section)}
                aria-label={`Go to ${s.label} section`}
              >
                <span className="metro-marker-ring" aria-hidden="true">
                  <span className="metro-marker-ring-inner" />
                </span>
                <span className="metro-marker-label">
                  <span className="metro-marker-title">{s.label}</span>
                </span>
              </button>
            );
          })}
        </nav>
      </div>
      <p id="metro-map-hint" className="metro-map-hint">
        Click any station to jump to that section.
      </p>
    </section>
  );
}
