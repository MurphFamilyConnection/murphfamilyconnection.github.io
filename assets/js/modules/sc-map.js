/**
 * sc-map.js
 * South Carolina map — one proportional, numbered circle per represented
 * community, drawn with Leaflet over a light CartoDB basemap. St. Matthews
 * and Orangeburg are shown in a distinct color and permanently labeled.
 */
import {
  MAP_COLORS,
  prefersReducedMotion,
  scaleRadius,
  numberedDivIcon,
  communityLabelTooltip,
  attachTileFallback,
  showMapFallback
} from "./map-utils.js";

export function renderSCMap(data, frameId, statusId) {
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
    canvas.className = "leaflet-map leaflet-map--tall";
    canvas.setAttribute("role", "group");
    canvas.setAttribute("aria-label", "Map of South Carolina showing represented communities sized by registration count");
    frame.appendChild(canvas);

    const reduceMotion = prefersReducedMotion();
    const map = L.map(canvas, {
      zoomAnimation: !reduceMotion,
      fadeAnimation: !reduceMotion,
      markerZoomAnimation: !reduceMotion,
      scrollWheelZoom: false
    }).setView([33.8, -80.9], 7);

    const tiles = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      { attribution: "&copy; OpenStreetMap &copy; CartoDB", maxZoom: 13 }
    ).addTo(map);

    attachTileFallback(map, tiles, frame, () => {
      try { map.remove(); } catch (e) { /* ignore — we're already showing a fallback */ }
      showMapFallback(
        frame,
        "The map imagery couldn't load right now (this requires an internet connection). " +
        "See the Community Rankings table below for the same registration data."
      );
    });

    const communities = data.southCarolinaCommunities;
    const maxCount = Math.max(...communities.map((c) => c.count));
    const bounds = [];

    communities.forEach((c) => {
      const radius = scaleRadius(c.count, maxCount, 11, 30);
      const color = c.highlight ? MAP_COLORS.green : MAP_COLORS.oliveGreen;
      const marker = L.marker([c.lat, c.lon], {
        icon: numberedDivIcon(c.count, radius, color),
        keyboard: true,
        alt: c.community + ", South Carolina: " + c.count + " registered attendees",
        title: c.community + ", South Carolina: " + c.count + " registered attendees"
      });
      marker.bindPopup(
        '<div class="map-popup__title">' + c.community + "</div>" +
        '<div class="map-popup__state">South Carolina</div>' +
        '<div class="map-popup__count">' + c.count + " registered " + (c.count === 1 ? "attendee" : "attendees") + "</div>"
      );
      marker.addTo(map);
      bounds.push([c.lat, c.lon]);

      if (c.highlight) {
        communityLabelTooltip(map, [c.lat, c.lon], c.community, radius + 6);
      }
    });

    if (bounds.length) {
      map.fitBounds(L.latLngBounds(bounds).pad(0.15));
    }

    setTimeout(() => map.invalidateSize(), 200);
    window.addEventListener("resize", () => map.invalidateSize());
  } catch (err) {
    console.error(err);
    showMapFallback(
      frame,
      "We couldn't load the South Carolina map right now. See the Community Rankings table below for the same registration data."
    );
  }
}
