/****** >>> IMPORT KEEN-SLIDER <<< ******/
import KeenSlider from "keen-slider";
import "keen-slider/keen-slider.min.css";
import { resetScheduleButtons } from "../model/timer.js";

export function Wheel(wrapper, options) {
  let defaultOptions = {
    initIdx: 0,
    loop: false,
    perspective: "center",
    width: 100,
    label: "",
  };

  options = { ...defaultOptions, ...options };

  let wheel;
  let slides = [];
  function createMarkup() {
    for (let i = 0; i < options.length; i++) {
      let div = document.createElement("div");
      div.setAttribute("class", "wheel__slide");
      slides.push(div);
    }

    wheel = createDiv(
      "wheel keen-slider wheel--perspective-" + options.perspective,
      [
        createDiv("wheel__shadow-top"),
        createDiv("wheel__inner", [
          createDiv("wheel__slides", slides, "width:" + options.width + "px"),
          createDiv("wheel__label", document.createTextNode(options.label)),
        ]),
        createDiv("wheel__shadow-bottom"),
      ],
    );
    wrapper.appendChild(wheel);
  }

  let slidesPerView = options.loop ? 9 : 1;
  let slideDegree = 360 / 20;
  let wheelSize = 20;
  let radius = 300 / 2;

  function createDiv(className, append, style) {
    let div = document.createElement("div");
    if (className) div.setAttribute("class", className);
    if (style) div.setAttribute("style", style);
    if (!append) return div;
    if (!Array.isArray(append)) append = [append];
    append.forEach((element) => {
      div.appendChild(element);
    });
    return div;
  }

  function init() {
    createMarkup();
    let sliderOptions = {
      slides: {
        number: options.length,
        origin: options.loop ? "center" : "auto",
        perView: slidesPerView,
      },
      vertical: true,
      initial: options.initIdx || 0,
      loop: options.loop,
      dragSpeed: (val) => {
        let height = 133;
        return (
          val *
          (height /
            ((height / 2) * Math.tan(slideDegree * (Math.PI / 180))) /
            slidesPerView)
        );
      },
      detailsChanged: (s) => {
        updateSlides(s.track.details);
      },
      rubberband: !options.loop,
      mode: "free-snap",
    };
    let slider = new KeenSlider(wheel, sliderOptions);
    return slider;
  }

  function updateSlides(details) {
    let offset = options.loop ? 1 / 2 - 1 / slidesPerView / 2 : 0;
    let values = [];
    for (let i = 0; i < options.length; i++) {
      let distance = (details.slides[i].distance - offset) * slidesPerView;

      let rotate =
        Math.abs(distance) > wheelSize / 2
          ? 180
          : distance * (360 / wheelSize) * -1;
      let style = {
        transform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
        WebkitTransform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
      };
      let value = options.setValue
        ? options.setValue(i, details.abs + Math.round(distance))
        : i;
      values.push({ style, value });
      slides[i].style.transform = style.transform;
      slides[i].innerHTML = value;
    }
  }

  return init();
}

export const hourWheel = new Wheel(document.getElementById("hour-wheel"), {
  initIdx: 0,
  loop: true,
  length: 24,
  width: 23,
  perspective: "center",
  label: "h",
});

export const minuteWheel = new Wheel(document.getElementById("minute-wheel"), {
  initIdx: 0,
  loop: true,
  length: 60,
  width: 23,
  perspective: "center",
  label: "m",
});

export const secondWheel = new Wheel(document.getElementById("second-wheel"), {
  initIdx: 0,
  loop: true,
  length: 60,
  width: 23,
  perspective: "center",
  label: "s",
});

/****** >>> OFF STATE FOR THE QUICK TIMER SCHEDULE WHEN THE WHEEL 
IS DRAGGED <<< ******/
document.querySelectorAll(".wheel.keen-slider").forEach((wheel) => {
  // for mobile touch-dragging
  wheel.addEventListener("touchmove", () => resetScheduleButtons(), {
    passive: true,
  });

  // for laptop trackpad/mouse click and drag
  wheel.addEventListener("pointermove", (event) => {
    // check if the left mouse button is actively pressed down
    if (event.buttons === 1) {
      resetScheduleButtons();
    }
  });
});
