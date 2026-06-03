import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import AboutSection from "../components/sections/AboutSection";
import ContactSection from "../components/sections/ContactSection";
import { Dock, DockIcon } from "../components/magicui/dock";
import MetroMap from "../components/MetroMap/MetroMap";
import MetroMapMobile from "../components/MetroMap/MetroMapMobile";
import StatusFlap from "../components/StatusFlap";
import { PORTFOLIO_STATIONS } from "../components/MetroMap/stations";
import MiscellaneousSection from "../components/sections/MiscellaneousSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import TimelineSection from "../components/sections/TimelineSection";
import { useActiveSection } from "../hooks/useActiveSection";
import DepartureBoard from "../components/transit/DepartureBoard";
import StationStop from "../components/transit/StationStop";
import OysterReader from "../components/transit/OysterReader";

const SECTION_TO_ANCHOR = {
  about: "about",
  projects: "projects",
  timeline: "timeline",
  miscellaneous: "miscellaneous",
  photos: "miscellaneous",
  clock: "miscellaneous",
  contact: "contact",
};

const SECTION_COLOR = Object.fromEntries(
  PORTFOLIO_STATIONS.map((s) => [s.section, s.color])
);

const OBSERVED_IDS = ["about", "projects", "timeline", "miscellaneous", "contact"];

const DOCK_ITEMS = [
  { section: "map",      icon: "fa-solid fa-train-subway", label: "Map" },
  { section: "about",    icon: "fa-solid fa-user",         label: "About" },
  { section: "projects", icon: "fa-solid fa-code",         label: "Projects" },
  { section: "timeline", icon: "fa-solid fa-timeline",     label: "Timeline" },
  { section: "miscellaneous", icon: "fa-solid fa-compass", label: "Misc" },
  { section: "contact",  icon: "fa-solid fa-envelope",     label: "Contact" },
];

export default function HomePage({ initialSection }) {
  const location = useLocation();
  const [scrollPct, setScrollPct] = useState(0);
  const [dockVisible, setDockVisible] = useState(false);
  const [clock, setClock] = useState(() =>
    new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })
  );
  const mapRef = useRef(null);
  const heroFitRef = useRef(null);

  // Scale the hero (board + map + status board) down to fit one viewport on
  // shorter screens so nothing is cut off and the About section never peeks
  // above the fold. The .hero-screen is a fixed-height band (one viewport minus
  // the header); we measure the hero's natural height and scale it to fit.
  useLayoutEffect(() => {
    const fit = () => {
      const el = heroFitRef.current;
      const screen = el?.closest(".hero-screen");
      if (!el || !screen) return;
      el.style.transform = "none";
      // On narrow viewports the hero stacks vertically (board over the mobile
      // map list) and is far taller than one screen. Scaling it to fit would
      // crush it to ~60% with big side gaps — let it flow and scroll instead.
      if (window.innerWidth <= 760) return;
      const natural = el.getBoundingClientRect().height;
      const avail = screen.clientHeight - 6;
      if (natural <= 0) return;
      const scale = Math.max(0.6, Math.min(1, avail / natural));
      el.style.transform = `scale(${scale})`;
    };
    fit();
    window.addEventListener("resize", fit);
    // refit once fonts/images settle
    const raf = requestAnimationFrame(fit);
    const t = setTimeout(fit, 400);
    return () => {
      window.removeEventListener("resize", fit);
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }));
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const max = el.scrollHeight - el.clientHeight;
      setScrollPct(max > 0 ? (scrolled / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setDockVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const activeSection = useActiveSection(OBSERVED_IDS);
  const activeColor = SECTION_COLOR[activeSection] ?? "#A1A1A4";

  useLayoutEffect(() => {
    const section = initialSection ?? location.state?.scrollTo;
    if (!section) return;
    const anchor = SECTION_TO_ANCHOR[section] ?? section;
    if (!anchor) return;
    document.getElementById(anchor)?.scrollIntoView({ behavior: "instant", block: "start" });
  }, [initialSection, location.state?.scrollTo]);

  const handleNavigate = useCallback((section) => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = prefersReduced ? "auto" : "smooth";
    if (section === "map") { window.scrollTo({ top: 0, behavior }); return; }
    const anchor = SECTION_TO_ANCHOR[section];
    if (!anchor) return;
    const el = document.getElementById(anchor);
    if (el) el.scrollIntoView({ behavior, block: "start" });
  }, []);

  const boardRows = [
    { color: "#6950A1", dest: "ABOUT",    sub: "the person behind it", status: "NOW BOARDING", statusColor: "var(--led-green)", onClick: () => handleNavigate("about") },
    { color: "#0072CE", dest: "PROJECTS", sub: "things I've built",     status: "2 MIN", onClick: () => handleNavigate("projects") },
    { color: "#00B140", dest: "TIMELINE", sub: "the journey so far",    status: "4 MIN", onClick: () => handleNavigate("timeline") },
    { color: "#E3801C", dest: "MISC",     sub: "off the clock",         status: "6 MIN", onClick: () => handleNavigate("miscellaneous") },
    { color: "#FFD200", dest: "CONTACT",  sub: "say hello",             status: "8 MIN", onClick: () => handleNavigate("contact") },
  ];

  return (
    <>
      <div
        className="metro-scroll-bar"
        style={{ "--scroll-pct": `${scrollPct}%`, "--bar-color": activeColor }}
        aria-hidden="true"
      />
      <div className="hero-screen">
      <div className="hero-fit" ref={heroFitRef}>
      <div id="map" ref={mapRef} className="hero-band">
        <div className="hero-in">
          <div className="hero-grid">
            <div className="hero-left">
              <DepartureBoard rows={boardRows} clock={clock} />
              <OysterReader onTap={() => handleNavigate("about")} />
            </div>
            <div className="hero-mapcard">
              <p className="hero-mapcard-cap" aria-hidden="true"><span>System Map</span><span style={{ color: "#00863b" }}>● live · click a stop</span></p>
              <div className="hero-mapbox">
                <MetroMap onNavigateToSection={handleNavigate} />
                <MetroMapMobile onNavigateToSection={handleNavigate} />
              </div>
              <ul className="map-legend" aria-hidden="true">
                <li><span style={{ background: "var(--metro-line-red)" }} />Red · About</li>
                <li><span style={{ background: "var(--metro-line-blue)" }} />Blue · Projects</li>
                <li><span style={{ background: "var(--metro-line-green)" }} />Green · Timeline</li>
                <li><span style={{ background: "var(--metro-line-orange)" }} />Orange · Misc</li>
                <li><span style={{ background: "var(--metro-line-yellow)" }} />Yellow · Contact</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <StatusFlap />
      </div>
      </div>

      <AboutSection />
      <StationStop color="var(--metro-line-blue)" destination="Projects" lineName="Blue Line" />
      <ProjectsSection />
      <StationStop color="var(--metro-line-green)" destination="Timeline" lineName="Green Line" />
      <TimelineSection />
      <StationStop color="var(--metro-line-orange)" destination="Miscellaneous" lineName="Orange Line" />
      <MiscellaneousSection />
      <StationStop color="var(--metro-line-yellow)" destination="Contact" lineName="Yellow Line" />
      <ContactSection />

      <AnimatePresence>
        {dockVisible && (
          <div className="dock-wrapper">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Dock>
                {DOCK_ITEMS.map(({ section, icon, label }) => (
                  <DockIcon
                    key={section}
                    onClick={() => handleNavigate(section)}
                    title={label}
                    aria-label={`Navigate to ${label}`}
                  >
                    <i className={icon} aria-hidden="true" />
                    <span className="dock-icon-tooltip">{label}</span>
                  </DockIcon>
                ))}
              </Dock>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
