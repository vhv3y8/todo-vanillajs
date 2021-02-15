import { toggleCheck } from "../dataHandlers/todoData.js";
import { toTodoId } from "../todo/todoInit.js";

function init() {
  const todoItems = document.getElementsByClassName("todoItem");

  for (let i = 0; i < todoItems.length; i++) {
    attatchTodoItemEffect(todoItems[i]);
  }
}

function attatchTodoItemEffect(elem) {
  elem.addEventListener("click", function () {
    if (elem.classList.contains("_checked")) {
      elem.classList.remove("_checked");
      toggleCheck(toTodoId(elem.id));
      // elem.querySelector("input").checked = false;
    } else {
      elem.classList.add("_checked");
      toggleCheck(toTodoId(elem.id));
      // elem.querySelector("input").checked = true;
    }
  });
}

// class controls

function ereserEffect() {
  // get selected
  let toErase = document.getElementsByClassName("todoItem _checked");
  // remove each item with removeTodoItemEffect
  for (let elem of toErase) {
    removeTodoItemEffect(elem);
  }
}

function removeTodoItemEffect(element) {
  // remove one item
  element.classList.add("_removeTodoItemEffect");
  // element.classList.remove("_checked");
  setTimeout(() => {
    // really remove element
    element.remove();
  }, 2000);
}

// focus todo
document.querySelector("#newTodo").addEventListener("focus", function (e) {
  // thisElem.style.backgroundColor = "blue";
  // input bar expand
  document.querySelector("#newTodo").classList.add("_todoFocusInput");
  // rightside bar (buttons) change
  document.querySelector("#rightBar").classList.add("_todoFocusBarWidth");
  document.querySelector("#clockSvg").classList.add("_todoFocusIconShow");
  document.querySelector("#submitButton").classList.add("_todoFocusIconShow");
  document.querySelector("#eraserButton").classList.add("_todoFocusIconHide");
  // add X button to exit focus mode
});

// focus out todo => click X button
document.querySelector("#xButton").addEventListener("click", function () {
  document.querySelector("#newTodo").classList.remove("_todoFocusInput");
  // rightside bar (buttons) change
  document.querySelector("#rightBar").classList.remove("_todoFocusBarWidth");
  document.querySelector("#clockSvg").classList.remove("_todoFocusIconShow");
  document
    .querySelector("#submitButton")
    .classList.remove("_todoFocusIconShow");
  document
    .querySelector("#eraserButton")
    .classList.remove("_todoFocusIconHide");
});

// add new todo effect - called by todoInit js
function addTodoItemEffect(elem) {
  elem.classList.add("_addTodoItemEffect");
  setTimeout(() => {
    elem.classList.remove("_addTodoItemEffect");
  }, 2000);
}

export { init, attatchTodoItemEffect, ereserEffect, addTodoItemEffect };
