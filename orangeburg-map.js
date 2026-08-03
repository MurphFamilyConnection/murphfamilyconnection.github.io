/**
 * orangeburg-map.js
 * Orangeburg County, South Carolina. Thin wrapper around county-map.js;
 * the community list is derived from data/attendees.json
 * (southCarolinaCommunities where county === "Orangeburg"), never
 * hardcoded here.
 */
import { renderCountyMap } from "./county-map.js";

export function renderOrangeburgMap(data, frameId, statusId) {
  const communities = data.southCarolinaCommunities.filter((c) => c.county === "Orangeburg");
  return renderCountyMap({
    frameId,
    statusId,
    countyFips: "45075",
    countyLabel: "Orangeburg County, South Carolina",
    communities
  });
}
