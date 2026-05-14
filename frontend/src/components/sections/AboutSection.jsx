import { useState, useEffect } from "react";
import { bio, bioTagline, coursework, skills } from "../../data/about";
import SectionHeader from "./SectionHeader";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const SKILL_ROWS = [
  { key: "languages", label: "Languages" },
  { key: "libraries", label: "Libraries" },
  { key: "tools", label: "Tools" },
];

const SKILL_LINE_COLORS = {
  languages: "var(--metro-line-red)",
  libraries: "var(--metro-line-blue)",
  tools: "var(--metro-line-silver)",
};

function skillIconSrc(skill) {
  if (skill.iconUrl) return skill.iconUrl;
  const variant = skill.variant ?? "original";
  return `${DEVICON}/${skill.icon}/${skill.icon}-${variant}.svg`;
}

export default function AboutSection() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [ghostOpen, setGhostOpen] = useState(false);

  useEffect(() => {
    if (!alertOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setAlertOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [alertOpen]);

  return (
    <section id="about" data-line="silver" className="section section-about">
      <div onDoubleClick={() => setAlertOpen(true)} style={{ cursor: "default" }}>
        <SectionHeader
          color="#6950A1"
          title="About"
          pronunciation="[uh-bout]"
          definition="a collection of facts regarding a specific entity"
        />
      </div>

      {/* Station pylon card — bio wrapped as Red Line station sign */}
      <div className="station-pylon">
        <div className="station-pylon-header" aria-hidden="true">
          <span className="station-pylon-badge">RD</span>
          <span className="station-pylon-name">Dupont Circle</span>
        </div>
        <div className="station-pylon-body">
          <p className="section-bio-tagline">{bioTagline}</p>
          <p className="section-bio">{bio}</p>
        </div>
      </div>

      {/* GHOST STATION — Abandoned platforms in the Rohit Sattuluri Transit System:
          v0.1 AI Financial Dashboard (deprecated 2023),
          early Python CLI tools (decommissioned),
          two Java CRUD apps (service suspended indefinitely).
          These lines closed due to low ridership and architectural debt.
          — RSTA Infrastructure Division */}
      <span
        className="ghost-station-trigger"
        onClick={() => setGhostOpen((v) => !v)}
        aria-hidden="true"
        tabIndex={-1}
        title="Ghost Station"
      />
      {ghostOpen && (
        <aside className="ghost-station-panel" aria-label="Ghost Station">
          <span className="ghost-station-icon" aria-hidden="true">◈</span>
          <div className="ghost-station-text">
            <strong>GHOST STATION — RSTA Abandoned Infrastructure</strong>
            <p>
              Decommissioned lines: AI Dashboard v0 · Python CLI experiments · Java
              CRUD apps. Low ridership. Service suspended indefinitely.
            </p>
          </div>
          <button
            className="ghost-station-close"
            onClick={() => setGhostOpen(false)}
            aria-label="close ghost station panel"
          >
            ✕
          </button>
        </aside>
      )}

      <section className="about-subsection">
        <h3 className="about-subheading">Coursework</h3>
        <ul className="course-tags">
          {coursework.map((course) => (
            <li key={course} className="course-tag">
              {course}
            </li>
          ))}
        </ul>
      </section>

      <section className="about-subsection">
        <h3 className="about-subheading">Skills</h3>
        <div className="transit-legend-panel">
          <div className="transit-legend-title" aria-hidden="true">
            <span className="transit-legend-system-badge">SYSTEM MAP</span>
          </div>
          {SKILL_ROWS.map(({ key, label }) => (
            <div key={key} className="transit-legend-line">
              <div
                className="transit-legend-line-swatch"
                style={{ background: SKILL_LINE_COLORS[key] }}
                aria-hidden="true"
              />
              <div className="transit-legend-line-body">
                <span className="transit-legend-line-name">{label}</span>
                <ul className="skill-chips">
                  {skills[key].map((skill) => (
                    <li key={skill.name} className="skill-chip">
                      <img
                        className="skill-chip-icon"
                        src={skillIconSrc(skill)}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                      />
                      <span className="skill-chip-name">{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Alert Easter Egg Modal */}
      {alertOpen && (
        <div
          className="service-alert-backdrop"
          onClick={() => setAlertOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-alert-title"
        >
          <div
            className="service-alert-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="service-alert-header">
              <span aria-hidden="true" style={{ fontSize: "20px" }}>⚠</span>
              <span className="service-alert-agency">WMATA SERVICE ALERT</span>
              <button
                className="service-alert-close"
                onClick={() => setAlertOpen(false)}
                aria-label="Close service alert"
                autoFocus
              >
                ✕
              </button>
            </div>
            <div className="service-alert-body">
              <p className="service-alert-line-badge">
                <span
                  className="service-alert-line-dot"
                  style={{ background: "var(--metro-line-red)" }}
                />
                RED LINE
              </p>
              <h3 id="service-alert-title" className="service-alert-title">
                Heavy Engineering Traffic at Dupont Circle
              </h3>
              <p className="service-alert-desc">
                Effective immediately, expect significant delays on the Red Line
                due to ongoing machine learning research and systems programming
                near Dupont Circle. Passengers should anticipate increased load
                during peak JavaScript and Python throughput hours.
              </p>
              <p className="service-alert-desc">
                Free transfers available to Blue Line (Projects) and Green Line
                (Timeline). Normal service expected to resume May 2027.
              </p>
              <p className="service-alert-updated">
                Updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                — Rohit Sattuluri Transit Authority
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
