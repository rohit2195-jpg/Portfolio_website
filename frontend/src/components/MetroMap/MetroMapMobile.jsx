import { PORTFOLIO_STATIONS } from "./stations";

export default function MetroMapMobile({ onNavigateToSection }) {
  return (
    <section id="map-mobile" className="metro-mobile" aria-labelledby="metro-mobile-hint">
      <nav className="metro-mobile-line" aria-label="Portfolio sections">
        {PORTFOLIO_STATIONS.map((s) => (
          <button
            key={s.section}
            type="button"
            className="metro-mobile-stop"
            onClick={() => onNavigateToSection?.(s.section)}
            aria-label={`Go to ${s.label} section`}
          >
            <span
              className="metro-mobile-dot"
              style={{ "--stop-color": s.color }}
              aria-hidden="true"
            />
            <span className="metro-mobile-label">
              <span className="metro-mobile-title">{s.label}</span>
              <span className="metro-mobile-pron">{s.pronunciation}</span>
            </span>
          </button>
        ))}
      </nav>
      <p id="metro-mobile-hint" className="metro-map-hint">
        Tap any station to jump to that section.
      </p>
    </section>
  );
}
