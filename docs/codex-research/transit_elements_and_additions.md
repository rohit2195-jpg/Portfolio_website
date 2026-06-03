# Transit Elements & New Additions — Research Pass

**Date:** 2026-06-02
**Repo:** `/Users/rohitsattuluri/Projects/Portfolio_website`
**Author note:** Claude Code research pass, via web search.

## Purpose & relationship to existing docs

This file is **complementary, not a replacement** for the existing research already in the repo. Before writing it, I read:

- `docs/codex-research/global_subway_ideation_matrix.md` — a 912-line, concept-heavy catalog of *global* metro art motifs (London moquette, Tokyo station numbering, Stockholm bedrock caves, Moscow mosaics, Bilbao Fosteritos, etc.) plus ~40 idea blueprints and 4 whole-site paradigms.
- `docs/SUBWAY_ART_REDESIGN_SPEC.md`, `docs/METRO_SPEC.md`, `docs/CUSTOM_MAP_PLAN.md` — the approved redesign direction and what is already built or planned.

Those already cover the *conceptual / aesthetic* space well. So this pass deliberately leans the other way: **concrete, buildable resources** — live data APIs, open-source libraries, fonts, and generators — that turn the metro theme from decoration into *function*, plus a handful of genuinely new motifs not in the matrix. Each idea below notes how it fits this project's actual stack (React + Vite, HashRouter, `/Portfolio_website/` base path, real WMATA map hero, DC line-color palette).

**Non-duplication:** Already built/planned (do not re-propose as new): WMATA map hero, departures board, split-flap text component, Roundel, MetroCard/Oyster reader, line manifests, timeline strip-map, moquette accents, ghost-station easter egg, planned scroll-driven train, custom SVG map, dot-matrix text, enamel signs, tactile paving. The ideas here either go *deeper* (real data behind a board that currently shows fake data) or are *new* (live DC train API, generative audio, brutalist coffer hero, poster engine).

---

## Part 1 — Make it real: live DC Metro data (highest-impact, on-theme)

The single biggest upgrade available: the metro theme is currently *cosmetic*. WMATA publishes a **free, real-time public API**, and the site is literally themed on the DC Metro. Wiring even one live element makes the whole conceit feel earned.

### What's available
- **WMATA Developer Portal** ([developer.wmata.com](https://developer.wmata.com/)) — free API key, auto-generated docs, in-browser API console. Endpoints include **real-time train arrival predictions per station**, service alerts ("incidents"), and elevator/escalator status. ([Developer Resources | WMATA](https://wmata.com/about/developers/))
- **GTFS + GTFS-Realtime** — static schedule `.zip` plus a realtime feed with arrival predictions and vehicle positions. ([WMATA | GTFS](https://www.wmata.com/initiatives/plans/Better-Bus/better-bus-gtfs.cfm))

### How it fits this project
- **Live departures board.** The charcoal departures board already exists but shows authored copy. Swap a panel to show *actual* next-train predictions for a real station (e.g. the user's home/work station, or Metro Center). Cache client-side; show a "last updated" flap.
- **"Service status" health badge.** Pull the incidents endpoint → render a real "Good Service / Minor Delays" enamel badge in the header, mirroring TfL status boards. Self-deprecating fallback copy when the API is down ("Single tracking").
- **Constraint:** This is a static GitHub Pages site (no backend — `backend/` is a placeholder). Options: (a) call the API directly from the browser with a public key (note: keys are visible client-side; WMATA keys are free/rate-limited, acceptable risk for a portfolio), or (b) a tiny serverless proxy (Cloudflare Worker / Vercel function) if key-hiding matters. Document the choice.
- **Precedent that this works:** Alexander Chen's **mta.me "Conductor"** polls the *real* MTA public API to spawn trains in realtime — proof a browser-only art piece can ride live transit data. ([Mta.me — Alexander Chen](https://www.chenalexander.com/Mta-me))

---

## Part 2 — Off-the-shelf building blocks (don't hand-roll these)

### Split-flap / Solari departure boards
The repo already has a `SplitFlapText` component, but if it needs hardening or a richer board, mature open-source references exist:
- [robonyong/react-split-flap-display](https://github.com/robonyong/react-split-flap-display) — React + CSS Solari component (closest to this stack).
- [spite/SolariDisplay](https://github.com/spite/SolariDisplay) and the [clicktorelease writeup](https://www.clicktorelease.com/blog/split-flap-display/) — canonical CSS/JS implementation with the 3D flap transition.
- [baspete/Split-Flap](https://github.com/baspete/Split-Flap) — data-driven board that renders JSON as a flap grid (good model for feeding it WMATA data from Part 1).

### Schematic transit-map rendering (for the planned custom SVG map)
`docs/CUSTOM_MAP_PLAN.md` wants to eventually replace the WMATA `<img>` with an inline SVG. These libraries do the hard geometry:
- [johnwalley/d3-tube-map](https://github.com/johnwalley/d3-tube-map) (`npm i d3-tube-map`) — draws London-Underground-style maps from a JSON line/station graph. Cleanest fit for a hand-curated 6-station "portfolio line."
- [d3metro](https://github.com/d3metro/d3metro) / [d3metro.github.io](http://d3metro.github.io/) — an existing **DC Metro** map built entirely in SVG + D3. Directly relevant reference for a WMATA-styled inline map.
- [juliuste/transit-map](https://github.com/juliuste/transit-map) — generates a schematic "metro map" from any network graph via Mixed-Integer Programming (overkill now, but the octolinear-routing reference is gold for a custom map).

### Fonts — dot-matrix / LED departure type
For the dot-matrix display text the spec calls for:
- [nickswalker/seattle-transit-dot-matrix](https://github.com/nickswalker/seattle-transit-dot-matrix) — fonts replicating *real* transit dot-matrix displays (King County Metro / Sound Transit / Link). More authentic than generic LED fonts.
- Generic fallback: "LED Dot-Matrix" webfont, widely mirrored ([cdnfonts](https://www.cdnfonts.com/led-dot-matrix.font)). Self-host via `@font-face` through a Vite import (don't hardcode a root-relative URL — base path is `/Portfolio_website/`).

### Moquette / tile pattern generators
The matrix proposes "procedural moquette." These tools generate the actual repeating SVG:
- [Pattern Monster](https://pattern.monster/), [Hero Patterns](https://heropatterns.com/), [fffuel rrrepeat](https://www.fffuel.co/rrrepeat/) — export seamless SVG tiles. Use them to author the DC-palette moquette once, then ship as an optimized inline SVG `<pattern>`.

---

## Part 3 — New motifs NOT already in the matrix

### 3.1 Brutalist coffered-vault hero (DC-specific, deeply authentic)
The matrix surveys global *art*, but underuses what makes the **DC** Metro iconic: Harry Weese's **brutalist coffered concrete vaults**, directly inspired by the Roman Pantheon, lit by William Lam's indirect uplighting. Each station is a 600-ft column-free vault — "monumental public space." ([SOSBRUTALISM](https://www.sosbrutalism.org/cms/17140123), [Atomic Ranch](https://www.atomic-ranch.com/retro-road-trip/brutalist-dc-metro/))

**Idea:** A coffered-vault backdrop behind the hero or section headers — a CSS/SVG repeating coffer grid in concrete gray with a soft top-down light gradient (recreating Lam's lighting) and the dramatic shadow falloff the vaults are famous for. This is the most *honest* DC-Metro flourish available and nobody else's portfolio has it. Pairs with the existing red-tile platform-edge stripe. Keep it subtle in dark mode (concrete → graphite).

### 3.2 Generative "Conductor" audio — the line as an instrument
Alexander Chen's mta.me turns subway lines into a **string instrument**: line length sets pitch, crossing lines pluck each other, driven by real schedule data. ([Fast Company](https://www.fastcompany.com/1663129/mtame-google-engineer-turns-subway-lines-into-musical-instruments), [Hyperallergic](https://hyperallergic.com/46051/alexander-chen-conductor-www-mta-me/))

**Idea (opt-in, muted by default):** Each of the 6 portfolio stations plays a soft note on hover/click as you "ride the line" down the page. Compose them as a chord so any scroll path sounds pleasant. This also nods to **Japanese departure melodies (hassha merodii)** — short, station-specific signature tunes designed to be calming and identifiable, composed by people like Minoru Mukaiya (170+ melodies). ([Train melody — Wikipedia](https://en.wikipedia.org/wiki/Train_melody), [JRPass](https://www.jrpass.com/blog/japan-train-station-music-what-hassha-merodii-is-and-why-every-station-has-its-own)) Implement with the Web Audio API or a tiny synth lib; always respect `prefers-reduced-motion` / a mute toggle. The matrix's "E1 Ekimelo themelets" gestures at this; the *new* part is tying it to scroll position as a continuous instrument, not isolated nav chimes.

### 3.3 Vintage London Transport poster engine (a real content surface)
Frank Pick's London Transport poster program (1910s–30s) commissioned Surrealists and Modernists (Man Ray, Paul Nash, Hans Schleger "Zero") under themes like **"Keeps London Going," "Brightest London," "Away from it all."** ([Google Arts & Culture — Poster Art 150](https://artsandculture.google.com/story/poster-art-150-london-underground-s-greatest-designs-london-transport-museum/hgWhwYKj_Cs3LA), [Art UK](https://artuk.org/discover/stories/art-matters-podcast-poster-designs-for-the-london-underground))

**Idea:** Render each **project** as a mid-century travel poster — bold flat color block, big sans headline, "destination" framing ("VISIT: *Project Name* — change at Blue Line"). This turns the Projects section into a poster wall instead of cards, and reuses the existing DC palette as the poster color fields. Distinct from the matrix's "transfer sticker wall" (overlapping draggable labels) — this is a clean, framed gallery of authored posters.

### 3.4 Live "Live Map" service-change overlay
The MTA's **Live Subway Map** (Work & Co, replacing The Weekender) overlays real-time service changes and animated train movement on the Vignelli-style diagram. ([MTA press release](https://www.mta.info/press-release/mta-launches-groundbreaking-subway-map-creating-next-generation-map-following-iconic-hertz-and-vignelli-designs), [Gothamist](https://gothamist.com/news/mta-unveils-new-digital-live-subway-map-simplify-service-changes))

**Idea:** A small animated train dot that travels the 6-station portfolio line as the user scrolls (the planned scroll-driven train) — but extend it with a *playful* "service change" banner system that surfaces real content: "Weekend service: new project added at Blue Line." Drives users to new/updated sections the way real transit alerts drive attention.

---

## Part 4 — Quick-win backlog (ranked by impact ÷ effort)

| # | Idea | Effort | Why it's worth it |
|---|------|--------|-------------------|
| 1 | **Live WMATA departures panel** on the existing board | M | Turns the centerpiece from prop to functioning instrument; uniquely possible because the site is DC-themed |
| 2 | **Real service-status enamel badge** in header (WMATA incidents API) | S | One API call; instantly "alive"; great fallback-copy humor |
| 3 | **Authentic transit dot-matrix font** (Seattle GH repo) for the board | S | Swaps generic LED for real-transit type; pure CSS |
| 4 | **Brutalist coffered-vault** hero/section backdrop (CSS/SVG) | M | The most DC-honest flourish; nobody else has it |
| 5 | **Opt-in line-as-instrument audio** on station hover | M | Memorable, sharable; gate behind a mute toggle + reduced-motion |
| 6 | **Project-as-travel-poster** layout for Projects section | M | Reframes existing content; reuses palette; strong visual identity |
| 7 | **d3-tube-map / d3metro** reference for the planned custom SVG map | L | De-risks `CUSTOM_MAP_PLAN.md`; proven DC-Metro SVG precedent |

**Recommended first move:** #2 then #1 — they require no design work, prove the live-data concept, and are the difference between a *picture* of a metro and a *working* one. Everything else is polish on top.

### Build constraints to respect (from CLAUDE.md)
- Static GitHub Pages + **HashRouter** + base path `/Portfolio_website/` — any new route must work under `#/path`; all assets go through Vite imports.
- API keys are client-visible on a static host; use a free WMATA key (acceptable) or a serverless proxy if hiding it matters.
- Keep the **real WMATA map** hero (durable preference). Audio and motion must honor `prefers-reduced-motion` and a mute control.
- **Don't auto-commit** — leave changes staged for the user.

---

## Part 5 — Content → transit-device mappings (the "oh wow" list)

This is the heart of the request: take information the portfolio *already has* and re-present it through a **real transit information-design device**. The two that already land — **skills as London fare zones** and **timeline as a horizontal strip map** — work because they map a *property of the data* (proficiency = distance from center; chronology = distance along a line) onto a *property of the device*. Every idea below follows that same rule: pick a real artifact whose visual logic mirrors the data's structure. Sorted strongest-first.

### 5.1 Projects → Local vs. Express service (a filter that IS the metaphor) ⭐
NYC subway runs **local** (stops at every station, ● marker) and **express** (skips stops, ◆ marker) on the same line; some are even split into separate services (the historic 1/9 skip-stop). ([Skip-stop — Wikipedia](https://en.wikipedia.org/wiki/Skip-stop), [Express vs Local — NYC Moov](https://www.nycmoov.com/guide/express-vs-local-nyc-subway-the-beginner-s-guide-to-every-line))
**Map it:** A toggle on the Projects line — **"Express service"** shows only featured/flagship projects (the train skips the small stops); **"Local"** stops at every project. Use the real ●/◆ bullets next to each. This is rare because the *filter control itself* is the metaphor, not decoration — flipping it visibly "skips" stations on the line. Highest oh-wow-per-effort on the list.

### 5.2 Tech stack → interchange / transfer station ⭐
At an interchange, a station shows "change here for" the other lines it connects to. **Map it:** Each project is a station; its tech stack renders as **interchange ticks** — "Change at *ProjectName* for Ⓡ React · Ⓝ Node · Ⓟ Postgres," each tech as its own colored mini-line stub. A project that shares a stack with another becomes a true *interchange* (visually link the two stations). Turns a boring tag list into a connective map and makes the "lines" mean something across the whole site.

### 5.3 Skill recency/usage → service frequency (headway) ⭐
Transit lines advertise frequency: "every 3 min" vs "Sunday service, every 20 min." **Map it:** Extend the fare-zone skills idea with a *frequency* axis — skills you use daily get **"high frequency · every 2 min,"** rusty ones get **"limited service · Sunday only."** Now the skills panel encodes *two* honest signals (depth via zone, freshness via frequency) in pure transit language. Pairs perfectly with the existing zones — same panel, new dimension.

### 5.4 Resume/CV download → a paper Travelcard / season ticket ⭐
A Travelcard is unlimited travel for a duration; price scales with zones. ([London fare zones — Wikipedia](https://en.wikipedia.org/wiki/London_fare_zones)) **Map it:** The "Download résumé" button is styled as a **Travelcard / single-journey ticket** — magnetic stripe, "VALID FOR: Full-time · Contract · Internship," zones = seniority, an orange ticket-stock texture, and a punch/validation stamp animation on click before the PDF downloads. The most *object-real* artifact on the site and an instantly shareable detail.

### 5.5 Experience/education → Oyster journey-history statement ⭐
Oyster/contactless shows a **journey history**: tap-in, tap-out, route, fare per trip. **Map it:** Render work/education as a journey statement — each role is one journey: `Tap in 2021 · Company A → Company B · 2 zones · skills gained: +Rust +k8s`. Chronological, scannable, and it reframes a CV as "where I've travelled." Complements (doesn't replace) the strip-map timeline: the strip map is the *picture*, this is the *receipt*.

### 5.6 Project artifacts → station facility pictograms ⭐
Stations show facility icons (lift, step-free, toilets, ticket office) — pictograms that cross language barriers. ([Transit wayfinding pictograms — Metro Sign & Awning](https://www.metrosignandawning.com/world-on-the-move-approaches-to-transportation-hub-signage-and-wayfinding/)) **Map it:** Each project station carries a row of **facility icons** for what it offers: `[⌥ Source] [▶ Live demo] [✎ Write-up] [▣ Case study] [♿ Beginner-friendly]`. Grey-out the ones a project lacks, exactly like a station with "no step-free access." Communicates a lot in a tiny, on-theme footprint.

### 5.7 "What I can build" → bus spider map
A **spider map** is a schematic of all services radiating from one central locality — designed to be as self-explanatory as the tube map. ([Bus spider maps — TfL](https://tfl.gov.uk/maps_/bus-spider-maps), [Spider map — Wikipedia](https://en.wikipedia.org/wiki/Spider_map)) **Map it:** A "From here you can go to…" diagram with **you/your stack at the yellow central hub** and routes radiating out to the kinds of things you build (web apps, data pipelines, ML, tooling). Different mental model from the linear portfolio line — good for an About or "Services/What I do" block.

### 5.8 Current status → "You are here" + Next Train board
Every platform has a **"You are here"** dot and a next-train indicator. **Map it:** A compact availability widget — `● You are here: Senior Eng @ X` with a **Next Train** board beneath: `Open to: Senior/Staff roles — arriving 2026`. Live-status energy (ties into the WMATA service badge from Part 1) and answers the recruiter's first question in transit language.

### 5.9 Contact → journey planner ("Plan your journey")
TfL/transit journey planners ask From / To / Via. **Map it:** The contact section becomes **"Plan your journey to Rohit"** — From: *you*; To: *Rohit*; **Via:** Email · LinkedIn · GitHub (each a selectable "route option" with an ETA like "usually replies in 1 day"). Reframes the contact links as routes. Extends the existing Help Point rather than replacing it.

### 5.10 404 / empty states → "Station closed / service suspended"
Wayfinding has a whole vocabulary for disruption. **Map it:** 404 = **"This station is closed — no service to this destination,"** with a "Rejoin the line at →" link back to the map; empty photo album = "Service not running here yet." Cheap, delightful, and reinforces the world.

### 5.11 Reading effort → journey length ("4 stops · 12 min")
Journeys are quoted in stops + minutes. **Map it:** Each project/post header shows `● 4 stops · 12 min` as estimated read length, using the line color. Tiny, but it makes the metaphor *consistent down to the labels* — which is exactly what tips a visitor from "cute theme" to "oh, they committed."

### Why these work (the rule to reuse)
A reframing earns the "oh wow" only when the **data's structure matches the device's logic**: ordered → a line (timeline strip map); magnitude/proximity → concentric zones (skills); frequency → headway; presence/absence → facility icons; one-to-many radiating → spider map; sequence of events with cost → journey history. When you invent the next one, start from "what shape is this data?" and pick the transit artifact with the same shape — don't bolt a roundel onto something arbitrary.

---

## Sources

**Transit information-design devices (Part 5)**
- [London fare zones — Wikipedia](https://en.wikipedia.org/wiki/London_fare_zones)
- [Skip-stop — Wikipedia](https://en.wikipedia.org/wiki/Skip-stop) · [Express vs Local — NYC Moov](https://www.nycmoov.com/guide/express-vs-local-nyc-subway-the-beginner-s-guide-to-every-line)
- [Bus spider maps — TfL](https://tfl.gov.uk/maps_/bus-spider-maps) · [Spider map — Wikipedia](https://en.wikipedia.org/wiki/Spider_map)
- [Transit wayfinding & pictograms — Metro Sign & Awning](https://www.metrosignandawning.com/world-on-the-move-approaches-to-transportation-hub-signage-and-wayfinding/) · [APTA Universal Design Guidelines (PDF)](https://www.apta.com/wp-content/uploads/APTA-SUDS-UD-GL-010-20.pdf)

**Live data / APIs**
- [WMATA Developer Portal](https://developer.wmata.com/)
- [WMATA Developer Resources](https://wmata.com/about/developers/)
- [WMATA GTFS](https://www.wmata.com/initiatives/plans/Better-Bus/better-bus-gtfs.cfm)
- [MTA Live Subway Map — press release](https://www.mta.info/press-release/mta-launches-groundbreaking-subway-map-creating-next-generation-map-following-iconic-hertz-and-vignelli-designs)
- [Gothamist — MTA Live Subway Map](https://gothamist.com/news/mta-unveils-new-digital-live-subway-map-simplify-service-changes)

**Libraries / tooling**
- [robonyong/react-split-flap-display](https://github.com/robonyong/react-split-flap-display)
- [spite/SolariDisplay](https://github.com/spite/SolariDisplay) · [clicktorelease writeup](https://www.clicktorelease.com/blog/split-flap-display/) · [baspete/Split-Flap](https://github.com/baspete/Split-Flap)
- [johnwalley/d3-tube-map](https://github.com/johnwalley/d3-tube-map) · [d3metro](https://github.com/d3metro/d3metro) / [d3metro.github.io](http://d3metro.github.io/) · [juliuste/transit-map](https://github.com/juliuste/transit-map)
- [nickswalker/seattle-transit-dot-matrix](https://github.com/nickswalker/seattle-transit-dot-matrix) · [LED Dot-Matrix font (cdnfonts)](https://www.cdnfonts.com/led-dot-matrix.font)
- [Pattern Monster](https://pattern.monster/) · [Hero Patterns](https://heropatterns.com/) · [fffuel rrrepeat](https://www.fffuel.co/rrrepeat/)

**Art / history / precedents**
- [Alexander Chen — mta.me](https://www.chenalexander.com/Mta-me) · [Fast Company on mta.me](https://www.fastcompany.com/1663129/mtame-google-engineer-turns-subway-lines-into-musical-instruments) · [Hyperallergic](https://hyperallergic.com/46051/alexander-chen-conductor-www-mta-me/)
- [Train melody — Wikipedia](https://en.wikipedia.org/wiki/Train_melody) · [JRPass — Hassha Merodii](https://www.jrpass.com/blog/japan-train-station-music-what-hassha-merodii-is-and-why-every-station-has-its-own)
- [Google Arts & Culture — Poster Art 150](https://artsandculture.google.com/story/poster-art-150-london-underground-s-greatest-designs-london-transport-museum/hgWhwYKj_Cs3LA) · [Art UK — LU poster designs](https://artuk.org/discover/stories/art-matters-podcast-poster-designs-for-the-london-underground)
- [SOSBRUTALISM — Harry Weese WMATA vaults](https://www.sosbrutalism.org/cms/17140123) · [Atomic Ranch — DC Metro brutalism](https://www.atomic-ranch.com/retro-road-trip/brutalist-dc-metro/) · [National Trust — Save Brutalism inside the DC Metro](https://savingplaces.org/stories/save-brutalism-inside-washington-dc-metro)
