/**
 * county-map.js
 * Shared renderer for a single-county Leaflet map: draws the real county
 * boundary (Census TIGER/Line geometry, bundled locally at
 * data/sc-counties.geojson via the us-atlas package — not hand-drawn) plus
 * a proportional, numbered gold-ring circle marker for each community
 * within that county. Used by both the Calhoun County and Orangeburg
 * County sections of the Attendee Map page.
 */
import {
  MAP_COLORS,
  prefersReducedMotion,
  scaleRadius,
  numberedDivIcon,
  attachTileFallback,
  showMapFallback
} from "./map-utils.js";
import { CONFIG } from "./config.js";

let cachedCounties = null;

async function loadCountyBoundaries() {
  if (cachedCounties) { return cachedCounties; }
  const res = await fetch(CONFIG.countyBoundariesUrl);
  if (!res.ok) {
    throw new Error("Could not load county boundary data (" + res.status + ")");
  }
  cachedCounties = await res.json();
  return cachedCounties;
}

/**
 * @param {object} options
 * @param {string} options.frameId - id of the map frame element
 * @param {string} options.statusId - id of the "Loading map…" placeholder
 * @param {string} options.countyFips - Census FIPS code for the county (e.g. "45017")
 * @param {string} options.countyLabel - display label, e.g. "Calhoun County, South Carolina"
 * @param {Array}  options.communities - southCarolinaCommunities entries already filtered to this county
 */
export async function renderCountyMap(options) {
  const { frameId, statusId, countyFips, countyLabel, communities } = options;
  const frame = document.getElementById(frameId);
  const status = document.getElementById(statusId);

  if (typeof L === "undefined") {
    showMapFallback(
      frame,
      "The map library couldn't load, likely due to a network or ad-blocker issue. " +
      "See the Community Rankings table below for the same registration data."
    );
    return;
  }

  if (!communities || !communities.length) {
    showMapFallback(
      frame,
      "No registrations in the approved data are currently attributed to a community in " +
      countyLabel + "."
    );
    return;
  }

  try {
    const counties = await loadCountyBoundaries();
    const feature = counties.features.find((f) => f.id === countyFips);
    if (!feature) {
      throw new Error("County boundary not found for FIPS " + countyFips);
    }

    if (status) { status.remove(); }

    const canvas = document.createElement("div");
    canvas.className = "leaflet-map";
    canvas.setAttribute("role", "group");
    canvas.setAttribute(
      "aria-label",
      "Map of " + countyLabel + " showing represented communities sized by registration count"
    );
    frame.appendChild(canvas);

    const reduceMotion = prefersReducedMotion();
    const map = L.map(canvas, {
      zoomAnimation: !reduceMotion,
      fadeAnimation: !reduceMotion,
      markerZoomAnimation: !reduceMotion,
      scrollWheelZoom: false
    });

    const tiles = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      { attribution: "&copy; OpenStreetMap &copy; CartoDB", maxZoom: 13 }
    ).addTo(map);

    attachTileFallback(map, tiles, frame, () => {
      try { map.remove(); } catch (e) { /* already showing a fallback */ }
      showMapFallback(
        frame,
        "The map imagery couldn't load right now (this requires an internet connection). " +
        "See the Community Rankings table below for the same registration data."
      );
    });

    const boundary = L.geoJSON(feature, {
      style: {
        color: MAP_COLORS.blueDark,
        weight: 2.5,
        fillColor: MAP_COLORS.blue,
        fillOpacity: 0.07
      }
    }).addTo(map);

    const maxCount = Math.max(...communities.map((c) => c.count));
    communities.forEach((c) => {
      const radius = scaleRadius(c.count, maxCount, 16, 34);
      const color = c.highlight ? MAP_COLORS.green : MAP_COLORS.blue;
      const marker = L.marker([c.lat, c.lon], {
        icon: numberedDivIcon(c.count, radius, color),
        keyboard: true,
        alt: c.community + ", " + countyLabel + ": " + c.count + " registered attendees",
        title: c.community + ", " + countyLabel + ": " + c.count + " registered attendees"
      });
      marker.bindPopup(
        '<div class="map-popup__title">' + c.community + "</div>" +
        '<div class="map-popup__state">' + countyLabel + "</div>" +
        '<div class="map-popup__count">' + c.count + " registered " + (c.count === 1 ? "attendee" : "attendees") + "</div>"
      );
      marker.addTo(map);
    });

    map.fitBounds(boundary.getBounds().pad(0.12));

    setTimeout(() => map.invalidateSize(), 200);
    window.addEventListener("resize", () => map.invalidateSize());
  } catch (err) {
    console.error(err);
    showMapFallback(
      frame,
      "We couldn't load the " + countyLabel + " map right now. See the Community Rankings table below for the same registration data."
    );
  }
}
