# UI/UX Improvement Proposal

A senior-designer review of the metro-themed portfolio in its current mid-rehaul state. Each proposal is self-contained so it can be picked up or skipped independently. Effort = build/QA cost. Priority = expected impact on the visitor's experience.

Status legend: ✅ done · 🔄 partial · ⏳ pending.

---

## Top 5 quick wins

Highest leverage for the smallest effort. Do these first.

1. ✅ **Unify the body font to Source Sans across the entire site.** `body` in `styles.css` still falls back to `Georgia` serif, which fights with the new section copy. (See #23.) — Low effort, High priority.
   - *Implemented:* `body` now uses `"Source Sans 3", "Source Sans Pro", system-ui, ...`. Per-section `font-family` overrides are now redundant but left in place.
2. ✅ **Replace the gradient placeholder hero on project cards with real screenshots.** A portfolio's projects deserve actual visual evidence; the current monochrome gradients are the weakest moment on the page. (See #13.) — Medium effort, High priority.
   - *Implemented:* `projects.js` supports an optional `image` field; cards render the image when set and fall back to the gradient + kicker icon when absent. Three projects (Site Scouter, Music Translator, NYC Subway Tracker) ship screenshots; the other three still use the gradient fallback until assets are produced.
3. ✅ **Soften the global `html { scroll-behavior: smooth }`.** (See #21.) — Low effort, High priority.
   - *Implemented:* Global `html { scroll-behavior: smooth }` removed. Click handlers in `HomePage`, `BackToMap`, and `MetroMap` still use `scrollIntoView({ behavior: "smooth" })`. Added `section[id] { scroll-margin-top: 24px }` so anchors don't get jammed against the viewport top.
4. ✅ **Add a visible `:focus-visible` ring to `.metro-marker`.** (See #25.) — Low effort, High priority.
   - *Implemented:* Focus ring is now `0 0 0 3px #fff, 0 0 0 6px #111, 0 0 0 9px #FFD200` — yellow + black, color-independent, readable over any line color.
5. ✅ **Tighten the "Back to map" link.** (See #6.) — Low effort, Medium priority.
   - *Implemented:* The per-section `BackToMap` link is gone. A single floating "↑ Map" pill (`.back-to-map-fab`) renders globally in `HomePage`. It fades in via `IntersectionObserver` once `#map` leaves the viewport.

---

## Metro map hero

### 1. ✅ Drop the redundant "Portfolio [pawrt-foh-lee-oh]" eyebrow above the map.
- **Where:** `HomePage.jsx`, formerly the `.hero` block.
- **Implemented:** The hero copy block is removed. The map is now the hero. The `#map` anchor moved onto the `<section>` wrapper in `MetroMap.jsx`. (The orphaned `.hero-copy` / `.hero-lead` CSS rules are still in `styles.css` because legacy pages may still use related classes; they no longer apply to the homepage.)
- **Effort:** Low. **Priority:** High.

### 2. ✅ Add a one-line affordance hint under the map on first load.
- **Where:** `MetroMap.jsx`.
- **Implemented:** A `.metro-map-hint` paragraph renders directly under the map frame: "Click any station to jump to that section." The map section uses `aria-labelledby` pointing at the hint for accessibility. A one-time pulse animation is *not* implemented — leaving as a future polish if discoverability still feels weak after this static caption ships.
- **Effort:** Low. **Priority:** High.

### 3. ✅ Make the station label more legible against the map.
- **Where:** `.metro-marker-label` in `styles.css`.
- **Implemented:** Background opacity bumped to 100% (`#ffffff`), added a 1px `rgba(0,0,0,0.12)` border and a `0 1px 2px rgba(0,0,0,0.08)` drop shadow. Title bumped to `1rem / 600`. Padding increased to `3px 10px`, radius to `6px`.
- **Effort:** Low. **Priority:** High.

### 4. ❌ Hover state on a station should preview the section.
- **Where:** `.metro-marker:hover` in styles + (former) `.metro-marker-tooltip` element in `MetroMap.jsx`.
- **Status:** Implemented then reverted at the user's request. Reasoning: station names are self-explanatory, so the hover definitions felt redundant. The `definition` field on each station in `stations.js` is kept in case it's useful later (e.g. for the mobile fallback or an accessible expandable panel), but no UI surfaces it today.
- **Effort:** Medium. **Priority:** Medium.

### 5. ✅ Constrain the map's max width.
- **Where:** `.metro-map` rule in `styles.css`.
- **Implemented:** Dropped the `100vw` + negative-margin viewport-escape entirely. `.metro-map` is now plain `width: 100%`. The map now lives inside the page shell (currently 900px) so its width matches the section content below it. If sections are widened later via `--content-width`, the map will scale with them.
- **Effort:** Low. **Priority:** High.

---

## Section headers (SectionHeader / LineHeader / DictionaryHeader / BackToMap)

### 6. ✅ Reposition "Back to map" so it doesn't muddy the header.
- **Where:** `SectionHeader.jsx`, `BackToMap.jsx`, `.back-to-map-fab` in styles.
- **Implemented:** Went with recommendation (b). `SectionHeader` no longer renders `BackToMap`. A single `<BackToMap>` is mounted globally at the bottom of `HomePage`. It uses `IntersectionObserver` on `#map` and toggles `.back-to-map-fab--visible` when the map leaves the viewport. Visually: dark pill, bottom-right, with an upward-arrow icon and "Map" label. Fades + slides in on appearance.
- **Effort:** Medium. **Priority:** Medium.

### 7. ✅ Use the section's line color as a left-bar accent.
- **Where:** `.section[data-line=...]` rules in styles.
- **Implemented:** Each `<section data-line="…">` now gets `border-left: 3px solid var(--metro-line-<color>); padding-left: 24px;` (16px on mobile). Red/Blue/Green/Orange/Yellow/Silver are all wired. The color cue now persists for the entire section's scroll length, not just at the header.
- **Effort:** Low. **Priority:** High.

### 8. ❌ The LineHeader station node is too heavy.
- **Where:** `.line-header-station` in styles.
- **Status:** Implemented then reverted at the user's request. The simplified white-fill + black-border treatment lost the "bullseye"/concentric-ring character of the original. Restored to 76×76 with the four-layer inset box-shadow stack (`#fff/#111/#fff/#111`) and the bar back to 110×24. Mobile restored to 56×56 with proportional shadow values.
- **Effort:** Low. **Priority:** Medium.

### 9. ✅ The pronunciation is wedged into the title H2 with `flex-wrap`.
- **Where:** `DictionaryHeader.jsx`, `.dictionary-title` / `.dictionary-pron` in styles.
- **Implemented:** Pronunciation is now a separate sibling `<span>` outside the H2 with `aria-hidden="true"` (closes #28 too). The flex/wrap is gone — title sits on its own line, pronunciation stacks beneath at 16px muted. Layout breaks cleanly at any width.
- **Effort:** Low. **Priority:** Low.

---

## About section

### 10. ✅ Add structure to the bio block.
- **Where:** `AboutSection.jsx`, `data/about.js`, `.section-bio-tagline` in styles.
- **Implemented:** Added a `bioTagline` field to `data/about.js` ("CS student · Pittsburgh, PA · Software & ML"). Rendered above the bio prose as a 12px uppercase letterspaced muted eyebrow. The headshot/avatar option is not implemented — left as a future polish if more presence is wanted.
- **Effort:** Low. **Priority:** Medium.

### 11. ✅ The coursework block is buried and unstyled.
- **Where:** `AboutSection.jsx`, `data/about.js`, `.course-tag` / `.course-tags` in styles.
- **Implemented:** `coursework` converted from a single string to an array of 8 course names. Renders as a flex-wrap of rounded `.course-tag` pills (5×12 padding, 999px radius, neutral border). Echoes the skills-chip visual language for consistency. Legacy `AboutPage` now uses `coursework.join(", ")` so it stays readable.
- **Effort:** Low. **Priority:** Medium.

### 12. ✅ Skills row layout: the rigid 3-column grid wastes space and looks formal.
- **Where:** `AboutSection.jsx`, `data/about.js`, `.skill-chips` in styles.
- **Implemented:** Done in an earlier pass. Each language/library/tool is its own logo-bearing chip. Category labels render as small uppercase eyebrows. Pills wrap freely. Devicon supplies icons for everything except LangChain (simple-icons CDN).
- **Effort:** Medium. **Priority:** Medium.

---

## Projects section

### 13. 🔄 Replace the kicker-icon gradient placeholders with real project screenshots.
- **Where:** `ProjectsSection.jsx`, `projects.js`, `.project-card-hero` styles.
- **Implemented:** `projects.js` now supports an optional `image` import per project. `ProjectsSection` renders the image when set and falls back to the gradient + kicker icon otherwise. **3 of 6** projects ship screenshots (Site Scouter, Music Translator, NYC Subway Tracker). The remaining three (Airport Wait Time Predictor, Veritas, "More work" card) still use the gradient fallback — add screenshots to `src/assets/projects/` and wire them up to finish.
- **Effort:** High (asset production). **Priority:** High.

### 14. ✅ The card grid uses fixed `min-height: 430px`.
- **Where:** `.project-card-v2` rule.
- **Implemented:** Removed `min-height: 430px`. Grid default `stretch` keeps cards in the same row at matching height, but per-row heights now adapt to actual content. `.project-card-body { flex: 1 }` already absorbs slack so the footer stays at the bottom.
- **Effort:** Low. **Priority:** Medium.

### 15. ✅ The duplicate icon-links footer is redundant when both point to the same URL.
- **Where:** `ProjectsSection.jsx`, `projects.js`.
- **Implemented:** `projects.js` now splits the single `href` into `repoHref` (GitHub) and optional `liveHref` (live demo). The GitHub icon renders only when `repoHref` is set; the new globe icon (`fa-solid fa-globe`) renders only when `liveHref` is set. Currently the Music Translator app is the one project with a `liveHref` (Cloudfront).
- **Effort:** Low. **Priority:** Medium.

### 16. ✅ Project card kicker / stack labels are too quiet.
- **Where:** `ProjectsSection.jsx`, `data/projects.js`, `.project-card-stack` / `.project-card-stack-tag` in styles.
- **Implemented:** Kicker rendering dropped from `ProjectsSection`, and the unused `kicker: "More work"` field removed from the "Additional projects" card. Stack converted from a 13px italic string into a `<ul>` of rounded pill tags (12px on a translucent black background, dark-mode-aware). Each stack item is split from the comma-joined `stack` string at render time so the data shape stays minimal.
- **Effort:** Low. **Priority:** Medium.

---

## Timeline section

### 17. ✅ Experience+Leadership rail distinction.
- **Where:** `TimelineSection.jsx`, `.timeline-group[data-variant=…]` rules in styles.
- **Implemented:** Subsumed by the larger strip-map redesign (see "Metro-themed timeline" section below). Experience gets the full `--metro-line-green` for rail + markers; Leadership uses `color-mix(green 45%, surface)` for a faded fork.
- **Effort:** Low. **Priority:** Medium.

### 18. ✅ Timeline entry date range buried in meta.
- **Where:** `TimelineSection.jsx`, `.timeline-entry-date` / `.timeline-entry-location` in styles.
- **Implemented:** Subsumed by the strip-map redesign. The date range is now a green pill ("station code") above the title; the location stays separate on its own italic muted line below.
- **Effort:** Low. **Priority:** Medium.

---

## Miscellaneous & Contact

### 19. ✅ Misc cards feel generic.
- **Where:** `.misc-card` / `.misc-card-link` rules in styles.
- **Implemented:** `.misc-card` now uses an 8% orange tint over `--surface` for the background and a 25% orange border, so the cards feel like Orange-line destinations without losing readability. `.misc-card-link` accent color switched from `--accent` to `--metro-line-orange` (hover darkens via `color-mix`). Did not add an inline LineHeader inside each card — the orange tint alone is enough.
- **Effort:** Low. **Priority:** Low.

### 20. ✅ Contact rows truncated long values.
- **Where:** `ContactSection.jsx`, `.contact-row` / `.contact-row-text` in styles.
- **Implemented:** The 110px fixed label column is gone. Each row now stacks the label (13px uppercase muted eyebrow) above the value (16px text, `word-break: break-word`, no ellipsis truncation). Layout collapses to `32px 1fr` so the icon stays anchored and the label/value column wraps cleanly on any width.
- **Effort:** Low. **Priority:** Medium.

---

## Theming / dark mode

### 21. The metro map is locked to a white background in dark mode — an anti-pattern.
- **Where:** `[data-theme="dark"] .metro-map-frame { background: #ffffff; }` (lines 193–195).
- **What is:** In dark mode the entire page goes dark and a brilliant white map plate dominates the screen. CLAUDE.md acknowledges this as intentional.
- **What could be:** Use a CSS `filter: invert(1) hue-rotate(180deg)` on the map image in dark mode to produce a "Night Metro" look (the WMATA map's white land becomes dark slate, line colors flip to their complements). Alternatively, layer a translucent dark overlay (`background: rgba(0,0,0,0.05)` over the image) to mute the white plate. Best long-term answer is to commission a true dark variant SVG.
- **Why:** A pure-white block in a dark UI is jarring and visually painful. The METRO_SPEC document even calls out that a dark-mode palette was designed; this should honor it.
- **Effort:** Medium for filter, High for a true dark SVG. **Priority:** Medium.

### 22. Dark-mode project cards use `#2a2620` (warm brown) which clashes with the cool-gray rest of dark mode.
- **Where:** `[data-theme="dark"] .project-card-v2` (line 502).
- **What is:** Warm brown card sitting in a cool gray surface.
- **What could be:** Use `color-mix(in srgb, var(--surface) 80%, #c8b87e 20%)` for a subtle warm tint without breaking from the cool palette, or just use a neutral dark `#1f2228`.
- **Why:** Light mode's beige card translates poorly to dark mode by direct hex inversion. The current brown reads as "different brand."
- **Effort:** Low. **Priority:** Low.

---

## Spacing, rhythm, typography

### 23. ✅ Body font fallback is still `Georgia` serif.
- **Where:** `body` rule in styles.
- **Implemented:** `body { font-family: "Source Sans 3", "Source Sans Pro", system-ui, -apple-system, Segoe UI, sans-serif; }`. The per-component `font-family` overrides are technically redundant now but left alone — they don't hurt and they make those components explicit. Sweeping them out can be a follow-up cleanup.
- **Effort:** Low. **Priority:** High.

### 24. Vertical rhythm between sections is inconsistent.
- **Where:** `.section-header { margin: 64px 0 24px; }` (line 209), section internals vary 1.5rem–2.5rem.
- **What is:** 64px between sections at the header level, but `about-subsection` uses `2.5rem` (40px), misc cards use `1.5rem` (24px), timeline groups use `2rem` (32px). No coherent scale.
- **What could be:** Adopt an 8pt baseline scale and a single set of spacing tokens: `--space-xs: 8px`, `--space-sm: 16px`, `--space-md: 24px`, `--space-lg: 40px`, `--space-xl: 64px`, `--space-2xl: 96px`. Use 96px between top-level sections, 40px between subsections within a section.
- **Why:** Vertical rhythm is the difference between a designed page and a built page. Currently each section feels like a separate developer's component.
- **Effort:** Medium. **Priority:** Medium.

---

## Accessibility

### 25. ✅ Focus state on `.metro-marker` is invisible on the map.
- **Where:** `.metro-marker:focus-visible .metro-marker-ring` in styles.
- **Implemented:** Triple-layered box shadow — `0 0 0 3px #fff, 0 0 0 6px #111, 0 0 0 9px #FFD200`. Black + yellow is high contrast against any map color.
- **Effort:** Low. **Priority:** High.

### 26. ✅ The map img alt text is generic; portfolio stations aren't represented in non-visual nav.
- **Where:** `MetroMap.jsx`.
- **Implemented:** The overlay container is now `<nav aria-label="Portfolio sections">` (previously a plain `<div>`). The map wrapper section uses `aria-labelledby="metro-map-hint"` to associate the affordance caption with the map landmark. A separate visually-hidden h2 was *not* added — the nav landmark alone is enough to give screen readers a route into the buttons.
- **Effort:** Low. **Priority:** Medium.

### 27. ✅ `aria-hidden="false"` on the overlay is redundant and possibly misleading.
- **Where:** `MetroMap.jsx`.
- **Implemented:** Removed when the overlay was converted to `<nav>`.
- **Effort:** Low. **Priority:** Low.

### 28. ✅ The pronunciation strings are not screen-reader friendly.
- **Where:** `DictionaryHeader.jsx`.
- **Implemented:** `<span class="dictionary-pron" aria-hidden="true">` so screen readers skip the phonetic spelling entirely. Done as part of #9.
- **Effort:** Low. **Priority:** Medium.

---

## Responsive / mobile

### 29. No mobile fallback for the map yet — METRO_SPEC's mobile vertical "line schedule" is unimplemented.
- **Where:** `MetroMap.jsx` and any future `MetroMapMobile.jsx`.
- **What is:** Below ~640px the WMATA SVG is still rendered at full fidelity, with markers shrinking but labels overlapping (the labels are 0.95rem and pile on top of each other).
- **What could be:** Build the vertical line-schedule mobile fallback as planned in METRO_SPEC Phase 6: a vertical line of 6 station rows, each row = colored bar + station node + label + pronunciation, tappable. Wire it with a media query mount in `HomePage.jsx`.
- **Why:** Mobile is currently the worst presentation of the metro hero. Phone users either see a tiny illegible map or labels colliding.
- **Effort:** Medium. **Priority:** High.

### 30. Project card grid `minmax(260px, 1fr)` can produce a single-column layout that looks lonely on tablets.
- **Where:** `.project-card-grid` (lines 408–412).
- **What is:** At 600–900px viewport widths the grid collapses to 1 or 2 columns depending on exact width, and the 430px-tall cards become a tall stack.
- **What could be:** Set explicit breakpoints — `1fr` mobile, `1fr 1fr` tablet, `1fr 1fr 1fr` desktop. Combined with #14 (removing min-height) the rhythm becomes predictable.
- **Why:** Auto-fit grids are great for uniform thumbnails but uneven on dense content cards. Explicit breakpoints give better art direction.
- **Effort:** Low. **Priority:** Low.

---

## Metro-themed timeline (implemented)

The timeline section was redesigned as a vertical WMATA-style **strip map** modeled on the in-train line-schedule diagram. Each role is a station on a green vertical rail.

- **Vertical green rail** (`.timeline-track::before`): 6px thick, full green for Experience, 45% faded green for Leadership. The two groups read as "Express line" → "transfer to Local line."
- **Station markers** (`.timeline-entry-marker` + `.timeline-entry-ring*`): match the map's portfolio markers exactly — green outer ring, white middle, green inner dot, white "halo" via `box-shadow: 0 0 0 3px var(--bg)` so the marker punches through the rail.
- **Date "station code" pill** (`.timeline-entry-date`): the date range is shown as a green/white tabular-numbers pill, echoing the `B27 / A12` station codes in the WMATA reference.
- **Status badges** (`.timeline-entry-status`): when `dateRange` contains "Present", a high-contrast "▸ Now" pill renders; when the title contains "Incoming", a muted bordered "↑ Incoming" pill renders. Detection is string-based so no data changes are required.
- **Line badge** (`.timeline-group-badge`): each group heading carries a small "GR" circle (Green line code), color-shifted to faded green for the Leadership sub-line.
- **Transfer connector** (`.timeline-transfer`): a short dashed green segment between Experience and Leadership groups, evoking a transfer indicator between two parallel services.
- Mobile-responsive: rail thins to 4px, markers shrink to 18px, padding contracts to `40px`.

This pattern can be reused elsewhere (see the proposals below) to extend the metro metaphor beyond just the map hero.

---

## Metro-theme extension proposals (other sections)

The user explicitly wants more metro theming in the other sections but didn't have a concrete idea for any of them. These are concrete, opinionated proposals for each — pick zero, one, or many.

### About

- **Red Line Station card.** Wrap the bio in a faux station card with `[RD]` badge + "Dupont Circle" label up top (the actual map station for About). Inside: tagline → bio prose. The card mimics a station information sign — same red accent already used elsewhere.
- **Skill chips as "line badges."** The skills already render as devicon chips. Re-style them so each chip's logo sits inside a small circle (matching the map markers) and the chip border picks up the section color. Tonally consistent with the timeline date pills and map markers.
- **Coursework as transfer station tags.** Coursework pills are already done. Keep, but optionally swap their plain border for a Red-line-tinted border so the section feels visually unified end-to-end.

### Projects

- **"Blue Line Destinations" framing.** Add a header above the project grid: `[BL] Blue Line · Projects`. Each card is a "destination" on the Blue Line. The card hero (currently the image) could get a thin blue top stripe like a station signpost.
- **Stack tags as line-color badges.** The new stack pills are neutral gray. Optionally tint them with the Blue line color (e.g. `color-mix(blue 12%, surface)`). Echoes the metro palette without overwhelming the screenshots.
- **GitHub/Live as "transfer indicators."** Replace the round icon buttons in the card footer with small horizontal "transfer chips" (icon + label: "Source" / "Live"), mimicking the WMATA "transfer to Red line" stub indicators.

### Miscellaneous (Photos + Clock)

- **Each card as a sub-station.** Photos and Clock are already orange-tinted. Treat them as two distinct Orange-line stations: add a tiny `[OR]` badge + station-style label inside each card's header. Reuses the timeline's badge component for consistency.
- **Clock grid as line schedule.** The four-city clock grid could be re-rendered like a station arrivals board — `Pittsburgh · 14:32 · 3 min` style. Keeps the function but rebrands the visual as a "next train" schedule.

### Contact

- **Yellow Line entrypoints.** Each contact row becomes a "station entrance" — a tiny yellow station marker on the left (matching the map style), label as eyebrow, value as station name. The current 32px FA icon stays, but sits inside a yellow ring so it reads as part of the metro system, not a generic icon list.
- **"Service hours" footer.** Add a small footnote under the contact list: "Service: typically responds within 24 hours" — playful but on-theme. Easy to skip if it feels gimmicky.

### Cross-cutting (low-effort, high-coherence)

- **Make `SectionHeader` `LineHeader` color-aware throughout, not just at the header.** Already half-done via `data-line`. Could go further by tinting subsection headings, link colors, and focus rings per-section so the metaphor never breaks.
- **A persistent "you are here" mini-map in the sticky FAB.** The "↑ Map" pill could expand on hover to show a tiny version of the metro map highlighting the section currently in view. Maximum metaphor payoff.

---

## Things that already look good

- **Color palette and line-color tokens.** The metro palette is well-named and well-scoped in CSS vars. Don't change it.
- **Data extraction.** Moving content into `src/data/*.js` is clean and the right call; nothing to add here.
- **Header brand + theme toggle restraint.** Two elements, no nav clutter — perfect for a single-page scroll site.
- **Contact section's data-driven row list.** Right pattern, just needs the column-width fix in #20.
- **Hash-router awareness** (CLAUDE.md notes). No suggestions needed.
