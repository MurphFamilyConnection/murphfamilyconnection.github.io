import { initLayout } from "../modules/layout.js";
import { loadAttendeeData } from "../modules/data-service.js";

document.addEventListener("DOMContentLoaded", async () => {
  initLayout();

  try {
    const data = await loadAttendeeData();
    const sc = data.states.find((s) => s.code === "SC");

    const registeredEl = document.getElementById("hero-stat-registered");
    const statesEl = document.getElementById("hero-stat-states");
    const scEl = document.getElementById("hero-stat-sc");

    if (registeredEl) { registeredEl.textContent = data.statistics.namedRegistrations; }
    if (statesEl) { statesEl.textContent = data.statistics.statesRepresented; }
    if (scEl) { scEl.textContent = sc ? sc.count : "—"; }
  } catch (err) {
    console.error(err);
    // The hero snapshot is a nice-to-have; if data can't load, hide it
    // rather than show empty/broken numbers.
    const strip = document.getElementById("hero-stats");
    if (strip) { strip.style.display = "none"; }
  }
});
