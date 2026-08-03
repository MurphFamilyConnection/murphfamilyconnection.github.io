/**
 * rankings-table.js
 * Renders the Community Rankings table (South Carolina communities, ranked
 * by registration count, matching data/attendees.json exactly). Rank pills
 * and share-of-South-Carolina bars are computed from the same data — no
 * numbers are hardcoded.
 */
export function renderRankingsTable(data, wrapId) {
  const rows = data.southCarolinaCommunities.slice().sort((a, b) => b.count - a.count);
  const scTotal = rows.reduce((sum, r) => sum + r.count, 0) + (data.otherSouthCarolinaCount || 0);
  const maxCount = rows.length ? rows[0].count : 0;

  let html = '<table class="data-table">';
  html += '<caption>South Carolina communities, ranked by registration count</caption>';
  html += '<thead><tr><th scope="col">Rank</th><th scope="col">Community</th><th scope="col">Registrations</th><th scope="col">Share of S.C.</th></tr></thead>';
  html += "<tbody>";
  rows.forEach((r, i) => {
    const highlightClass = r.highlight ? ' class="is-highlighted"' : "";
    const pillClass = i < 2 ? "rpill rpill--gold" : "rpill";
    const pct = scTotal ? ((r.count / scTotal) * 100).toFixed(1) : "0.0";
    const barWidth = maxCount ? (r.count / maxCount) * 100 : 0;
    html += "<tr" + highlightClass + ">" +
      "<td><span class=\"" + pillClass + "\">" + (i + 1) + "</span></td>" +
      "<td>" + r.community + "</td>" +
      "<td><strong>" + r.count + "</strong></td>" +
      "<td><div class=\"bar-wrap\"><div class=\"bar-track\"><div class=\"bar-fill\" style=\"width:" + barWidth + "%\"></div></div>" +
        "<span class=\"bar-pct\">" + pct + "%</span></div></td>" +
    "</tr>";
  });
  if (data.otherSouthCarolinaCount) {
    const pct = scTotal ? ((data.otherSouthCarolinaCount / scTotal) * 100).toFixed(1) : "0.0";
    html += "<tr>" +
      "<td>&mdash;</td>" +
      "<td>Other South Carolina communities</td>" +
      "<td><strong>" + data.otherSouthCarolinaCount + "</strong></td>" +
      "<td><span class=\"bar-pct\">" + pct + "%</span></td>" +
    "</tr>";
  }
  html += "</tbody></table>";
  document.getElementById(wrapId).innerHTML = html;
}
