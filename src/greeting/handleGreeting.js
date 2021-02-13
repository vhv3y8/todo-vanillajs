import { setUserName } from "../setUserName/setUserName.js";
import { Consts } from "../Consts.js";

const greetingText = document.querySelector("#greetingText");

function init() {
  let noname = localStorage.getItem(Consts.NO_NAME);
  if (noname === "true") {
    console.log("No Name");
    greetingText.innerHTML = getMessage(false, new Date().getHours());
  } else {
    console.log("Use Name");
    const userName = localStorage.getItem(Consts.USER_NAME);
    // console.log(user);
    if (userName === null) {
      console.log("user is null");
      // show initial page to get name
      setUserName();
      // init();
    } else {
      greetingText.innerHTML = getMessage(
        true,
        new Date().getHours(),
        userName
      );
    }
  }
}

function getMessage(useName, hour, name) {
  function pickRandom(timeText) {
    const message = {
      morning: [
        ["Good Morning", ",", "!"],
        ["Have a good day", ",", "!"],
      ],
      lunch: [["Enjoy your lunch", ",", "!"]],
      afternoon: [["Good Afternoon", ",", "."]],
      evening: [["Good Evening", ",", "."]],
      night: [["Good Night", ",", "."]],
    };

    let texts = message[timeText];

    return texts[Math.floor(Math.random() * Math.floor(texts.length))];
  }

  // flow start
  let timeText;
  console.log("time is " + hour);
  if (5 <= hour && hour <= 10) {
    timeText = "morning";
  } else if (11 <= hour && hour <= 14) {
    timeText = "lunch";
  } else if (15 <= hour && hour <= 20) {
    timeText = "afternoon";
  } else if (21 <= hour && hour <= 24) {
    timeText = "evening";
  } else {
    timeText = "night";
  }

  let [greetingMessage, midChar, endChar] = pickRandom(timeText);

  return useName
    ? `${greetingMessage}${midChar} ${name}${endChar}`
    : `${greetingMessage}${endChar}`;
}

export { init };
