import { useEffect, useRef, useState } from "react";
import ExitSign from "../components/transit/ExitSign";
import BuildFacts from "../components/BuildFacts";
import { BACKGROUNDS, getBackgroundId, setBackground } from "../lib/background";
import {
  DIM_MIN,
  DIM_MAX,
  FONT_SCALE_MIN,
  FONT_SCALE_MAX,
  PANEL_ALPHA_MIN,
  PANEL_ALPHA_MAX,
  getDim,
  getFontScale,
  getPanelAlpha,
  getReduceMotion,
  resetSettings,
  setDim,
  setFontScale,
  setPanelAlpha,
  setReduceMotion,
} from "../lib/settings";

const THEME_KEY = "portfolio-theme";

// Each settings group is a "station" on the control-room line.
const STATIONS = [
  { id: "display", label: "Display", color: "var(--metro-line-red)" },
  { id: "background", label: "Background", color: "var(--metro-line-blue)" },
  { id: "motion", label: "Motion", color: "var(--metro-line-green)" },
  { id: "accessibility", label: "Accessibility", color: "var(--metro-line-orange)" },
  { id: "about", label: "About This Build", color: "var(--metro-line-yellow)" },
];

function getTheme() {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/* ---------- Small transit-hardware controls ---------- */

function Segmented({ options, value, onChange, ariaLabel }) {
  return (
    <div className="ctrl-segmented" role="radiogroup" aria-label={ariaLabel}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={value === opt.value}
          className={`ctrl-segmented__opt${value === opt.value ? " is-active" : ""}`}
          style={{ "--bullet": opt.color || "var(--metro-line-blue)" }}
          onClick={() => onChange(opt.value)}
        >
          <span className="ctrl-segmented__bullet" aria-hidden="true" />
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function Rocker({ on, onChange, ariaLabel }) {
  return (
    <button
      type="button"
      className={`ctrl-rocker${on ? " is-on" : ""}`}
      role="switch"
      aria-checked={on}
      aria-label={ariaLabel}
      onClick={() => onChange(!on)}
    >
      <span className="ctrl-rocker__track" aria-hidden="true">
        <span className="ctrl-rocker__face ctrl-rocker__face--on">ON</span>
        <span className="ctrl-rocker__face ctrl-rocker__face--off">OFF</span>
        <span className="ctrl-rocker__knob" />
      </span>
    </button>
  );
}

function Fader({ min, max, step, value, onChange, ariaLabel, readout }) {
  return (
    <div className="ctrl-fader">
      <input
        className="ctrl-fader__input"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={ariaLabel}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
      <span className="ctrl-fader__readout">{readout}</span>
    </div>
  );
}

/* ---------- Page ---------- */

export default function SettingsPage() {
  const [theme, setThemeState] = useState(getTheme);
  const [bg, setBgState] = useState(getBackgroundId);
  const [dim, setDimState] = useState(getDim);
  const [panelAlpha, setPanelAlphaState] = useState(getPanelAlpha);
  const [reduceMotion, setReduceMotionState] = useState(getReduceMotion);
  const [fontScale, setFontScaleState] = useState(getFontScale);
  const [active, setActive] = useState(STATIONS[0].id);

  const sectionRefs = useRef({});

  // Display: theme (existing mechanism — Layout reads dataset on mount).
  const chooseTheme = (next) => {
    setThemeState(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem(THEME_KEY, next);
    // Re-derive scrim color for the new theme so Dim stays consistent.
    setDim(dim);
  };

  const chooseBg = (id) => {
    setBgState(id);
    setBackground(id);
  };

  const changeDim = (v) => {
    setDimState(v);
    setDim(v);
  };

  const changePanelAlpha = (v) => {
    setPanelAlphaState(v);
    setPanelAlpha(v);
  };

  const toggleMotion = (on) => {
    setReduceMotionState(on);
    setReduceMotion(on);
  };

  const changeFont = (v) => {
    setFontScaleState(v);
    setFontScale(v);
  };

  const handleReset = () => {
    resetSettings();
    window.location.reload();
  };

  // Highlight the active station as the user scrolls the panel.
  useEffect(() => {
    const ids = STATIONS.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.5, 1] }
    );
    ids.forEach((id) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = (id) => {
    setActive(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="settings-room">
      {/* Emergency-exit "running man" way-out sign */}
      <ExitSign to="/" />

      <header className="settings-room__head">
        <p className="settings-room__kicker">Station Control Room</p>
        <h1 className="settings-room__title">Service Settings</h1>
        <p className="settings-room__sub">
          Rohit Sattuluri Transit System · Operations Panel
        </p>
      </header>

      <div className="settings-room__grid">
        {/* Left: vertical line nav, each group is a station */}
        <nav className="settings-line" aria-label="Settings sections">
          <ul className="settings-line__list">
            {STATIONS.map((s) => (
              <li key={s.id} className="settings-line__item">
                <button
                  type="button"
                  className={`settings-line__btn${active === s.id ? " is-active" : ""}`}
                  style={{ "--line": s.color }}
                  aria-current={active === s.id ? "true" : undefined}
                  onClick={() => goTo(s.id)}
                >
                  <span className="settings-line__node" aria-hidden="true" />
                  <span className="settings-line__label">{s.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: panels */}
        <div className="settings-panels">
          {/* 1. Display */}
          <Group
            station={STATIONS[0]}
            refCb={(el) => (sectionRefs.current.display = el)}
          >
            <Field label="Theme" hint="Daytime or night service.">
              <Segmented
                ariaLabel="Theme"
                value={theme}
                onChange={chooseTheme}
                options={[
                  { value: "light", label: "Light", color: "var(--metro-line-yellow)" },
                  { value: "dark", label: "Dark", color: "var(--metro-line-blue)" },
                ]}
              />
            </Field>
          </Group>

          {/* 2. Background */}
          <Group
            station={STATIONS[1]}
            refCb={(el) => (sectionRefs.current.background = el)}
          >
            <Field label="Map" hint="Choose the platform backdrop.">
              <div className="settings-bg-grid">
                {BACKGROUNDS.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    className={`settings-bg-option${bg === b.id ? " is-active" : ""}`}
                    onClick={() => chooseBg(b.id)}
                    aria-pressed={bg === b.id}
                  >
                    <span
                      className="settings-bg-thumb"
                      style={{ backgroundImage: `url(${b.url})` }}
                    />
                    <span className="settings-bg-label">
                      {b.label}
                      {bg === b.id ? " · Active" : ""}
                    </span>
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Dim" hint="Darken the scrim over the backdrop.">
              <Fader
                ariaLabel="Background dim"
                min={DIM_MIN}
                max={DIM_MAX}
                step={0.01}
                value={dim}
                onChange={changeDim}
                readout={`${Math.round(dim * 100)}%`}
              />
            </Field>
            <Field
              label="Panel Opacity"
              hint="How much backdrop shows through cards and panels."
            >
              <Fader
                ariaLabel="Panel opacity"
                min={PANEL_ALPHA_MIN}
                max={PANEL_ALPHA_MAX}
                step={0.01}
                value={panelAlpha}
                onChange={changePanelAlpha}
                readout={`${Math.round(panelAlpha * 100)}%`}
              />
            </Field>
          </Group>

          {/* 3. Motion */}
          <Group
            station={STATIONS[2]}
            refCb={(el) => (sectionRefs.current.motion = el)}
          >
            <Field
              label="Reduce Motion"
              hint="Stops marquees, pulses, and flap animations."
            >
              <Rocker
                ariaLabel="Reduce motion"
                on={reduceMotion}
                onChange={toggleMotion}
              />
            </Field>
          </Group>

          {/* 4. Accessibility */}
          <Group
            station={STATIONS[3]}
            refCb={(el) => (sectionRefs.current.accessibility = el)}
          >
            <Field label="Font Scale" hint="Resize the whole interface.">
              <Fader
                ariaLabel="Font scale"
                min={FONT_SCALE_MIN}
                max={FONT_SCALE_MAX}
                step={0.01}
                value={fontScale}
                onChange={changeFont}
                readout={`${Math.round(fontScale * 100)}%`}
              />
            </Field>
          </Group>

          {/* 5. About this build */}
          <Group
            station={STATIONS[4]}
            refCb={(el) => (sectionRefs.current.about = el)}
          >
            <dl className="settings-about">
              <div className="settings-about__row">
                <dt>System</dt>
                <dd>Rohit Sattuluri Transit System</dd>
              </div>
              <div className="settings-about__row">
                <dt>Service</dt>
                <dd>Portfolio · Metro Edition</dd>
              </div>
              <div className="settings-about__row">
                <dt>Version</dt>
                <dd>v2.0</dd>
              </div>
            </dl>

            <BuildFacts />
            <div className="settings-about__links">
              <a
                href="https://github.com/rohit2195-jpg"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/rohit-sattuluri"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a href="mailto:rohit.sattuluri@gmail.com">Email</a>
            </div>
            <button
              type="button"
              className="settings-reset"
              onClick={handleReset}
            >
              Service Reset
            </button>
            <p className="settings-reset__note">
              Restores dim, motion, and font scale to factory service.
            </p>
          </Group>
        </div>
      </div>
    </section>
  );
}

/* Group shell — reuses the colored line bar + black station node + title look. */
function Group({ station, children, refCb }) {
  return (
    <section
      id={station.id}
      ref={refCb}
      className="settings-group"
      aria-labelledby={`${station.id}-title`}
    >
      <div className="settings-group__head">
        <span
          className="settings-group__bar"
          style={{ background: station.color }}
          aria-hidden="true"
        />
        <span className="settings-group__node" aria-hidden="true" />
        <h2 className="settings-group__title" id={`${station.id}-title`}>
          {station.label}
        </h2>
      </div>
      <div className="settings-group__body">{children}</div>
    </section>
  );
}

function Field({ label, hint, children }) {
  return (
    <div className="settings-field">
      <div className="settings-field__meta">
        <span className="settings-field__label">{label}</span>
        {hint ? <span className="settings-field__hint">{hint}</span> : null}
      </div>
      <div className="settings-field__control">{children}</div>
    </div>
  );
}
