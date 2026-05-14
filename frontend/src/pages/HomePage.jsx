import { useCallback, useEffect, useState } from "react";
import AboutSection from "../components/sections/AboutSection";
import BackToMap from "../components/sections/BackToMap";
import ContactSection from "../components/sections/ContactSection";
import MetroMap from "../components/MetroMap/MetroMap";
import MiscellaneousSection from "../components/sections/MiscellaneousSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import TimelineSection from "../components/sections/TimelineSection";

const SECTION_TO_ANCHOR = {
  about: "about",
  projects: "projects",
  timeline: "timeline",
  photos: "photos",
  clock: "clock",
  contact: "contact",
};

const LINE_COLORS = {
  red: "#BF0D3E",
  blue: "#0072CE",
  green: "#00B140",
  orange: "#E3801C",
  yellow: "#FFD200",
};

export default function HomePage() {
  const [scrollPct, setScrollPct] = useState(0);
  const [activeColor, setActiveColor] = useState("#BF0D3E");

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
    const sections = document.querySelectorAll("section[data-line]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const line = visible[visible.length - 1].target.dataset.line;
        if (LINE_COLORS[line]) setActiveColor(LINE_COLORS[line]);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

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
