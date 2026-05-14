# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from `frontend/` (root has only docs + a placeholder `backend/`).

```bash
cd frontend
npm install          # install deps
npm run dev          # local dev server (Vite, default port 5173)
npm run build        # production build → frontend/dist
npm run preview      # serve the built dist locally
```

No tests, no lint config. Verify changes with `npm run build` (Vite errors on type/import problems) and visual inspection via the dev server.

## Deployment

Pushes to `main` trigger `.github/workflows/static.yml`, which builds in `frontend/` and deploys `frontend/dist` to GitHub Pages. Two important consequences:

- **Base path is `/Portfolio_website/`** (set in `frontend/vite.config.js`). All built asset URLs include this prefix. Don't hardcode root-relative URLs in components — use Vite imports or the router.
- **HashRouter is required** (`src/main.jsx`). GitHub Pages doesn't support BrowserRouter without a fallback. New routes must work under `#/path`.

## Architecture

### Status: mid-rehaul

The site is transitioning from a clean multi-page dictionary-styled portfolio to a single-page scroll themed around the DC Metro Map. Both architectures coexist in the repo right now.

- **New (active):** `HomePage.jsx` renders the metro map + all section components stacked vertically. The user clicks a station on the map → smooth-scrolls to the corresponding section below.
- **Legacy (still in `src/pages/`):** `AboutPage.jsx`, `ProjectsPage.jsx`, `ContactPage.jsx`, `Miscellaneous.jsx`. Routes for these still resolve via `App.jsx` but they will be collapsed in Phase 5 of the rehaul. The Photos detail (`PhotoAlbumPage.jsx`) and Time (`Time.jsx`) pages are intentionally kept as separate routes.

Authoritative plans: `docs/METRO_SPEC.md` (full rehaul spec) and `docs/CUSTOM_MAP_PLAN.md` (future replacement of the WMATA SVG with a custom one). Phases 1–3 are done; Phases 4–8 (sticky mini-map, hybrid routing, mobile fallback, theming pass, polish) are pending.

### Data lives in `src/data/`, not in components

`src/data/about.js`, `src/data/timeline.js`, `src/data/projects.js` are the single source of truth for page content. Section components (`src/components/sections/*Section.jsx`) consume from these. The legacy `src/pages/*.jsx` files have been refactored to do the same. **Edit data files when updating bio/projects/experience copy** — not the components.

### The metro map

`src/components/MetroMap/MetroMap.jsx` renders `src/assets/wmata-map.svg` (a heavily stripped WMATA SVG — text labels, legend, state names, line-end badges, dashed indicators all removed; ~28 KB) as an `<img>`, with portfolio station markers absolutely-positioned on top via percentage coordinates. The 6 portfolio markers are defined in `src/components/MetroMap/stations.js` — coordinates are in WMATA SVG viewBox space (760 × 630), pulled from the actual station circle path data in the SVG. Don't hand-guess these coordinates; extract them from the SVG with a script (see chat history of how this was done) or use a known station's `cx,cy`.

A round-corners SVG filter (`<filter id="round-corners">`) is injected into the SVG itself to soften the 2010-era square line shapes. The plan in `docs/CUSTOM_MAP_PLAN.md` argues for replacing the entire WMATA SVG with a from-scratch inline SVG — read that doc before doing major map work.

Map click handler: `MetroMap` calls `onNavigateToSection(section)` where section is one of `about | projects | timeline | photos | clock | contact`. `HomePage` maps each to a DOM anchor id and smooth-scrolls. `photos` and `clock` are sub-anchor ids inside `MiscellaneousSection`.

### Section shells

Every content section is wrapped in `SectionHeader`, which composes `LineHeader` (colored bar + black station node) + `DictionaryHeader` (title + pronunciation + definition line) + `BackToMap` (scrolls to `#map`). All in `src/components/sections/`. Line colors per section follow the DC Metro palette and are passed as the `color` prop:

- About → `#BF0D3E` Red
- Projects → `#0072CE` Blue
- Timeline → `#00B140` Green
- Miscellaneous → `#E3801C` Orange
- Contact → `#FFD200` Yellow

### Theming

`Layout.jsx` toggles a `data-theme="light|dark"` attribute on `<html>` and persists the choice in `localStorage["portfolio-theme"]`. All colors flow through CSS custom properties in `:root` and `[data-theme="dark"]` blocks at the top of `src/styles.css`. The metro map image is light-only by design — dark mode keeps its white background intact (see `.metro-map-frame` rule).

### Photo albums

`src/photoAlbums.js` uses `import.meta.glob` to scan `src/assets/photos/*/` at build time. Each subdirectory becomes an album, sorted alphabetically. A file named `cover.jpg` (or similar) becomes the album cover; other images become its contents. To add a new album: drop a folder with images into `src/assets/photos/`, including a `cover.*` file. No code changes needed.

### Fonts and icons

- **Source Sans Pro 3** loaded from Google Fonts in `frontend/index.html` (preconnected). Used throughout sections and the metro map labels.
- **Font Awesome** loaded from cdnjs in `frontend/index.html`. Use class names like `fa-regular fa-clock`, `fa-brands fa-github`.
- **Devicon** loaded per-icon from CDN at `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/<tech>/<tech>-original.svg`. Used in `AboutSection` for skill logos. No local install.

### Things to know before editing

- **Don't auto-commit.** Save changes and let the user commit (durable preference — see `.claude/memory/feedback_commits.md`).
- **For map visual work**, prefer reading the WMATA SVG's actual station coordinates over guessing. The path data follows the pattern `<path ... d="M X,Y c0,2.762..." />` for regular 5-radius station circles. Transfer stations are wrapped in `<g transform="translate(tx,ty)">` with an inner circle centered at `(219.5, 762.5)`.
- **The dev server at `/Portfolio_website/`** (not `/`) — the base path is required.
