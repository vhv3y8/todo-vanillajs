import { Consts } from "../Consts.js";

function init() {
  // flow start
  initWeather();
}

function initWeather() {
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

function getWeather() {
  const coordsStr = localStorage.getItem(Consts.COORDS);
  const coordsObj = JSON.parse(coordsStr);
  if (coordsObj !== null) {
    console.log(coordsObj);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coordsObj.latitude}&lon=${coordsObj.longitude}&appid=${Consts.API_KEY}&units=metric`
    ).then(function (response) {
      // console.log("hey");
      console.log(typeof response);
      return response.json();
    });
    // .then(function (json) {
    //   console.log(json);
    //   return [json.name, json.main.temp];
    // });
  } else {
    navigator.geolocation.getCurrentPosition(gotPosition, () => {
      console.log("Getting geo location Failed. Try again.");
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

  // initWeather();
}

// document.querySelector("#refreshIcon").addEventListener("click", function () {
//   setTimeout(() => {
//     initWeather();
//   }, 9000);
// });

export { init, getWeather, gotPosition };
