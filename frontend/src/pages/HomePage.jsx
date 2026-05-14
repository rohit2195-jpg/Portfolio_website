import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AboutSection from "../components/sections/AboutSection";
import BackToMap from "../components/sections/BackToMap";
import ContactSection from "../components/sections/ContactSection";
import MetroMap from "../components/MetroMap/MetroMap";
import MetroMapMobile from "../components/MetroMap/MetroMapMobile";
import { PORTFOLIO_STATIONS } from "../components/MetroMap/stations";
import MiscellaneousSection from "../components/sections/MiscellaneousSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import TimelineSection from "../components/sections/TimelineSection";
import { useActiveSection } from "../hooks/useActiveSection";

const SECTION_TO_ANCHOR = {
  about: "about",
  projects: "projects",
  timeline: "timeline",
  photos: "miscellaneous",
  clock: "miscellaneous",
  contact: "contact",
};

const SECTION_COLOR = Object.fromEntries(
  PORTFOLIO_STATIONS.map((s) => [s.section, s.color])
);

const OBSERVED_IDS = ["about", "projects", "timeline", "photos", "clock", "contact"];

export default function HomePage({ initialSection }) {
  const location = useLocation();
  const [scrollPct, setScrollPct] = useState(0);

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
      <MetroMap onNavigateToSection={handleNavigate} />
      <MetroMapMobile onNavigateToSection={handleNavigate} />
      <div className="system-status-bar" aria-hidden="true">
        <span className="system-status-dot" />
        <span className="system-status-text">All Lines Operating Normally — RS Transit Authority</span>
      </div>

      <AboutSection />
      <ProjectsSection />
      <TimelineSection />
      <MiscellaneousSection />
      <ContactSection />

      <BackToMap />
    </>
  );
}
