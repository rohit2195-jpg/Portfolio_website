# Subway Redesign — Phase 1 (Foundation) + Phase 2 (Hero & Signage) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-skin the portfolio's hero and shared chrome into a richer, authentic subway aesthetic — a continuous metro line-spine, station nodes, a charcoal split-flap **departures board**, a roundel name lockup, and a scrimmed subway-map background — delivering a complete, shippable "B" site.

**Architecture:** Add CSS design tokens + utility classes to the existing `styles.css`, then build small isolated React components under a new `src/components/transit/` directory. The `HomePage` hero is recomposed into a two-column band (departures board `4fr` / real WMATA map `6fr`) over a scrimmed background image. No content moves (content stays in `src/data/*`); no routing changes; HashRouter + `/Portfolio_website/` base path preserved.

**Tech Stack:** React 18, Vite, plain CSS (custom properties), framer-motion (already present), Font Awesome + Google Fonts (Barlow Condensed; A/B-testing Hanken Grotesk). No test runner exists — **verification = `npm run build` (catches import/JSX/type errors) + dev-server visual inspection at `http://localhost:5173/Portfolio_website/`**.

**Source spec (the "what & why" — read this for full context):** [`docs/SUBWAY_ART_REDESIGN_SPEC.md`](../../SUBWAY_ART_REDESIGN_SPEC.md). This plan implements that spec's Phases 1–2 (§9). **Reference mockup:** `.superpowers/brainstorm/95751-1780244404/content/hero-blend-v9.html`.

**Conventions for every task below:**
- Run the dev server once (`cd frontend && npm run dev`) and keep it open; "visual check" means look at the running page.
- "Build check" = `cd frontend && npm run build` must exit 0.
- **Do not commit automatically** — the repo owner commits. Each task ends with a *suggested* commit the owner can run.

---

## File Structure

**New files (`frontend/src/components/transit/`):**
- `tokens.md` — (doc only) the token contract, referenced by CSS.
- `StationNode.jsx` — node dot (tick / interchange / terminus).
- `Roundel.jsx` — ring + name-bar badge / monogram.
- `SplitFlapText.jsx` — animated split-flap string (reduced-motion aware).
- `DepartureBoard.jsx` — the board: rows of {line color, destination, sub, status}.
- `useReducedMotion.js` (in `src/hooks/`) — shared reduced-motion hook.

**Modified files:**
- `frontend/index.html` — add Hanken Grotesk font link (for A/B test).
- `frontend/src/styles.css` — new tokens, utilities (`.tactile`, `.platform-edge`, `.subway-tile`), board/roundel/station-node/hero classes, themed focus ring, reduced-motion blocks.
- `frontend/src/pages/HomePage.jsx` — recompose hero; mount board; reduced-motion-aware scroll.
- `frontend/src/assets/` — add optimized `subway-bg.webp` (background image), imported via Vite.

**Out of scope for this plan (later phases):** `LineSpine.jsx`, `ScrollProgressTrain.jsx`, `MetroCard.jsx`, `EnamelSign.jsx`, `WayfindingArrow.jsx`, full per-section re-skin, Status Board page, duotone background.

---

## Task 1: Add design tokens to `styles.css`

**Files:**
- Modify: `frontend/src/styles.css` (the `:root` block near top, ~line 13, and the `[data-theme="dark"]` block ~line 56)

- [ ] **Step 1: Add new tokens to `:root`**

In the `:root` block (after the existing `--metro-line-*` vars), add:

```css
  /* ---- subway-redesign tokens ---- */
  --line-weight: 6px;
  --board-bg: #23232a;        /* charcoal board, both themes */
  --board-ink: #f4f2ee;
  --board-accent: #FFC850;    /* amber status/clock */
  --board-rule: #34343d;
  --led-amber: #FFB000;
  --led-green: #39FF80;
  --scrim-top: 0.56;          /* hero bg readability (light) */
  --scrim-bottom: 0.74;
```

- [ ] **Step 2: Override scrim for dark mode**

In the `[data-theme="dark"]` block, add:

```css
  --scrim-top: 0.80;
  --scrim-bottom: 0.90;
```

(Board tokens intentionally stay identical in dark mode — the board is charcoal in both.)

- [ ] **Step 3: Build check**

Run: `cd frontend && npm run build`
Expected: exits 0 (CSS custom properties never break the build, but this confirms no stray syntax error).

- [ ] **Step 4: Suggested commit**

```bash
git add frontend/src/styles.css
git commit -m "feat(theme): add subway-redesign design tokens"
```

---

## Task 2: Add CSS background/texture utilities

**Files:**
- Modify: `frontend/src/styles.css` (append a new clearly-commented section)

- [ ] **Step 1: Append utility classes**

```css
/* ===== subway texture utilities ===== */
.tactile {
  background-image: radial-gradient(circle at 50% 50%,
    rgba(0,0,0,.16) 0 3px, transparent 3.5px);
  background-size: 18px 18px;
}
[data-theme="dark"] .tactile {
  background-image: radial-gradient(circle at 50% 50%,
    rgba(255,255,255,.10) 0 3px, transparent 3.5px);
}
.platform-edge {
  height: 14px;
  background: repeating-linear-gradient(45deg,
    var(--metro-line-yellow) 0 14px, #111 14px 28px);
}
.subway-tile {
  background-color: #fafafa;
  background-image:
    linear-gradient(335deg, rgba(0,0,0,.06) 1px, transparent 1px),
    linear-gradient(180deg, rgba(0,0,0,.06) 1px, transparent 1px);
  background-size: 46px 24px;
}
```

- [ ] **Step 2: Build check** — `cd frontend && npm run build` → exits 0.

- [ ] **Step 3: Visual check** — temporarily add `class="tactile"` to a section in the dev server, confirm a faint dot grid renders, then remove the temporary class.

- [ ] **Step 4: Suggested commit**

```bash
git add frontend/src/styles.css
git commit -m "feat(theme): add tactile/platform-edge/subway-tile utilities"
```

---

## Task 3: Shared `useReducedMotion` hook

**Files:**
- Create: `frontend/src/hooks/useReducedMotion.js`

- [ ] **Step 1: Write the hook**

```javascript
import { useEffect, useState } from "react";

// Returns true when the user prefers reduced motion. SSR-safe-ish (defaults false).
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}
```

- [ ] **Step 2: Build check** — `cd frontend && npm run build` → exits 0.

- [ ] **Step 3: Suggested commit**

```bash
git add frontend/src/hooks/useReducedMotion.js
git commit -m "feat: add useReducedMotion hook"
```

---

## Task 4: `StationNode` component

**Files:**
- Create: `frontend/src/components/transit/StationNode.jsx`
- Modify: `frontend/src/styles.css` (append station-node classes)

- [ ] **Step 1: Write the component**

```jsx
// A metro station node. variant: "tick" (normal) | "interchange" | "terminus".
export default function StationNode({ variant = "tick", color, className = "", style = {} }) {
  return (
    <span
      className={`station-node station-node--${variant} ${className}`}
      style={{ "--node-color": color, ...style }}
      aria-hidden="true"
    />
  );
}
```

- [ ] **Step 2: Append CSS**

```css
/* ===== station nodes ===== */
.station-node { display:inline-block; box-sizing:border-box; }
.station-node--tick {
  width:14px; height:14px; border-radius:50%;
  background:#111;
  box-shadow:0 0 0 4px #fff, 0 0 0 6px var(--node-color, #111);
}
.station-node--interchange {
  width:22px; height:22px; border-radius:50%;
  background:#fff; border:4px solid #111;
}
.station-node--terminus {
  width:30px; height:16px; border-radius:9px;
  background:#fff; border:4px solid var(--node-color, #111);
}
[data-theme="dark"] .station-node--tick { box-shadow:0 0 0 4px #15171c, 0 0 0 6px var(--node-color,#111); }
[data-theme="dark"] .station-node--interchange,
[data-theme="dark"] .station-node--terminus { background:#15171c; }
```

- [ ] **Step 3: Build check** — `cd frontend && npm run build` → exits 0.

- [ ] **Step 4: Visual check** — temporarily render `<StationNode variant="tick" color="#BF0D3E" />`, `interchange`, and `terminus` in `HomePage`; confirm three distinct node shapes; remove the temporary render.

- [ ] **Step 5: Suggested commit**

```bash
git add frontend/src/components/transit/StationNode.jsx frontend/src/styles.css
git commit -m "feat(transit): add StationNode component"
```

---

## Task 5: `Roundel` component

**Files:**
- Create: `frontend/src/components/transit/Roundel.jsx`
- Modify: `frontend/src/styles.css` (append roundel classes)

- [ ] **Step 1: Write the component**

```jsx
// London-Underground-style roundel. Either a monogram (single glyph) or a
// name bar across the ring. color tints the ring + bar.
export default function Roundel({ color = "#BF0D3E", monogram, label, size = 58 }) {
  return (
    <span className="roundel" style={{ "--roundel-color": color, "--roundel-size": `${size}px` }} aria-hidden="true">
      {monogram ? <span className="roundel-monogram">{monogram}</span> : null}
      {label ? <span className="roundel-bar">{label}</span> : null}
    </span>
  );
}
```

- [ ] **Step 2: Append CSS**

```css
/* ===== roundel ===== */
.roundel {
  position:relative; flex:0 0 auto;
  width:var(--roundel-size,58px); height:var(--roundel-size,58px);
  border:calc(var(--roundel-size,58px) * .17) solid var(--roundel-color,#BF0D3E);
  border-radius:50%; display:grid; place-items:center;
  background:rgba(255,255,255,.5);
}
[data-theme="dark"] .roundel { background:rgba(20,22,28,.5); }
.roundel-monogram {
  font:800 calc(var(--roundel-size,58px) * .4)/1 var(--font-transit, 'Barlow Condensed'), sans-serif;
  color:var(--roundel-color,#BF0D3E);
}
.roundel-bar {
  position:absolute; left:-12%; right:-12%; top:50%; transform:translateY(-50%);
  background:var(--roundel-color,#BF0D3E); color:#fff;
  text-align:center; font:700 calc(var(--roundel-size,58px) * .2)/1.6 var(--font-transit,'Barlow Condensed'),sans-serif;
  letter-spacing:.06em; text-transform:uppercase;
}
```

- [ ] **Step 3: Build check** — `cd frontend && npm run build` → exits 0.

- [ ] **Step 4: Visual check** — temporarily render `<Roundel color="#BF0D3E" monogram="R" />` and `<Roundel color="#0072CE" label="About" />`; confirm a ring monogram and a ring with a name bar; remove temporary render.

- [ ] **Step 5: Suggested commit**

```bash
git add frontend/src/components/transit/Roundel.jsx frontend/src/styles.css
git commit -m "feat(transit): add Roundel component"
```

---

## Task 6: `SplitFlapText` component (logic + animation)

**Files:**
- Create: `frontend/src/components/transit/SplitFlapText.jsx`
- Modify: `frontend/src/styles.css` (append flap classes)

This unit has real logic (per-character flip cascade) — verify the glyph math with a temporary console assertion (Step 2) before wiring the DOM.

- [ ] **Step 1: Write the component**

```jsx
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const GLYPHS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·:";

// Number of intermediate glyphs a cell flips through before landing on target.
export function flipSequence(target, steps = 6) {
  const end = GLYPHS.indexOf(target.toUpperCase());
  const safeEnd = end < 0 ? 0 : end;
  const seq = [];
  for (let i = steps; i >= 1; i--) {
    seq.push(GLYPHS[(safeEnd - i + GLYPHS.length * 2) % GLYPHS.length]);
  }
  seq.push(GLYPHS[safeEnd]);
  return seq; // last element is always the resolved target
}

function Cell({ target, delay, reduced }) {
  const [glyph, setGlyph] = useState(reduced ? target.toUpperCase() : " ");
  const timer = useRef();
  useEffect(() => {
    if (reduced) { setGlyph(target.toUpperCase()); return; }
    const seq = flipSequence(target);
    let i = 0;
    const tick = () => {
      setGlyph(seq[i]);
      i += 1;
      if (i < seq.length) timer.current = setTimeout(tick, 45);
    };
    timer.current = setTimeout(tick, delay);
    return () => clearTimeout(timer.current);
  }, [target, delay, reduced]);
  return <span className="flap">{glyph === " " ? " " : glyph}</span>;
}

export default function SplitFlapText({ text, className = "" }) {
  const reduced = useReducedMotion();
  const chars = String(text).split("");
  return (
    <span className={`flaprow ${className}`} aria-label={text}>
      {chars.map((ch, i) => (
        <Cell key={`${i}-${ch}`} target={ch} delay={i * 35} reduced={reduced} />
      ))}
    </span>
  );
}
```

- [ ] **Step 2: Verify the glyph logic (temporary)**

Add a temporary line at the bottom of the file: `if (typeof window !== "undefined") console.assert(flipSequence("A").slice(-1)[0] === "A", "flip lands on target");` — load the dev server, confirm no assertion error in console, then **remove the temporary line**.

- [ ] **Step 3: Append CSS**

```css
/* ===== split-flap ===== */
.flaprow { display:inline-flex; gap:3px; }
.flap {
  display:inline-grid; place-items:center;
  min-width:1.05em; height:1.5em; padding:0 .12em;
  background:var(--board-bg); color:var(--board-ink);
  font:800 clamp(16px,2.4vw,24px)/1 var(--font-transit,'Barlow Condensed'),sans-serif;
  border-radius:3px; position:relative; box-shadow:inset 0 -1px 0 #000;
}
.flap::after { content:""; position:absolute; left:0; right:0; top:50%; height:1px; background:rgba(255,255,255,.10); }
```

- [ ] **Step 4: Build check** — `cd frontend && npm run build` → exits 0.

- [ ] **Step 5: Visual check** — temporarily render `<SplitFlapText text="DEPARTURES" />`; confirm characters flip into place on load; toggle OS "reduce motion" and confirm it renders instantly with no flipping; remove temporary render.

- [ ] **Step 6: Suggested commit**

```bash
git add frontend/src/components/transit/SplitFlapText.jsx frontend/src/styles.css
git commit -m "feat(transit): add SplitFlapText with reduced-motion fallback"
```

---

## Task 7: `DepartureBoard` component

**Files:**
- Create: `frontend/src/components/transit/DepartureBoard.jsx`
- Modify: `frontend/src/styles.css` (append board classes)

- [ ] **Step 1: Write the component**

```jsx
// Charcoal departures board. rows: [{ color, dest, sub, status, statusColor, onClick }]
export default function DepartureBoard({ rows, clock = "09:45", className = "" }) {
  return (
    <div className={`board ${className}`}>
      <div className="board-head" aria-hidden="true">
        <span className="board-head-t">Departures</span>
        <span className="board-head-clk">{clock}</span>
      </div>
      <ul className="board-rows">
        {rows.map((r) => (
          <li key={r.dest}>
            <button type="button" className="brow" onClick={r.onClick} aria-label={`Go to ${r.dest}`}>
              <span className="bbullet" style={{ background: r.color }} aria-hidden="true" />
              <span className="bdest">{r.dest}</span>
              {r.sub ? <span className="binfo">{r.sub}</span> : null}
              <span className="bstat" style={{ color: r.statusColor || "var(--board-accent)" }}>{r.status}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 2: Append CSS**

```css
/* ===== departures board ===== */
.board { background:var(--board-bg); border-radius:11px; padding:14px 16px;
  box-shadow:inset 0 0 0 2px var(--board-rule), 0 10px 26px rgba(0,0,0,.30); }
.board-head { display:flex; justify-content:space-between; align-items:center;
  border-bottom:1px solid var(--board-rule); padding-bottom:9px; margin-bottom:4px; }
.board-head-t { font:700 13px var(--font-transit,'Barlow Condensed'),sans-serif; letter-spacing:.26em; color:var(--board-accent); text-transform:uppercase; }
.board-head-clk { font:600 13px ui-monospace,monospace; color:var(--board-accent); letter-spacing:.12em; }
.board-rows { list-style:none; margin:0; padding:0; }
.brow { width:100%; background:none; border:0; cursor:pointer; text-align:left;
  display:grid; grid-template-columns:15px 1fr auto; column-gap:10px; align-items:baseline;
  padding:9px 0; border-bottom:1px dashed var(--board-rule); }
.board-rows li:last-child .brow { border-bottom:0; }
.bbullet { width:14px; height:14px; border-radius:50%; align-self:center; }
.bdest { font:700 18px var(--font-transit,'Barlow Condensed'),sans-serif; letter-spacing:.05em; color:var(--board-ink); }
.binfo { grid-column:2; font:400 12px ui-monospace,monospace; color:#9a9aa2; margin-top:1px; }
.bstat { grid-row:1; grid-column:3; font:600 11px ui-monospace,monospace; letter-spacing:.06em; text-align:right; }
.brow:focus-visible { outline:none; box-shadow:0 0 0 3px var(--board-bg), 0 0 0 5px var(--led-amber); border-radius:6px; }
```

- [ ] **Step 3: Build check** — `cd frontend && npm run build` → exits 0.

- [ ] **Step 4: Visual check** — temporarily render with two rows; confirm bullets/destinations/status render and rows are keyboard-focusable; remove temporary render.

- [ ] **Step 5: Suggested commit**

```bash
git add frontend/src/components/transit/DepartureBoard.jsx frontend/src/styles.css
git commit -m "feat(transit): add DepartureBoard component"
```

---

## Task 8: Add & import the background image

**Files:**
- Create: `frontend/src/assets/subway-bg.webp` (converted from `subway-art/New York | concept | 2012 | waterhouse cifuentes design.jpg`)

- [ ] **Step 1: Convert and place the image**

From repo root:

```bash
# macOS: sips can't write webp; use cwebp if available, else keep jpg.
mkdir -p frontend/src/assets
if command -v cwebp >/dev/null; then
  cwebp -q 78 "subway-art/New York | concept | 2012 | waterhouse cifuentes design.jpg" -o frontend/src/assets/subway-bg.webp
else
  sips -Z 1600 -s formatOptions 72 "subway-art/New York | concept | 2012 | waterhouse cifuentes design.jpg" --out frontend/src/assets/subway-bg.jpg
fi
ls -la frontend/src/assets/subway-bg.*
```

Expected: a `subway-bg.webp` (or `subway-bg.jpg`) under 250 KB exists.

- [ ] **Step 2: Confirm the path** — note the exact filename produced; Task 9 imports it. (Use `.webp` if produced, else `.jpg`.)

- [ ] **Step 3: Suggested commit**

```bash
git add frontend/src/assets/subway-bg.*
git commit -m "feat(assets): add optimized subway-map hero background"
```

---

## Task 9: Recompose the hero in `HomePage.jsx`

**Files:**
- Modify: `frontend/src/pages/HomePage.jsx`
- Modify: `frontend/src/styles.css` (append hero classes)

This is the centerpiece. The hero wraps the existing `MetroMap`/`MetroMapMobile` (kept) and adds the name lockup + departures board over the scrimmed background, matching `hero-blend-v9.html`.

- [ ] **Step 1: Append hero CSS**

```css
/* ===== redesign hero ===== */
.hero-band { position:relative; border-radius:14px; overflow:hidden; border:1px solid rgba(0,0,0,.14); margin:0 auto; max-width:1080px; }
.hero-bg { position:absolute; inset:0; background-image:var(--hero-bg-image); background-size:cover; background-position:center; }
.hero-scrim { position:absolute; inset:0;
  background:linear-gradient(180deg, rgba(243,241,234,var(--scrim-top)), rgba(243,241,234,var(--scrim-bottom))); }
[data-theme="dark"] .hero-scrim { background:linear-gradient(180deg, rgba(16,18,22,var(--scrim-top)), rgba(16,18,22,var(--scrim-bottom))); }
.hero-in { position:relative; padding:28px 30px 32px; }
.hero-grid { display:grid; grid-template-columns:4fr 6fr; gap:22px; align-items:stretch; }
.hero-left { display:flex; flex-direction:column; }
.hero-lockup { display:flex; align-items:center; gap:14px; min-height:58px; margin-bottom:18px; }
.hero-name h1 { margin:0; font:800 32px/.95 var(--font-transit,'Barlow Condensed'),sans-serif; letter-spacing:.02em; text-transform:uppercase; color:var(--text); }
.hero-name p { margin:3px 0 0; font:600 12px var(--font-transit,'Barlow Condensed'),sans-serif; letter-spacing:.2em; text-transform:uppercase; color:#5f5f5f; }
.hero-left .board { margin-bottom:76px; }      /* gap below board == name block above */
.hero-mapcard { background:rgba(255,255,255,.80); backdrop-filter:blur(2px); border-radius:11px; padding:14px 18px 16px; border:1px solid rgba(0,0,0,.08); display:flex; flex-direction:column; }
[data-theme="dark"] .hero-mapcard { background:rgba(20,22,28,.78); }
.hero-mapcard-cap { font:600 12px var(--font-transit,'Barlow Condensed'),sans-serif; letter-spacing:.16em; text-transform:uppercase; color:#888; margin:0 0 8px; display:flex; justify-content:space-between; }
.hero-mapbox { flex:1; display:flex; align-items:center; justify-content:center; }
@media (max-width:760px){ .hero-grid { grid-template-columns:1fr; } .hero-left .board { margin-bottom:22px; } }
```

- [ ] **Step 2: Import the assets and board at the top of `HomePage.jsx`**

Add to the import block (use `.webp` or `.jpg` per Task 8):

```jsx
import heroBg from "../assets/subway-bg.webp";
import DepartureBoard from "../components/transit/DepartureBoard";
import Roundel from "../components/transit/Roundel";
```

- [ ] **Step 3: Build the board rows from existing data**

Inside the `HomePage` component body (after `handleNavigate` is defined), add:

```jsx
  const boardRows = [
    { color: "#BF0D3E", dest: "ABOUT",    sub: "the person behind it", status: "NOW BOARDING", statusColor: "var(--led-green)", onClick: () => handleNavigate("about") },
    { color: "#0072CE", dest: "PROJECTS", sub: "things I've built",     status: "2 MIN", onClick: () => handleNavigate("projects") },
    { color: "#00B140", dest: "TIMELINE", sub: "the journey so far",    status: "4 MIN", onClick: () => handleNavigate("timeline") },
    { color: "#E3801C", dest: "MISC",     sub: "off the clock",         status: "6 MIN", onClick: () => handleNavigate("miscellaneous") },
    { color: "#FFD200", dest: "CONTACT",  sub: "say hello",             status: "8 MIN", onClick: () => handleNavigate("contact") },
  ];
```

- [ ] **Step 4: Replace the `#map` block with the hero band**

Replace the existing:

```jsx
      <div id="map" ref={mapRef}>
        <MetroMap onNavigateToSection={handleNavigate} />
        <MetroMapMobile onNavigateToSection={handleNavigate} />
      </div>
```

with:

```jsx
      <div id="map" ref={mapRef} className="hero-band" style={{ "--hero-bg-image": `url(${heroBg})` }}>
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-in">
          <div className="hero-grid">
            <div className="hero-left">
              <div className="hero-lockup">
                <Roundel color="#BF0D3E" monogram="R" />
                <div className="hero-name">
                  <h1>Rohit&nbsp;Sattuluri</h1>
                  <p>Software Engineer · Welcome aboard</p>
                </div>
              </div>
              <DepartureBoard rows={boardRows} />
            </div>
            <div className="hero-mapcard">
              <p className="hero-mapcard-cap" aria-hidden="true"><span>System Map</span><span style={{ color: "#00863b" }}>● live · click a stop</span></p>
              <div className="hero-mapbox">
                <MetroMap onNavigateToSection={handleNavigate} />
                <MetroMapMobile onNavigateToSection={handleNavigate} />
              </div>
            </div>
          </div>
        </div>
      </div>
```

- [ ] **Step 5: Make station-click scroll reduced-motion aware**

At the top of `handleNavigate`, change the smooth scroll to respect reduced motion. Replace the two `scrollIntoView`/`scrollTo` calls' `behavior: "smooth"` with a computed behavior:

```jsx
  const handleNavigate = useCallback((section) => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = prefersReduced ? "auto" : "smooth";
    if (section === "map") { window.scrollTo({ top: 0, behavior }); return; }
    const anchor = SECTION_TO_ANCHOR[section];
    if (!anchor) return;
    const el = document.getElementById(anchor);
    if (el) el.scrollIntoView({ behavior, block: "start" });
  }, []);
```

- [ ] **Step 6: Build check** — `cd frontend && npm run build` → exits 0 (confirms the image import + JSX are valid).

- [ ] **Step 7: Visual check** — on the dev server: confirm the hero shows the name lockup + roundel top-left, the charcoal departures board below it (floating with equal top/bottom gap), the real WMATA map on the right filling the height with its top level with the name, the background photo visible behind a soft scrim, and that clicking a board row scrolls to the right section. Toggle dark mode; confirm the scrim darkens and text stays readable. Resize below 760px; confirm single-column stacking.

- [ ] **Step 8: Suggested commit**

```bash
git add frontend/src/pages/HomePage.jsx frontend/src/styles.css
git commit -m "feat(hero): recompose hero as departures board + map over scrimmed background"
```

---

## Task 10: Font A/B test (Hanken Grotesk vs Source Sans 3)

**Files:**
- Modify: `frontend/index.html` (font `<link>`)
- Modify: `frontend/src/styles.css` (body `font-family`)

- [ ] **Step 1: Add the Hanken Grotesk link**

In `frontend/index.html`, alongside the existing Google Fonts link, add Hanken Grotesk weights 400/600 (keep Source Sans 3 link in place during the test):

```html
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Switch the body font behind a comment toggle**

Find the body/`:root` `font-family` declaration in `styles.css`. Add Hanken as the primary, keeping Source Sans 3 as fallback:

```css
  /* A/B: lead with Hanken Grotesk; revert by removing 'Hanken Grotesk', */
  font-family: 'Hanken Grotesk', 'Source Sans 3', system-ui, sans-serif;
```

- [ ] **Step 3: Visual compare** — on the dev server, view About/Projects body text with Hanken; then temporarily remove `'Hanken Grotesk',` to compare Source Sans 3. **Decide which to keep.** If keeping Source Sans 3, revert Steps 1–2.

- [ ] **Step 4: Finalize** — once decided, remove the loser's `<link>` (if dropping Hanken) and the A/B comment, leaving one clean font stack.

- [ ] **Step 5: Build check** — `cd frontend && npm run build` → exits 0.

- [ ] **Step 6: Suggested commit**

```bash
git add frontend/index.html frontend/src/styles.css
git commit -m "feat(type): choose body font (Hanken Grotesk A/B result)"
```

---

## Task 11: Soften the "RSTA" voice

**Files:**
- Modify: `frontend/src/components/sections/ContactSection.jsx:82` (footer text)
- Modify: `frontend/src/components/sections/AboutSection.jsx` (Service Alert copy ~line 169, 207)
- Modify: `frontend/src/components/sections/MiscellaneousSection.jsx:50` (Status Board blurb)

- [ ] **Step 1: Contact footer** — change `ROHIT SATTULURI TRANSIT AUTHORITY` to a softer signature:

```jsx
          ROHIT SATTULURI · DEPARTURES
```

- [ ] **Step 2: About Service Alert** — rename the agency line and the closing line. Change `WMATA SERVICE ALERT` (line ~169) to `SERVICE NOTICE`, and the closing `— Rohit Sattuluri Transit Authority` (line ~207) to `— Service Information`.

- [ ] **Step 3: Misc Status Board blurb** — change `All RSTA lines. Live service status on a split-flap departure board.` to `Live service status on a split-flap departure board.`

- [ ] **Step 4: Build check** — `cd frontend && npm run build` → exits 0.

- [ ] **Step 5: Visual check** — confirm the Ghost Station easter egg still works (double-click About area for Service Notice; the ghost-station trigger still toggles) and copy reads as generic signage.

- [ ] **Step 6: Suggested commit**

```bash
git add frontend/src/components/sections/ContactSection.jsx frontend/src/components/sections/AboutSection.jsx frontend/src/components/sections/MiscellaneousSection.jsx
git commit -m "refactor(copy): soften fictional-agency voice toward real signage"
```

---

## Task 12: Final verification pass

- [ ] **Step 1: Full build** — `cd frontend && npm run build` → exits 0, no warnings about missing imports.
- [ ] **Step 2: Preview the production build** — `cd frontend && npm run preview`, open the served `/Portfolio_website/` URL, verify the hero renders identically to dev.
- [ ] **Step 3: Light/dark + responsive sweep** — toggle theme; resize from wide → mobile; confirm hero, board, map, and scrim all behave.
- [ ] **Step 4: Reduced-motion** — enable OS reduce-motion; confirm split-flap renders final text instantly and station clicks jump (no smooth scroll).
- [ ] **Step 5: Keyboard** — Tab through the board rows; confirm the amber station-highlight focus ring appears.
- [ ] **Step 6: Suggested final commit** (if any stragglers)

```bash
git add -A
git commit -m "chore(hero): final verification adjustments"
```

---

## Self-review notes (author)
- **Spec coverage:** Tokens (§2.1) → T1; utilities (§4) → T2; StationNode/Roundel/SplitFlap/DepartureBoard (§4) → T4–T7; hero (§3) → T9; background (§6, subtle scrim) → T8/T9; font A/B (§2.2) → T10; soften RSTA (§5) → T11; reduced-motion/focus (§8) → T6/T9/T12. **Deferred to later plans (noted in spec §9):** `LineSpine`, `ScrollProgressTrain`, `MetroCard`, `EnamelSign`, `WayfindingArrow`, full per-section re-skin, Status Board page, duotone — these are Phases 3–5.
- **Placeholders:** none — every code step contains real code; verification adapted to build + visual per `CLAUDE.md` (no test runner).
- **Type consistency:** `handleNavigate(section)` matches existing `SECTION_TO_ANCHOR` keys (`about/projects/timeline/miscellaneous/contact`); `DepartureBoard` `rows` prop shape matches T9 usage; `Roundel` props (`color`, `monogram`, `label`) consistent T5↔T9; `SplitFlapText.flipSequence` returns target as last element (used by T6 assertion).
