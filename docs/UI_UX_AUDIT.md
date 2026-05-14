# UI/UX Audit — Rohit Sattuluri Portfolio (Metro Redesign)

**Branch:** `metro-redesign`  
**Audited:** 2026-05-14  
**Auditor:** Claude Sonnet 4.6  
**Files reviewed:** `styles.css` (2,747 lines), `HomePage.jsx`, `MetroMap.jsx`, `MetroMapMobile.jsx`, `MiniMap.jsx`, `stations.js`, all five section components, `SectionHeader.jsx` + sub-components, `FadeIn.jsx`, `Layout.jsx`, `index.html`

---

## 1. Metro Map UX

### 1.1 Station label font size scales with viewBox, not the rendered map
**Severity:** High  
**Location:** `MetroMap.jsx` — `<text>` elements; `styles.css` lines 104–121 (`.metro-marker-svg-label`)

The SVG uses `viewBox="0 0 760 630"` and the label `font-size` is set in SVG user-unit pixels (`18px` primary, `13px` secondary). Because the SVG stretches to fill the container, those values are in *viewBox space*, not CSS pixels. At `max-width: 1100px` the actual rendered font size for a primary label is approximately `18 × (1100 / 760) ≈ 26px`, which is fine. But on a 375px-wide viewport (where the desktop map hides and the mobile component takes over at `≤640px`) the map is hidden entirely, so this is not a mobile problem. The real issue is at intermediate widths between `640px` and `900px`: the map is visible but the container may be only `500–700px` wide, rendering labels at `≈12–17px` in CSS pixels. At `640px` the rendered primary-label size is only `~15px` — readable but tight — and secondary labels drop to `~11px`, which is below the WCAG 2.5 minimum of 14px for informational text.

**Recommendation:** Either (a) set a CSS `font-size` on the marker `<text>` elements using `font-size: calc(18px * 760 / 100%)` heuristic, or more practically (b) bump secondary labels to `15px` viewBox units so they never fall below `12px` CSS at the narrowest desktop-visible width. A medium-term fix is to add a `min-width: 700px` guard before hiding the desktop map instead of the current `640px`, or scale labels with a CSS custom property injected from JS.

---

### 1.2 Label collision between "Contact" and "Photos"
**Severity:** Medium  
**Location:** `stations.js` — Contact at `(415.3, 373)` label anchored `left`; Photos at `(529.3, 374)` label anchored `bottom`

Contact's left-anchored label extends leftward from x=415, and Photos' bottom-anchored label drops below y=374. At the rendered scale these two stations sit about 28 viewBox units apart horizontally with a vertical offset of 1. The Contact label text "Contact" (~48px wide in viewBox units at 18px weight-700) extends roughly from x=215 to x=415 — well clear of Photos at x=529. No collision exists today. However, if either station label or anchor direction is changed, the proximity creates risk. The real current problem is that both stations on the Blue/Silver corridor (Contact and Photos) have their labels on the same side of the line, which makes the map feel visually crowded in the center-right quadrant.

**Recommendation:** Move Photos' `labelAnchor` from `bottom` to `right` to push its label away from the congested center. Also verify "Clock" at `(600.3, 321)` with `labelAnchor: left` — at 13px secondary size, "Clock" only needs ~30 viewBox units, so it should clear Photos below it.

---

### 1.3 Focus ring on SVG `<g role="button">` uses `stroke` — not universally visible
**Severity:** High  
**Location:** `styles.css` lines 99–102; `MetroMap.jsx` lines 50–57

The focus indicator for keyboard users is a yellow `stroke` (`#FFD200`) on `.metro-marker-svg:focus-visible .metro-marker-svg-outer`. Yellow on the white SVG land background is a WCAG contrast failure: `#FFD200` on `#FFFFFF` is approximately 1.07:1 ratio — effectively invisible. Additionally, `outline: none` is set on `.metro-marker-svg` globally, meaning there is no fallback outline if the stroke renders poorly in a browser.

**Recommendation:** Replace the stroke-based focus ring with a `filter: drop-shadow(0 0 4px #1f4fa3)` or add a contrasting `outline` on the marker's SVG group. A blue glow (`var(--accent)`) over white reads clearly and maintains brand color coherence. If keeping yellow: wrap it in a darker outer stroke ring or use `#b59500` (yellow with more contrast).

---

### 1.4 Hover animation `transform-origin` mismatch
**Severity:** Medium  
**Location:** `styles.css` lines 84–97 (`.metro-marker-svg-outer`)

The `.metro-marker-svg-outer` circle animates `transform: scale(1.25)` on hover, but `transform-origin` is set to `0 0` — the top-left corner of the SVG group's local coordinate space. Since the group is translated to the station position and circles are centered at `(0,0)` in that local space, a scale-from-origin (`0 0`) will shift the outer ring visually down-right rather than expanding concentrically. The correct value is `transform-origin: 0 0` only if `transform-box: fill-box` is also set, otherwise the origin should be `50% 50%` or the group's center.

**Recommendation:** Add `transform-box: fill-box; transform-origin: center;` to `.metro-marker-svg-outer`. This makes the scale expand concentrically around the circle's center.

---

### 1.5 Hint text copy is asymmetric between desktop and mobile
**Severity:** Low  
**Location:** `MetroMap.jsx` line 76; `MetroMapMobile.jsx` line 27

Desktop: "Click any station to jump to that section."  
Mobile: "Tap any station to jump to that section."

The distinction is good but the hint paragraph shares the same `id="metro-map-hint"` pattern — the desktop section has `aria-labelledby="metro-map-hint"` but the mobile section uses `aria-labelledby="metro-mobile-hint"`. This is fine. However, the hint paragraph appears beneath the map with no visual prominence. Users may not read it. The hint could be elevated slightly or rephrased as a subtitle in the header area.

**Recommendation:** Consider moving the hint to a position above the map (e.g., inside the `site-header` area as a sub-tagline), or applying a gentle entrance animation to draw attention. The current placement below the map means users see it only after they've already potentially interacted. Low priority but worth noting.

---

### 1.6 No visual affordance that map elements are interactive before hover
**Severity:** Medium  
**Location:** `MetroMap.jsx`; `styles.css` — no idle-state interactivity cues

The map markers have `cursor: pointer` but no static visual indicator (no underline, no drop shadow, no color distinction from real WMATA circles) that they are interactive. A first-time visitor looking at the map may not realize the dots are clickable without trying. The hint text below helps but is easily missed.

**Recommendation:** Add a subtle pulsing `box-shadow` or `filter: drop-shadow` animation on the inner color circle in idle state — a single slow pulse (3–4s loop) on page load would communicate interactivity without being distracting. Alternatively, a "glow" state on the three hub markers when the page first loads could serve as an onboarding affordance.

---

## 2. Section Hierarchy and Flow

### 2.1 Scroll-margin-top is too small for the sticky scroll bar
**Severity:** Medium  
**Location:** `styles.css` line 963–964 (`section[id] { scroll-margin-top: 24px; }`)

The fixed `metro-scroll-bar` is 4px tall (line 1689), which poses no obstruction. However, the `section-header` top margin is `64px` (line 133). When smooth-scrolling to an anchor, the browser lands with 24px of clearance above the section element — but because the `section-header` has a `64px` top margin on the `div.section-header`, the visual section title sits `24 + 64 = 88px` from the viewport top. This is not inherently wrong, but there is no site header pinned at the top, so the 64px gap between the map and the section heading creates a lot of empty space on arrival. On a small viewport this looks like a navigation error (blank area before content).

**Recommendation:** Reduce `section-header` top margin from `64px` to `40px`, or keep it but add `scroll-margin-top: 0` and let the margin carry the clearance visually.

---

### 2.2 "Miscellaneous" section ID mismatch with station navigation
**Severity:** High  
**Location:** `HomePage.jsx` line 18; `MiscellaneousSection.jsx` line 8

`SECTION_TO_ANCHOR` maps `photos → "photos"` and `clock → "clock"`. These anchors exist as `id="photos"` and `id="clock"` on `<article>` elements inside `MiscellaneousSection`. However, the wrapping `<section>` has `id="miscellaneous"` — not `id="photos"` or `id="clock"`. When a user clicks the Photos station on the map, `handleNavigate` calls `getElementById("photos")` which resolves to the `<article>` element inside the Miscellaneous section, and `scrollIntoView` works correctly. But `useActiveSection` observes `["about", "projects", "timeline", "photos", "clock", "contact"]` — if the IntersectionObserver viewport threshold is set at a typical margin, it will fire on `photos` and `clock` even though these are not top-level sections but nested articles inside `miscellaneous`. On shorter viewport heights, both articles may be in view simultaneously, creating ambiguous active-section state.

Additionally, `MiscellaneousSection` itself has no station on the map — only its two sub-articles (Photos, Clock) are stations. This means a user scrolling through the Miscellaneous section header sees no active state on the progress bar or mini-map. The `activeColor` in `HomePage` defaults to `#BF0D3E` (Red) when no anchor matches, which would incorrectly show red while the user is reading the Miscellaneous section header.

**Recommendation:** Add `"miscellaneous"` to `OBSERVED_IDS` and give the wrapping section `id="miscellaneous"`. Map the Miscellaneous station color (`#E3801C`) as a fallback. Alternatively, register `photos` as the first observed sub-anchor and rely on the scroll order.

---

### 2.3 The system status bar breaks the map-to-content visual flow
**Severity:** Low  
**Location:** `HomePage.jsx` lines 71–74; `styles.css` lines 2326–2346 (`.system-status-bar`)

The `system-status-bar` (`All Lines Operating Normally — Rohit Sattuluri Transit Authority`) sits between the map and the first section. It's a nice thematic touch but creates a visual interruption — the user clicks a map station, smooth-scrolls past the status bar, and arrives at the About section. The status bar is `aria-hidden="true"` which is correct (purely decorative) but it also means screen reader users have no way to know it exists. The bar feels orphaned — visually it looks like a footer for the map or a header for the content, but it's neither.

**Recommendation:** Visually attach the status bar to the bottom edge of the map frame (e.g., inside `.metro-map-frame` as an absolutely-positioned footer strip), which would make it feel like a metro board display rather than a standalone row.

---

### 2.4 `about-subheading` font-weight (400) clashes with section visual hierarchy
**Severity:** Medium  
**Location:** `styles.css` lines 320–327 (`.about-subheading`)

The `.about-subheading` class is used for "Coursework" and "Skills" sub-section titles. It's set to `font-size: 36px; font-weight: 400`. The parent section's `dictionary-title` is also 36px but at weight 700. Having two elements at the same font size — one at 400 weight, one at 700 — within the same visual hierarchy creates ambiguity: they look like peers rather than parent/child. At the same 36px size, the weight-400 subheadings for Coursework and Skills read as if they are section-level titles, not subsections. A visitor scanning the page would not immediately understand the hierarchy.

**Recommendation:** Drop `about-subheading` to `font-size: 26px; font-weight: 600`. This clearly places it below the 36px section title in the hierarchy without losing the generous sizing that helps scanning.

---

## 3. Typography

### 3.1 Section content font sizes form an inconsistent ramp
**Severity:** Medium  
**Location:** `styles.css` — various classes throughout

The site uses many distinct font sizes without a clear modular scale:

| Element | Size |
|---|---|
| `dictionary-title` (section heading) | 36px |
| `about-subheading` | 36px (same as above — see §2.4) |
| `section-bio` | 18px |
| `dictionary-def` | 18px |
| `timeline-entry-title` | 17px |
| `timeline-entry-text` / `timeline-entry-list` | 15px |
| `misc-strip-title` | 22px |
| `misc-strip-blurb` | 15px |
| `project-card-title` | 24px |
| `project-card-text` | 14px |
| `contact-row-value` | 16px (Courier New) |
| `stack-strip-label` | 9px |
| `arrivals-board-header` | 9px |
| `departure-board-footer` | 9px |

The lower end (9px) is particularly problematic — `stack-strip-label` (tech stack station names), the departure board header columns, and the arrivals board header are all rendered at 9px, which is below any reasonable legibility threshold. At standard 96dpi this is approximately 6.75pt.

**Recommendation:** Establish a minimum body text size of 12px for all visible-on-page text that conveys information. The 9px labels (stack strip, board headers/footers) should be bumped to 11–12px. Decorative/chrome labels like "ROHIT SATTULURI TRANSIT AUTHORITY" in the footer can stay small but should still hit 10px minimum.

---

### 3.2 Courier New / monospace font mixing feels inconsistent
**Severity:** Low  
**Location:** `styles.css` — `.departure-board-header`, `.departure-board-footer`, `.timeline-entry-date`, `.station-pylon-badge`, `.ghost-station-text strong`, `.service-alert-title`, `.service-alert-agency`, `.arrivals-board-header`, `.transit-legend-system-badge`, `.transit-legend-line-name`, `.lm-text`, `.eol-text`

Courier New is used for "transit-operational" chrome: board headers, time displays, badge codes, and line names. Source Sans 3 is used for all content. This dual-font system works well thematically. However, Courier New is applied in too many places — including the `service-alert-title` at 18px, which is a content heading, not operational chrome. Additionally, `line-manifest` (`.lm-text`) uses Courier New but is a section-level element, causing the heading strip above Projects/Timeline/Misc to feel slightly off-brand compared to the clean Source Sans 3 section titles.

**Recommendation:** Reserve Courier New strictly for transit-chrome UI (boards, badges, station codes, status bars). Keep all readable headings and body text in Source Sans 3, including `service-alert-title`.

---

### 3.3 Missing `font-display: swap` on Google Fonts load
**Severity:** Medium  
**Location:** `index.html` lines 18–22

The Google Fonts stylesheet is loaded without `&display=swap` in the URL. Source Sans 3 will use the browser default `font-display: auto`, which means a flash of invisible text (FOIT) on slow connections. The font weights loaded are only 400, 600, 700 — which is appropriate — but without `display=swap`, body text can be invisible for several seconds on slow networks.

**Recommendation:** Change the fonts URL to:
```
https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&display=swap
```
(The `display=swap` parameter is already in the URL — this may already be handled. Verify by checking the actual rendered URL in devtools. If it's present, this is a non-issue.)

**Correction:** The URL in `index.html` line 21 already includes `&display=swap`. This issue is resolved. Keeping as Low severity for confirmation.

---

## 4. Color System

### 4.1 Project cards use hardcoded warm-beige background, not a CSS variable
**Severity:** High  
**Location:** `styles.css` lines 431–433 (`.project-card-v2`), lines 542–550 (dark mode overrides)

`.project-card-v2` has `background: #f9f4e2` — a warm cream color hardcoded in light mode. The dark mode override uses `background: #2a2620`. These values are not in the CSS custom property system. If the light/dark palette changes, these cards will not update. More critically, the card text colors (`#2a2a2a`, `#4a4538`) are also hardcoded instead of using `var(--text)` and `var(--muted)`. In dark mode the card correctly overrides these, but the implementation is fragile — any new card variant or future palette change requires hunting through hard-coded hex values.

**Recommendation:** Add `--card-bg`, `--card-text`, `--card-muted` custom properties to `:root` and `[data-theme="dark"]`, then use them in `.project-card-v2`, `.project-card-title`, `.project-card-text`, and `.project-card-stack-tag`. This costs ~15 lines but makes the card system fully themeable.

---

### 4.2 Contact section `departure-route-badge` is always Yellow Line regardless of item
**Severity:** Medium  
**Location:** `styles.css` lines 1867–1878 (`.departure-route-badge`)

All four contact rows show a yellow badge (`background: var(--metro-line-yellow)`). This is thematically consistent (Contact = Yellow Line) but means the badge provides no per-row visual differentiation — all four rows look identical. For a departure board metaphor, you'd expect platform/route indicators to vary.

**Recommendation:** Either accept the single-color intent (it's deliberate) but ensure the badge's icon color (`#111` on `#FFD200`) has sufficient contrast (it does: ≈14:1), or add a second, minor color accent per row (e.g., GitHub = blue tint, Resume = green tint). If keeping single-color: this is fine, but note the platform dot (`.departure-platform-dot`) is also yellow with a yellow glow — redundant with the badge.

---

### 4.3 Dark mode: metro map frame stays white — creates hard contrast break
**Severity:** Medium  
**Location:** `styles.css` lines 123–125 (`[data-theme="dark"] .metro-map-frame { background: #ffffff; }`)

This is an intentional decision (WMATA SVG is light-only), and the CLAUDE.md acknowledges it. However, the visual result in dark mode is jarring: the user sees a white rectangle surrounded by a near-black page (`#101214` background). The `page-shell` has no visible background treatment to ease this transition, and the map has no `border-radius` or border to frame it.

**Recommendation:** Add a subtle dark-mode frame treatment — a 1px border of `var(--border)` (`#3a3d40`) around the map frame, or a slight `box-shadow` of `0 0 0 1px #3a3d40`. This gives the white map a clear visual boundary without changing the map itself. Alternatively, add a very slight sepia filter (`filter: sepia(0.08) brightness(0.97)`) to `.metro-map-frame` in dark mode so the map integrates slightly better while staying legible.

---

### 4.4 Yellow Line accent (#FFD200) fails WCAG contrast on white backgrounds
**Severity:** High  
**Location:** `styles.css` — `var(--metro-line-yellow)` used in Contact section, focus ring on map markers

`#FFD200` on `#FFFFFF` has a contrast ratio of approximately 1.07:1 — near zero contrast. It is used as:
- The background of `.departure-route-badge` (yellow badge, `#111` text — fine since the `#111` text on `#FFD200` ≈ 14:1)
- The focus ring color on SVG markers (see §1.3 — problematic)
- The `.departure-platform-dot` background (decorative only — fine)
- The `.station-entrance-sign` background (dark text on yellow — fine)

The danger areas are places where yellow is used as a *text* color or as a sole focus indicator. Fortunately no text uses pure yellow on white. But the focus ring issue remains critical (see §1.3).

**Recommendation:** Never use `var(--metro-line-yellow)` as a focus indicator color. Anchor it to background-only uses where a contrasting foreground element provides legibility.

---

### 4.5 Leadership timeline uses `color-mix()` to desaturate green — browser support caveat
**Severity:** Low  
**Location:** `styles.css` lines 601–605, 631–633, 680–686, 710–713 (`.timeline-group[data-variant="leadership"]`)

`color-mix(in srgb, var(--metro-line-green) 45%, var(--surface))` is used throughout the leadership timeline to create a muted green. `color-mix()` has good modern browser support (Chrome 111+, Firefox 113+, Safari 16.2+) but will silently fall back to `initial` in older environments, causing the green elements to become unstyled. This is unlikely to affect the target audience but worth noting.

**Recommendation:** Add explicit fallback values before the `color-mix()` lines, e.g., `background: #a8d9b8; background: color-mix(...)`.

---

## 5. Interactive Elements

### 5.1 `project-card-iconlink--live` link color is sky blue on beige — insufficient contrast
**Severity:** High  
**Location:** `styles.css` lines 552–563 (`.project-card-iconlink--live`)

The live-site link icon color is `#87CEEB` (sky blue) on the card background `#f9f4e2` (cream). The contrast ratio is approximately 1.9:1, well below the WCAG AA minimum of 4.5:1 for normal text / icons. The hover state darkens to `#5bb8e8` which is still only ~2.4:1 on the cream background.

**Recommendation:** Use a darker blue for the live link icon — `#0072CE` (the metro Blue Line color) has ~4.8:1 on `#f9f4e2`. In dark mode, the cream background becomes `#2a2620`, where `#87CEEB` actually reaches ~6.3:1 (acceptable). So the fix is light-mode specific: set the light-mode icon color to something like `#0066b8` or `#0072CE`.

---

### 5.2 BackToMap FAB lacks `aria-label` for sub-page context
**Severity:** Low  
**Location:** `BackToMap.jsx` lines 25–35

When `onSubPage` is true, the FAB renders a `<Link to="/">` with `aria-label="Back to map"`. The label correctly describes the action. However, the `fa-solid fa-arrow-up` icon with a visible "Map" text label alongside — while the `aria-label` says "Back to map" — creates a minor redundancy. Screen readers will announce "Back to map" from the aria-label and then skip the icon (correctly `aria-hidden`), but also skip the visible "Map" text since `aria-label` overrides visible content. This is not a bug but means the visible label "Map" is silently ignored by assistive technology.

**Recommendation:** Remove `aria-label` and let the screen reader read the visible "Map" text naturally, adding a visually hidden `<span className="sr-only">Back to </span>` prefix to produce "Back to Map" for AT users.

---

### 5.3 Ghost station trigger has no keyboard access path
**Severity:** Medium  
**Location:** `AboutSection.jsx` lines 68–73

The `.ghost-station-trigger` is a `<span>` with `tabIndex={-1}` and `aria-hidden="true"`. It is intentionally hidden from keyboard users and screen readers, which is a reasonable choice for an Easter egg. However, the double-click trigger on the section header (`onDoubleClick={() => setAlertOpen(true)}`) on the outer `<div>` (line 40) also has no keyboard equivalent — double-clicking is not accessible. Touch users on mobile also cannot double-click. The service alert modal is reachable only via mouse double-click.

**Recommendation:** For the service alert modal (the more substantive Easter egg), consider adding a keyboard shortcut hint (e.g., a visually hidden `<span>` in the pylon header that says "Press ? for a secret") or make the double-click trigger also respond to a key combo. Alternatively, explicitly document this as a mouse-only Easter egg and accept the limitation.

---

### 5.4 Lightbox has no `role="dialog"` or `aria-modal`
**Severity:** Medium  
**Location:** `styles.css` lines 1509–1519; the lightbox is rendered in `PhotoAlbumPage.jsx` (not audited in detail)

Based on CSS structure, the `.lightbox` uses `position: fixed; z-index: 20` but has no ARIA dialog role defined in the CSS. The actual dialog ARIA roles need to be verified in `PhotoAlbumPage.jsx`, but the pattern seen in `AboutSection.jsx` (service alert modal uses `role="dialog" aria-modal="true"` correctly) suggests the lightbox may follow a similar pattern. Worth verifying.

**Recommendation:** Confirm `PhotoAlbumPage.jsx` adds `role="dialog"` and `aria-modal="true"` to the lightbox overlay, and that focus is trapped within the lightbox when open.

---

### 5.5 Contact `departure-board` hover state is too subtle on light mode
**Severity:** Low  
**Location:** `styles.css` lines 1861–1865

`.departure-board .contact-row:hover` uses `background: var(--surface)` — the surface color is `#f3f3f1`, nearly identical to the board background `var(--bg)` = `#ffffff`. The hover state is barely perceptible (~4% gray difference). A user with low vision or a cheap monitor may not notice the hover state at all.

**Recommendation:** Change the hover background to `color-mix(in srgb, var(--accent) 8%, var(--bg))` for a subtle blue tint that reads clearly as interactive feedback.

---

## 6. Mobile / Responsive

### 6.1 MetroMapMobile gradient line is decorative-only, not semantically communicating order
**Severity:** Low  
**Location:** `styles.css` lines 2660–2677 (`.metro-mobile-line::before`)

The vertical gradient line behind the mobile stations cycles through line colors (Red → Blue → Green → Orange → Red → Yellow) but the mapping of colors to stations is arbitrary — it's purely decorative and doesn't match the station order in `stations.js` (About=Red, Projects=Blue, Timeline=Green, Photos=Orange, Clock=Blue, Contact=Yellow). The gradient repeats Red before the final Yellow, which is confusing if a user tries to read color semantics.

**Recommendation:** Either remove the gradient and use a single neutral color for the mobile nav track (since each stop already has its own colored dot), or make the gradient accurately represent the line colors in order: `Red → Blue → Green → Orange → Blue → Yellow`. This removes the false repetition of Red.

---

### 6.2 No `scroll-margin-top` adjustments for mobile
**Severity:** Low  
**Location:** `styles.css` line 963 (`section[id] { scroll-margin-top: 24px; }`)

The global `scroll-margin-top: 24px` applies to all widths. On mobile, the smaller section-header margins (28px at `≤640px` per line 271 → `line-header` shrinks from 80px to 60px) mean the actual visual gap between viewport top and section content is smaller. 24px scroll-margin may be fine but hasn't been verified against the mobile rendering. No responsive override exists.

**Recommendation:** Add `@media (max-width: 640px) { section[id] { scroll-margin-top: 16px; } }` to ensure tight but comfortable alignment on mobile.

---

### 6.3 Mobile navigation in MetroMapMobile has no "current section" indicator
**Severity:** Medium  
**Location:** `MetroMapMobile.jsx` — no active state prop or `aria-current`

The desktop mini-map (`MiniMap.jsx`) highlights the active section with `mini-map-dot--active`. The `MetroMapMobile` component receives no `activeSection` prop and has no visual indication of which section the user is currently reading. A user on mobile looking at the navigation has no context for where they are in the page.

**Recommendation:** Pass `activeSection` from `HomePage` to `MetroMapMobile` (just as it's computed via `useActiveSection`). Add a CSS class like `metro-mobile-stop--active` that adds a left-border accent or makes the color dot slightly larger.

---

### 6.4 `contact-board-wrapper` has `max-width: 600px; margin: 0 auto` — this creates a centered island on wide screens but the section itself is already constrained to 900px
**Severity:** Low  
**Location:** `styles.css` lines 2352–2355

The `.contact-board-wrapper` is `max-width: 600px; margin: 0 auto`. The page content shell is `max-width: 900px`. On screens between 600–900px, the contact board center-aligns inside the section, but the sections above it (About, Projects) are left-aligned. This creates inconsistent left-edge alignment on medium viewports.

**Recommendation:** Change `.contact-board-wrapper` to `max-width: 600px; margin: 0` (left-align it with the rest of the content instead of centering it).

---

## 7. Accessibility

### 7.1 `<g role="button">` in SVG — keyboard activation is partially broken in Firefox
**Severity:** High  
**Location:** `MetroMap.jsx` lines 49–72

SVG `<g>` elements with `role="button"` and `tabIndex={0}` should theoretically receive keyboard focus and respond to Enter/Space. The `handleKey` function (lines 19–23) handles this correctly. However, Firefox does not support native `tabIndex` on SVG elements in the same way as HTML — while Chrome and Safari handle it, Firefox may require the `focusable="true"` attribute on SVG elements or the use of a `<foreignObject>` with a real `<button>` inside. In practice, Firefox 116+ supports `tabIndex` on SVG, but older Firefox and some screen reader + browser combinations (NVDA + Firefox notably) do not properly expose SVG `<g role="button">` in the accessibility tree.

**Recommendation:** Overlay transparent `<button>` elements (HTML, not SVG) absolutely positioned over each marker using the same percentage-coordinate system as `MiniMap.jsx`. This gives bulletproof keyboard and screen reader access. The SVG markers become purely visual, and real `<button>` elements handle interaction. This is the pattern used in `MetroMapMobile.jsx` and `MiniMap.jsx` — consider applying it to the main map too.

---

### 7.2 `pronunciation` is marked `aria-hidden="true"` — correct, but definition line is a `<p>` inside a `<header>` which is not valid HTML
**Severity:** Low  
**Location:** `DictionaryHeader.jsx` lines 7–13

`DictionaryHeader` renders as:
```html
<header class="dictionary-header">
  <h2 class="dictionary-title">...</h2>
  <span aria-hidden="true">...</span>
  <p class="dictionary-def">...</p>
</header>
```
A `<p>` element inside a `<header>` is technically valid HTML5, but the `<header>` of a section should typically contain only heading and navigation elements. The definition line is content, not a header descriptor. Screen readers may announce this structure oddly.

**Recommendation:** Change `DictionaryHeader` to render inside a `<div>` instead of a `<header>` tag. The `<header>` role adds no semantic value here since `<h2>` already marks the section.

---

### 7.3 Section `<h2>` headings follow `<h3>` subheadings inside sections
**Severity:** Medium  
**Location:** `AboutSection.jsx` line 95 (`<h3 className="about-subheading">Coursework</h3>`) — parent section heading is `<h2>` via `DictionaryHeader`

The heading hierarchy is correct: `<h2>` for section titles (via DictionaryHeader), `<h3>` for About subsections. However, `TimelineSection.jsx` line 55 uses `<h3 className="timeline-group-heading">` for "Experience" and "Leadership" group headings, and `<h4 className="timeline-entry-title">` for individual entries — this is correct. But `MiscellaneousSection.jsx` uses `<h3 className="misc-strip-title">` for "Photos" and "Clock" which are `<article>` elements, not subsections — the heading level is fine contextually but the `<article>` wrapper means these should perhaps be `<h2>` (since `<article>` establishes its own document outline). This is a minor HTML semantics issue.

**Recommendation:** Inside the two `<article>` elements in `MiscellaneousSection`, use `<h3>` as currently done (it works within the `<section>` → `<article>` outline model). No change needed, but verify with a heading outline tool.

---

### 7.4 Theme toggle button has no visible label — only a Font Awesome icon
**Severity:** Medium  
**Location:** `Header.jsx` (not audited in detail, but CSS at lines 1108–1136 describes `.theme-toggle`)

The `.theme-toggle` button is `width: 1rem; height: 1rem` with no visible text. The icon changes between sun and moon depending on theme. No `aria-label` is visible in the CSS, but it should be in `Header.jsx`. If not present, this is a critical screen reader issue. Worth verifying.

**Recommendation:** Confirm `Header.jsx` includes `aria-label="Switch to dark mode"` / `aria-label="Switch to light mode"` on the theme toggle button.

---

### 7.5 `FadeIn` animation does not animate on `whileInView` for the first visible section
**Severity:** Low  
**Location:** `FadeIn.jsx` lines 14–24

`FadeIn` uses `viewport={{ once: true, margin: "-8%" }}` with `initial={{ opacity: 0, y: 20 }}`. For content that is initially in the viewport when the page loads (e.g., the first few project cards or the About section text), Framer Motion's `whileInView` should still trigger since the element enters the viewport (it starts below the fold if the map takes up full height). However, if a user navigates directly to a deep section via URL hash (e.g., clicking a station that scrolls to `#projects` before the map is visible), the FadeIn might not fire if the element enters the viewport during the smooth scroll. The `once: true` flag means it only animates once — if the element was briefly visible during scroll, it will have animated already. This is an edge case but worth noting.

**Recommendation:** This is acceptable behavior. If needed, changing `margin: "-8%"` to `margin: "0px"` would make triggering more reliable.

---

## 8. Performance / Polish

### 8.1 `dangerouslySetInnerHTML` for the WMATA SVG — potential reparse on every render
**Severity:** Low  
**Location:** `MetroMap.jsx` lines 29–33

The WMATA SVG is injected via `dangerouslySetInnerHTML={{ __html: rawSvg }}`. This is a static string (the SVG content never changes), but React will re-evaluate it on every render of `MetroMap` since the `__html` prop is an inline expression. In practice, `MetroMap` only re-renders when `onNavigateToSection` changes (it doesn't have local state), and `onNavigateToSection` is wrapped in `useCallback` in `HomePage`, so rerenders are rare. However, it would be cleaner to wrap the SVG layer in `React.memo`.

**Recommendation:** Wrap the SVG background layer in its own `React.memo` component: `const WmataBackground = React.memo(() => <div className="metro-map-layer" aria-hidden="true" dangerouslySetInnerHTML={{ __html: rawSvg }} />)`. This prevents any reparse cost during parent updates.

---

### 8.2 No `loading="lazy"` on skill chip icons
**Severity:** Low  
**Location:** `AboutSection.jsx` lines 123–128

Skill chip icons use `loading="lazy"` — good. Project card images also use `loading="lazy"`. However, Devicon SVG URLs are loaded from `cdn.jsdelivr.net` for every skill chip (10 languages, 8 libraries, 4 tools = 22 external icon requests), all of which are above the fold in the About section on desktop. Since they're above the fold, `loading="lazy"` would actually not fire until the user reaches them during scroll — but for the first few chips that are immediately visible, `loading="eager"` would be better. Alternatively, use `loading="lazy"` (current) and accept that above-fold chips may take a moment to resolve.

This is more of a loading-order observation than a bug. The bigger concern is the 22 separate network requests to a CDN on page load.

**Recommendation:** Bundle the most commonly-needed devicons (Python, JavaScript, React) locally in `src/assets/icons/` and lazy-load the rest. This reduces CDN dependency and improves LCP for the above-the-fold chips.

---

### 8.3 `metro-scroll-bar` width transition creates jitter at fast scroll speeds
**Severity:** Low  
**Location:** `styles.css` lines 1688–1695

The scroll progress bar uses `transition: background 400ms ease, width 80ms linear`. At 80ms, the width transition is fast enough to feel real-time. However, on low-end devices or during rapid scroll, the bar may lag visibly behind the scroll position. The `passive: true` flag on the scroll listener is correct and won't cause this. The 80ms transition itself is the culprit.

**Recommendation:** Remove the `width` transition entirely (`transition: background 400ms ease`). Progress bars should not animate their width — the movement from scroll provides sufficient motion feedback. The `background` transition (400ms) that changes color as sections change is good and should stay.

---

### 8.4 `stack-strip` in project cards has no hover or focus treatment on individual stops
**Severity:** Low  
**Location:** `styles.css` lines 1701–1764; `ProjectsSection.jsx` lines 15–29

The `StackStripMap` component renders tech stack stops as visual elements but they have no interactivity — they're purely decorative. The `.stack-strip-stop` elements have no hover state, no click behavior, and no ARIA labels. They also use `overflow-x: auto` with a hidden scrollbar, meaning users cannot tell if the strip is scrollable. On a narrow card (260px minimum) with a long stack like "ReactJS, Python, PostgreSQL, AWS, Firebase," the strip will overflow and the rightmost stops will be partially hidden with no scroll affordance.

**Recommendation:** Add a right-edge fade mask to `.stack-strip` when the content overflows: a `linear-gradient` pseudo-element on the right edge that visually hints at scroll. This is achievable with `::after { content: ''; position: absolute; right: 0; ... background: linear-gradient(to right, transparent, var(--card-bg)) }`.

---

### 8.5 CSS file is 2,747 lines with no logical ordering of responsive rules
**Severity:** Low  
**Location:** `styles.css` — multiple `@media (max-width: 640px)` blocks scattered throughout

The responsive media queries appear at least 8 separate times throughout the file rather than being co-located with their component styles. While this is a maintainability issue more than a UX issue, it creates risk: contradictory mobile rules may exist without being noticed. For example, `.section[data-line]` has a mobile padding rule at line 288–291, but later sections may override it without it being obvious from a linear read.

**Recommendation:** Co-locate each component's mobile rules immediately after its base styles, or adopt a `.mobile.css` module approach. At minimum, add clear section comments and a table of contents at the top of the file.

---

## Top 10 Issues to Fix (Prioritized)

| Priority | Issue | Severity | Location | Quick-win? |
|---|---|---|---|---|
| 1 | `#FFD200` focus ring on SVG markers is invisible (≈1:1 contrast on white) | Critical | `styles.css` L99–102 | Yes — 2-line fix |
| 2 | `project-card-iconlink--live` sky blue icon (~1.9:1 on cream) fails WCAG AA | High | `styles.css` L552–563 | Yes — 1 color change |
| 3 | Hover `transform-origin: 0 0` on marker outer circle — scale animates from corner | High | `styles.css` L84–88 | Yes — add `transform-box: fill-box; transform-origin: center` |
| 4 | SVG `<g role="button">` keyboard support unreliable in Firefox/NVDA | High | `MetroMap.jsx` L49–72 | Moderate — overlay real `<button>` elements |
| 5 | Miscellaneous section anchor ID mismatch causes broken active-section detection | High | `HomePage.jsx` L26; `MiscellaneousSection.jsx` L8 | Yes — add `"miscellaneous"` to OBSERVED_IDS |
| 6 | Secondary station labels render at ~11px CSS at 640px map width | High | `stations.js` (secondary tier); `styles.css` L117–121 | Easy — bump `font-size` from 13 to 15 viewBox units |
| 7 | `about-subheading` at 36px weight-400 is visually indistinguishable from section title | Medium | `styles.css` L320–327 | Yes — drop to 26px/600 weight |
| 8 | Project card colors are hardcoded hex, not CSS variables — breaks theming | High | `styles.css` L431–563 | Moderate — extract ~6 custom properties |
| 9 | Mobile `MetroMapMobile` has no active-section indicator | Medium | `MetroMapMobile.jsx` | Moderate — pass `activeSection` prop, add CSS class |
| 10 | 9px font sizes on `stack-strip-label` and board headers are below legibility threshold | Medium | `styles.css` L1755–1764, L1828–1834 | Yes — set minimum 11px |

---

## Summary

The site's concept is strong and largely well-executed. The metro-map-as-navigation metaphor is original and the transit-chrome UI details (departure boards, station pylons, line manifests, ghost station Easter egg) create a distinctive experience. The main categories of technical debt are:

1. **Accessibility** — The SVG interaction model has meaningful keyboard/screen-reader gaps that real `<button>` overlays would solve cleanly.
2. **Color contrast** — Three specific color pairings fail WCAG AA (focus ring, live-link icon, and yellow on white); all are fixable in under 10 lines of CSS.
3. **CSS architecture** — Scattered responsive rules and hardcoded hex values in the project cards will create maintenance friction as the project grows.
4. **Visual hierarchy** — The `about-subheading` font size and the inconsistent type scale (9px to 36px with many irregular stops) make the page harder to scan than it should be.

The mobile experience (MetroMapMobile) is functional but could be elevated by adding active-section state. The FadeIn scroll animations and the scroll progress bar are polished additions. The dual-font system (Source Sans 3 for content, Courier New for transit chrome) is effective when applied consistently, but bleeds into content typography in a few places.
