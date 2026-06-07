/****** >>> IMPORTS <<< ******/
import { hideAllFeatures } from "../controller/render-page.js";

/****** >>> VARIABLES <<< ******/
// get the html element where you will display the time and date
const TIME_DISPLAY = document.querySelector(".time-display");
const DATE_DISPLAY = document.querySelector(".date-display");
const TIME_FEATURE = document.querySelector(".time-feature");

/****** >>> SHOW-TIME FUNCTION <<< */
export function showTime() {
  // hide all features first
  hideAllFeatures();

  // only show the time-feature and also add flex property
  TIME_FEATURE.classList.remove("hidden");
  TIME_FEATURE.classList.add("flex");

  // initialize the date class
  const TIME = new Date();

  // get the hours, minutes and seconds from the date class
  let hours = TIME.getHours();
  let minutes = TIME.getMinutes();
  let seconds = TIME.getSeconds();

  // padStart the time to take only 2 digits
  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");

  // insert the hours, minutes and seconds into the html
  TIME_DISPLAY.textContent = `${hours} : ${minutes} : ${seconds}`;

  // updating the time on every second
  const DELAY = 1000 - TIME.getMilliseconds();
  TIMER_ID = setTimeout(showTime, DELAY);

  // date logic
  const DATE = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  // format the date based on the user's browser language
  const EXACT_TIME = TIME.toLocaleDateString(undefined, DATE);
  DATE_DISPLAY.textContent = EXACT_TIME;
}

/******>>> CALL STOPRECURSING WHEN WE CLICK ON ANY OTHER NAV-BTN 
EXCEPT TIME-NAV-BTN <<< *****/
let TIMER_ID = null;
export function stopTimeRecursing() {
  if (TIMER_ID) {
    clearTimeout(TIMER_ID);
    TIMER_ID = null;
  }
}
