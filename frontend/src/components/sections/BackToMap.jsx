import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BackToMap() {
  const [onSubPage] = useState(() => !document.getElementById("map"));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (onSubPage) return;
    const map = document.getElementById("map");
    if (!map) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(map);
    return () => observer.disconnect();
  }, [onSubPage]);

  const handleClick = (e) => {
    e.preventDefault();
    const map = document.getElementById("map");
    if (map) map.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (onSubPage) {
    return (
      <Link
        to="/"
        className="back-to-map-fab back-to-map-fab--visible"
        aria-label="Back to map"
      >
        <i className="fa-solid fa-arrow-up" aria-hidden="true" />
        <span className="back-to-map-fab-label">Map</span>
      </Link>
    );
  }

  return (
    <a
      href="#map"
      className={`back-to-map-fab${visible ? " back-to-map-fab--visible" : ""}`}
      onClick={handleClick}
      aria-label="Back to map"
    >
      <i className="fa-solid fa-arrow-up" aria-hidden="true" />
      <span className="back-to-map-fab-label">Map</span>
    </a>
  );
}
