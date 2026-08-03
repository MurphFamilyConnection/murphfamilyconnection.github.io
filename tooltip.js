/**
 * tooltip.js
 * Small reusable tooltip used by both maps.
 */
export function createTooltip(frame) {
  const tooltip = document.createElement("div");
  tooltip.className = "map-tooltip";
  tooltip.setAttribute("role", "status");
  frame.style.position = "relative";
  frame.appendChild(tooltip);

  function show(html, x, y) {
    tooltip.innerHTML = html;
    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
    tooltip.classList.add("is-visible");
  }
  function hide() {
    tooltip.classList.remove("is-visible");
  }
  return { show, hide };
}
