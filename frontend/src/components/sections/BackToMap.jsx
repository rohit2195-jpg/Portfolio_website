import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function BackToMap() {
  const { pathname } = useLocation();
  const onSubPage = pathname !== "/";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (onSubPage) return;
    const map = document.getElementById("map");
    if (!map) return;
    const check = () => setVisible(map.getBoundingClientRect().bottom < 80);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    // rAF ensures layout is stable before first check
    const raf = requestAnimationFrame(check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      cancelAnimationFrame(raf);
    };
  }, [onSubPage]);

  if (onSubPage) {
    return (
      <Link
        to="/"
        className="back-to-map-fab back-to-map-fab--visible"
        aria-label="Back to map"
      >
        <i className="fa-solid fa-arrow-up" aria-hidden="true" />
        <span className="back-to-map-fab-label">WAY OUT</span>
      </Link>
    );
  }

  return (
    <a
      href="#map"
      className={`back-to-map-fab${visible ? " back-to-map-fab--visible" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        document.getElementById("map")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
      aria-label="Back to map"
    >
      <i className="fa-solid fa-arrow-up" aria-hidden="true" />
      <span className="back-to-map-fab-label">WAY OUT</span>
    </a>
  );
}
