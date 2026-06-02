import vignelli from "../assets/subway-bg-vignelli.jpg";
import concept from "../assets/subway-bg.jpg";
import { INSPIRATION } from "../data/inspiration";

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const BACKGROUNDS = [
  // Defaults (clean map backdrops).
  { id: "vignelli", label: "Vignelli Diagram", url: vignelli },
  { id: "concept", label: "NYC Concept Map", url: concept },
  // Inspiration posters offered as optional wallpapers (none are the default).
  ...INSPIRATION.map((p) => ({ id: `poster-${slug(p.title)}`, label: p.title, url: p.src })),
];
const KEY = "portfolio-bg";
export const DEFAULT_BG = "vignelli";

export function getBackgroundId() {
  if (typeof window === "undefined") return DEFAULT_BG;
  const saved = window.localStorage.getItem(KEY);
  return BACKGROUNDS.some((b) => b.id === saved) ? saved : DEFAULT_BG;
}
export function applyBackground(id) {
  const bg = BACKGROUNDS.find((b) => b.id === id) || BACKGROUNDS[0];
  document.documentElement.style.setProperty("--page-bg-image", `url(${bg.url})`);
}
export function setBackground(id) {
  window.localStorage.setItem(KEY, id);
  applyBackground(id);
}
