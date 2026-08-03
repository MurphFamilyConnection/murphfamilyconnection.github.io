/**
 * highlights-panel.js
 * Renders the Event Highlights list. Highlight text (and icon) lives in
 * data/attendees.json — this module only displays whatever is there, so no
 * observation appears on the page unless it is backed by the data.
 */
export function renderHighlights(data, listId) {
  const list = document.getElementById(listId);
  list.innerHTML = data.highlights.map((h) => (
    '<li>' +
      '<span class="hi-ico" aria-hidden="true">' + h.icon + '</span>' +
      '<span class="hi-txt">' + h.html + '</span>' +
    '</li>'
  )).join("");
}
