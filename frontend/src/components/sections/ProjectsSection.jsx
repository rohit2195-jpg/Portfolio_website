import { projects } from "../../data/projects";
import LineManifest from "./LineManifest";
import SectionHeader from "./SectionHeader";

const KICKER_COLOR = {
  "fa-regular fa-star": "#E3801C",
  "fa-regular fa-clock": "#FFD200",
  "fa-solid fa-brain": "#00B140",
  "fa-regular fa-music": "#BF0D3E",
  "fa-regular fa-map": "#0072CE",
  "fa-regular fa-folder-open": "#A1A1A4",
};

function StackStripMap({ stack, color }) {
  const stops = stack.split(",").map((s) => s.trim());
  return (
    <div className="stack-strip" aria-label={`Tech stack: ${stack}`}>
      <div className="stack-strip-track" style={{ "--strip-color": color }}>
        {stops.map((tech) => (
          <div key={tech} className="stack-strip-stop">
            <div className="stack-strip-node" aria-hidden="true" />
            <span className="stack-strip-label">{tech}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" data-line="blue" className="section section-projects">
      <SectionHeader
        color="#0072CE"
        title="Projects"
        pronunciation="[proj-ekts]"
        definition="a large undertaking that is usually contemplated or planned"
      />

      <LineManifest lineCode="BL" color="#0072CE" label="BLUE LINE · ALL DESTINATIONS" />

      <div className="project-card-grid">
        {projects.map((p, idx) => {
          const color = KICKER_COLOR[p.kickerIcon] || "#A1A1A4";
          const platform = String(idx + 1).padStart(2, "0");
          return (
            <article key={p.title} className="project-card-v2">
              {p.image ? (
                <div className="project-card-hero project-card-hero-image">
                  <img src={p.image} alt={`${p.title} preview`} loading="lazy" />
                  <span className="platform-badge" aria-hidden="true">PLATFORM {platform}</span>
                </div>
              ) : (
                <div
                  className="project-card-hero"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${color}aa)`,
                  }}
                  aria-hidden="true"
                >
                  <i className={`${p.kickerIcon} project-card-hero-icon`} />
                  <span className="platform-badge">PLATFORM {platform}</span>
                </div>
              )}
              <div className="project-card-body">
                <h3 className="project-card-title">{p.title}</h3>
                {p.description.map((para) => (
                  <p key={para} className="project-card-text">
                    {para}
                  </p>
                ))}
                {p.stack && <StackStripMap stack={p.stack} color={color} />}
              </div>
              <div className="project-card-footer">
                {p.repoHref && (
                  <a
                    href={p.repoHref}
                    target="_blank"
                    rel="noreferrer"
                    className="project-card-iconlink"
                    aria-label={`${p.title} source code on GitHub`}
                  >
                    <i className="fa-brands fa-github" aria-hidden="true" />
                  </a>
                )}
                {p.liveHref && (
                  <a
                    href={p.liveHref}
                    target="_blank"
                    rel="noreferrer"
                    className="project-card-iconlink project-card-iconlink--live"
                    aria-label={`${p.title} live site`}
                  >
                    <i className="fa-solid fa-globe" aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
