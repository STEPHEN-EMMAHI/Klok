/****** >>> IMPORTS <<< ******/
import { showTime } from "./time.js";
import { stopTimeRecursing } from "./time.js";
import { hideAllFeatures } from "../controller/render-page.js";
import { Wheel } from "../controller/keen-slider.js";
import {
  hourWheel,
  minuteWheel,
  secondWheel,
} from "../controller/keen-slider.js";

/****** >>> VAIRABLES <<< ******/
const TIMER_FEATURE = document.querySelector(".timer-feature");
const SCHEDULES_CONTAINER = document.getElementById("schedules");
const RESET = document.getElementById("reset");
const COUNT_DOWN = document.getElementById("countdown");
const TOP_GROUP = document.querySelector(".top-group");
const TOGGLE_BTN_CONTAINER = document.getElementById("toggle-play-pause");
const PLAY_ICON = document.getElementById("play-icon");
const PAUSE_ICON = document.getElementById("pause-icon");
const PLAY_LABEL = document.getElementById("play-span");
const PREVENT_START = document.getElementById("prevent-start");
const TIMER_STARTER = document.querySelector(".timer-starter");

/****** >>> SHOW TIMER FEATURE <<< ****/
export function showTimer() {
  stopTimeRecursing();
  hideAllFeatures();
  TIMER_FEATURE.classList.remove("hidden");
}

/**** >>> CLICK QUICK SCHEDULE BTNS, CHANGE WHEEL TIME <<< **/
export function triggerSchedules(event) {
  console.log("closest button:", event.target.closest("button"));

  // get the closest button that was click
  const ACTIVE_BTN = event.target.closest("button");

  // if not the closest button, return nothing
  if (!ACTIVE_BTN) return;

  // find the previous active button
  const CURRENT_BTN = SCHEDULES_CONTAINER.querySelector(
    "button.activeSchedule",
  );
  // if current button exists revert back to old styles
  if (CURRENT_BTN) {
    CURRENT_BTN.classList.remove(
      "activeSchedule",
      "bg-[#1e2530]",
      "text-blue-400",
    );
    CURRENT_BTN.classList.add("bg-zinc-900", "text-gray-400");
  }

  // always activate the newly clicked button
  ACTIVE_BTN.classList.remove("bg-zinc-900", "text-gray-400");
  ACTIVE_BTN.classList.add("activeSchedule", "bg-[#1e2530]", "text-blue-400");

  /* SCHEDULE QUICK TIME */
  // align the dataset.time to that of the current activeSchedule button
  const TIME_STRING = ACTIVE_BTN.dataset.time;

  // if current button has the dataset, split dataset into arrays
  if (TIME_STRING) {
    const [HOURS, MINUTES, SECONDS] = TIME_STRING.split(":").map(Number);

    if (typeof hourWheel !== undefined) {
      hourWheel.moveToIdx(HOURS);
    }

    if (typeof minuteWheel !== undefined) {
      minuteWheel.moveToIdx(MINUTES);
    }

    if (typeof secondWheel !== undefined) {
      secondWheel.moveToIdx(SECONDS);
    }
  }
}

/****** >>> EXCEPTION return to original state if we click 
outside  quick timer schedules. Examples: meeting, sleep <<< ****/

export function resetScheduleButtons() {
  const ACTIVE_BTN = document.querySelector(".activeSchedule");
  // if active button exists, apply changes
  if (ACTIVE_BTN) {
    ACTIVE_BTN.classList.remove(
      "activeSchedule",
      "bg-[#1e2530]",
      "text-blue-400",
    );
    ACTIVE_BTN.classList.add("bg-zinc-900");
  }
}

/****** >>> CLICK ON RESET TO reset TIMER FEATURE <<< *****/
RESET.addEventListener("click", () => {
  // reset the global state tracker to false
  isCounting = false;
  clearInterval(timeInterval);
  timeInterval = null;
  totalSeconds = 0;

  // get the top-group and countdown ID and remove/add their-
  //... respective classes
  COUNT_DOWN.classList.add("hidden");
  TOP_GROUP.classList.remove("hidden");

  // Remove hidden class on to play-icon
  PLAY_ICON.classList.remove("hidden");

  // Add hidden class to disappear the pause-icon
  PAUSE_ICON.classList.add("hidden");

  // update the label for the start timer
  PLAY_LABEL.textContent = "Start";

  // hide prevent
  PREVENT_START.classList.add("hidden");
  COUNT_DOWN.textContent = "00 : 00 : 00";
});

/****** >>> CLICK START TO Start TIMER COUNTDOWN <<< ******/

// initialise a global state tracker
let isCounting = false;

//when i click on the start blue button, hide the top group
TOGGLE_BTN_CONTAINER.addEventListener("click", () => {
  /* START COUNTDOWN */
  handleStart();
});

/****** >>> HANDLE START FUNCTION <<< ******/

// declare a state variable
let totalSeconds = 0;

function getWheelSeconds() {
  const HOURS = parseInt(hourWheel.track?.details?.rel || 0, 10);
  const MINUTES = parseInt(minuteWheel.track?.details?.rel || 0, 10);
  const SECONDS = parseInt(secondWheel.track?.details?.rel || 0, 10);
  return { HOURS, MINUTES, SECONDS };
}

function handleStart() {
  const { HOURS, MINUTES, SECONDS } = getWheelSeconds();

  console.log("capture values:", HOURS, MINUTES, SECONDS);

  if (!isCounting && HOURS === 0 && MINUTES === 0 && SECONDS === 0) {
    PREVENT_START.classList.remove("hidden");
    PREVENT_START.textContent = "Cannot start with all 0s'";
    PREVENT_START.classList.add("text-red-400");
    return;
  }

  if (!isCounting && totalSeconds === 0) {
    totalSeconds = HOURS * 3600 + MINUTES * 60 + SECONDS;
    console.log("total sec: ", totalSeconds);
  }

  if (PREVENT_START) PREVENT_START.classList.add("hidden");

  PLAY_ICON.classList.toggle("hidden");
  PAUSE_ICON.classList.toggle("hidden");

  isCounting = !isCounting;
  PLAY_LABEL.textContent = isCounting ? "Pause" : "Start";

  if (isCounting) {
    TOP_GROUP.classList.add("hidden");
    COUNT_DOWN.classList.remove("hidden");
    COUNT_DOWN.classList.add("flex", "justify-center", "p-10");
    startCountDownLoop();
  } else {
    clearInterval(timeInterval);
    timeInterval = null;
  }
}

/****** >>> START COUNT DOWN LOOP <<< ******/

// initialize a timeInterval of null
let timeInterval = null;

function updateCountDownDisplay(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const padH = String(h).padStart(2, "0");
  const padM = String(m).padStart(2, "0");
  const padS = String(s).padStart(2, "0");

  COUNT_DOWN.textContent = `${padH} : ${padM} : ${padS}`;
}

function startCountDownLoop() {
  clearInterval(timeInterval);

  if (totalSeconds <= 0) {
    COUNT_DOWN.textContent = "00 : 00 : 00";
    return;
  }

  updateCountDownDisplay(totalSeconds);

  timeInterval = setInterval(() => {
    totalSeconds -= 1;

    if (totalSeconds < 0) {
      clearInterval(timeInterval);
      timeInterval = null;
      return;
    }

    updateCountDownDisplay(totalSeconds);
  }, 1000);
}

/* SOUND */
export function sound() {
  const PREVENT_SOUND = document.querySelector(".prevent-sound");
  PREVENT_SOUND.innerHTML = "Sound is disabled";
  PREVENT_SOUND.classList.add("text-red-400");

  // hide after 2 seconds
  setTimeout(() => {
    PREVENT_SOUND.innerHTML = "";
    PREVENT_SOUND.classList.remove("text-red-400");
  }, 2000);
}
