import { Consts } from "../Consts.js";

function init() {
  const weatherDiv = document.querySelector("#weatherDiv");
  const API_KEY = "9751f85190bca83e7868d6b71943a1aa";

  const coordsStr = localStorage.getItem(Consts.COORDS);
  const coordsObj = JSON.parse(coordsStr);
  if (coordsObj !== null) {
    console.log(coordsObj);
    // TODO: get weather
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
