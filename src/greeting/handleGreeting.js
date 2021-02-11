import { setUserName } from "../setUserName/setUserName.js";
import { Consts } from "../Consts.js";

const greetingText = document.querySelector("#greetingText");

function init() {
  // TODO: NO_NAME을 구현해야한다.

  const user = localStorage.getItem(Consts.USER_NAME);
  // console.log(user);
  if (user === null) {
    console.log("user is null");
    // show initial page to get name
    setUserName();
    // init();
  } else {
    greetingText.innerHTML = getMessage(new Date().getHours(), user);
  }
}

function getMessage(time, user) {
  function pickRandom(timeText) {
    const message = {
      morning: [["Good Morning,", "!"]],
      lunch: [["Enjoy your lunch,", "!"]],
      afternoon: [["Good Afternoon,", "."]],
      evening: [["Good Evening,", "."]],
      night: [["Good Night,", "."]],
    };

    let texts = message[timeText];

    return texts[Math.floor(Math.random() * Math.floor(texts.length))];
  }

  // flow start
  let timeText;
  console.log("time is " + time);
  if (5 <= time && time <= 10) {
    timeText = "morning";
  } else if (11 <= time && time <= 14) {
    timeText = "lunch";
  } else if (15 <= time && time <= 20) {
    timeText = "afternoon";
  } else if (21 <= time && time <= 24) {
    timeText = "evening";
  } else {
    timeText = "night";
  }

  let [greetingMessage, endChar] = pickRandom(timeText);

  return `${greetingMessage} ${user}${endChar}`;
}

export { init };
