/**
 * config.js
 * Site-wide configuration — the "configuration" layer, kept separate from
 * presentation (HTML/CSS) and data (data/attendees.json).
 *
 * TO REPLACE THE GOOGLE FORM (e.g. swapping the development form for the
 * official Murph Family Connection form after committee approval), update
 * ONLY the googleFormEmbedUrl value below. Nothing else in the site needs
 * to change. See google-form-specification.md for the form build steps.
 *
 * How to get the embed URL from Google Forms:
 *   1. Open the form in Google Forms (as the editor).
 *   2. Click "Send".
 *   3. Choose the "<>" (embed HTML) tab.
 *   4. Copy the URL from the src="..." attribute shown there
 *      (it ends in "?embedded=true").
 *   5. Paste it below, inside the quotes.
 */
export const CONFIG = {
  event: {
    name: "Murph Family Connection",
    dates: "August 7–9, 2026",
    location: "St. Matthews, South Carolina"
  },
  dataUrl: "data/attendees.json",
  usStatesTopoUrl: "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json",
  /* Real county boundary geometry (Calhoun + Orangeburg counties, SC),
     extracted from Census TIGER/Line data via the us-atlas package and
     bundled locally — no CDN dependency for the county maps. */
  countyBoundariesUrl: "data/sc-counties.geojson",
  googleFormEmbedUrl:
              "https://docs.google.com/forms/d/e/1FAIpQLSdsiHzWz0LCN5-vCpN6HXMHo3keZMg1apgkGcZECA4inhAMsw/viewform?embedded=true",
  partials: {
    header: "assets/partials/header.html",
    footer: "assets/partials/footer.html"
  }
};
