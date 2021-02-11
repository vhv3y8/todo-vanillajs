import { init as clockInit } from "./clock/clock.js";
import { init as greetingInit } from "./greeting/handleGreeting.js";
import { init as effectsInit } from "./effects/effectsInit.js";
import { init as weatherInit } from "./weather/handleWeather.js";

function init() {
  clockInit();
  greetingInit();
  effectsInit();
  weatherInit();
}

init();
