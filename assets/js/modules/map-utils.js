/**
 * map-utils.js
 * Small shared helpers for the Leaflet maps: proportional radius scaling,
 * numbered gold-ring circle markers (styling inspired by the event shirt —
 * not a reproduction of its artwork), reduced-motion detection, and a
 * network-failure fallback so a broken map never leaves a blank page.
 */

export const MAP_COLORS = {
  blue: "#0A6BC4",
  blueDark: "#123F72",
  green: "#38402F",
  oliveGreen: "#4B5240",
  gold: "#E3AC52"
};

export function prefersReducedMotion() {
  return typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Proportional radius (not area-linear count → pixel), matched so the
 * largest value in a given dataset always maps to maxPx, regardless of
 * how large that value is. Avoids one oversized circle dominating a map
 * just because a state total happens to be much bigger than a per-city
 * count elsewhere on the site.
 */
export function scaleRadius(count, maxCount, minPx, maxPx) {
  if (!maxCount || maxCount <= 0) { return minPx; }
  const t = Math.sqrt(Math.max(count, 0) / maxCount);
  return Math.round(minPx + (maxPx - minPx) * t);
}

export function numberedDivIcon(count, radiusPx, fillColor) {
  const d = radiusPx * 2;
  const fontSize = count > 99 ? 10 : count > 9 ? 12 : 14;
  return L.divIcon({
    className: "",
    html:
      '<div style="width:' + d + 'px;height:' + d + 'px;border-radius:50%;' +
      "background:" + fillColor + ";border:2.5px solid " + MAP_COLORS.gold + ";" +
      "display:flex;align-items:center;justify-content:center;" +
      "color:#fff;font-family:'Lora',Georgia,serif;font-size:" + fontSize + "px;font-weight:700;" +
      'box-shadow:0 2px 10px rgba(10,107,196,.35);">' + count + "</div>",
    iconSize: [d, d],
    iconAnchor: [d / 2, d / 2]
  });
}

export function communityLabelTooltip(map, latlng, text, offsetPx) {
  L.tooltip({ permanent: true, direction: "top", offset: [0, -offsetPx], className: "" })
    .setContent('<span class="map-marker-label">' + text + "</span>")
    .setLatLng(latlng)
    .addTo(map);
}

/**
 * Watches a tile layer for load success/failure. If tiles never load
 * successfully within the timeout, replaces the map frame with a plain-text
 * fallback pointing at the Community Rankings table, so the page never
 * shows a blank or broken map.
 */
export function attachTileFallback(map, tileLayer, frame, onFail) {
  let loaded = false;
  let failed = false;

  tileLayer.on("load", () => { loaded = true; });

  const timer = setTimeout(() => {
    if (!loaded && !failed) {
      failed = true;
      onFail();
    }
  }, 8000);

  tileLayer.on("tileerror", () => {
    // A handful of individual tile errors is normal (e.g. edge tiles at low
    // zoom); only trigger the fallback if nothing has loaded successfully
    // by the time the timeout above fires.
  });

  map.on("remove", () => clearTimeout(timer));
}

export function showMapFallback(frame, message) {
  frame.innerHTML =
    '<p class="map-error" role="status">' + message + "</p>";
}
