/****** >>> IMPORTS <<< ******/
import { showTime } from "../model/time.js";

/****** >>> RENDERING THE PAGE <<< ******/
export function renderPage() {
  showTime();
}

/****** >>> HELPER FUNCTION TO HIDE ALL FEATURES FIRST <<< ******/
const FEATURE = document.querySelectorAll(".feature");
export function hideAllFeatures() {
  FEATURE.forEach((feature) => {
    feature.classList.add("hidden");
    feature.classList.remove("flex");
  });
}
