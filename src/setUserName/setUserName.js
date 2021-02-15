import { init as greetingInit } from "../greeting/handleGreeting.js";
import { Consts } from "../Consts.js";

function setUserName(userName) {
  console.log("executing setUserName.");

  // get inner iframe document
  const modal = document.getElementById("setUserNameIframe");
  const innerModal = modal.contentDocument || modal.contentWindow.document;

  // show modal page
  modal.style.display = "block";

  // if userName exists => opened by 'get/change name' button at settings
  if (userName !== undefined) {
    innerModal.querySelector("#getName > input").value = userName;
  }

  // add submit and cancel event listener
  innerModal.querySelector("#getName").addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Submit.");

    let name = innerModal.querySelector("#getName input").value;
    console.log(name);
    if (name !== "") {
      localStorage.setItem(Consts.USER_NAME, name);
      localStorage.setItem(Consts.NO_NAME, false);

      // close modal page
      modal.style.display = "none";

      // update greeting message
      greetingInit();
    }
  });
  innerModal.querySelector("#no").addEventListener("click", function () {
    // close modal page
    modal.style.display = "none";
    console.log(modal);
    if (localStorage.getItem(Consts.USER_NAME) === null) {
      localStorage.setItem(Consts.NO_NAME, true);

      // update greeting message
      greetingInit();
    }
  });
}

export { setUserName };
