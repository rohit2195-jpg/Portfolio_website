import { useCallback, useEffect, useState } from "react";
import AboutSection from "../components/sections/AboutSection";
import BackToMap from "../components/sections/BackToMap";
import ContactSection from "../components/sections/ContactSection";
import MetroMap from "../components/MetroMap/MetroMap";
import MetroMapMobile from "../components/MetroMap/MetroMapMobile";
import MiniMap from "../components/MetroMap/MiniMap";
import { PORTFOLIO_STATIONS } from "../components/MetroMap/stations";
import MiscellaneousSection from "../components/sections/MiscellaneousSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import TimelineSection from "../components/sections/TimelineSection";
import { useActiveSection } from "../hooks/useActiveSection";

const SECTION_TO_ANCHOR = {
  about: "about",
  projects: "projects",
  timeline: "timeline",
  photos: "photos",
  clock: "clock",
  contact: "contact",
};

const SECTION_COLOR = Object.fromEntries(
  PORTFOLIO_STATIONS.map((s) => [s.section, s.color])
);

const OBSERVED_IDS = ["about", "projects", "timeline", "photos", "clock", "contact"];

export default function HomePage({ initialSection }) {
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
  const activeColor = SECTION_COLOR[activeSection] ?? "#BF0D3E";

  useEffect(() => {
    if (!initialSection) return;
    const anchor = SECTION_TO_ANCHOR[initialSection];
    if (!anchor) return;
    const timer = setTimeout(() => {
      document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
    return () => clearTimeout(timer);
  }, [initialSection]);

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
      <MiniMap activeSection={activeSection} onNavigateToSection={handleNavigate} />
      <MetroMap onNavigateToSection={handleNavigate} />
      <MetroMapMobile onNavigateToSection={handleNavigate} />
      <div className="system-status-bar" aria-hidden="true">
        <span className="system-status-dot" />
        <span className="system-status-text">All Lines Operating Normally — Rohit Sattuluri Transit Authority</span>
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
