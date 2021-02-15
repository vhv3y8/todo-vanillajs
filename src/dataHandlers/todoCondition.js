import { Consts } from "../Consts.js";

let todoCondition = localStorage.getItem(Consts.TODO_CONDITIONS) || [];
let conditionChanged = false;

// function init() {
//   if (todoCondition === null) {
//     todoCondition = [];
//     localStorage.setItem(Consts.TODO_CONDITIONS, JSON.stringify(todoCondition));
//   }
// }

function getTodoCondition() {
  return todoCondition;
}

function setTodoCondition(conditions) {
  todoCondition = conditions;
  conditionChanged = true;
}

function flushTodoCondition() {
  if (conditionChanged === true) {
    localStorage.setItem(Consts.TODO_CONDITIONS, JSON.stringify(todoCondition));
  }
}

export { getTodoCondition, setTodoCondition, flushTodoCondition };
