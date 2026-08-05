# Murph Family Connection — Event Companion

The official website for the 2026 Murph Family Connection (August 7–9, 2026,
St. Matthews, South Carolina). It has two jobs:

1. Show interactive attendee maps and registration statistics.
2. Let family members submit Family Tree Questionnaire through an embedded
   Google Form.

No database, login, or backend — just HTML, CSS, and JavaScript. Visual
identity is sampled from the official 2026 event shirt and adapted from the
`murph_report_v3_1.html` design reference — see `brand-guide.html`.

This is a single, static, hosting-ready website. Every page is listed below.

## Project Structure

```
murph-family-connection/
├── index.html                        Home page
├── attendee-map.html                  Attendee Map page
├── family-tree-information.html       Family Tree Questionnaire page (Google Form embed)
├── brand-guide.html                   Live visual identity reference (palette, type, components)
├── brand-guide.md                     Same reference, as a portable document
├── google-form-specification.md       Full spec for the embedded Google Form
├── validation-summary.md              QA record, including every design/refinement pass
├── assets/
│   ├── css/
│   │   └── styles.css                 Shared design system (colors, type, layout) — presentation layer
│   ├── partials/
│   │   ├── header.html                Shared site header/nav (single source of truth)
│   │   └── footer.html                Shared site footer
│   ├── js/
│   │   ├── modules/                   Reusable ES modules (data, config, rendering)
│   │   │   ├── config.js              Site + Google Form configuration — configuration layer
│   │   │   ├── data-service.js        Loads data/attendees.json — data access layer
│   │   │   ├── layout.js              Injects header/footer partials, marks active nav item
│   │   │   ├── map-utils.js           Shared Leaflet helpers (radius scaling, markers, fallback)
│   │   │   ├── us-map.js              United States map (Leaflet)
│   │   │   ├── sc-map.js              South Carolina map (Leaflet)
│   │   │   ├── county-map.js          Shared county-map renderer (boundary + markers)
│   │   │   ├── calhoun-map.js         Calhoun County map (thin wrapper over county-map.js)
│   │   │   ├── orangeburg-map.js      Orangeburg County map (thin wrapper over county-map.js)
│   │   │   ├── stats-panel.js         Registration statistics tiles
│   │   │   ├── highlights-panel.js    Event highlights list
│   │   │   ├── rankings-table.js      Community rankings table
│   │   │   └── data-note-panel.js     Data Note section
│   │   └── pages/                     One small entry script per page, wiring modules together
│   │       ├── home.js
│   │       ├── attendee-map.js
│   │       ├── family-tree.js
│   │       └── brand-guide.js
│   └── images/
│       └── murph-mark.svg             Site mark/logo (design-inspired, not the shirt art)
└── data/
    ├── attendees.json                 Registration data that drives the maps/stats
    └── sc-counties.geojson            Real Calhoun + Orangeburg county boundaries (Census TIGER, via us-atlas)
```

There is one homepage (`index.html`), one project structure, and one
authoritative codebase — no parallel or duplicate versions of the site.

## Local Development

The site loads data and the shared header/footer with `fetch()`, which
browsers block on `file://` URLs. Serve the folder with any simple local
server, for example:

```bash
python3 -m http.server 8000
```

then open:

```text
http://localhost:8000
```

(Run that command from inside the `murph-family-connection` folder.)

## Updating Registration Data (Maps & Statistics)

Everything on the Attendee Map page — both maps, the community rankings
table, the statistics tiles, the highlights, and the Data Note — is
generated from one file:

**`data/attendees.json`**

When a new registration spreadsheet is provided:

1. Update `statistics` with the new totals (named/mapped/unmapped
   registrations, states represented, federal districts represented).
2. Update `states` with each state's current registration count, `lat`,
   and `lon` (used to place its marker on the United States map). A quick
   way to find a state's approximate center is searching "[state name]
   geographic center latitude longitude."
3. Update `southCarolinaCommunities` with each community's current
   registration count, `lat`, `lon`, and `county` — search "[community
   name] SC latitude longitude" for the coordinates. The `county` field
   (e.g. `"Calhoun"`, `"Orangeburg"`) determines whether a community
   appears on the Calhoun County or Orangeburg County map; communities in
   any other county appear only on the South Carolina map, not on a
   county map.
4. Update `otherSouthCarolinaCount` if there are South Carolina
   registrations that aren't attributed to one of the listed communities.
5. Update `highlights` (each has an `icon` and `html` field) with 3–5
   short, factual statements the new numbers support — only include
   statements the data actually shows.
6. Update `dataNote.summary` and `dataNote.stats` to match the new totals.
7. To highlight a different South Carolina community, add
   `"highlight": true` to that community's entry (currently used for
   St. Matthews and Orangeburg).

No other file needs to change — the maps, table, and stats all re-render
automatically from `data/attendees.json` the next time the page loads, via
`assets/js/modules/data-service.js`.

### How the maps work

All four maps — United States, South Carolina, Calhoun County, and
Orangeburg County — are drawn with [Leaflet](https://leafletjs.com/) (see
`assets/js/modules/us-map.js`, `sc-map.js`, `county-map.js` +
`calhoun-map.js`/`orangeburg-map.js`, and the shared helpers in
`map-utils.js`) over a light CartoDB basemap, loaded at runtime from a
CDN — so an internet connection is required to view the maps (the
surrounding page and Google Form still work without it). Markers are
numbered, proportionally-sized circles with a gold ring (not shaded/heat-
mapped), matching the approved design; the count is shown as text on every
marker, and each opens a popup with the community/county/state name and
count. If the map tiles or Leaflet itself can't load, the map frame shows
a plain-text fallback pointing at the Community Rankings table instead of
a blank map.

### County Map Boundary Source

The Calhoun County and Orangeburg County maps draw the real county
boundary — not a hand-drawn shape. The geometry comes from Census
TIGER/Line data, distributed as TopoJSON by the
[`us-atlas`](https://github.com/topojson/us-atlas) npm package
(`counties-10m.json`), converted to GeoJSON and trimmed to just these two
counties (FIPS `45017` Calhoun, `45075` Orangeburg). The result is bundled
locally at `data/sc-counties.geojson` (~3 KB) so the county maps have no
CDN dependency beyond the same Leaflet/CartoDB tiles the other maps
already use.

To add another South Carolina county map later:

1. `npm install us-atlas topojson-client` in a scratch folder.
2. Load `node_modules/us-atlas/counties-10m.json`, run it through
   `topojson.feature(topo, topo.objects.counties)`, and find the county
   by its FIPS code (the first two digits are always `45` for South
   Carolina).
3. Add that feature to `data/sc-counties.geojson`, then add a `county`
   value on the relevant `southCarolinaCommunities` entries and a new
   thin wrapper module modeled on `calhoun-map.js`.

## Updating the Google Form

The embedded form's URL lives in exactly one place:

**`assets/js/modules/config.js`** → `CONFIG.googleFormEmbedUrl`

To swap the development form (built under a personal Google account) for
the official Murph Family Connection form after committee approval:

1. Build/confirm the official form under the official Google account,
   using `google-form-specification.md` as the reference.
2. In Google Forms, click **Send → `<>` (embed)** and copy the URL inside
   `src="..."`.
3. Paste that URL into `googleFormEmbedUrl` in
   `assets/js/modules/config.js`.

Nothing else needs to change. The Family Tree Questionnaire page should
otherwise remain unchanged unless the committee updates the genealogy
questions themselves (in which case, update `google-form-specification.md`
to match).

## Design & Brand Guide

The palette is sampled directly from the 2026 event shirt photo (fabric,
tree-leaf greens, trunk ink, gold banner) and calibrated for on-screen
contrast. As of v1.3, royal blue (mostly its darker, navy end) is the
site's dominant organizing color — header, hero, page-header bands, stat
tiles, map frames, and footer — with warm gold reserved for accents and
forest green used only on the maps and highlighted rows, not page chrome.
Body copy, cards, tables, and the Google Form stay on ivory/white for easy
reading. Typography (Playfair Display + Lora), section rhythm, and
component styling (stat cards, highlight panels, data notes, map markers)
were adapted from the `murph_report_v3_1.html` design reference. Neither
source's artwork is reproduced anywhere on the site.

All tokens live at the top of `assets/css/styles.css` and are reused across
every page. For the full reference — palette with sampled hex values,
typography, buttons, cards, tables, navigation, map markers, icon and
divider style, spacing, and accessibility requirements — see:

- **`brand-guide.html`** — live, styled reference (open it like any other page)
- **`brand-guide.md`** — the same reference as a portable document

Any future page or feature should reuse these tokens and components rather
than introducing new colors, fonts, or button styles.

## Accessibility

- Semantic HTML, skip-to-content link, and visible keyboard focus states
- Map markers are keyboard-focusable, show their count as text (not
  color-only), and open a text popup with full details on click, Enter,
  or Space
- High-contrast text colors against the ivory background (WCAG AA
  verified — see `validation-summary.md`)
- Responsive layout for mobile, tablet, and desktop; the embedded Google
  Form never forces horizontal scrolling
- `prefers-reduced-motion` disables hover-lift transforms, scroll
  smoothing, and map pan/zoom animation

## Architecture: Built for Future Expansion (Not Implemented)

Per the approved scope, this version does not include login, passwords,
accounts, profiles, or roles. The project is deliberately organized so that
future versions can add the following **without redesigning the public
site**:

- Optional member login
- Member profiles
- Self-service family information updates (editing what was submitted via
  the Google Form)
- Reunion registration (replacing/supplementing the current
  spreadsheet-based process)
- Committee administration tools

This is supported by three separations already in place:

- **Presentation vs. data vs. configuration.** HTML/CSS never contains
  registration numbers or the Google Form URL — those live in
  `data/attendees.json` and `assets/js/modules/config.js` respectively. A
  future backend could replace the static JSON file with an authenticated
  API, or add new configuration values, without touching page markup.
- **Modular JavaScript.** `assets/js/modules/` holds small, single-purpose,
  reusable functions (data loading, each map, each panel) with no
  page-specific logic baked in. `assets/js/pages/` holds one small entry
  script per page that just wires modules together. A new page (e.g. a
  future member dashboard) would add one more small entry script and reuse
  the existing modules.
- **Modular navigation.** The header and footer are single HTML partials
  (`assets/partials/header.html`, `footer.html`) loaded into every page by
  `assets/js/modules/layout.js`. Adding an account/profile link later means
  editing one file — it does not mean hunting through every page.

## Deploying to GitHub Pages

The site is plain static files — no build step, server-side language, or
database — so it works on any static host. GitHub Pages is the recommended
option:

1. **Repository structure.** Push the contents of this folder to a GitHub
   repository with `index.html` at the repository root (not nested inside
   a subfolder), exactly as laid out in **Project Structure** above.
2. **Publish from the main branch.** In the repository, go to **Settings
   → Pages**, set **Source** to "Deploy from a branch," choose the
   **main** branch and the **/ (root)** folder, then save. GitHub Pages
   builds and publishes automatically — no CI configuration is required.
3. **Confirm it's live.** GitHub shows the published URL (typically
   `https://<username>.github.io/<repository-name>/`) once the first
   deploy finishes, usually within a minute or two.
4. **Every path in the site is relative**, so it works correctly whether
   it's served from a domain root or a subpath like
   `/murph-family-connection/` — no configuration changes needed either
   way.

### Updating After Launch

- **Registration data:** see **Updating Registration Data** above — edit
  `data/attendees.json`, commit, and push to `main`. GitHub Pages
  redeploys automatically.
- **The Google Form:** see **Updating the Google Form** above — edit
  `assets/js/modules/config.js`, commit, and push.
- **Ongoing maintenance:** because presentation, data, and configuration
  are kept in separate files (see **Architecture: Built for Future
  Expansion** below), most future updates only require editing
  `data/attendees.json` or `assets/js/modules/config.js` — no page markup
  needs to change for a routine data or form update.

## Version History

- **v1.4 — Final Project Cleanup & GitHub Pages Readiness.** Retired the
  standalone preview concept: removed `murph_event_companion_preview.html`
  and the four unreferenced pre-v1.1 deprecated script stubs. This site
  (`index.html` plus `attendee-map.html`, `family-tree-information.html`,
  `brand-guide.html`, and `assets/`/`data/`) is now the single, official,
  production version — there is no parallel or duplicate copy anywhere in
  the project. Rewrote this README around local development and GitHub
  Pages deployment instead of a preview workflow. No design, layout, data,
  or functionality changed in this pass — see `validation-summary.md`.
- **v1.3 — Blue-Led Presentation & County Maps.** Made royal blue (mostly
  its navy end) the site's dominant organizing color across the header,
  hero, new page-header bands, stat tiles, map frames, and footer —
  every gradient stays within a narrow dark-navy range so gold and white
  text remain WCAG AA-legible everywhere on it, verified programmatically.
  Added two new maps, Calhoun County and Orangeburg County, each drawing
  the real county boundary (Census TIGER/Line data via `us-atlas`, bundled
  locally, not hand-drawn) with proportional markers for St. Matthews (45)
  and for Orangeburg (37) + Cordova (4) respectively — the only
  communities in the approved data attributed to those counties. Both big
  CTA buttons on the home page moved into the blue family (royal blue /
  navy) instead of blue/forest-green. Updated the standalone preview,
  Brand Guide, and this README to match; no registration totals changed.
- **v1.2 — Visual Integration & Accessible Preview Pass.** Adopted
  Playfair Display + Lora typography and richer section/stat/highlight
  styling adapted from the `murph_report_v3_1.html` design reference;
  switched both maps from D3/topojson outlines to Leaflet over a real
  basemap with numbered gold-ring markers and load-failure fallbacks;
  added a home-page event snapshot and "Stronger Together" motto badge;
  reordered the Attendee Map page and added a dedicated Data Note section;
  added the standalone `murph_event_companion_preview.html`. Verified
  registration data and Google Form field order against the approved
  control totals — no data changes were needed (see `validation-summary.md`
  for the full record, including why the reference file's own numbers and
  household-level data were not used).
- **v1.1 — Final Refinement Pass.** Sampled the brand palette directly from
  the official event shirt photo; restructured JavaScript into reusable ES
  modules with shared header/footer partials; added a Brand Guide;
  corrected the Google Form ancestor order (Mother before Father); added
  natural design accents (leaf glyph, gold dividers).
- **v1.0 — Event Companion.** Initial build: home page, attendee maps
  (United States + South Carolina), community rankings, registration
  statistics, event highlights, and the embedded Google Form page.

This is not a genealogy website, family archive, or permanent family portal.
