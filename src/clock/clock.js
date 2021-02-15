import { getUseAmPm } from "../dataHandlers/userSettingData.js";
// const timeSpan = document.querySelector("#timeSpan p span");
const timeSpan = document.querySelector(".time"),
  ampmSpan = document.querySelector(".ampm");

let currTime;
let ampm;

function init() {
  ampm = getUseAmPm();
  console.log("from clock : ampm is - " + ampm);
  updateTime();

  // update time exactly when the minute changes
  const initTime = new Date();
  setTimeout(function () {
    updateTime();
    setInterval(updateTime, 60000);
  }, (60 - initTime.getSeconds()) * 1000 - initTime.getMilliseconds());
}

function updateTime() {
  console.log("update time.");

  currTime = new Date();
  let hours = currTime.getHours();
  let minutes = currTime.getMinutes();
  if (ampm === true) {
    // 12 hours
    if (hours < 12) {
      ampmSpan.innerText = "AM";
    } else {
      ampmSpan.innerText = "PM";
      hours -= 12;
    }
    timeSpan.innerText = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
  } else {
    // 24 hours
    ampmSpan.innerText = "";
    timeSpan.innerText = `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }`;
  }

  console.log(currTime);
}

export { init };
