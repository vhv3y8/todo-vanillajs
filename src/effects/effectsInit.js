import { init as headerInit } from "./headerIconEffects.js";
import { init as setUserNameInit } from "./setUserNameEffects.js";
import { init as weatherInit } from "./weatherEffects.js";
// import { init as todoInit } from "./todoEffects.js";

function init() {
  headerInit();
  setUserNameInit();
  weatherInit();
  // todoInit();  // todoEffects is initialized at src/todo/todoInit.js
}

export { init };
