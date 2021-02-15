import { init as weatherInit } from "../weather/handleWeather.js";

function init() {
  const weatherRefreshIcon = document.getElementById("refreshIcon");
  weatherRefreshIcon.addEventListener("click", function () {
    weatherRefreshIcon.classList.add("rotate");
    setTimeout(() => {
      weatherRefreshIcon.classList.remove("rotate");
      weatherInit();
    }, 1000);
    // setTimeout(() => {
    //   weatherRefreshIcon.classList.remove("rotate");
    //   const weatherText = document.querySelector("#weatherDiv p");
    //   weatherText.classList.add("blinkFast");
    //   setTimeout(() => {
    //     weatherText.classList.remove("blinkFast");
    //   }, 200);
    // }, 800);
  });
}

export { init };
