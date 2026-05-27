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

/* SHOW TIME WHEN TIME-BTN IS CLICKED */
// get the time-btn
const TIME_BTN = document.getElementById("time-btn");
TIME_BTN.addEventListener("click", showTime);
