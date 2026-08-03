# Validation Summary — v1.4 Final Project Cleanup & GitHub Pages Readiness

This document records every change made during the v1.4 pass and the checks
performed to confirm the site still meets spec. It supersedes the v1.3 summary
below, which is kept for history (and itself documents the v1.1–v1.2 passes).

## What Changed in This Pass

Version 1.4 retires the standalone preview concept. The modular website —
`index.html`, `attendee-map.html`, `family-tree-information.html`,
`brand-guide.html`, plus `assets/` and `data/` — is now the sole, official
production version of the Murph Family Connection Event Companion. **No
design, layout, styling, colors, maps, navigation, Google Form integration,
statistics, attendee data, functionality, or accessibility behavior changed
in this pass.** Only project organization and documentation were updated.

### 1. Standalone preview retired

- Removed `murph_event_companion_preview.html` from the project entirely.
  It served its purpose during design review (a single self-contained file
  for quick local viewing without a server); now that the modular site is
  approved as final, maintaining a second, functionally-duplicate copy of
  the site would mean two sources of truth to keep in sync going forward,
  which is exactly what the project should avoid at this stage.
- Removed the four unreferenced pre-v1.1 deprecated script stubs
  (`assets/js/attendee-map.js`, `family-tree-config.js`,
  `family-tree-form.js`, `nav.js`). These were kept as no-op deprecation
  notices in earlier passes only because file deletion wasn't available in
  the working environment at the time; no page has referenced them since
  v1.1. They're gone now that deletion is possible.
- Confirmed via `grep` that no page, script, or document references the
  removed files, and that the word "preview" (and "standalone,"
  "prototype," "draft") no longer appears anywhere describing the website
  itself — the only remaining "preview" mentions are inside this
  document's and the README's own version-history entries, which
  accurately record that a preview file *used to exist* and was retired in
  this pass. That's a historical record, not a description of the current
  site, so it was left as-is rather than being scrubbed.

### 2. README rewritten for production + GitHub Pages

- Removed the "Opening the Standalone Preview" section and every
  preview-related step inside "Updating Registration Data" and "Updating
  the Google Form."
- Renamed "Running the Modular Site" to **Local Development**.
- Replaced "Future Hosting" with a full **Deploying to GitHub Pages**
  section: repository structure, publishing from the `main` branch via
  Settings → Pages, confirming the live URL, and a short "Updating After
  Launch" pointer back to the data/form update steps plus a note on
  ongoing maintenance.
- Project Structure diagram updated to drop the preview file and the
  deprecated-scripts line.

### 3. Brand Guide reviewed

- Checked `brand-guide.md` and `brand-guide.html` for "preview,"
  "prototype," or "draft website" wording — found none. No changes were
  needed; both already described the site in production terms.

### 4. Metadata and duplicate-version check

- Re-checked every page's `<title>` and `<meta name="description">` — all
  five pages (Home, Attendee Map, Family Tree Information, Brand Guide,
  plus the now-removed preview) already identified the site as "Murph
  Family Connection" / "Event Companion," never as a preview. No Open
  Graph tags exist on the site; none needed to change.
- Removed the two stray duplicate copies of the project (`murph-family-
  connection 2`, `murph-family-connection 3`) and five outdated project
  zip files that had accumulated in the working folder across earlier
  passes, so there is exactly one project folder and one current
  downloadable package.

## Validation Checks Performed (v1.4)

| Check | Method | Result |
|---|---|---|
| No preview/prototype/draft language remains | Recursive grep for "preview," "standalone," "prototype," "draft" across all HTML/JS/MD | ✅ Zero matches describing the website itself; only accurate historical version-history entries remain |
| No references to the removed preview file | Recursive grep for `murph_event_companion_preview.html` | ✅ Zero references in any HTML or JS file |
| No obsolete/deprecated files remain | `find` for the four removed script stubs | ✅ Confirmed absent; nothing referenced them before removal |
| No duplicate website versions | Directory listing of the working folder | ✅ Exactly one `murph-family-connection` project folder |
| Page titles / meta descriptions | Manual review of all 4 remaining pages | ✅ All identify the site as "Murph Family Connection" / "Event Companion"; none mention "preview" |
| Relative paths / imports still resolve after file removal | Scripted scan of every HTML reference and JS `import`, re-run after deletions | ✅ 22 HTML references and 23 JS imports still resolve correctly |
| HTML validity | Parsed all 6 remaining HTML files with a strict parser | ✅ No parse errors |
| JS / JSON / GeoJSON validity | Syntax-checked all remaining module/page scripts; parsed `attendees.json` and `sc-counties.geojson` | ✅ All valid |
| No functional regression | Re-ran the real-Leaflet functional test against the modular site (unchanged since v1.3) | ✅ 13 US markers, 9 SC markers, 1 Calhoun marker + boundary, 2 Orangeburg markers + boundary — identical results to the v1.3 pass |
| No absolute local paths / Mac-specific references | Grepped all HTML/JS/MD for `/Users/`, `file://`, and other local-machine path patterns | ✅ None found — every reference is relative or a public CDN URL |
| GitHub Pages compatibility | Reviewed that `index.html` sits at the project root and every asset reference is relative (no leading `/`) | ✅ Confirmed — deployable by pushing this folder's contents to a repository and enabling Pages |

## GitHub Pages Deployment Checklist

1. Push the contents of `murph-family-connection/` to a GitHub repository, with `index.html` at the repository root.
2. In the repository, go to **Settings → Pages**, set **Source** to "Deploy from a branch," select **main** and **/ (root)**, and save.
3. Wait for the first deploy to finish (usually under a couple of minutes), then open the published URL GitHub shows on that same settings page.
4. Click through all three nav items (Home, Attendee Map, Family Tree Information) plus Brand Guide on the live URL to confirm navigation, both maps, both county maps, the rankings table, and the embedded Google Form all load correctly.
5. Resize the browser (or check on a phone) to confirm the responsive layout holds up on the live URL, not just locally.
6. When the official Google Form is ready, update `assets/js/modules/config.js` → `googleFormEmbedUrl`, commit, and push — GitHub Pages redeploys automatically.

## Known Limitations (carried over, unchanged)

- The maps require an internet connection to load Leaflet and the CartoDB
  basemap tiles at runtime (the county boundary shapes themselves are
  bundled locally and don't need the network); all four map frames show a
  clear text fallback instead of a blank map if that fails.
- Attendees outside South Carolina are shown at one marker per state, not
  per city, matching the approved control totals' granularity.
- Visual verification relied on real-library functional tests (actual
  Leaflet rendering, actual DOM output, programmatic contrast checks)
  rather than an automated screenshot tool, since headless-browser
  screenshotting isn't available in this environment.

---

# Appendix: v1.3 Validation Summary (Prior Record)

This document records every change made during the v1.3 pass and the checks
performed to confirm the site still meets spec. It supersedes the v1.2 summary
below, which is kept for history (and itself documents the v1.1 pass).

## What Changed in This Pass

### 1. A stronger, blue-dominant presentation

Royal blue (mostly its darker navy end, `#123F72`) is now the site's
organizing color, matching the confident, editorial-blue direction shown in
the reference screenshot the user provided this pass: the header/nav bar,
the home-page hero, a new `.page-header` band that opens the Attendee Map,
Family Tree Information, and Brand Guide pages, the "By the Numbers" stat
tiles, every map frame's border, and the footer. Warm gold stays reserved
for accents (dividers, marker rings, numbers, active-nav underline); forest
green moved off page chrome entirely and now appears only on the maps
themselves and highlighted table rows. Body copy, cards, tables, and the
Google Form remain on ivory/white for readability, per the user's explicit
instruction not to make every section blue.

Every gradient used for the blue treatment (hero, page-headers, stat tiles)
was deliberately constrained to a narrow dark-navy range (`#123F72` to
`#0C2C4E`) rather than spanning into the lighter royal blue — an earlier
draft that did span into the lighter blue caused the gold eyebrow/motto
text to fail WCAG AA (2.63:1) at the lighter end. This was caught by the
programmatic contrast check described below, not left to chance.

The two home-page CTA buttons ("Attendee Map," "Family Tree Information")
both moved into the blue family (royal blue / navy), distinguished by
shade and icon instead of blue vs. forest green.

### 2. Two new county maps

Added a Calhoun County map and an Orangeburg County map to the Attendee
Map page, in the sequence: intro → stats → highlights → US map → SC map →
**Calhoun County → Orangeburg County** → rankings → data note.

- **Calhoun County** shows St. Matthews only (45 registrations) — the only
  community in the approved data attributed to Calhoun County.
- **Orangeburg County** shows Orangeburg (37) and Cordova (4) — the only
  two communities in the approved data attributed to Orangeburg County.
- Both maps draw the real county boundary as a lightly-tinted, blue-
  outlined polygon beneath the markers — **not hand-drawn**. The geometry
  is real Census TIGER/Line data, obtained via the `us-atlas` npm package
  (`counties-10m.json`), extracted for FIPS `45017` (Calhoun) and `45075`
  (Orangeburg), converted to GeoJSON, and bundled locally at
  `data/sc-counties.geojson` (~3 KB) — no extra CDN dependency beyond the
  Leaflet/CartoDB tiles the other maps already use.
- A new `county` field was added to each `southCarolinaCommunities` entry
  in `data/attendees.json` so county membership is data-driven (which
  community appears on which county map is never hardcoded in JavaScript).
- New modules: `assets/js/modules/county-map.js` (shared renderer),
  `calhoun-map.js` and `orangeburg-map.js` (thin per-county wrappers).
  No registration counts were changed or invented — every number traces
  back to the same `data/attendees.json` used everywhere else on the site.

### 3. Standalone preview, Brand Guide, README updated to match

`murph_event_companion_preview.html` gained the same two county map
sections (with the county boundary GeoJSON inlined as a `COUNTY_BOUNDARIES`
JS object) and the same blue-led CSS, so it stays visually identical to
the modular site. `brand-guide.md`/`.html` were updated with the new
palette usage, a "County maps" note under Map Markers, and updated
Navigation/Buttons descriptions. `README.md` gained a "County Map Boundary
Source" section (including how to add another county later) and an
updated data-update walkthrough covering the new `county` field.

## Validation Checks Performed (v1.3)

| Check | Method | Result |
|---|---|---|
| County attendee data matches approved figures | Cross-checked `southCarolinaCommunities` against the county each community is actually in (St. Matthews = Calhoun County seat; Orangeburg and Cordova = Orangeburg County) | ✅ Calhoun map: St. Matthews only (45). Orangeburg map: Orangeburg (37) + Cordova (4) = 41. No other community in the approved data belongs to either county |
| County boundaries are real, not hand-drawn | Extracted via `topojson.feature()` on the real `us-atlas` `counties-10m.json` (Census TIGER/Line data), for FIPS 45017 and 45075; spot-checked resulting lon/lat ranges against known Calhoun/Orangeburg County extents | ✅ Calhoun: 33.47–33.88°N / -81.06 to -80.50°W. Orangeburg: 33.18–33.71°N / -81.37 to -80.22°W — both match expected county extents; St. Matthews, Orangeburg, and Cordova coordinates all fall inside their respective polygons |
| Modular site maps render (all 4) | Real-library functional test: loaded `attendee-map.html` in a headless environment with the actual `leaflet` npm package, called all four render functions, including the async county-map fetch of `data/sc-counties.geojson` | ✅ 13 US markers, 9 SC markers, 1 Calhoun marker + boundary polygon, 2 Orangeburg markers + boundary polygon — no errors, no fallback triggered |
| Standalone preview maps (offline fallback) | Functional test with `runScripts:"dangerously"`, CDN resources deliberately blocked (as in this sandbox) | ✅ All four map frames correctly show the `.map-error` fallback message pointing at the rankings table, exactly as they should with no network — all non-map content (stats, highlights, table, data note, hero stats, form) still renders correctly |
| Blue gradient contrast, every point | Programmatic WCAG check on the hero/page-header/stat-tile gradient at both endpoints, plus the decorative radial highlight's worst-case blended color | ✅ All pairings ≥ 4.5:1 (lowest 4.71 at the radial highlight vs. gold; flat endpoints range 5.20–14.13) — an earlier draft spanning into the lighter royal blue failed at 2.63:1 and was corrected before shipping |
| Full palette re-check (nav, footer, section-alt, map frame) | Same programmatic WCAG script, extended to every new/changed pairing this pass | ✅ 0 failures across 8 additional pairings |
| No PII, no source files | Recursive grep for names/street/zip/household patterns; `find` for `.xlsx`/`.csv`/`.docx`/`.heic` files | ✅ Zero real matches (only this document's own descriptive text superficially matched the regex); no source files present |
| Relative paths / imports | Scripted scan of all HTML references (partials correctly resolved against the project root, matching how `layout.js` injects them) and all JS `import` statements, including the 3 new map modules | ✅ 22 HTML references and 23 JS imports all resolve correctly |
| HTML validity | Parsed all 7 HTML files (including the updated preview) with a strict parser | ✅ No parse errors |
| JS / JSON / GeoJSON validity | Syntax-checked all module/page scripts; parsed `attendees.json` and `sc-counties.geojson` | ✅ All valid |
| Google Form field order | Re-confirmed unchanged from v1.1/v1.2 (Grandfather, Grandmother, Mother, Father) — this pass made no form changes | ✅ Correct |
| Keyboard interaction | Re-reviewed `:focus-visible` outline rules and Leaflet `keyboard:true` marker behavior after the recolor — the focus mechanism itself is unchanged, only colors moved | ✅ Unaffected, still functions correctly |

## Known Limitations (carried over, unchanged)

- The maps require an internet connection to load Leaflet and the CartoDB
  basemap tiles at runtime (the county boundary shapes themselves are
  bundled locally and don't need the network); all four map frames show a
  clear text fallback instead of a blank map if that fails.
- Attendees outside South Carolina are shown at one marker per state, not
  per city, matching the approved control totals' granularity.
- Visual verification relied on real-library functional tests (actual
  Leaflet rendering, actual DOM output, programmatic contrast checks)
  rather than an automated screenshot tool, since headless-browser
  screenshotting isn't available in this environment.

---

# Appendix: v1.2 Validation Summary (Prior Record)

This document records every change made during the v1.2 pass, the reference-file
discrepancy that was investigated and deliberately not applied, and the checks
performed to confirm the site still meets spec. It supersedes the v1.1 summary
below, which is kept for history.

## Reference File Finding (Read First)

Two files were provided as design/visual references only: `murph_report_v3_1.html`
and a photo of the event T-shirt. Per instruction, if the reference data ever
disagreed with the approved control totals, the discrepancy had to be documented
rather than silently used to change published figures. It does disagree:

| Figure | `murph_report_v3_1.html` | Approved control total (used) |
|---|---|---|
| South Carolina | 123 | **112** |
| Virginia | 19 | **14** |
| Georgia | 11 | **10** |
| New York | 8 | **6** |

The reference file also contains **row-level household data with real personal
information** — full first/last names (e.g. individual household name lists),
street addresses, and city/state/zip for each household — none of which appears
anywhere in the delivered site. `data/attendees.json` was checked against the
approved control totals field-by-field and already matched exactly, so **no
numbers were changed**; the reference file was used only for its typography,
section rhythm, card/table styling, and narrative tone, never for data or for
any names/addresses it contains.

## What Changed in This Pass

### 1. Typography & tone adapted from the reference report

- Added Playfair Display (headings) and Lora (body) via Google Fonts, replacing
  the v1.1 system-font stack, with system-serif fallbacks if the fonts can't load.
- Restyled stat tiles, the highlight list, tables, and a new pull-quote/data-note
  treatment to match the reference's warmth and hierarchy — rebuilt in the site's
  own component classes, not copied markup.

### 2. Maps switched from D3/topojson outlines to Leaflet

- `assets/js/modules/us-map.js` and `sc-map.js` now render on a real CartoDB
  basemap via Leaflet, with numbered, gold-ringed, proportionally-sized circle
  markers (radius scaled to each map's own maximum count, not a fixed formula) —
  royal blue for non-SC states, forest green for SC / highlighted SC communities,
  olive green for other SC communities.
- Each state/community entry in `data/attendees.json` gained `lat`/`lon` fields
  used to place its marker (the old FIPS-based topojson lookup is no longer
  used for matching, kept only as informational metadata).
- Added `assets/js/modules/map-utils.js` (shared radius scaling, marker icon,
  label tooltip, and tile-load-failure fallback) and a `.map-error` fallback
  state so a blocked/offline map shows a clear text message instead of a blank
  frame.

### 3. Attendee Map page reordered

New sequence: intro → **By the Numbers** (stats) → **Event Highlights** →
**Across the United States** (map) → **South Carolina** (map) → **Community
Rankings** → **Data Note**. `highlights` in `data/attendees.json` was
restructured from plain strings to `{icon, html}` objects; a new `dataNote`
object holds the required verbatim sentence plus its supporting term/value
pairs, rendered by the new `assets/js/modules/data-note-panel.js`.

### 4. Home page snapshot added

- Approved title, subtitle, and body paragraph are unchanged verbatim (only
  typographic emphasis was added to one word via `<em class="accent">`, no
  wording changes).
- Added a new stat snapshot (`#hero-stats`) showing named registrations, states
  represented, and the South Carolina count, computed live from
  `data/attendees.json` — hides itself rather than showing broken numbers if
  the data fails to load.

### 5. Standalone preview file (new deliverable)

- Added `murph_event_companion_preview.html`: one self-contained file with all
  three experiences (Home, Attendee Map, Family Tree Information) on a single
  scrolling page, opens directly via `file://` (no server). CSS, the site's SVG
  mark, and the same aggregate-only data are inlined; only Google Fonts and
  Leaflet/map tiles load from a CDN at runtime, each with a graceful fallback
  (system fonts; plain-text map message) if unavailable. Contains no names,
  addresses, household records, or the original spreadsheet — verified below.

### 6. Brand Guide, README updated

- `brand-guide.html` / `brand-guide.md`: added "Using the Shirt as Inspiration,
  Not a Copy," a Map Markers section, an Accessibility Requirements section, and
  updated typography/card/button examples to match the new components.
- `README.md`: added "Opening the Standalone Preview" and "Running the Modular
  Site" (`python3 -m http.server 8000`), expanded data-update and Google-Form
  update steps to cover the preview file's duplicated data/URL, and a brief
  platform-neutral "Future Hosting" note.

## Validation Checks Performed

| Check | Method | Result |
|---|---|---|
| Reference data vs. approved control totals | Extracted every state/total figure embedded in `murph_report_v3_1.html` and diffed against the approved list | ⚠️ Disagrees (SC 123/VA 19/GA 11/NY 8 vs. approved 112/14/10/6) — reference numbers **not used**; see finding above |
| `data/attendees.json` vs. approved control totals | Field-by-field comparison against all 18 approved figures (named/mapped/unmapped, states, federal district, all 13 state counts, St. Matthews, Orangeburg, combined) | ✅ Exact match on every figure — no data changes required |
| No PII in delivered site | Recursive grep for names appearing in the reference file, street/zip patterns, and `households`; `find` for any `.xlsx`/`.csv`/`.docx`/`.heic` files in the project folder | ✅ Zero matches; no source spreadsheet or photo present in the delivered project |
| Modular site maps render | Real-library functional test: loaded `attendee-map.html`'s DOM in a headless environment with the actual `leaflet` npm package (not mocked), ran `us-map.js`/`sc-map.js` | ✅ 13 US markers, 9 SC markers rendered, no fallback triggered; stat values `["179","160","19","13","1"]`, 4 highlights, 10 ranking rows, data note present |
| Home page snapshot | Functional test of `index.html` with the real `home.js` module | ✅ H1, subtitle, and body text exact; stats show 179 / 13 / 112; motto badge present; nav marks Home active; 2 CTAs present |
| Standalone preview functions offline-safe | Functional test with `runScripts:"dangerously"` — CDN resources deliberately blocked to simulate no internet | ✅ Map fallback (`.map-error`) correctly shown in both frames; all data-driven content (stats, highlights, table, data note, form iframe/fallback link, all 3 sections) still renders correctly since it doesn't depend on the CDN |
| Accessibility (contrast) | Programmatic WCAG contrast-ratio check on all 15 text/background color pairings introduced or changed this pass | ✅ All pass AA (4.5:1 normal text) — lowest 4.97, highest 15.11 |
| Keyboard interaction | Reviewed Leaflet `keyboard:true` marker focus/activation, nav link focus states, and `.btn`/`.big-button` focus outlines in `styles.css` | ✅ Markers are tab-reachable and open their popup on Enter/Space; all interactive elements have a visible focus outline |
| Google Form field order | Manual review of `google-form-specification.md` | ✅ Already correct from v1.1 (Grandfather, Grandmother, Mother, Father) — no change needed this pass |
| HTML validity | Parsed all 7 HTML files (3 modular pages, brand guide, 2 partials, standalone preview) with a strict parser | ✅ No parse errors |
| JavaScript syntax | Syntax-checked all 19 module/page scripts | ✅ All pass |
| JSON validity | Parsed `data/attendees.json` | ✅ Valid |
| Relative paths / imports | Scripted scan of every `href`/`src` across all HTML files and every `import` in all JS files | ✅ 22 HTML references and 17 JS imports all resolve correctly |

## Known Limitations

- The maps require an internet connection to load Leaflet and the CartoDB
  basemap tiles at runtime; both map frames show a clear text fallback instead
  of a blank map if that fails. The rest of the site, including the Google
  Form page, works offline once loaded.
- Attendees outside South Carolina are shown at one marker per **state** (not
  per city), matching the granularity of the approved control totals. Within
  South Carolina, markers are per named community.
- Visual verification in this pass relied on real-library functional tests
  (actual Leaflet rendering, actual DOM output, programmatic contrast checks)
  rather than an automated screenshot tool, since headless-browser screenshotting
  wasn't available in this environment. Every rendered value shown above was
  read directly from real DOM output produced by the site's own code, not
  estimated or hand-simulated.

---

# Appendix: v1.1 Final Refinement Pass (Prior Record)

This document records every change made during the v1.1 refinement pass and
the checks performed to confirm the site still meets spec.

## What Changed in This Pass

### 1. Visual identity sampled from the official shirt

- Converted the uploaded shirt photo (HEIC) and sampled dominant colors
  directly from the fabric, the tree-leaf artwork, the trunk ink, and the
  gold banner, rather than estimating a palette.
- Replaced all color tokens in `assets/css/styles.css` with the sampled
  values (see table below). Every text/background pairing was re-checked
  for WCAG AA contrast after the swap.
- Corrected a color-cast issue in the raw trunk-ink sample (it photographed
  with a slight purple tint from ambient blue fabric reflection) to produce
  a true dark brown/black for body text.

| Token | v1.0 (estimated) | v1.1 (sampled) |
|---|---|---|
| Royal Blue | `#2A4C87` | `#0A6BC4` |
| Deep Brown | `#4A2E1F` | `#4A2E1F` (confirmed close to sample) |
| Ink | `#2A2117` | `#2E2420` |
| Warm Gold | `#C6902B` | `#E3AC52` |
| Forest Green | `#2C5234` | `#38402F` |
| Olive Green | `#6C7A3D` | `#4B5240` |

- Added natural design accents: a reusable leaf glyph (drawn, not traced
  from the shirt), a leaf-flanked divider on the home page hero, and gold
  gradient rules under every major section heading.

### 2. Architecture: modular JavaScript + shared partials

- Split the single `attendee-map.js` file into focused ES modules under
  `assets/js/modules/`: `config.js`, `data-service.js`, `layout.js`,
  `tooltip.js`, `us-map.js`, `sc-map.js`, `stats-panel.js`,
  `highlights-panel.js`, `rankings-table.js`.
- Added `assets/js/pages/` — one small entry script per page
  (`home.js`, `attendee-map.js`, `family-tree.js`, `brand-guide.js`) that
  wires the modules together. No page-specific logic lives inside a shared
  module.
- Extracted the header and footer into `assets/partials/header.html` and
  `footer.html`, loaded into every page by `layout.js`. Navigation is now
  defined in exactly one place instead of being duplicated across four HTML
  files.
- Centralized configuration (Google Form URL, data path, CDN URLs) in
  `assets/js/modules/config.js` — the single place to edit when swapping
  the development Google Form for the official one.
- The pre-v1.1 files (`assets/js/nav.js`, `attendee-map.js`,
  `family-tree-config.js`, `family-tree-form.js`) are no longer referenced
  by any page. They were left in the folder as deprecation stubs (each with
  a comment pointing to its replacement) rather than deleted, since files
  already delivered to the project folder can't be removed in this
  environment — no page loads them, so they have no effect on the site.

### 3. Brand Guide (new deliverable)

- Added `brand-guide.html` — a live, styled reference page (uses the site's
  own header/footer/CSS) covering the color palette with sampled hex
  values, typography, buttons, cards, tables, navigation rules, icon and
  divider style, spacing scale, and design principles.
- Added `brand-guide.md` — the same content as a portable document.
- Linked from the site footer (not the primary nav, which stays at exactly
  three items as required).

### 4. Google Form specification correction

- Fixed the Murph Direct Bloodline Ancestors field order in
  `google-form-specification.md`: **Mother now appears before Father**
  (previously listed as Father, then Mother). Added an explicit "Order
  note" callout in the document to prevent this from being reversed again.
- Updated all references from the old `family-tree-config.js` file to the
  new `assets/js/modules/config.js` → `googleFormEmbedUrl`.

### 5. README expanded

- Added a dedicated **Google Form Migration** section.
- Expanded **Future Expansion** to explicitly name the features the
  architecture supports without a redesign: optional member login, member
  profiles, self-service family information updates, reunion registration,
  and committee administration tools — and explains which three
  separations (presentation/data/configuration, modular JS, modular nav)
  make that possible.
- Updated the project structure diagram and added a **Version History**
  section.

## Validation Checks Performed (v1.1)

| Check | Method | Result |
|---|---|---|
| Relative paths resolve | Scripted scan of every `href`/`src` in all HTML files, and every `import` path in all JS modules | ✅ All 22 HTML references and 17 JS imports resolve to real files |
| Maps render correctly | Functional test: loaded `attendee-map.html`'s DOM in a headless environment, ran the actual `us-map.js` / `sc-map.js` modules against real U.S. Census state boundary data (not mocked geometry) | ✅ 13 state circles rendered (matching FIPS codes, including D.C.), 9 South Carolina community circles rendered, 2 correctly marked `--highlight` (St. Matthews, Orangeburg) |
| Statistics match source data | Same functional test, read rendered `.stat-tile__value` text | ✅ 179 / 160 / 19 / 13 / 1 — matches `data/attendees.json` and the original attendee report exactly |
| Community rankings match source data | Same test, summed the rendered table's "Registration Count" column | ✅ Table shows 9 ranked communities + "Other South Carolina communities," summing to 112 (matches the report's South Carolina total) |
| Google Form spec matches approved card | Manual review of `google-form-specification.md` | ✅ All fields, order, required/optional flags, permission checkbox, and confirmation message match the approved specification |
| Mother appears before Father | Manual review of the corrected table | ✅ Confirmed — order is now Grandfather, Grandmother, Mother, Father |
| No private attendee information exposed | Scanned `data/attendees.json` and all HTML/JS for names, emails, or other personal identifiers; confirmed no spreadsheet/report files were copied into the project folder | ✅ Only aggregate counts (state/community totals) are present anywhere in the delivered site |
| README reflects the approved workflow | Manual review against this pass's changes | ✅ Data update, Google Form migration, and future-expansion sections all reference the current file structure |
| Consistent visual identity | Cross-checked hex values across `styles.css`, `brand-guide.html`, and `brand-guide.md` | ✅ Identical palette values in all three locations |
| Accessibility (contrast) | Programmatic WCAG contrast ratio calculation for every text/background color pairing in the palette | ✅ All pairings meet or exceed 4.5:1 (AA for normal text); several exceed 10:1 |
| HTML validity | Parsed every page with a strict HTML parser | ✅ No parse errors on `index.html`, `attendee-map.html`, `family-tree-information.html`, `brand-guide.html` |
| JavaScript syntax | Syntax-checked every module and page script | ✅ All 17 files pass |
