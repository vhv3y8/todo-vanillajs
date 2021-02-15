import { init as clockInit } from "./clock/clock.js";
import { init as greetingInit } from "./greeting/handleGreeting.js";
import { init as effectsInit } from "./effects/effectsInit.js";
import { init as weatherInit } from "./weather/handleWeather.js";
import { init as todoInit } from "./todo/todoInit.js";
import { init as settingsInit } from "./dataHandlers/userSettingData.js";
import { init as userSettingInit } from "./userSettings/userSettingsInit.js";

import { flushTodoDB } from "./dataHandlers/todoData.js";
import { flushTodoCondition } from "./dataHandlers/todoCondition.js";
import { flushSetting } from "./dataHandlers/userSettingData.js";

function init() {
  settingsInit();
  userSettingInit();
  todoInit();

  clockInit();
  weatherInit();
  greetingInit();
  effectsInit();
}

window.addEventListener("beforeunload", function () {
  flushTodoDB();
  flushTodoCondition();
  flushSetting();
});

init();
