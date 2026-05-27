/* TIME FEATURE */

// get the time div from the main
const TIME_DISPLAY = document.querySelector(".time-display");
// get the date div from the main
const DATE_DISPLAY = document.querySelector(".date-display");

export function showTime() {
  // get the date class from the user's device
  const TIME = new Date();

  // get the hours, minutes and seconds from the date class
  let hours = TIME.getHours();
  let minutes = TIME.getMinutes();
  let seconds = TIME.getSeconds();

  // pad single digit with leading zeros
  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");

  // push the time inside the html time display
  TIME_DISPLAY.textContent = `${hours}: ${minutes}: ${seconds}`;

  // run this again exactly on the turn of the next second
  const msUntilNextSecond = 1000 - TIME.getMilliseconds();
  setTimeout(showTime, msUntilNextSecond);

  // DATE LOGIC
  const DATE = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // format the date based on the user's browser langauge
  const EXACT_DATE = TIME.toLocaleDateString(undefined, DATE);
  DATE_DISPLAY.textContent = EXACT_DATE;
}
