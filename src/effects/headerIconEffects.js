const greetingMenuIcons = document.getElementsByClassName("menuSvg");

function init() {
  // console.log(greetingMenuIcons);
  for (let i = 0; i < greetingMenuIcons.length; i++) {
    let element = greetingMenuIcons[i];
    element.addEventListener("mouseover", function () {
      element.style.cursor = "pointer";
      element.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
    });
    element.addEventListener("mouseout", function () {
      element.style.backgroundColor = "";
    });
    element.addEventListener("click", function () {
      element.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
      // setTimeout(function () {
      //   element.style.backgroundColor = "";
      // }, 2000);

      // open things
    });
  }
}

export { init };