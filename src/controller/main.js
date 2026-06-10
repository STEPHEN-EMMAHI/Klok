/* ==>> IMPORTS */
import { showNavBar } from "./navbar.js";
import { renderPage } from "./render-page.js";
import { showTime } from "../model/time.js";
import { showTimer, triggerSchedules } from "../model/timer.js";

/* ==>> Show NavBar when navigation is clicked */
const NAV_CONTAINER = document.getElementById("nav");
NAV_CONTAINER.addEventListener("click", showNavBar);

/*  ==>> RENDERING THE TIME ON PAGE LOAD */
if (
  document.readyState === "interactive" ||
  document.readyState === "complete"
) {
  renderPage();
} else {
  document.addEventListener("DOMContentLoaded", renderPage);
}

/* ==>> SHOW TIME WHEN TIME-BTN IS CLICKED */
// get the time-btn
const TIME_BTN = document.getElementById("navigation-time");
TIME_BTN.addEventListener("click", showTime);

/* ==>> SHOW TIMER WHEN TIMER-BTN IS CLICKED */
const TIMER_BTN = document.getElementById("navigation-timer");
TIMER_BTN.addEventListener("click", () => {
  showTimer();
});

/* ==>> CHANGE BACKGROUND WHEN SCHEDULES IS CLICKED */
const SCHEDULE_CONTAINER = document.getElementById("schedules");
SCHEDULE_CONTAINER.addEventListener("click", triggerSchedules);
