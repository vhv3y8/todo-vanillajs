import { init as headerInit } from "./headerIconEffects.js";
import { init as setUserNameInit } from "./setUserNameEffects.js";
import { init as todoInit } from "./todoEffects.js";

function init() {
  headerInit();
  setUserNameInit();
  todoInit();
}

export { init };
