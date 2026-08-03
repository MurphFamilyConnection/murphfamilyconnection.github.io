/**
 * layout.js
 * Loads the shared header and footer partials into every page and marks
 * the current page's nav link. This is the site's one source of truth for
 * navigation — add/remove/rename a nav item in assets/partials/header.html
 * and every page picks it up automatically.
 */
import { CONFIG } from "./config.js";

async function includePartial(selector, url) {
  const mountPoint = document.querySelector(selector);
  if (!mountPoint) { return; }
  try {
    const res = await fetch(url);
    if (!res.ok) { throw new Error("Could not load " + url); }
    mountPoint.outerHTML = await res.text();
  } catch (err) {
    console.error(err);
  }
}

function markCurrentNavLink() {
  var currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach(function (link) {
    if (link.getAttribute("href") === currentPath) {
      link.setAttribute("aria-current", "page");
    }
  });
}

export async function initLayout() {
  await Promise.all([
    includePartial("#site-header", CONFIG.partials.header),
    includePartial("#site-footer", CONFIG.partials.footer)
  ]);
  markCurrentNavLink();
}
