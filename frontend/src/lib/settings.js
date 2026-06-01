// Station control-room settings: persistence + live application.
// Reuses existing keys for theme (portfolio-theme) and background (lib/background.js).
// New keys below cover dim (scrim), reduce-motion, and font scale.

export const DIM_KEY = "metro:bg.dim";
export const REDUCE_MOTION_KEY = "metro:reduceMotion";
export const FONT_SCALE_KEY = "metro:fontScale";

// Defaults
export const DIM_DEFAULT = 0.56; // matches the light-theme --scrim-top alpha
export const FONT_SCALE_DEFAULT = 1.06; // matches the global body { zoom: 1.06 }
export const FONT_SCALE_MIN = 0.95;
export const FONT_SCALE_MAX = 1.2;
export const DIM_MIN = 0.3;
export const DIM_MAX = 0.95;

const hasWindow = () => typeof window !== "undefined";

function clamp(value, min, max) {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

// ---- Dim (scrim) ---------------------------------------------------------
// The scrim is `linear-gradient(180deg, rgba(BASE, var(--scrim-top)), rgba(BASE, var(--scrim-bottom)))`.
// IMPORTANT: --scrim-top / --scrim-bottom are bare ALPHA NUMBERS (e.g. 0.56), not full
// rgba() strings — the base RGB is hardcoded per-theme in styles.css. So we only ever
// set the alpha. We override on documentElement (wins over the :root defaults).
export function getDim() {
  if (!hasWindow()) return DIM_DEFAULT;
  const raw = parseFloat(window.localStorage.getItem(DIM_KEY));
  return Number.isNaN(raw) ? DIM_DEFAULT : clamp(raw, DIM_MIN, DIM_MAX);
}

export function applyDim(value) {
  if (!hasWindow()) return;
  const top = clamp(parseFloat(value), DIM_MIN, DIM_MAX);
  const bottom = clamp(top + 0.1, DIM_MIN, 0.98); // bottom slightly stronger, as in defaults
  document.documentElement.style.setProperty("--scrim-top", top.toFixed(3));
  document.documentElement.style.setProperty("--scrim-bottom", bottom.toFixed(3));
}

export function setDim(value) {
  if (!hasWindow()) return;
  const v = clamp(parseFloat(value), DIM_MIN, DIM_MAX);
  window.localStorage.setItem(DIM_KEY, String(v));
  applyDim(v);
}

// ---- Reduce motion -------------------------------------------------------
export function getReduceMotion() {
  if (!hasWindow()) return false;
  return window.localStorage.getItem(REDUCE_MOTION_KEY) === "true";
}

export function applyReduceMotion(on) {
  if (!hasWindow()) return;
  document.documentElement.dataset.reduceMotion = on ? "true" : "false";
}

export function setReduceMotion(on) {
  if (!hasWindow()) return;
  window.localStorage.setItem(REDUCE_MOTION_KEY, on ? "true" : "false");
  applyReduceMotion(on);
}

// ---- Font scale ----------------------------------------------------------
// Overrides the global `body { zoom: 1.06 }`. We set zoom on documentElement and
// neutralize the body-level rule (inline zoom: 1) so the two don't compound.
export function getFontScale() {
  if (!hasWindow()) return FONT_SCALE_DEFAULT;
  const raw = parseFloat(window.localStorage.getItem(FONT_SCALE_KEY));
  return Number.isNaN(raw) ? FONT_SCALE_DEFAULT : clamp(raw, FONT_SCALE_MIN, FONT_SCALE_MAX);
}

export function applyFontScale(value) {
  if (!hasWindow()) return;
  const v = clamp(parseFloat(value), FONT_SCALE_MIN, FONT_SCALE_MAX);
  document.documentElement.style.zoom = String(v);
  if (document.body) document.body.style.zoom = "1";
}

export function setFontScale(value) {
  if (!hasWindow()) return;
  const v = clamp(parseFloat(value), FONT_SCALE_MIN, FONT_SCALE_MAX);
  window.localStorage.setItem(FONT_SCALE_KEY, String(v));
  applyFontScale(v);
}

// ---- Bulk apply / reset --------------------------------------------------
export function applyAllSettings() {
  if (!hasWindow()) return;
  applyDim(getDim());
  applyReduceMotion(getReduceMotion());
  applyFontScale(getFontScale());
}

// Service reset: clears the control-room keys (theme + background are managed by
// their own mechanisms and intentionally left intact unless requested) and
// restores defaults, then the caller reloads.
export function resetSettings() {
  if (!hasWindow()) return;
  window.localStorage.removeItem(DIM_KEY);
  window.localStorage.removeItem(REDUCE_MOTION_KEY);
  window.localStorage.removeItem(FONT_SCALE_KEY);
  applyDim(DIM_DEFAULT);
  applyReduceMotion(false);
  applyFontScale(FONT_SCALE_DEFAULT);
}
