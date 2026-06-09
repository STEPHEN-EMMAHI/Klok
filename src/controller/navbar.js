/* IMPORTS */
import { renderPage } from "./render-page.js";

/* VARIABLES */
const NAV_CONTAINER = document.getElementById("nav");

/**  NAVBAR FUNCTION **/
export function showNavBar(event) {
  // get the closest anchor tag that was clicked
  const ACTIVE_BTN = event.target.closest("a");

  // prevent anchor tag default page reload behavior
  event.preventDefault();

  // if button wasn't clicked, return nothing
  if (!ACTIVE_BTN) return;

  // remove the class from the previous active button
  const CURRENT_BTN = NAV_CONTAINER.querySelector("a.active");
  CURRENT_BTN?.classList.remove(
    "active",
    "bg-blue-700",
    "text-white",
    "text-[1.4rem]",
  );

  // adding the class active to the newly clicked button
  ACTIVE_BTN.classList.add(
    "active",
    "bg-blue-700",
    "text-white",
    "text-[1.4rem]",
  );

  // read the URL
  const TARGET_URL = ACTIVE_BTN.getAttribute("href");
  history.pushState(null, "", TARGET_URL);
}
