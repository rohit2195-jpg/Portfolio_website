import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import AboutSection from "../components/sections/AboutSection";
import BackToMap from "../components/sections/BackToMap";
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
  { section: "about",    icon: "fa-solid fa-user",     label: "About" },
  { section: "projects", icon: "fa-solid fa-code",     label: "Projects" },
  { section: "timeline", icon: "fa-solid fa-timeline", label: "Timeline" },
  { section: "miscellaneous", icon: "fa-solid fa-compass", label: "Misc" },
  { section: "contact",  icon: "fa-solid fa-envelope", label: "Contact" },
];

export default function HomePage({ initialSection }) {
  const location = useLocation();
  const [scrollPct, setScrollPct] = useState(0);
  const [dockVisible, setDockVisible] = useState(false);
  const mapRef = useRef(null);

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

  useEffect(() => {
    const section = initialSection ?? location.state?.scrollTo;
    if (!section) return;
    const anchor = SECTION_TO_ANCHOR[section] ?? section;
    if (!anchor) return;
    const timer = setTimeout(() => {
      document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
    return () => clearTimeout(timer);
  }, [initialSection, location.state?.scrollTo]);

  const handleNavigate = useCallback((section) => {
    const anchor = SECTION_TO_ANCHOR[section];
    if (!anchor) return;
    const el = document.getElementById(anchor);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <div
        className="metro-scroll-bar"
        style={{ "--scroll-pct": `${scrollPct}%`, "--bar-color": activeColor }}
        aria-hidden="true"
      />
      <div id="map" ref={mapRef}>
        <MetroMap onNavigateToSection={handleNavigate} />
        <MetroMapMobile onNavigateToSection={handleNavigate} />
      </div>
      <StatusFlap />

      <AboutSection />
      <div className="station-divider" aria-hidden="true">
        <span className="station-divider-line" style={{ background: "var(--metro-line-blue)" }} />
        <span className="station-divider-node" />
        <span className="station-divider-label">Next Stop: Projects</span>
        <span className="station-divider-line" style={{ background: "var(--metro-line-blue)" }} />
      </div>
      <ProjectsSection />
      <div className="station-divider" aria-hidden="true">
        <span className="station-divider-line" style={{ background: "var(--metro-line-green)" }} />
        <span className="station-divider-node" />
        <span className="station-divider-label">Next Stop: Timeline</span>
        <span className="station-divider-line" style={{ background: "var(--metro-line-green)" }} />
      </div>
      <TimelineSection />
      <div className="station-divider" aria-hidden="true">
        <span className="station-divider-line" style={{ background: "var(--metro-line-orange)" }} />
        <span className="station-divider-node" />
        <span className="station-divider-label">Next Stop: Miscellaneous</span>
        <span className="station-divider-line" style={{ background: "var(--metro-line-orange)" }} />
      </div>
      <MiscellaneousSection />
      <div className="station-divider" aria-hidden="true">
        <span className="station-divider-line" style={{ background: "var(--metro-line-yellow)" }} />
        <span className="station-divider-node" />
        <span className="station-divider-label">Next Stop: Contact</span>
        <span className="station-divider-line" style={{ background: "var(--metro-line-yellow)" }} />
      </div>
      <ContactSection />

      <BackToMap />

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
