function init() {
  const modal = document.getElementById("setUserNameIframe");
  const innerModal = modal.contentDocument || modal.contentWindow.document;

  function addHoverEffect(element, color) {
    element.addEventListener("mouseover", function () {
      element.querySelector("svg").style.fill = color;
      element.style.cursor = "pointer";
    });
    element.addEventListener("mouseout", function () {
      element.querySelector("svg").style.fill = "";
    });
  }

  const noButton = innerModal.querySelector("#no");
  const yesButton = innerModal.querySelector("#yes");

  addHoverEffect(yesButton, "#267326");
  addHoverEffect(noButton, "#b32d00");
}

export { init };
