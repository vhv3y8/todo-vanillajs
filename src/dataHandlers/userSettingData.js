import { Consts } from "../Consts.js";

let settingDB = JSON.parse(localStorage.getItem(Consts.SETTING));
let settingChanged = false;
console.log(settingDB);

function init() {
  if (settingDB === null) {
    settingDB = {
      backgroundColor: "rgb(20, 28, 52)",
      mode: "ToDoList",
      randomOnRefresh: true,
      useAmPm: true,
    };
    localStorage.setItem(Consts.SETTING, JSON.stringify(settingDB));
  }
}

function changeScreenMode(modeName) {}

///////////////

function getBackgroundColor() {
  return settingDB.backgroundColor;
}

function setBackgroundColor(backgroundColor) {
  settingDB.backgroundColor = backgroundColor;
  settingChanged = true;
}

///////////////

function getRandomOnRefresh() {
  // console.log(settingDB);
  console.log("giving randomOnRefresh : " + settingDB.randomOnRefresh);
  return settingDB.randomOnRefresh;
}

function setRandomOnRefresh(bool) {
  settingDB.randomOnRefresh = bool;
  console.log("setting randomOnRefresh to : " + bool);
  settingChanged = true;
}

///////////////

function getUseAmPm() {
  console.log("giving useAmPm : " + settingDB.useAmPm);
  return settingDB.useAmPm;
}

function setUseAmPm(bool) {
  settingDB.useAmPm = bool;
  console.log("setting useAmpm to : " + bool);
  settingChanged = true;
}

///////////////

function flushSetting() {
  if (settingChanged === true) {
    localStorage.setItem(Consts.SETTING, JSON.stringify(settingDB));
  }
}

export {
  init,
  getBackgroundColor,
  setBackgroundColor,
  flushSetting,
  getRandomOnRefresh,
  setRandomOnRefresh,
  getUseAmPm,
  setUseAmPm,
};
