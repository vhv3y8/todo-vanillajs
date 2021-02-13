import { Consts } from "../Consts.js";

function init() {
  document.querySelector("#refreshIcon").addEventListener("click", function () {
    setTimeout(() => {
      updateWeather();
    }, 9000);
  });

  // flow start
  updateWeather();
}

function updateWeather() {
  console.log("Updating Weather.");
  const weatherDiv = document.querySelector("#weatherDiv");

  const coordsStr = localStorage.getItem(Consts.COORDS);
  const coordsObj = JSON.parse(coordsStr);
  if (coordsObj !== null) {
    console.log(coordsObj);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coordsObj.latitude}&lon=${coordsObj.longitude}&appid=${Consts.API_KEY}&units=metric`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        weatherDiv.querySelector(
          "p"
        ).innerHTML = `${json.name} @ ${json.main.temp}`;
      });
  } else {
    navigator.geolocation.getCurrentPosition(gotPosition, () => {
      console.log("Getting geo location Failed.");
    });
  }
}

function gotPosition(pos) {
  const latitude = pos.coords.latitude;
  const longitude = pos.coords.longitude;

  localStorage.setItem(
    Consts.COORDS,
    JSON.stringify({
      latitude,
      longitude,
    })
  );
}

export { init };
