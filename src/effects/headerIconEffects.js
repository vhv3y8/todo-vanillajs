const greetingMenuIcons = document.getElementsByClassName("menuSvg");

function init() {
  // console.log(greetingMenuIcons);
  // for (let i = 0; i < greetingMenuIcons.length; i++) {
  //   let element = greetingMenuIcons[i];
  //   element.addEventListener("mouseover", function () {
  //     element.style.cursor = "pointer";
  //     element.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
  //   });
  //   element.addEventListener("mouseout", function () {
  //     element.style.backgroundColor = "";
  //   });
  //   element.addEventListener("click", function () {
  //     element.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
  //     // setTimeout(function () {
  //     //   element.style.backgroundColor = "";
  //     // }, 2000);
  //     // open things
  //   });
  // }
}

function giveSuccessEffect(elem) {
  elem.classList.add("_settingSuccess");
  setTimeout(() => {
    elem.classList.remove("_settingSuccess");
  }, 1000);
}

function giveFailureEffect(elem) {
  elem.classList.add("_settingFailure");
  setTimeout(() => {
    elem.classList.remove("_settingFailure");
  }, 1000);
}

export { init, giveSuccessEffect, giveFailureEffect };
