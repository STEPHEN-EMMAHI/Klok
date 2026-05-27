/* TOGGLING NAVIGATION BAR */
// using event delegation
// get the container's ID
const NAV_CONTAINER = document.getElementById("nav");

export function showNavBar() {
  // adding an event listener
  NAV_CONTAINER.addEventListener("click", (event) => {
    const ACTIVE_BTN = event.target.closest("button");

    // if button wasn't clicked, return nothing
    if (!ACTIVE_BTN) return;

    // remove the class from the previous active button
    const CURRENT_BTN = NAV_CONTAINER.querySelector("button.active");
    CURRENT_BTN.classList.remove(
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
  });
}
