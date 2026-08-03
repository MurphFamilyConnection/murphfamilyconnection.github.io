/**
 * attendee-map.js (page entry point)
 * Wires together the data service and the render modules for the
 * Attendee Map page. This file only orchestrates — the actual rendering
 * logic lives in assets/js/modules/.
 */
import { initLayout } from "../modules/layout.js";
import { loadAttendeeData } from "../modules/data-service.js";
import { renderStats } from "../modules/stats-panel.js";
import { renderHighlights } from "../modules/highlights-panel.js";
import { renderRankingsTable } from "../modules/rankings-table.js";
import { renderDataNote } from "../modules/data-note-panel.js";
import { renderUSMap } from "../modules/us-map.js";
import { renderSCMap } from "../modules/sc-map.js";
import { renderCalhounMap } from "../modules/calhoun-map.js";
import { renderOrangeburgMap } from "../modules/orangeburg-map.js";

document.addEventListener("DOMContentLoaded", async () => {
  await initLayout();

  try {
    const data = await loadAttendeeData();
    renderStats(data, "stat-grid");
    renderHighlights(data, "highlight-list");
    renderRankingsTable(data, "rankings-table-wrap");
    renderDataNote(data, "data-note-box");
    renderUSMap(data, "us-map-frame", "us-map-status");
    renderSCMap(data, "sc-map-frame", "sc-map-status");
    renderCalhounMap(data, "calhoun-map-frame", "calhoun-map-status");
    renderOrangeburgMap(data, "orangeburg-map-frame", "orangeburg-map-status");
  } catch (err) {
    console.error(err);
    const main = document.querySelector("main .container");
    if (main) {
      const msg = document.createElement("p");
      msg.className = "map-error";
      msg.textContent = "We couldn't load the registration data right now. Please refresh the page, or try again later.";
      main.prepend(msg);
    }
  }
});
