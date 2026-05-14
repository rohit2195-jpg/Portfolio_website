import rawSvg from "../../assets/wmata-map.svg?raw";
import { PORTFOLIO_STATIONS, MAP_VIEWBOX } from "./stations";

const VB = `0 0 ${MAP_VIEWBOX.w} ${MAP_VIEWBOX.h}`;

const RADII = {
  primary:   { outer: 12,  mid: 7.5, inner: 4   },
  secondary: { outer: 7.5, mid: 4.5, inner: 2.5 },
};

const LABEL_OFFSET = {
  primary:   { right: [16, 0], left: [-16, 0], top: [0, -16], bottom: [0, 20] },
  secondary: { right: [12, 0], left: [-12, 0], top: [0, -12], bottom: [0, 14] },
};

const LABEL_ANCHOR = { right: "start", left: "end", top: "middle", bottom: "middle" };

export default function MetroMap({ onNavigateToSection }) {
  const handleKey = (e, section) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onNavigateToSection?.(section);
    }
  };

  return (
    <section id="map" className="metro-map" aria-labelledby="metro-map-hint">
      <div className="metro-map-frame">
        <div
          className="metro-map-layer"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: rawSvg }}
        />

        <svg
          viewBox={VB}
          xmlns="http://www.w3.org/2000/svg"
          className="metro-map-layer metro-map-markers"
          role="navigation"
          aria-label="Portfolio sections"
        >
          {PORTFOLIO_STATIONS.map((s) => {
            const tier = s.tier ?? "primary";
            const r = RADII[tier];
            const offsets = LABEL_OFFSET[tier];
            const [dx, dy] = offsets[s.labelAnchor] ?? offsets.right;
            return (
              <g
                key={s.section}
                transform={`translate(${s.x}, ${s.y})`}
                className={`metro-marker-svg metro-marker-svg--${tier}`}
                role="button"
                tabIndex={0}
                aria-label={`Go to ${s.label} section`}
                onClick={() => onNavigateToSection?.(s.section)}
                onKeyDown={(e) => handleKey(e, s.section)}
                style={{ cursor: "pointer" }}
              >
                <circle r={r.outer} className="metro-marker-svg-outer" />
                <circle r={r.mid}   className="metro-marker-svg-mid" />
                <circle r={r.inner} style={{ fill: s.color }} />
                <text
                  x={dx}
                  y={dy}
                  textAnchor={LABEL_ANCHOR[s.labelAnchor] ?? "start"}
                  dominantBaseline="middle"
                  className="metro-marker-svg-label"
                >
                  {s.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p id="metro-map-hint" className="metro-map-hint">
        Click any station to jump to that section.
      </p>
    </section>
  );
}
