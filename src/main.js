/* TOGGLING THE NAVIGATION BAR */
// using event delegation
// get the nav btns' container
const NAV_BTNS = document.getElementById("nav");
NAV_BTNS.addEventListener("click", (event) => {
  // get the button that was clicked
  const ACTIVE_BTN = event.target.closest("button");

  // if what was clicked is not a button, return nothing
  if (!ACTIVE_BTN) return;

  // now, remove the current button that is active
  const CURRENT_ACTIVE = NAV_BTNS.querySelector("button.active");
  if (CURRENT_ACTIVE) {
    CURRENT_ACTIVE.classList.remove("active", "bg-blue-700", "text-white");
    CURRENT_ACTIVE.classList.add("text-zinc-400");
  }

  // add the active class to the new clicked btn
  ACTIVE_BTN.classList.remove("text-zinc-400");
  ACTIVE_BTN.classList.add("active", "bg-blue-700", "text-white");
});
