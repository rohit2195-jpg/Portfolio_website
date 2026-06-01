import vignelli from "../assets/subway-bg-vignelli.jpg";
import concept from "../assets/subway-bg.jpg";

export const BACKGROUNDS = [
  { id: "vignelli", label: "Vignelli Diagram", url: vignelli },
  { id: "concept", label: "NYC Concept Map", url: concept },
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
