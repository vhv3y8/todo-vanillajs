import { setUserName } from "../setUserName/setUserName.js";
import { gotPosition } from "../weather/handleWeather.js";
import {
  giveSuccessEffect,
  giveFailureEffect,
} from "../effects/headerIconEffects.js";
import {
  getBackgroundColor,
  setBackgroundColor,
  getRandomOnRefresh,
  setRandomOnRefresh,
  getUseAmPm,
  setUseAmPm,
} from "../dataHandlers/userSettingData.js";
import { init as updateClock } from "../clock/clock.js";
import { Consts } from "../Consts.js";

const defaultRandomColors = [
  "rgb(137, 94, 42)", // brown
  "rgb(102, 0, 51)", // dark red purple
  "rgb(20, 28, 52)", // tardis BGC
  "rgb(0, 153, 153)", // sky like color dark
  "rgb(71, 71, 107)", // dark purple - evening sky
  "rgb(45, 134, 89)", // ok saek
  "rgb(179, 0, 134)", // dark pink
];

function pickColor() {
  return defaultRandomColors[
    Math.floor(Math.random() * defaultRandomColors.length)
  ];
}

console.log("userSettingsInit------");

function init() {
  // set checkbox of settings

  let isRandom = getRandomOnRefresh();
  let doesUseAmPm = getUseAmPm();

  if (isRandom === true) {
    // random background when loaded
    let applyColor = pickColor();
    document.body.style.backgroundColor = applyColor;
    setBackgroundColor(applyColor);
    // settings display
    document.querySelector(
      "#setting_toggleRandomBGG > span > input"
    ).checked = true;
  } else {
    document.body.style.backgroundColor = getBackgroundColor();
  }

  if (doesUseAmPm === true) {
    document.querySelector("#setting_AmPm > span > input").checked = true;
  }
}

document
  .getElementById("setting_username")
  .addEventListener("click", function () {
    setUserName(localStorage.getItem(Consts.USER_NAME));
  });

document
  .getElementById("setting_location")
  .addEventListener("click", function (e) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log(pos.coords);
        gotPosition(pos);
        // success effect
        giveSuccessEffect(document.getElementById("setting_location"));
      },
      () => {
        console.log("Getting geo location Failed. Try again.");
        // failure effect
        giveFailureEffect(document.getElementById("setting_location"));
      }
    );
  });

document
  .getElementById("setting_randomBGC")
  .addEventListener("click", function (e) {
    // const currBGC = document.body.style.backgroundColor;
    // console.log(currBGC);
    let currBGC = getBackgroundColor();
    let randomColor;
    do {
      console.log("start.");
      randomColor = pickColor();
    } while (randomColor === currBGC);

    // console.log(currBGC);
    // console.log(randomColor);
    setTimeout(function () {
      document.body.style.backgroundColor = randomColor;
      setBackgroundColor(randomColor);
    }, 200);
  });

document
  .getElementById("setting_toggleRandomBGG")
  .addEventListener("click", function () {
    let check = document.querySelector(
      "#setting_toggleRandomBGG > span > input"
    );
    console.log(check);
    console.log("toggling...");
    check.checked = !check.checked;
    let isr = getRandomOnRefresh();
    console.log("from click : randomOnRefresh is : " + isr);
    setRandomOnRefresh(!isr);
  });

document.getElementById("setting_AmPm").addEventListener("click", function () {
  let check = document.querySelector("#setting_AmPm > span > input");
  console.log("toggling ampm...");
  check.checked = !check.checked;
  setUseAmPm(!getUseAmPm());
  updateClock();
});

export { init };
