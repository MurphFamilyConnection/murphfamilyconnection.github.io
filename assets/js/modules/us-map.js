/**
 * us-map.js
 * United States map — one proportional, numbered circle per represented
 * state, drawn with Leaflet over a light CartoDB basemap for real
 * geographic context (state totals only — see data/attendees.json meta
 * notes on why city-level detail isn't available outside South Carolina).
 */
import {
  MAP_COLORS,
  prefersReducedMotion,
  scaleRadius,
  numberedDivIcon,
  attachTileFallback,
  showMapFallback
} from "./map-utils.js";

const SC_CODE = "SC";

export function renderUSMap(data, frameId, statusId) {
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

  try {
    if (status) { status.remove(); }

    const canvas = document.createElement("div");
    canvas.className = "leaflet-map";
    canvas.setAttribute("role", "group");
    canvas.setAttribute("aria-label", "Map of the United States showing represented states sized by registration count");
    frame.appendChild(canvas);

    const reduceMotion = prefersReducedMotion();
    const map = L.map(canvas, {
      zoomAnimation: !reduceMotion,
      fadeAnimation: !reduceMotion,
      markerZoomAnimation: !reduceMotion,
      scrollWheelZoom: false
    }).setView([38.2, -95.5], 4);

    const tiles = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      { attribution: "&copy; OpenStreetMap &copy; CartoDB", maxZoom: 10 }
    ).addTo(map);

    attachTileFallback(map, tiles, frame, () => {
      try { map.remove(); } catch (e) { /* ignore — we're already showing a fallback */ }
      showMapFallback(
        frame,
        "The map imagery couldn't load right now (this requires an internet connection). " +
        "See the Community Rankings table below for the same registration data."
      );
    });

    const maxCount = Math.max(...data.states.map((s) => s.count));

    data.states.forEach((s) => {
      if (typeof s.lat !== "number" || typeof s.lon !== "number") { return; }
      const radius = scaleRadius(s.count, maxCount, 12, 30);
      const color = s.code === SC_CODE ? MAP_COLORS.green : MAP_COLORS.blue;
      const marker = L.marker([s.lat, s.lon], {
        icon: numberedDivIcon(s.count, radius, color),
        keyboard: true,
        alt: s.name + ": " + s.count + " registered attendees",
        title: s.name + ": " + s.count + " registered attendees"
      });
      marker.bindPopup(
        '<div class="map-popup__title">' + s.name + "</div>" +
        '<div class="map-popup__count">' + s.count + " registered " + (s.count === 1 ? "attendee" : "attendees") + "</div>"
      );
      marker.addTo(map);
    });

    setTimeout(() => map.invalidateSize(), 200);
    window.addEventListener("resize", () => map.invalidateSize());
  } catch (err) {
    console.error(err);
    showMapFallback(
      frame,
      "We couldn't load the United States map right now. See the Community Rankings table below for the same registration data."
    );
  }
}
