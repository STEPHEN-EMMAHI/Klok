/* TIME FEATURE */

// get the html element where you will display the time and date
const TIME_DISPLAY = document.querySelector(".time-display");
const DATE_DISPLAY = document.querySelector(".date-display");

// showTime functionm
export function showTime() {
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
  setTimeout(showTime, DELAY);

  // DATE LOGIC
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
