import {
  getTodoDatas,
  generateId,
  whereToAdd,
  addTodo,
  flushTodoDB,
  deleteTodo,
} from "../dataHandlers/todoData.js";
import { getTodoCondition } from "../dataHandlers/todoCondition.js";
import {
  init as todoEffectInit,
  ereserEffect,
  addTodoItemEffect,
  attatchTodoItemEffect,
} from "../effects/todoEffects.js";

const todoListDiv = document.querySelector("#todoListDiv");
const currentDate = new Date();
console.log("run todoInit. - " + new Date().getMilliseconds());

// init function
function init() {
  todoListDiv.innerHTML = "";

  // TODO : sort by duedate
  let todoCondition = getTodoCondition();
  getTodoDatas()
    .filter((data) => matchCondition(data, todoCondition))
    .sort((a, b) => {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    })
    .map((elem) => {
      console.log(elem.dueDate);
      return createTodoItemUI(elem.id, elem.text, elem.dueDate, elem.isChecked);
    })
    .forEach((todoItemDiv) => {
      todoListDiv.appendChild(todoItemDiv);
    });
  todoEffectInit();
}

function matchCondition(todoData, todoCondition) {
  return todoData;
}

function createTodoItemUI(id, text, dueDate, isChecked) {
  let todo = document.createElement("div");
  todo.className = "todoItem";

  let containsText = document.createElement("div");
  containsText.classList.add("fl-row-st");
  containsText.classList.add("textContainer");
  let textTag = document.createElement("p");
  textTag.innerHTML = text;
  containsText.appendChild(textTag);

  let attContainer = document.createElement("div");
  attContainer.classList.add("fl-row-st");
  attContainer.classList.add("attContainer");
  let containsSvg = document.createElement("div");
  // containsSvg.style.display = "block";
  // containsSvg.style.position = "absolute";
  // containsSvg.classList.add("att");
  // containsSvg.classList.add("duetime");
  // containsSvg.style.width = "100%";
  // containsSvg.style.height = "100%";
  // containsSvg.style.margin = "auto 5px";

  // let clockSvg = document.createElement("svg");
  let clockSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  // clockSvg.setAttribute("xmlns", "https://www.w3.org/2000/svg");
  let svgLen = 16;
  // clockSvg.style.width = svgLen;
  // clockSvg.style.height = svgLen;
  clockSvg.setAttribute("width", svgLen);
  clockSvg.setAttribute("height", svgLen);
  clockSvg.setAttribute("viewBox", "0 0 " + (svgLen + 8) + " " + (svgLen + 8));
  // clockSvg.setAttributeNS(null, "width", svgLen);
  // clockSvg.setAttributeNS(null, "height", svgLen);
  // clockSvg.setAttributeNS(
  //   null,
  //   "viewBox",
  //   "0 0 " + (svgLen + 8) + " " + (svgLen + 8)
  // );
  clockSvg.setAttribute("fill", "white");

  let clockPath = document.createElement("path");
  clockPath.setAttribute(
    "d",
    "M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 12v-6h-2v8h7v-2h-5z"
  );
  let dueDateText = document.createElement("p");
  dueDateText.innerHTML = getRelativeTime(new Date(dueDate), currentDate);
  // dueDateText.style.margin = "0";
  // dueDateText.style.width = "50px";

  // clockSvg.appendChild(clockPath);
  // containsSvg.appendChild(clockSvg);
  // attContainer.appendChild(containsSvg);
  attContainer.appendChild(dueDateText);

  todo.appendChild(containsText);
  todo.appendChild(attContainer);

  if (isChecked) {
    todo.classList.add("_checked");
  }
  todo.id = "todo_" + id;

  // console.log(clockSvg);

  return todo;
}

function getRelativeTime(dueDate, currentDate) {
  console.log(dueDate);
  dueDate = dueDate.getTime();
  currentDate.setHours(0, 0, 0);
  currentDate = currentDate.getTime();
  // changed some code from : https://stackoverflow.com/a/6109105
  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  let msPerMonth = msPerDay * 30;
  let msPerYear = msPerDay * 365;

  let elapsed = dueDate - currentDate;
  if (elapsed < msPerDay) {
    return "Today";
  } else if (elapsed < msPerDay * 2) {
    return "Tomorrow";
  } else if (elapsed < msPerDay * 7) {
    return Math.round(elapsed / msPerDay) + " days left";
  } else if (elapsed < msPerDay * 14) {
    return "Next Week";
  } else if (elapsed < msPerMonth) {
    return "This Month";
  } else {
    // console.log(dueDate);
    return new Date(dueDate).toISOString().slice(0, 10);
  }
}

function formatDueDate(dueDate) {
  return dueDate;
}

function removeTodoUI(todoItemDiv) {
  // class 추가해서 애니메이션 효과 주기 등등.
}

function toTodoId(tagId) {
  return parseInt(tagId.slice(5));
}

function toTagId(todoId) {
  return "todo_" + todoId;
}



document.querySelector("#eraserButton").addEventListener("click", function () {
  const checkedTodos = [...todoListDiv.querySelectorAll("._checked")];
  const checkedIds = checkedTodos
    .map((elem) => elem.id)
    .map((id) => id.slice(5));
  // parseInt 해야되나?

  console.log(checkedTodos);
  console.log(checkedIds);

  // remove from html
  // checkedTodos.forEach((div) => removeTodoUI(div));
  // eraserEffect function
  ereserEffect();

  // remove from database
  checkedIds.forEach((todoId) => deleteTodo(todoId));

  // init();
});

function setTimeEffect() {
  const timeSelections = document.querySelectorAll("#getTimeDiv div");
  const [todayElem, tomorrowElem] = [timeSelections[0], timeSelections[1]];

  let selectedTime = new Date(document.querySelector("#timeInput").value);
  selectedTime.setHours(0);
  let todayZero = new Date(new Date().setHours(0, 0, 0, 0));
  let tomorrowZero = new Date(new Date().setHours(24, 0, 0, 0));
  console.log(selectedTime);
  console.log(todayZero);
  console.log(tomorrowZero);

  if (selectedTime.getTime() == todayZero.getTime()) {
    todayElem.classList.add("_timeSelected");
    tomorrowElem.classList.remove("_timeSelected");
  } else if (selectedTime.getTime() === tomorrowZero.getTime()) {
    tomorrowElem.classList.add("_timeSelected");
    todayElem.classList.remove("_timeSelected");
  } else {
    todayElem.classList.remove("_timeSelected");
    tomorrowElem.classList.remove("_timeSelected");
  }
}
document.querySelector("#timeInput").addEventListener("change", function () {
  setTimeEffect();
});

document
  .querySelectorAll("#getTimeDiv div")[0]
  .addEventListener("click", function () {
    document.querySelector("#timeInput").valueAsDate = new Date(
      new Date().setHours(24, 0, 0, 0)
    );

    //   .toISOString()
    //   .slice(0, 10);
    // console.log(new Date(new Date().setHours(0, 0, 0, 0)));
    // console.log(new Date(new Date().setHours(0, 0, 0, 0)).toISOString());
    // console.log(document.querySelector("#timeInput").value);
    // console.log("from today");
    setTimeEffect();
  });

document
  .querySelectorAll("#getTimeDiv div")[1]
  .addEventListener("click", function () {
    document.querySelector("#timeInput").valueAsDate = new Date(
      new Date().setHours(48, 0, 0, 0)
    );
    setTimeEffect();
  });

document.querySelector("#submitButton").addEventListener("click", function (e) {
  console.log(e.target);
  console.log("submitting form....");

  submitAdd();
});

document.querySelector("#todoAddForm").addEventListener("submit", function (e) {
  e.preventDefault();
  // console.log(e);
  submitAdd();
});

function submitAdd() {
  if (
    document.querySelector("#todoAddForm input").value != false &&
    !isNaN(new Date(document.querySelector("#timeInput").value))
  ) {
    console.log("pushing new todo.");

    // push to db
    let newId = generateId();
    // console.log(newId);
    // let args = {
    //   id: newId,
    //   text: document.querySelector("#todoAddForm input").value,
    //   dueDate: newDate,
    //   isChecked: false,
    // };
    let time = document.querySelector("#timeInput").value;
    console.log("time : " + time);
    let argsId = newId,
      argsText = document.querySelector("#todoAddForm input").value,
      argsDueDate = new Date(time),
      argsChecked = false;
    // args.forEach((el) => console.log(el));
    console.log("text is : " + argsText);

    document.querySelector("#todoAddForm input").value = "";

    // init();
    // TODO
    // have to init() function to appencing Child with animation effects(reverse of removeTodoItem)
    // append position : calculate with module scope db + sorting with duedate
    let newTodoUI = createTodoItemUI(
      argsId,
      argsText,
      argsDueDate,
      argsChecked
    );
    attatchTodoItemEffect(newTodoUI);
    addTodoItemEffect(newTodoUI);
    let toAdd = whereToAdd(argsDueDate);
    if (toAdd !== false) {
      let uiToAddNext = document.getElementById("todo_" + toAdd);
      document
        .getElementById("todoListDiv")
        .insertBefore(newTodoUI, uiToAddNext.nextElementSibling);
    } else {
      document.getElementById("todoListDiv").appendChild(newTodoUI);
    }
    // addTodoItemEffect(newTodoUI);
    // console.log(uiToAddNext);

    addTodo(argsId, argsText, argsDueDate, argsChecked);
  } else {
    console.log("empty value.");
  }
}

// for test
document.getElementById("todo").addEventListener("click", function () {
  // console.log("HI???");
  document.getElementById("todo").focus();
});
document.getElementById("todo").addEventListener("focus", function () {
  document.getElementById("todo").style.backgroundColor = "black";
});

// document.getElementById("clockSvg").addEventListener("click", function () {
//   // document.getElementById("todoAddDate").select();
//   document.getElementById("todoAddDate").focus();
// });

export { init, toTodoId, toTagId };
