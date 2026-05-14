import { useEffect, useState } from "react";

export default function BackToMap() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const map = document.getElementById("map");
    if (!map) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(map);
    return () => observer.disconnect();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const map = document.getElementById("map");
    if (map) map.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
