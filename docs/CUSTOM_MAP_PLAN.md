# Custom Metro Map — Future Plan

## Context

Phase 2 used the official WMATA SVG (`frontend/src/assets/wmata-map.svg`) with portfolio markers overlaid on top. That got us a *recognizable* DC Metro map quickly, but two problems remain:

1. **Visual age.** The source SVG was authored in Inkscape around 2010. The line shapes are filled polygons with sharp 90° corners, the station circles are rendered with `stroke-linecap="square"`, and the typography (in the original) is Arial. Even after stripping all the legend/text and applying a Gaussian-blur round-corners filter, the underlying geometry still reads as a 2010-era transit map rather than a clean, modern design.
2. **Marker alignment is approximate.** Portfolio markers are absolutely-positioned on top of an `<img>` element, so they can't snap precisely to station coordinates. Pulling exact station coordinates from the source SVG helps, but rendering quirks (image scaling at different viewport sizes, the SVG's internal layer transforms, sub-pixel rounding) mean markers still drift a pixel or two off the underlying dots.

## Recommendation: yes, build a custom map

A from-scratch SVG, drawn specifically for this site, solves both problems and unlocks several more wins:

- **Modern aesthetic.** Lines drawn as `<path>` strokes with `stroke-linecap="round" stroke-linejoin="round"` give crisp, soft-cornered turns at every bend — no Gaussian blur tricks needed.
- **Curves where it matters.** Use cubic / quadratic Béziers for the line routes instead of rigid v/h/diagonal segments. This is what makes a transit map feel "designed" rather than "engineered."
- **Free station placement.** Portfolio sections (About, Projects, Timeline, Photos, Clock, Contact) are pinned to *positions we choose*, not to real DC stations. Each can sit at a visually balanced spot — no more "which real DC station does this correspond to."
- **Markers as native SVG.** Render station dots and portfolio labels as inline SVG `<circle>` + `<text>` inside the same SVG as the lines. Click/hover/focus handlers attach directly. No more overlay-div alignment drift.
- **Dark mode native.** CSS variables can re-tint every element. The current WMATA SVG has colors baked into path attributes, so dark mode requires inverting the entire image.
- **Smaller payload.** The current SVG is 28 KB after stripping. A custom one, drawing only what we need, lands around 6–10 KB.
- **Animation potential.** Lines can stroke-dash-array animate in on page load; portfolio stations can pulse on hover or fade in as the user scrolls.
- **No third-party trademark/branding concerns.** The WMATA map is technically a registered design.

The downside is creative effort: a bad first cut of a custom map looks worse than the WMATA SVG (we saw this in Phase 2 v1). The mitigation below addresses that.

## Approach

**Use the existing WMATA SVG as a topology reference, but draw a fresh SVG from scratch.** Don't trace it pixel-for-pixel — borrow the *layout intuition* (where the lines fan out, where downtown sits, where the rivers run, where green space is) and re-author each line with clean Béziers.

### Visual spec

- **ViewBox:** `0 0 1200 800` (3:2 aspect, plays well at any container width)
- **Background:** transparent (parent container controls color)
- **Waterway (Potomac):** single light-blue (`#A6D2FF`) cubic-Bézier ribbon arcing NW→SE, stroke-width ~36, stroke-linecap round
- **Optional parks:** light-green (`#C1D8AC`) polygonal blobs — small and subtle, just for visual interest
- **Metro lines:** stroked paths, not filled polygons
  - stroke-width 10
  - stroke-linecap: round
  - stroke-linejoin: round
  - colors: `#BF0D3E` Red, `#E3801C` Orange, `#0072CE` Blue, `#A1A1A4` Silver, `#FFD200` Yellow, `#00B140` Green
- **Regular stations:** `<circle r="5" fill="white" stroke="#111" stroke-width="2">`
- **Portfolio stations (the 6):** double-ring — outer black `r=12`, inner white `r=8`, center black `r=4`. Same visual hierarchy as the real DC transfer stations.
- **Portfolio labels:** Source Sans Pro Bold 18 px, positioned via `<text>` with `text-anchor` set per station. No background pill — the labels sit on white SVG background so they read cleanly.
- **Hover state:** scale the entire `<g>` for a portfolio station to 1.1× on hover; stroke the outer ring with `var(--accent)` on focus.

### Topology (sketched, not literal DC)

```
                  · — — · — — · — · — RED
                 /           \
                / · — YELLOW  \
               /  · — GREEN     · — · — RED →
              /
  · — · — · — *[Projects]* — · — · — *[Clock]*
              |
              · — *[Timeline]*
              |
              · — · — *[Contact]* — · — *[Photos]* — · →
              |
              · — YELLOW (south)
              |
              · — BLUE (south to airport)
```

Final geometry tuned by eye in code — but the principle is: every portfolio station gets visual space, no two are stacked, and downtown still feels like a 4-or-5-line interchange.

### Component shape

```
frontend/src/components/MetroMap/
  MetroMap.jsx          → renders the inline <svg> (replaces the current <img> version)
  stations.js           → portfolio metadata + station coordinates (keeps the same shape we have now)
  lines.js              → array of line objects { color, d, name } — the Bézier path data
  hooks/useMetroAnimation.js  (optional)  → framer-motion path-drawing on first paint
```

Click handler signature stays the same — `onNavigateToSection(section)` — so the surrounding HomePage code does not change.

## Implementation Plan (a future "Phase 2.5")

Estimated effort: **3–4 hours focused** for v1 + iteration time.

1. **Sketch geometry on paper or in Penpot.** Lay out the 6 lines and 6 portfolio stations on a 1200×800 grid. Pick coordinates for every intermediate station too (probably ~30–40 total stations, similar density to a real metro map without going overboard).
2. **Write `lines.js`** as plain data: each line is `{ id, color, points: [{x, y}, ...] }`. A small `pointsToBezier()` helper converts the point list to a smooth path string using Catmull-Rom-to-Bézier conversion. (The same helper I wrote in Phase 2 v1 — that code is in git history.)
3. **Write `stations.js`** with regular stations + portfolio stations distinguished by an `isPortfolio` field.
4. **Write `MetroMap.jsx`** that renders the inline SVG: waterway → lines → regular stations → portfolio stations (in that draw order). All click/keyboard/focus handlers attach to portfolio station `<g>` elements.
5. **Iterate visually.** Take a screenshot, nudge coords in `stations.js` and `lines.js`, repeat. This is where it actually gets designed.
6. **Add the path-drawing animation** with framer-motion (lines stroke-dasharray from 0 to full length on mount, ~1.5s total).
7. **Delete the WMATA SVG.** `frontend/src/assets/wmata-map.svg` is no longer needed.

## When to do this

Not now — current map is good enough to ship Phase 3 (section shells + content) on top of. The custom map can slot in as **Phase 2.5** at any point before Phase 8 (polish), without affecting any other phase. Reasonable triggers:

- After Phase 5 (hybrid routing) — the rest of the site is functional, so a visual upgrade is the highest-leverage next move
- When mobile-fallback is being built (Phase 6) — a custom SVG is easier to make responsive than the static WMATA image
- Or right before launch as a final polish pass

## What stays the same

- `frontend/src/components/MetroMap/stations.js` — portfolio metadata structure
- The `onNavigateToSection(section)` callback contract
- The "← back to map" link affordance defined for sections (Phase 3)
- Marker hover/focus styling (already in CSS)

## What changes / what gets removed

- `frontend/src/assets/wmata-map.svg` → deleted
- `frontend/src/components/MetroMap/MetroMap.jsx` → rewritten with inline SVG
- The CSS round-corners filter trick goes away (no longer needed; native stroke-linejoin handles it)
