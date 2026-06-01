# Subway-Art Redesign Spec

**Status:** Approved; decisions resolved 2026-05-31 (see §11). Implementation underway via the plans below.
**Branch context:** `metro-ui-improvement`
**Supersedes nothing** — extends `METRO_SPEC.md` (the original rehaul) and `CUSTOM_MAP_PLAN.md`.

**Implementation plans (the step-by-step "how" for this spec):**
- Phase 1–2 (Foundation + Hero & signage → complete "B" site): [`docs/superpowers/plans/2026-05-31-subway-redesign-phase1-2.md`](superpowers/plans/2026-05-31-subway-redesign-phase1-2.md)
- Phase 3–5 (background polish, full per-section re-skin, "C" flourishes): *to be written as follow-on plans.*

> This document is the **design** (what & why). The plans above are the **execution checklists** (how). Read this first, build from those.

---

## 1. Goal & philosophy

Make the portfolio feel unmistakably like a **real public-transit system** — fun, youthful, and rich with authentic metro/subway art — without losing the clean, fast, accessible site that exists today.

Three guiding principles, agreed during brainstorming:

1. **Real-world over fictional.** Lean into design language that exists in actual metro systems worldwide — roundels, enamel signs, station pylons, departure boards, platform stripes, tactile paving, subway tile, MetroCards, wayfinding pictograms. Pull *back* on the invented-agency gags (the "Rohit Sattuluri Transit Authority / RSTA" framing): keep one or two as easter eggs, but the dominant voice should read like real signage, not a fictional bureaucracy.
2. **Fun & youthful.** Bold flat color, mid-century travel-poster energy, a little motion and delight (split-flap, countdowns, a train that rides the line).
3. **Design once, build in phases.** The end-state is the "Full Transit System" (direction **C**). It is a *superset* of the "Station Redesign" (direction **B**); both share the same line-spine geometry and palette, so building B first and layering C later involves **no rework**. B is a real, shippable stopping point.

### What is NOT changing
- The **five sections stay the same** — About, Projects, Timeline, Miscellaneous, Contact — re-skinned, not restructured. *(Confirm during review.)*
- The site keeps **HashRouter** and the **`/Portfolio_website/`** base path (GitHub Pages constraints — see `CLAUDE.md`). All new image URLs go through Vite imports, never hardcoded root-relative paths.
- Content stays in `src/data/*`. These are presentation changes.
- The hero keeps the **real WMATA map** (per durable preference — see `.claude/memory/feedback_metro_fidelity.md`). We never replace it with a hand-drawn SVG.
- **Don't auto-commit** (durable preference — `feedback_commits.md`). The user commits.

---

## 2. Design language

### 2.1 Color palette
Keep the existing DC-Metro line colors (already CSS custom properties in `styles.css`). These are the section identity colors:

| Token | Hex | Section |
|---|---|---|
| `--metro-line-red` | `#BF0D3E` | About |
| `--metro-line-blue` | `#0072CE` | Projects |
| `--metro-line-green` | `#00B140` | Timeline |
| `--metro-line-orange` | `#E3801C` | Miscellaneous |
| `--metro-line-yellow` | `#FFD200` | Contact |
| `--metro-line-silver` | `#A1A1A4` | neutral / accents |
| `--metro-line-purple` | `#6950A1` | accent (section header nodes) |

**New tokens to add:**
| Token | Light | Dark | Use |
|---|---|---|---|
| `--board-bg` | `#23232a` (charcoal) | `#23232a` (charcoal) | departure-board panel |
| `--board-ink` | `#f4f2ee` | `#f4f2ee` | board destination text |
| `--board-accent` | `#FFC850` (amber) | `#FFC850` (amber) | board status/clock text |
| `--board-rule` | `#34343d` | `#34343d` | board divider lines |

> *Ivory alternative (kept for a future flip): `--board-bg #efe9d8`, `--board-ink #23201a`, `--board-accent #9a5b1c`, `--board-rule #d8cfb6`.*
| `--led-amber` | `#FFB000` | `#FFB000` | LED dot-matrix text |
| `--led-green` | `#39FF80` | `#39FF80` | "now boarding" status |
| `--scrim` | `0.56→0.74` gradient | raise to `~0.80→0.90` | background-image readability |
| `--line-weight` | `6px` | — | one global metro line thickness |

> **Board theming decision (locked):** the board is **warm charcoal in both light and dark mode** — authentic (real boards are dark) and consistent across themes. The ivory split-flap finish is preserved behind the `--board-*` tokens (values noted above) as a one-line future flip.

### 2.2 Typography
Current stack: **Source Sans 3** (body) + **Barlow Condensed** (`--font-transit`, display). Barlow Condensed already reads as destination-blind / platform-board type — **keep it** for all signage, station names, board text, section titles.

**Decision: A/B test on the dev server (Phase 1).** Load both **Hanken Grotesk** (a neo-grotesque engineered for environmental signage, closer to the Johnston/Frutiger wayfinding lineage) and the current **Source Sans 3**, compare them live at `localhost` under the real layout, and pick. Hanken pairs cleanly with Barlow Condensed (shared grotesque skeleton, condensed-display vs regular-body contrast); Source Sans 3 is the no-change fallback.

- Cap total to **3–4 weights** across both families; keep `display=swap` and the existing Google Fonts preconnect.
- **Diamond-tittle micro-motif:** Johnston's signature is a diamond dot over the i/j. Use a small rotated-square "diamond" as the bullet/list marker and the dot in the roundel monogram — cheap, distinctive recurring detail.

### 2.3 Core motif catalog (real-world → web)
The vocabulary we draw from (full research catalog archived below in §12). Ranked by iconic-ness × ease:

| Motif | Real source | Web use in this site |
|---|---|---|
| **Line diagram (45°/90° only, equal node spacing)** | Beck (London), Vignelli (NYC) | The **line-spine** threading the page; all connectors use 0/45/90° segments, one line weight |
| **Roundel** (ring + name bar) | London Underground | Section header badge + name-lockup monogram in hero |
| **Station nodes** (tick / ringed interchange / lozenge terminus) | All diagrams | Scroll-progress + section markers; distinguish normal vs interchange |
| **Split-flap (Solari) board** | Solari di Udine; airports/rail | Hero departures board; Status Board sub-page; headline reveals |
| **Dot-matrix / LED PIDS** (amber on black) | UK rail, NYC countdown clocks, WMATA PIDS | "Next stop" status strip; scroll-driven section indicator |
| **Enamel station sign** (glossy color field + keyline) | Worldwide | Section sub-headers, callouts (already partly present) |
| **Subway tile** (beveled white brick) | NYC/London stations | Card / panel backgrounds, sparingly |
| **Platform-edge stripe** (yellow caution) | Worldwide safety lines | Section boundary accent; focus/hover affordance |
| **Tactile paving** (blister dot grid) | Platform edges | Faint background texture at section edges/footers |
| **MetroCard / Oyster** (goldenrod cut-corner card) | NYC / London fare media | Contact card / "business card" component |
| **AIGA/DOT pictograms** (public domain) | US DOT wayfinding | Utility icons (info, accessibility, contact) |
| **Wayfinding arrow / "Way Out"** | London/NYC signage | Back-to-map / leave-section affordance |
| **Mid-century travel poster** (bold flat geometric) | McKnight Kauffer, Cassandre, Warsaw Metro | Section intro dividers; project "destination" cards |
| **"Mind the Gap"** | London | 404 / empty-state copy |

---

### 2.4 Additional motif ideas (backlog, added 2026-05-31)

More real-world transit elements to draw from, beyond §2.3. Implement opportunistically during Phase 5.

| Element | Real source | Web use |
|---|---|---|
| **Seat moquette** | LU/NYC/Tokyo woven seat fabric | distinctive geometric pattern for section/card backgrounds (CSS gradients/SVG); the most "transit" texture we lack |
| **Destination rollsign / headsign** | front-of-train destination blind | animate section titles / hero name as a rolling or dot-matrix headsign |
| **"Calling at…" announcements** | onboard stopping-pattern voice | section intros as train announcements ("This is a Green Line service calling at: …") |
| **Vintage platform poster frames** | LU travel posters (Pick era) | render each Project as a framed Underground travel poster |
| **Help Point** | station "Press for assistance" SOS | Contact CTA styled as a help point |
| **"Good Service" status legend** | TfL line-status board | compact system-status key (complements `StatusFlap`) |
| **Fare zones (rings)** | London Zones 1–9 | group skills/experience into concentric zones |
| **Safety-slogan micro-copy** | "Stand on the right", "See it. Say it. Sorted.", "Mind the closing doors" | tasteful easter-egg copy |
| **Tap-in / Oyster reader** | yellow contactless reader + beep | "tap to enter" intro affordance |
| **Map legend / key** | map legend box | small key mapping each line → section |

**Decisions (2026-05-31):** implement all of the above **except #3 "Calling at…" announcements** (declined). Also a placement fix: in the **Contact** section, render the **MetroCard *after* the contact departure board** — primary info (email/links) first, decorative fare card after.

### 2.5 Round-2 idea backlog (from research agent, 2026-05-31)
Top picks, ranked distinctiveness ÷ effort (full set in chat research):
1. **NYC mosaic name-tablet** section headers (glazed faience tiled border) — the most iconic unused NYC artifact.
2. **Japanese station numbering** badges (e.g. About = R-01, Projects = B-02) in colored rings.
3. **London dot-matrix "Next Train" queue** indicator (amber DMI list, distinct from the split-flap).
4. **Carnet "ticket stub"** component (perforated edge + magnetic stripe) for résumé/download CTA.
5. **NYC "Bing-Bong" door chime + "stand clear of the closing doors"** caption on navigation (optional sound toggle).
6. **Naples Toledo earth→sea** background gradient that deepens to ocean-blue as you scroll ("descending into the metro").
7. **Escalator scroll-progress rail** with a depth readout ("−42 m") + "stand on the right" micro-copy.
8. **Suica/Octopus tap-gate** with balance + mascot (richer than a generic Oyster reader).
9. **Leslie Green tile bands** with wayfinding labels baked into the tile pattern.
10. **Berlin "Zurückbleiben, bitte!"** caution toast paired with the existing caution stripes.

### 2.6 Round-2 research (2026-05-31) — viewed all curated art + web research

**From the curated art:** the collection leans **bold flat-color modernism, line-as-form abstraction, ticket/sign object studies, vintage rail posters.** Strongest cues: Nike "transit data-plate" sticker sheet → rolling-stock data-plate cards; Vignelli posters (`-6`, `Massimo Vignelli`) → single fat line that bends through every section as nav+art; Big City Metro tickets (`-7`) → boarding-pass "journey" spine; Warsaw METRO posters → constructivist diagonal swoop dividers; `TOMBOLARE` (BR night loco) → dark-mode twin-headlight hero; Helvetica poster → "typography line" skills; SNCB TEE → speed-line transition.

**Top 12 for Round 2 (impact ÷ effort):**
1. HK MTR cross-platform **slash interchange glyph** on shared nodes (low)
2. **Constructivist diagonal swoop dividers** (Warsaw posters; pure clip-path) (low)
3. **Tokyo letter-in-ring section codes** (About=R-01…) used in anchors/breadcrumb (low)
4. **"Excavation in progress" empty-state** (Rådhuset) for unbuilt areas (low)
5. **Roll-sign scrolling section title** (mechanical fabric blind) (med)
6. **Boarding-pass / journey ticket spine** (origin→arrow→destination, foil active bullet) (med)
7. **Hidden "Life Underground" mascots** (Otterness) as Easter eggs (med)
8. **Naples "Crater de Luz" light-well** that brightens as you scroll deeper (med)
9. **Azulejo tile divider band** (Lisbon-in-Paris) (low-med)
10. **Venetian-mast illuminated masthead** holding the roundel (low)
11. **Masstransiscope scroll-zoetrope** — animation only while "the train moves" (high; signature)
12. **Guimard Art-Nouveau frame** for the Photos route (med)

**Bold whole-site concepts:** (a) "the train only moves when you scroll" — zoetrope strip + roll-sign + headlight sweep unified; (b) two-system **interchange toggle** (Modernist Line ↔ Heritage Line skins); (c) **single continuous Vignelli line** as the entire nav/scroll/art; (d) **boarding-pass spine** validating at Contact; (e) constructivist swoop dividers + rolling-stock data-plate cards.

## 3. The hero (LOCKED)

A single hero band, replacing/wrapping the current map hero. Reference mockup: `.superpowers/brainstorm/.../hero-blend-v9.html`.

**Composition (desktop ≥ 760px):**
- Full-width rounded band with a **background image**: a close-up subway-map photo, covered, behind a **soft light scrim** (`--scrim`) so it reads but never fights text. (No poster corner-triangles — removed per feedback.)
- **Two-column grid, `4fr / 6fr`:**
  - **Left column:** roundel **name lockup** at top (ring monogram "R" + "ROHIT SATTULURI" + role line). Below it the **departures board**. The board *floats*: the vertical gap created above it by the name block is mirrored as an **equal gap below it** (~76px each). Board does **not** stretch to the bottom.
  - **Right column:** the **System Map** card runs the **full height** — its **top edge is level with the name**, bottom aligns to the band bottom (no bottom gap). Map is framed roughly **square** to match the real WMATA map. Holds the **actual WMATA map** (`MetroMap` / `MetroMapMobile`), still click-to-navigate.
- **Departures board contents:** caption row ("DEPARTURES" + a clock), then one row per section: line-color **bullet** · destination name (Barlow Condensed caps) · a one-line definition · a **status** (`NOW BOARDING` for About in green, then `2 MIN`, `4 MIN`, `6 MIN`, `8 MIN` in amber). Clicking a row scrolls to that section (same targets as the map).
- **Board finish:** warm charcoal in both themes per §2.1.

**Mobile (< 760px):** single column — name lockup, then board, then map (board's floating gap collapses to a normal margin).

**Motion (Phase 4 / reduced-motion aware):** board characters **flip** into place on load (split-flap), countdowns may tick. Under `prefers-reduced-motion: reduce`, render final text instantly, no flipping.

---

## 4. Global components

Each is a small, isolated, reusable unit (new files under `src/components/transit/` unless noted). All consume CSS tokens from §2.

1. **`LineSpine`** — the continuous metro route threading the whole page. Inline SVG path(s) with `stroke-linecap/linejoin: round`, **only 0/45/90° segments**, one `--line-weight`. Replaces/augments today's per-divider `station-divider` bars so the line is *continuous* between sections, switching color at each station. Hooks: section anchor positions. (Shared by B and C.)
2. **`StationNode`** — node component with variants: `tick` (normal), `interchange` (hollow ring), `terminus` (lozenge). Pure CSS via stacked `box-shadow` rings. Used in the spine, timeline, scroll-progress.
3. **`DepartureBoard`** — the split-flap/LED board. Props: rows (color, destination, sub, status), finish (auto from theme), animated flag. Used in hero + Status Board sub-page; the existing Contact "departure-board" markup folds into this.
4. **`SplitFlapText` / `DotMatrixText`** — character-cell flip animation (3D `rotateX`, staggered delay) and a 5×7 LED dot grid renderer. Reduced-motion → static end-state. (Reference impls: `spite/SolariDisplay`, shadcn dot-matrix.)
5. **`Roundel`** — ring + horizontal name bar, tinted per line color. Section header badge + hero monogram.
6. **`EnamelSign`** — glossy color-field sign with inner keyline (formalizes today's `.station-sign`).
7. **`WayfindingArrow`** — `clip-path` chevron sign for "back to map" / directional cues (replaces or augments `BackToMap`).
8. **`MetroCard`** — goldenrod cut-corner fare-card component for Contact.
9. **`ScrollProgressTrain`** *(C)* — fixed train element using `offset-path` along the spine geometry + `offset-rotate: auto`, driven by `animation-timeline: scroll()`. Gated by `@supports` + `prefers-reduced-motion`; JS `--progress` fallback for Safari.

**Backgrounds/textures (CSS-only utilities in `styles.css`):**
- `.tactile` — radial-gradient blister dot grid (`background-size`-tiled, low contrast).
- `.platform-edge` — `repeating-linear-gradient` caution stripe (accent only).
- `.subway-tile` — beveled white-brick gradient (cards, sparingly).

---

## 5. Per-section treatments

All sections keep `SectionHeader` (LineHeader + DictionaryHeader + back-to-map) but it gets a **`Roundel`** badge and connects to the continuous `LineSpine`.

- **About (Red).** Keep the **station-pylon** bio card (good real-world motif). Add: roundel header; bio framed as an **enamel platform name sign**; skills "SYSTEM MAP" legend stays. Soften the **Service Alert** easter egg copy away from heavy "WMATA/RSTA" branding toward generic "Service Notice." Keep the **Ghost Station** easter egg (great real-world concept — abandoned stations are real).
- **Projects (Blue).** Keep `LineManifest` and the **stack strip-map**. Re-skin project cards as **mid-century "destination" travel posters** (bold flat color header per project) with the existing **PLATFORM nn** badge. Real screenshots replace gradient placeholders where available (already partway).
- **Timeline (Green).** Keep the station-entry rail (ring markers, EXP/LD badges, "stops", transfer node) — it's already strongly on-theme. Tie its rail visually into the global `LineSpine`. Mark "present" roles as a pulsing **"you are here"** node.
- **Miscellaneous (Orange).** Keep the **strip-map** of stops (Photos, Status Board, Clock). The **Status Board** stop links to a full `DepartureBoard` sub-page; **Clock** stop → the split-flap/round platform clock page (`Time.jsx`). Trim "all RSTA lines" copy toward real signage wording.
- **Contact (Yellow).** Replace the current ad-hoc departure-board markup with the shared **`DepartureBoard`** + add a **`MetroCard`** (goldenrod, cut corner, contact details "swiped in"). Keep ROUTE/DESTINATION/PLATFORM columns; retire or soften the "ROHIT SATTULURI TRANSIT AUTHORITY" footer (make it a small, tasteful signature rather than the dominant note).

**Sub-pages (kept as separate routes):** Photos (`PhotoAlbumPage`), Time (`Time.jsx`), and a Status Board page — all re-skinned with the shared components.

---

## 6. Background-image system
- Source (**decided**): the NYC-map close-up used in the approved hero mockup — `subway-art/New York | concept | 2012 | waterhouse cifuentes design.jpg`. **Convert to WebP/AVIF, sized to the largest realistic viewport**, store under `src/assets/` and import via Vite (base-path-safe).
- Treatment: image → **scrim overlay** (`--scrim`) → content. Optional **duotone** mapping into two line colors for a more "branded poster" look (CSS `mix-blend-mode`). `backdrop-filter: blur` on panels (board, map card) so the busy photo shows through softly behind text.
- **Dark mode:** raise scrim opacity (or swap to a dark duotone) so text stays AA. The map image itself remains light-only (existing rule).
- **Performance:** eager + small for the hero; everything else lazy. Prefer CSS gradients over extra images. Optimize at build (GH Pages has no image CDN).

---

## 7. Motion & the "C" flourishes (later phases)
- **ScrollProgressTrain** riding the `LineSpine` (the signature C moment). + optional **line-draw** (`stroke-dashoffset`) as you scroll.
- **Interactive "ticket"** — a MetroCard/ticket-stub the visitor can "tap" (e.g., to reveal contact, or as an intro affordance).
- **Branching / merging routes** between sections (second-color paths converging) — pure flourish on the spine.
- All motion: compositor-only properties (`transform`/`opacity`/`offset-distance`), `@supports` + `prefers-reduced-motion` gates, `IntersectionObserver` to pause off-screen boards.

---

## 8. Accessibility & performance
- **Motion:** author static by default; add animation only in `@media (prefers-reduced-motion: no-preference)`. Split-flap/LED/train all show end-state instantly under reduced-motion. Branch the existing station-click smooth-scroll on the reduced-motion media query.
- **Contrast:** always keep a scrim/panel between map imagery and text (4.5:1 body / 3:1 large). Never rely on line color alone — every line is also labeled.
- **Focus:** themed `:focus-visible` ring as a "station highlight" (`box-shadow: 0 0 0 4px #fff, 0 0 0 8px var(--line-color)`), meeting 3:1.
- **Perf:** scroll-driven CSS animations over JS listeners; `will-change` only on the active train; cap board length; reuse one SVG `<symbol>` for connectors via `<use>`.

---

## 9. Phased roadmap

| Phase | Scope | Milestone |
|---|---|---|
| **1 — Foundation** | Tokens (§2.1), optional font swap, `StationNode` + focus ring, `LineSpine` geometry (continuous 45° route). Pure additive. | shared by B & C |
| **2 — Signage system** | `Roundel`, `EnamelSign`, `WayfindingArrow`, `DepartureBoard` + `SplitFlapText`/`DotMatrixText`, new **hero** (§3), poster section intros. | **= complete "B" site** |
| **3 — Background image** | Background system (§6), duotone option, dark-mode scrim. | polish |
| **4 — Per-section re-skin** | Apply components across all 5 sections + sub-pages (§5); tone down RSTA copy; `MetroCard` contact; subway-tile/tactile/platform-stripe accents. | polish |
| **5 — "C" flourishes** | `ScrollProgressTrain`, line-draw, interactive ticket, branching routes, Status Board page. | **= "C" / full system** |

Stop after Phase 2–4 for a finished B; Phase 5 is optional wow.

### Phase-5 backlog (added 2026-05-31, from review)
- **Live departures clock:** the hero Departures board clock (currently static `09:45`) should show the **real current time, updating live** (tick each minute/second), and the countdowns could derive from it.
- **One badge per section, not two:** Projects/Timeline/Miscellaneous currently show **two** markers — the new 1-letter `Roundel` badge (P/T/M) *and* the `LineManifest` 2-letter line code (BL/GR/OR). Keep only the **single 1-letter roundel** for consistency; drop the 2-letter code (or fold it into the roundel).
- (Plus the existing Phase-5 items: continuous `LineSpine`, scroll-driven train, interactive ticket, branching routes, `DotMatrixText` "next stop", subway-tile panels, AIGA pictograms, poster-style section dividers, duotone background.)

---

## 10. File-by-file change map (initial)
- `frontend/index.html` — font `<link>` (add Hanken Grotesk if adopted; keep Barlow Condensed).
- `frontend/src/styles.css` — new tokens (`--board-*`, `--led-*`, `--scrim`, `--line-weight`), `.tactile`/`.platform-edge`/`.subway-tile` utilities, board/roundel/enamel/spine classes, themed focus ring, reduced-motion blocks.
- `frontend/src/components/transit/` *(new dir)* — `DepartureBoard.jsx`, `SplitFlapText.jsx`, `DotMatrixText.jsx`, `Roundel.jsx`, `EnamelSign.jsx`, `StationNode.jsx`, `WayfindingArrow.jsx`, `MetroCard.jsx`, `LineSpine.jsx`, `ScrollProgressTrain.jsx` (Phase 5).
- `frontend/src/pages/HomePage.jsx` — new hero layout wrapper; mount `LineSpine`; reduced-motion-aware scroll; (Phase 5) `ScrollProgressTrain`.
- `frontend/src/components/sections/*` — `SectionHeader`/`LineHeader` gain `Roundel`; `ContactSection` adopts `DepartureBoard` + `MetroCard`; copy edits per §5; `BackToMap` → `WayfindingArrow`.
- `frontend/src/components/StatusFlap.jsx` — refactor onto shared `SplitFlapText`.
- `frontend/src/assets/` — optimized background image(s) (WebP/AVIF) via Vite import.
- New route + page for the **Status Board** (referenced in `MiscellaneousSection`).

> Verify each change with `cd frontend && npm run build` + dev-server visual check (no test suite exists).

---

## 11. Decisions (resolved 2026-05-31)
1. **Sections unchanged** — ✅ yes, re-skin only.
2. **Body font** — A/B test Hanken Grotesk vs Source Sans 3 live on the dev server in Phase 1, then pick.
3. **RSTA voice** — **soften** (keep Ghost Station + a softened Service Notice; trim "transit authority/RSTA lines" wording toward generic real signage).
4. **Background image** — the NYC-map close-up from the approved mockup (`subway-art/New York | concept | 2012 | waterhouse cifuentes design.jpg`); subtle scrim now, duotone optional later.
5. **Board in light mode** — **charcoal now** (dark in both themes; ivory kept behind tokens).
6. **C flourishes** — **all three** (scroll-train + interactive ticket + branching routes).

---

## 12b. Implementation status (verified 2026-05-31)

Verified live in the browser (light + dark) at `localhost`. Legend: ✅ done · ◐ partial · ⬜ not yet (future phase).

**Superpowers plan (Phase 1–2):** ✅ all 12 tasks implemented + reviewed; build green.

**Spec §2.3 motif catalog:**
- ✅ Line color palette / tokens (incl. board/LED/scrim)
- ✅ Roundel — site header logo (R-in-circle) **and** per-section header badges
- ✅ Station nodes — `StationNode` + timeline rings + map station dots
- ✅ Split-flap board — hero Departures board, `StatusFlap` ticker, `FlapBoard` page
- ✅ Enamel station sign — "STATION ABOUT/CONTACT" signs + About station pylon
- ✅ Departure board — hero + Contact section
- ✅ MetroCard — Contact fare card (goldenrod, cut corner)
- ✅ Tactile paving — footer + 404 background
- ✅ Platform-edge caution stripe — 404 (utility available site-wide)
- ✅ Wayfinding arrow — "WAY OUT" back-to-map
- ✅ "Mind the Gap" — 404 page (catch-all route)
- ✅ Strip maps — project tech-stack strip, Misc stops strip
- ◐ Dot-matrix/LED — amber board accents + status strip present; no standalone `DotMatrixText` glyph-grid yet
- ◐ Travel-poster dividers — "Next Stop" station dividers present; not full poster geometry
- ⬜ Subway tile — `.subway-tile` utility built, not yet applied to a panel
- ⬜ AIGA/DOT pictograms — currently Font Awesome / Devicon icons

**Spec components (§4):** ✅ Roundel, StationNode, SplitFlapText, DepartureBoard, MetroCard. ◐ EnamelSign (look implemented via `.station-sign`, not a standalone component). ⬜ LineSpine (continuous 45° route), ScrollProgressTrain, DotMatrixText.

**Spec §6 background image:** ✅ site-wide fixed scrimmed subway-map backdrop (light + dark). ⬜ duotone variant (optional).

**Spec §7 "C" flourishes:** ⬜ scroll-driven train, interactive ticket, branching/merging routes — these are the remaining Phase-5 work (warrant their own plan).

**Spec §8 a11y:** ✅ reduced-motion (split-flap + scroll), themed focus rings, readability scrim/opacity.

**TRANSIT_MESSAGES.md:** ✅ it's a *writing guide*; its messages live in `src/data/transitMessages.js` and are displayed via `StatusFlap` + `FlapBoard` — content is in the app.

**Net:** Phases 1–2 complete; large Phase-4/5 motif pass done.

**Phase-5 completed (2026-05-31):** poster "Next Stop" station panels · seat-moquette texture · hero map legend · live real-time board clock · single 1-letter section badge · Projects as framed travel posters · Help Point CTA · safety-slogan footer · fare-zone skills · destination rollsign marquee · Oyster "tap to ride" reader. ("Good Service legend" already covered by the `/miscellaneous/board` FlapBoard.)

**Still remaining (future):** scroll-driven train on the line, interactive ticket, branching/merging routes, continuous `LineSpine`, `DotMatrixText`, subway-tile panels, AIGA pictograms, duotone bg — plus the §2.5 Round-2 backlog (NYC mosaic tablets, station numbering, ticket-stub, door chime, Naples blue-descent, escalator scroll-rail, etc.).

## 12. Research appendix (sources)

**Real-world transit design vocabulary** — roundel (London Transport Museum), Johnston/Beck, NYCTA Graphics Standards Manual (Standards Manual / Internet Archive), Vignelli 1972 map, NYC subway tiles, Guimard Paris entrances, Solari split-flap (Wikipedia / Tufte), tactile paving & "Mind the Gap" (Wikipedia), MetroCard/Oyster (Wikipedia), AIGA/DOT pictograms (SEGD), TfL totems. Line-color hex tables (London/NYC/Paris/Tokyo/DC) captured in chat research.

**Web execution** — MDN scroll-driven animations (`animation-timeline: scroll()`), CSS-Tricks Stripes + `offset-path` almanac, `spite/SolariDisplay` & `baspete/Split-Flap`, shadcn dot-matrix text, Smashing motion-preferences & CSS-shapes guides, Google Fonts Overpass/Hanken Grotesk, WCAG 2.3.3, Josh Comeau reduced-motion-in-React. Live references: MTA Live Subway Map (Work & Co), MetroDreamin', railmapgen.

*(Full agent reports are in the conversation history; key facts distilled above.)*
