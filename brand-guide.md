# Murph Family Connection — Brand Guide

A concise visual identity reference. For a live, styled version of everything
below, open **`brand-guide.html`** in the site itself.

Colors were sampled directly from a photo of the official 2026 event shirt
("Stronger Together") — the fabric, the tree-of-life leaves, the trunk ink,
and the gold banner — then lightly calibrated for on-screen contrast and
WCAG AA accessibility. Typography, section rhythm, and component styling
(stat cards, highlight panels, data notes, map markers) were adapted from
the polish and storytelling flow of the `murph_report_v3_1.html` design
reference, restyled to fit a simple three-page event site rather than a
multi-page report.

**v1.3 update — a stronger, more confident blue.** Royal blue is now the
site's dominant organizing color: every page opens with a deep-navy header
band, navigation runs on a navy bar, statistics tiles and map frames carry
a blue treatment, and the footer moved from deep brown to navy. Gold stays
reserved for accents — dividers, marker rings, numbers, active-state
underlines — and forest green now appears only on the maps themselves
(South Carolina markers and highlighted rows), not on page chrome. Body
copy, cards, tables, and the Google Form still sit on ivory/white for easy
reading. Every new or changed color pairing was re-verified against WCAG AA
(4.5:1) before shipping — see `validation-summary.md`.

## Using the Shirt as Inspiration, Not a Copy

- **Do** sample colors directly from the shirt photo and document the hex
  values (see below).
- **Do** borrow the shirt's general warmth — a tree/roots motif, gold
  accents, rounded natural shapes.
- **Do not** trace, crop, or otherwise reproduce the shirt's printed
  artwork (the tree badge, the "Stronger Together" banner graphic, the
  circular seal) anywhere on the site.
- The site's own tree mark (`assets/images/murph-mark.svg`) and the leaf
  glyph used in dividers are original, simple drawings — inspired by the
  shirt's tree-of-life motif, not copies of it.
- "Stronger Together" is used as *text* (a badge/motto on the home page)
  because it's the event's own tagline, not because it reproduces the
  shirt's banner artwork.

## Color Palette

| Color | Hex | Sampled From | Primary Use |
|---|---|---|---|
| Royal Blue | `#0A6BC4` | Shirt fabric | Primary buttons, active-page nav, map frame borders, map markers (non-S.C.), gold-adjacent accents |
| Royal Blue Dark | `#123F72` | Calibrated from fabric | Header/nav bar, hero and page-header bands, stat tiles, footer, links/hover states |
| Deep Brown | `#4A2E1F` | Banner-fold shadow | Reserved for ivory-background contexts (brand guide swatches, legacy references) |
| Ink (Trunk) | `#2E2420` | Tree trunk/roots ink, color-cast corrected | Body text on ivory/white surfaces |
| Warm Gold | `#E3AC52` | Tree leaves + banner | Accents on dark blue (eyebrow labels, motto badge, stat numbers), borders, dividers, marker rings |
| Warm Gold Dark | `#8C611D` | Calibrated from gold | Gold-hued text on ivory/white surfaces (AA contrast) |
| Forest Green | `#38402F` | Darker tree leaves | South Carolina map markers, highlighted table rows — map/data use only, not page chrome |
| Olive Green | `#4B5240` | Lighter tree leaves | Eyebrow labels on ivory sections, icons, non-highlighted S.C. map markers |
| Ivory | `#FBF6EB` | Not shirt-sampled — neutral base | Body-copy sections, cards, tables, the Google Form |
| Ivory Blue | `#E9F1F9` | Not shirt-sampled — light blue tint | Alternating section background (keeps blue rhythm going between blue bands) |

Every text/background pairing used on the site meets WCAG AA contrast
(4.5:1 for normal text, verified programmatically). Where a gradient is
used (hero, page-header bands, stat tiles), both ends of the gradient stay
within a narrow dark-navy range — never the lighter royal blue — so gold
and white text stay legible at every point on the gradient, not just the
darkest corner.

## Typography

Two Google Fonts, loaded with `display=swap` and a system-serif fallback so
the site stays readable even offline or if the fonts fail to load:

- **Headings — Playfair Display.** A high-contrast display serif for a
  timeless, heritage feel. H1 uses weight 900 in Deep Brown; H2/H3 use
  weight 700 in Royal Blue. A single word within an otherwise-unchanged
  approved phrase may be styled in italic gold (`em.accent`) for emphasis —
  this never adds or alters wording, only its typographic treatment.
- **Body — Lora.** A readable serif for paragraphs, table cells, and list
  text, matching the reference report's warmth.

## Navigation

Exactly three items, always in this order: **Home, Attendee Map, Family
Tree Information.** The header bar itself is now navy (Royal Blue Dark)
with a 3px gold bottom border; the logo mark sits on its own small ivory
circle so it stays legible on the dark bar. Nav links are white/85%,
brighten to full white on hover, and the active page is shown with a
subtle light overlay plus a gold underline. No dropdowns, no additional
items, no sidebar — this is intentional and should not expand without a
scope change. The nav bar wraps naturally on narrow screens (no hamburger
menu needed at three items).

Every page opens with the same navy **page-header** band used for the
hero (deep-navy gradient, white heading, gold eyebrow/rule) before
handing off to ivory/white content sections — this is what makes the
site feel like one connected companion rather than three disconnected
pages.

## Buttons

- **Big buttons** (home page): rounded-pill corners, solid royal blue
  (Attendee Map) or navy (Family Tree Information) fill, white text,
  icon + label. Both CTAs are now in the blue family, distinguished by
  shade and icon rather than by switching to green. Lift on hover/focus.
- **Standard button** (`.btn`): royal blue fill, white text, for form
  actions like "Open the form in a new tab."
- **Outline button** (`.btn--outline`): royal blue border and text on a
  transparent background, fills solid on hover — used for secondary/
  fallback actions.

## Cards & Panels

- **Stat card** (`.stat-tile`): navy card (5px gold top border), big
  Playfair Display number in gold, small-caps white label. Lifts on
  hover. Used for both the home-page event snapshot and the "By the
  Numbers" section on the Attendee Map page.
- **Highlight panel** (`.highlight-list li`): light blue tint, 5px gold
  left border, icon + text row. Keeps every observation traceable to
  `data/attendees.json`.
- **Pull quote** (`.pull-quote`): gold left border, warm gold-tinted
  background, italic Playfair Display text — used sparingly, at most once
  per page, for a single moment of warmth.
- **Data note box** (`.notes-box`): white card with a definitions list
  (term/value pairs pulled from the stats) followed by prose — used for
  the required Data Note section on the Attendee Map page.

## Map Markers

All four maps — United States, South Carolina, Calhoun County, and
Orangeburg County — use [Leaflet](https://leafletjs.com/) over a light
CartoDB basemap for real geographic context. The map frame itself carries
the blue treatment too: a 2px Royal Blue border with a 4px gold top
accent, tying the frame to the marker style. Markers are numbered circles:

- Fill color: **Royal Blue** for states/communities outside South
  Carolina's highlighted pair; **Forest Green** for South Carolina
  (national map) or highlighted communities (St. Matthews, Orangeburg).
- Every marker has a **2.5px Warm Gold ring** — a direct nod to the gold
  accents on the shirt, without reproducing any of its artwork.
- The registration count is shown as white text inside the circle itself,
  so the number is visible without needing to hover — color is never the
  only way information is conveyed.
- Markers are keyboard-focusable (Leaflet's built-in `keyboard: true`
  option) and open a popup with the full text (community, county/state,
  count) on click, Enter, or Space.
- If the map tiles or the Leaflet library can't load, the map frame shows
  a plain-text fallback message pointing at the Community Rankings table,
  instead of a blank or broken map.

### County maps (new in v1.3)

The Calhoun County and Orangeburg County maps additionally draw the real
county boundary as a subtle blue-outlined, lightly-tinted polygon beneath
the markers — **not hand-drawn**. The boundary geometry comes from Census
TIGER/Line data via the `us-atlas` npm package, extracted once and bundled
locally as `data/sc-counties.geojson` (~3&nbsp;KB, both counties), so the
county maps have no extra CDN dependency beyond the same Leaflet/CartoDB
tiles the other two maps already use. See `README.md` → "County Map
Boundary Source" for how to re-extract or add another county later.

## Tables

Royal-blue header row with white uppercase text, ivory-alt zebra striping,
gold-underlined Playfair Display caption. The Community Rankings table
adds numbered rank pills (gold for the top two) and a share-of-total mini
bar chart, computed from the same data as the rest of the page.

## Dividers & Icons

- **Gold rule** (`.gold-rule`): short gradient gold bar under section
  headings.
- **Leaf divider** (`.leaf-divider`): thin gold lines flanking a single
  reusable leaf glyph (drawn, not traced from the shirt) — used once per
  page as a hero accent.
- **Section eyebrow**: small-caps label with the same leaf glyph, used
  above H1s to set context ("Where We're Gathering From," "Preserving Our
  Roots"). Olive green on ivory sections; gold on the navy page-header
  bands.

## Spacing

An 8px-based scale, defined once as CSS custom properties
(`--space-1` through `--space-6`), used for all padding and gaps so
spacing stays consistent as the site grows.

## Accessibility Requirements

- All text/background color pairings meet WCAG AA contrast (4.5:1 normal
  text, 3:1 large text/headings) — verified programmatically, not just by
  eye.
- Every interactive element (nav links, buttons, map markers) has a
  visible focus outline and is reachable by keyboard alone.
- Map markers always show their count as visible text and expose a text
  popup — color (blue vs. green) is a reinforcement, never the only way
  to identify what a marker represents.
- `prefers-reduced-motion` disables hover-lift transforms and page
  scroll-smoothing; map pan/zoom animations are also disabled when a
  visitor has reduced motion enabled.
- All images/icons that convey no additional information are marked
  `aria-hidden="true"`; the site logo has a real `<title>` for screen
  readers.

## Design Principles

1. **Simple over clever.** Two jobs — explore the attendee map, contribute
   family tree information. Resist adding features beyond that scope.
2. **Inspired, not copied.** Colors and motifs are drawn from the event
   shirt; the artwork itself is never reproduced.
3. **Warm, not corporate.** Rounded cards, serif headings, and a
   confident navy-and-gold palette over gray dashboards or
   antique-manuscript styling.
4. **Accessible by default.** Every color pairing meets WCAG AA. Keyboard
   and screen-reader users get the same information as everyone else.
5. **Data-driven, never hardcoded.** Every number on the site — stats,
   map markers, rankings, highlight text — is generated from
   `data/attendees.json`, so updating one file updates the whole site.

Any future page should reuse these tokens and components rather than
introducing new colors, fonts, or button styles.
