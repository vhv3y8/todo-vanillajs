const clockDiv = document.querySelector("#clockDiv p");

let currTime;

function init() {
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
  clockDiv.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;

  console.log(currTime);
}

export { init };
