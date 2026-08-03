/**
 * stats-panel.js
 * Renders the Registration Statistics tiles from data/attendees.json.
 * No statistic is ever hardcoded in HTML — everything here comes from data.
 */
export function renderStats(data, gridId) {
  const s = data.statistics;
  const tiles = [
    { label: "Named Registrations", value: s.namedRegistrations },
    { label: "Mapped Registrations", value: s.mappedRegistrations },
    { label: "Unmapped Registrations", value: s.unmappedRegistrations },
    { label: "States Represented", value: s.statesRepresented },
    { label: "Federal Districts Represented", value: s.federalDistrictsRepresented }
  ];
  const grid = document.getElementById(gridId);
  grid.innerHTML = tiles.map((t) => (
    '<div class="stat-tile">' +
      '<span class="stat-tile__value">' + t.value + '</span>' +
      '<span class="stat-tile__label">' + t.label + '</span>' +
    '</div>'
  )).join("");
}
