import { initLayout } from "../modules/layout.js";
import { CONFIG } from "../modules/config.js";

document.addEventListener("DOMContentLoaded", async () => {
  await initLayout();

  const iframe = document.getElementById("family-tree-form-frame");
  const fallbackLink = document.getElementById("family-tree-form-fallback-link");
  const url = CONFIG.googleFormEmbedUrl;

  if (iframe && url) { iframe.src = url; }
  if (fallbackLink && url) { fallbackLink.href = url.replace("?embedded=true", ""); }
});
