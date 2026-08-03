/**
 * data-note-panel.js
 * Renders the Data Note panel (required summary sentence + a small
 * definitions list of the same registration/mapping figures shown in the
 * stat tiles). Content comes entirely from data/attendees.json.
 */
export function renderDataNote(data, boxId) {
  const note = data.dataNote;
  if (!note) { return; }

  const dl = note.stats.map((s) => (
    "<dt>" + s.term + "</dt><dd>" + s.value + "</dd>"
  )).join("");

  document.getElementById(boxId).innerHTML =
    '<dl class="notes-dl">' + dl + '</dl>' +
    '<p class="notes-prose">' + note.summary + '</p>';
}
