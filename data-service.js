/**
 * data-service.js
 * The site's data access layer. Every page that needs registration data
 * goes through this module instead of calling fetch() directly — if the
 * data source ever moves (e.g. to an API for a future member-facing
 * version), only this file needs to change.
 */
import { CONFIG } from "./config.js";

let cachedData = null;

export async function loadAttendeeData() {
  if (cachedData) { return cachedData; }
  const res = await fetch(CONFIG.dataUrl);
  if (!res.ok) {
    throw new Error("Could not load attendee data (" + res.status + ")");
  }
  cachedData = await res.json();
  return cachedData;
}
