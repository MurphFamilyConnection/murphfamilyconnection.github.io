/**
 * calhoun-map.js
 * Calhoun County, South Carolina — home to St. Matthews, the most
 * represented community in the registration list. Thin wrapper around
 * county-map.js; the community list is derived from
 * data/attendees.json (southCarolinaCommunities where county === "Calhoun"),
 * never hardcoded here.
 */
import { renderCountyMap } from "./county-map.js";

export function renderCalhounMap(data, frameId, statusId) {
  const communities = data.southCarolinaCommunities.filter((c) => c.county === "Calhoun");
  return renderCountyMap({
    frameId,
    statusId,
    countyFips: "45017",
    countyLabel: "Calhoun County, South Carolina",
    communities
  });
}
