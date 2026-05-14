# Metro-Themed Portfolio Rehaul

## Context

The portfolio is currently a clean, definition/dictionary-styled multi-page React app (HashRouter, 8 routes, plain CSS with light/dark themes). The goal is to rehaul the visual identity around a "DC Metro Map" theme — an interactive subway-map hero that doubles as navigation, with vertical scroll "destinations" below it.

This document is the implementation plan, reconciling the original V4 vision with the existing codebase and the decisions made during planning:

- **Routing:** Hybrid — single-page scroll on `/`, but the legacy routes (`/about`, `/projects`, `/timeline`, `/contact`) continue to resolve and auto-scroll to the matching section. Photos and Time keep their own routes (they have detail/sub-views).
- **Dark mode:** Kept. A "Night Metro" variant of the palette is designed alongside the light one.
- **Timeline:** Split out of `AboutPage` into its own section/destination with its own line color (green).
- **Mobile:** Below ~640px the SVG map is replaced by a vertical "line schedule" list — same content, tappable, accessible.

The deliverable is a self-contained rebuild that ports all existing content (bio, 6 projects, 5 timeline entries, contact links, photo albums system, world clocks) into the new visual language without dropping any current feature.

---

## Aesthetic & Visual Language

**High-fidelity recreation of the real DC Metro map** (reference: `Washington-DC-Metro-Map.jpg`). Geometry, station positions, line routing, and waterways trace the actual network — not a stylized abstraction. The portfolio rides on top: only the 6 portfolio sections carry visible labels; other stations render as unlabeled dots so the network reads as DC without text clutter.

- **Background Geography (traced from reference)**
  - **Potomac River**: blue `#A6D2FF` ribbon arcing NW→SE through downtown, widening south of L'Enfant
  - **Anacostia River**: secondary blue ribbon branching east near Navy Yard
  - **Parks/Greens**: light green `#C1D8AC` polygons for Arlington National Cemetery (SW), Potomac Park / National Mall greens, and Rock Creek Park (N)
  - **Landmass**: clean white `#FFFFFF`
- **Metro Lines** (Cubic Bézier paths, traced from the real network)
  - Red `#BF0D3E` (Shady Grove → Glenmont, the upper loop through Dupont/Union Station)
  - Orange `#E3801C` (Vienna → New Carrollton, horizontal mid)
  - Blue `#0072CE` (Franconia → Largo, diagonal through Pentagon → Foggy Bottom → downtown → Stadium-Armory)
  - Silver `#A1A1A4` (Wiehle → Largo, parallels Orange/Blue through center)
  - Yellow `#FFD200` (Huntington → Greenbelt, crosses the Potomac at the 14th St bridge)
  - Green `#00B140` (Branch Ave → Greenbelt, runs N–S east of the river)
- **Station Hierarchy**
  - **Portfolio stations (labeled)**: large double-ring (black outer, white inner, black center) + portfolio-name label
  - **Other DC stations (unlabeled)**: small filled black dot, no text — present for fidelity, ignored by nav
  - Real DC station names omitted by user direction
- **Typography:** Source Sans Pro — Headers 36px, Subheaders/Body 18px, Card titles 24px Bold. Confirmed from the user's Penpot Projects mockup. Replaces Georgia entirely.

### Tracing workflow (one-time, build-time only)

To match the reference faithfully without hand-guessing coords:
1. Open `Washington-DC-Metro-Map.jpg` in Inkscape (or Figma).
2. Trace each line as an SVG path; trace the two rivers and the green polygons.
3. Drop circle markers at the locations of all real stations (this is the master station set).
4. Export the SVG and copy line `d=` attributes into a `lines.js` constant, station `cx/cy` pairs into `stations.js`. The 6 portfolio stations get an extra `section: "about" | ...` field; the rest carry `section: null` and render as dots.

This keeps the geometry editable as a single SVG asset and removes any "make up bezier curves until it looks right" step.

---

## Critical Files

**New files**
- `frontend/src/components/MetroMap/MetroMap.jsx` — the SVG hero map (desktop)
- `frontend/src/components/MetroMap/MetroMapMobile.jsx` — vertical line schedule (mobile)
- `frontend/src/components/MetroMap/stations.js` — single source of truth for station coords, lines, section IDs
- `frontend/src/components/MetroMap/MiniMap.jsx` — sticky shrunken map for in-section scroll
- `frontend/src/components/sections/LineHeader.jsx` — colored line bar + station node at the top of each section
- `frontend/src/components/sections/DictionaryHeader.jsx` — `Title [phonetic]` + 1-line definition (reusable shared block; currently duplicated inline in every page)
- `frontend/src/components/sections/BackToMap.jsx` — "← Back to map" link used in every section and on sub-pages
- `frontend/src/components/sections/AboutSection.jsx`
- `frontend/src/components/sections/ProjectsSection.jsx`
- `frontend/src/components/sections/TimelineSection.jsx`
- `frontend/src/components/sections/MiscellaneousSection.jsx`
- `frontend/src/components/sections/ContactSection.jsx`
- `frontend/src/data/projects.js` — extract from `ProjectsPage.jsx`
- `frontend/src/data/timeline.js` — experience + leadership extracted from `AboutPage.jsx`
- `frontend/src/data/about.js` — bio, skills, coursework, interests extracted from `AboutPage.jsx`
- `frontend/src/hooks/useActiveSection.js` — IntersectionObserver hook for mini-map sync and URL sync
- `frontend/src/pages/HomePage.jsx` — rewritten as map + assembled sections

**Modified files**
- `frontend/src/App.jsx` — routes for `/about|/projects|/timeline|/contact` all render `<HomePage initialSection="...">`; HomePage uses the prop to auto-scroll on mount. Photos/Time routes untouched.
- `frontend/src/styles.css` — add metro palette CSS vars (both `:root` and `[data-theme="dark"]`), section/line classes. Keep dictionary/timeline/card utility classes already in use.
- `frontend/src/components/Header.jsx` — **drop the 5 nav items**. Header becomes: brand (name + role) on left, theme toggle on right. Map is the primary navigation; scrolling is the secondary mode. On sub-pages (Photos detail, Time), a "← Back to map" link replaces the missing nav.
- `frontend/package.json` — add `framer-motion` (zoom + reveal anims).

**Deleted files**
- `frontend/src/pages/AboutPage.jsx`, `ProjectsPage.jsx`, `ContactPage.jsx`, `Miscellaneous.jsx` — content migrates into sections.
- `frontend/src/components/.Header.jsx.swp` — stray swap file already in git status.

---

## Portfolio Station Assignments

Each portfolio section is pinned to a real DC station position on the traced map. Chosen so the 6 stations spread across the geography (no clustering) and the line color makes thematic sense.

| Section     | Pinned to (real DC station) | Reason                                  | Line color label |
|-------------|-----------------------------|-----------------------------------------|------------------|
| About       | Dupont Circle               | NW, Red line — character/identity spot  | Red `#BF0D3E`    |
| Projects    | Metro Center                | Central 4-line interchange — symbolic   | Orange / Blue / Silver / Red |
| Timeline    | U Street                    | Yellow/Green, NE diagonal — "history"   | Green `#00B140`  |
| Photos      | Smithsonian                 | Orange/Blue/Silver — museum/exhibits    | Orange `#E3801C` |
| Clock       | Union Station               | Red line — the literal "clock" landmark | Red `#BF0D3E`    |
| Contact     | L'Enfant Plaza              | Major 5-line hub — easy to reach        | Yellow `#FFD200` |

All other DC stations render as unlabeled dots for visual fidelity. Stations + lines are defined once in `stations.js` / `lines.js`; both `MetroMap` and `MetroMapMobile` consume the same data so they cannot drift.

---

## Implementation Phases

### Phase 1 — Data extraction (no UI change yet, low risk)
Move content out of page components into `src/data/*.js`. Validate by re-rendering existing pages reading from data files. This isolates the visual rebuild from content edits and makes the rest of the work mechanical.

- `data/about.js` → `{ bio (NEW prose block from mockup), skills: { languages: { items, icon }, libraries: { items, icon }, tools: { items, icon } }, coursework }` (Interests folds into bio; Experience/Leadership move to timeline.js)
- `data/timeline.js` → `{ experience: [...], leadership: [...] }` (5 entries currently — Duke Energy, DataMine/J&J, Eaton, FFEE RA, Mt. Lebanon counselor)
- `data/projects.js` → existing 6-project array, untouched shape

### Phase 2 — SVG metro map (desktop)
Build `MetroMap.jsx` as a single SVG with a fixed viewBox sized to the traced reference (target `0 0 1200 800` — adjust after tracing).

1. **Trace the reference** in Inkscape/Figma per the tracing workflow above. Export `lines.js` (one Bézier path per metro line) and `stations.js` (every real DC station with `cx, cy, transferCount`).
2. **Render layers in order** inside the SVG: (a) waterways (Potomac, Anacostia) as filled paths, (b) green polygons (Arlington Cemetery, Mall, Rock Creek), (c) metro lines via a shared `Line` component (`color`, `d`, `strokeWidth: 8`), (d) non-portfolio stations as small black dots, (e) portfolio stations as double-ring + label, (f) area labels ("Potomac River") in faint italic.
3. **Portfolio station treatment**: large double-ring, 4px black outer, white fill, 4px black inner dot. Label rendered as `<text>` adjacent to the ring. Cursor `pointer`. Each is wrapped in `<g role="button" tabIndex={0} aria-label="Go to About section">` with `onClick` + Enter/Space handlers.
4. **Click handler**: call `scrollIntoView({ behavior: "smooth" })` on the target section and push the URL (`history.replaceState`) so deep links stay honest.
5. **Centric zoom**: on click, animate the SVG `viewBox` toward the station's coords over ~600ms (framer-motion `animate` on a controlled viewBox state), then snap back to the full view as the scroll resolves. `prefers-reduced-motion: reduce` skips the zoom and just scrolls.

### Phase 3 — Section shell & content port

#### LineHeader + DictionaryHeader (confirmed from Penpot mockup)

Each section starts with this header row, dimensions and styling lifted directly from the user's Projects mockup:

- **Line bar**: filled rectangle, **24 px tall × ~100 px wide**, color = the section's metro-line color (e.g. Projects = orange `#E3801C`).
- **Station node**: filled black ellipse, **~80 × 75 px**, overlapping the line bar so it sits centered on it (matches the mockup's `ellipse cx=1477.5 cy=148.5 rx=40.5 ry=37.5`). Inner white ring + black center pip for the full double-ring spec, though the rough mockup just shows the black outer.
- **Title**: Source Sans Pro **Bold 36 px**, immediately right of the station node.
- **Pronunciation**: Source Sans Pro **Regular 18 px**, positioned to the right of the title, baseline-aligned with title (mockup pattern: `Projects   [proj-ekts]`).
- **Definition line**: Source Sans Pro **Regular 18 px**, on the next row, indented to start under the title (not under the line bar). Single line, italic-feel without italic.
- **"← Back to map"**: small Source Sans Pro 14 px link, positioned at the top-left below the LineHeader on every section. Click → smooth-scroll to the map at the top of the page. (Hidden on the Map section itself.)

`DictionaryHeader` reuses existing `.page-pronunciation` / `.page-lead` CSS hooks where they already match.

Each section wrapper: `<section id="projects" data-line="orange">…</section>` so the active-section hook and CSS line-tinting work off attributes.

#### Project card (confirmed from Penpot mockup)

- Background `#f9f4e2`, **border-radius 20 px**, dimensions **~279 × 430 px** (responsive grid: `minmax(260px, 1fr)` columns, gap 24 px).
- **Hero image** at the top: ~254 × 144 px, snug to the card edges (4-px gutter). For projects without a hero image yet, render a colored gradient placeholder tinted to the project's "kicker" line color.
- **Title**: Source Sans Pro **Bold 24 px**, below image with 16 px top padding.
- **Description**: Source Sans Pro **Regular 18 px**, 1.4 line-height, 2–3 short paragraphs.
- **Footer icons** (bottom of card): two action icons — **GitHub** (always) + **external/live-demo link** (when present). If only GitHub exists, render one icon. Hover state: slight darken + tooltip.

#### About section (confirmed from Penpot mockup)

Layout, top to bottom:
1. **LineHeader + DictionaryHeader** — Blue line bar `#0072CE` (DC Metro Blue, confirmed), "About" title 36px Bold, "[uh-bout]" 18px Regular, definition line: *"a collection of facts regarding a specific entity"*.
2. **"← Back to map"** link.
3. **Bio paragraph** (NEW content — current AboutPage has no bio block): Source Sans Pro Regular 18px, ~5 lines. Cleaned copy from mockup:
   > Hi, I'm a Computer Science student at Purdue University graduating in Spring 2027, based in Pittsburgh, PA. I'm interested in software development, systems programming, machine learning, and artificial intelligence — with a year of experience as an undergraduate researcher for the Purdue Data Mine and Johnson & Johnson.
4. **Coursework subsection**:
   - Heading: Source Sans Pro Regular **36px** (not Bold — distinct from page title).
   - Body: Source Sans Pro Regular **14px** (deliberately smaller than main body 18px, per mockup).
   - Content: comma-separated course list (already in current `AboutPage.jsx`).
5. **Skills subsection**:
   - Heading: Source Sans Pro Regular 36px.
   - 3 rows in a 3-column-ish layout: `[category label] [logo icon] [comma-separated list]`.
     - **Languages** — Python logo icon — Python, Java, C/C++, SQL, JavaScript/TypeScript, R, HTML/CSS
     - **Libraries** — representative icon (React logo or similar) — React, Flask, Node.js, NumPy, Pandas, Scikit-Learn, PyTorch, LangChain
     - **Tools** — representative icon — Git, AWS, Firebase, LaTeX
   - Body text 18px Regular.
   - Logos: 37–54 px, sourced from Devicon CDN (`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/<tech>/<tech>-original.svg`). Zero local files.

Sections like Experience, Leadership, and Interests that currently live in AboutPage move out of About: Experience + Leadership → TimelineSection, Interests → end of AboutSection as a small italic-feel line (or drop, since the bio paragraph covers the same ground).

#### Port content
- **AboutSection** → Bio + Coursework + Skills (Experience/Leadership → Timeline; Interests merge into Bio).
- **ProjectsSection** → 3-column responsive grid of the beige cards above; data unchanged.
- **TimelineSection** → Experience + Leadership combined under one vertical track. Reuses existing `.timeline-item` markup, restyled to Source Sans Pro.
- **MiscellaneousSection** → Two cards: "Photos" link → `/miscellaneous/photos`, "Clock" card embedding the existing world-clock component inline (no need for users to leave the page for the clocks).
- **ContactSection** → 4 contact links + resume PDF (unchanged data).

#### Sub-pages (Photos detail, Time)
Sub-routes (`/miscellaneous/photos`, `/miscellaneous/photos/:slug`, `/miscellaneous/time`) get the **same LineHeader + DictionaryHeader + "← back to map" pattern** at the top of the page, then their existing content below. This unifies the visual language across the whole site.

### Phase 4 — Sticky mini-map + scroll sync
Implement `useActiveSection` using `IntersectionObserver` with a `rootMargin` like `-40% 0px -55% 0px` so the section centered in the viewport wins. The active section ID drives:
- `MiniMap` highlight (a small fixed-position SVG version, top-right, ~120×80px)
- `history.replaceState` so the URL stays in sync with the scroll position

### Phase 5 — Hybrid routing
Update `App.jsx`:

```
<Route element={<Layout />}>
  <Route index element={<HomePage />} />
  <Route path="/about" element={<HomePage initialSection="about" />} />
  <Route path="/projects" element={<HomePage initialSection="projects" />} />
  <Route path="/timeline" element={<HomePage initialSection="timeline" />} />
  <Route path="/contact" element={<HomePage initialSection="contact" />} />
  <Route path="/miscellaneous"> ... existing photos/time routes unchanged ... </Route>
</Route>
```

`HomePage` reads `initialSection` in a `useEffect` and `scrollIntoView` on mount. Deep links keep working; scroll position drives the URL while the user scrolls.

### Phase 6 — Mobile fallback
Below `640px` (CSS media query gates which is mounted), render `MetroMapMobile` instead: vertical line, station dots stacked, label text to the right. Same click behavior, no zoom. Sticky mini-map is hidden on mobile to save space — the section's own `LineHeader` is enough orientation.

### Phase 7 — Theming pass
Two palettes in `styles.css`:

- `:root` (light): per spec — `#FFFFFF` landmass, `#A6D2FF` water, `#C1D8AC` parks, line colors as above.
- `[data-theme="dark"]`: dark-slate landmass (`#1a1d24`), muted water (`#2a4d6e`), muted parks (`#2d4a32`), line colors desaturated ~15% for contrast. Station rings invert (white outer, dark inner).

Existing theme toggle in `Layout.jsx` stays as-is.

### Phase 8 — Polish & verification
- Scroll-reveal: framer-motion `whileInView` fade+slide on each section's `DictionaryHeader` and card grids.
- Keyboard nav: stations are `<g role="button" tabIndex={0}>` and respond to Enter/Space.
- `prefers-reduced-motion: reduce` disables zoom + scroll-reveal.
- Smoke-test all routes, mobile breakpoint, theme toggle, photo album drilldown, world-clock embedding.

---

## Reuse from existing codebase

- `.page-pronunciation`, `.page-lead`, `.eyebrow`, `.definition-list`, `.timeline-item`, `.project-card`, `.section-card` — all keep working; the metro rebuild wraps them rather than replacing them.
- `Layout.jsx` theme toggle, `Header.jsx` brand block, `Footer.jsx`, `Clock.jsx`, `photoAlbums.js` glob loader — all reused unchanged.
- HashRouter, react-clock — no version changes needed.

---

## Stack & Tools

**Already in the project (no version changes):**
- React 18, Vite, react-router-dom (HashRouter), react-clock

**New runtime dependency:**
- `framer-motion` (~50 KB gz) — viewBox zoom on station click, scroll-reveal on sections

**New fonts (CDN, no install):**
- Source Sans Pro via `<link>` in `frontend/index.html` (matches the DC Metro map's typeface family)

**Build-time only (your machine, not a project dep):**
- **Inkscape** (free) or **Figma** — open `Washington-DC-Metro-Map.jpg`, trace the lines, rivers, and station positions, export SVG. Coords get copied into `lines.js` / `stations.js`. One-time activity at the start of Phase 2.

**Explicitly NOT needed:**
- `react-scroll` — `scrollIntoView` + IntersectionObserver covers everything
- `react-svg-pan-zoom` — framer-motion on the SVG viewBox handles the zoom
- Canvas / WebGL / Mapbox — SVG handles this scale of map fine and stays accessible
- Any backend changes — the existing `backend/` folder is untouched

## When to generate CLAUDE.md

**Defer to after Phase 4–5.** `CLAUDE.md` documents the current shape of the codebase as durable context for future Claude sessions. Generating it now would freeze the *pre-rehaul* structure (multi-page routes, no metro components) and then go stale within a day. Run `/init` once the metro components, hybrid routing, and section structure are in place — it'll capture the real architecture and conventions.

---

## Spec gaps surfaced and resolved

1. **Accessibility:** Original spec was silent. Plan adds `aria-label` per station, keyboard handlers, reduced-motion fallback.
2. **Mobile:** Original spec was silent. Plan adds the vertical "line schedule" fallback.
3. **Centric zoom end state:** Original said "zoom into the station" without resolution. Plan: zoom in ~600ms, scroll happens during/after, then viewBox snaps back to full view so the user can navigate again.
4. **Sticky mini-map vs. progress bar:** Original offered both. Plan picks mini-map (more on-theme, also acts as a permanent nav).
5. **Section-color binding:** Original assigned lines to stations but didn't specify whether the section LineHeader uses that color. Plan: yes — LineHeader bar + dictionary-header underline both tint to the section's line color.
6. **Dark mode:** Not addressed in original. Plan: full dark variant designed.
7. **Timeline scope:** Original implied Timeline is its own section but didn't say where Leadership lives. Plan: Experience + Leadership both under Timeline; About loses its experience block.
8. **HomePage hero copy:** The current "What I do / Learning / Explore" 3-panel intro has no home in the original spec. Plan recommendation: drop these (the map *is* the new hero), or fold the three lines into the About section as a "TL;DR" eyebrow row. Decide during Phase 3.

---

## Verification plan

After implementation:
1. `npm run dev` — confirm map renders, all 6 stations clickable, smooth-scrolls to right section, zoom feels right.
2. Test all 4 legacy URLs (`/about`, `/projects`, `/timeline`, `/contact`) — each should land on the right scroll position.
3. Test `/miscellaneous/photos`, `/miscellaneous/photos/:slug`, `/miscellaneous/time` still work standalone.
4. Resize to <640px — confirm mobile fallback kicks in, all stations still clickable.
5. Toggle dark mode — confirm both map and sections re-theme cleanly.
6. Tab through map with keyboard — confirm focus ring is visible, Enter activates.
7. macOS Reduce Motion on — confirm zoom skips but content still navigates.
8. `npm run build` — confirm no errors and bundle size delta is reasonable (framer-motion adds ~50KB gz).
