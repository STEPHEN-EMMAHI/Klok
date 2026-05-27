/* ==>> IMPORTS */
import { showNavBar } from "./navbar.js";
import { renderPage } from "./render-page.js";
import { showTime } from "./time.js";

/* EXECUTING showNavBar FUNCTION */
showNavBar();

// RENDERING THE TIME ON PAGE LOAD
if (
  document.readyState === "interactive" ||
  document.readyState === "complete"
) {
  renderPage();
} else {
  document.addEventListener("DOMContentLoaded", renderPage);
}
