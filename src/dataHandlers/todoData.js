import { Consts } from "../Consts.js";

let todoDB = JSON.parse(localStorage.getItem(Consts.TODO_DATAS)) || [];
// console.log(todoDB);
for (let data of todoDB) {
  data.dueDate = new Date(data.dueDate);
}
let todoChanged = false;
console.log("got todoDB. - " + new Date().getMilliseconds());
console.log(todoDB);

function getTodoDatas() {
  return todoDB;
}

function getTodoById(id) {
  for (let i = 0; i < todoDB.length; i++) {
    if (todoDB[i].id == id) {
      return todoDB[i];
    }
  }
  return false;
}

function generateId() {
  console.log(todoDB);
  if (todoDB.length == 0) {
    return 0;
  } else {
    return todoDB[todoDB.length - 1].id + 1;
  }
}

function whereToAdd(dueDate) {
  // return elem to use nextSibling
  // console.log(todoDB);
  let sortedDB = todoDB.sort((a, b) => {
    return a.dueDate.getTime() - b.dueDate.getTime();
  });
  console.log(sortedDB);
  // while (sortedDB[where].dueDate.getTime() > dueDate.getTime()) where++;
  for (let i = 0; i < sortedDB.length; i++) {
    if (sortedDB[i].dueDate.getTime() >= dueDate.getTime()) {
      console.log(dueDate);
      console.log(sortedDB[i].dueDate);
      console.log(i);
      if (i === 0) {
        // add to first
      } else {
        // i = first element that is future than given date
        return sortedDB[i - 1].id;
      }
    }
  }
  return false;
}

///////////////////////

function addTodo(id, text, dueDate, isChecked) {
  // flow start
  todoDB.push({
    id,
    text,
    dueDate,
    isChecked,
  });
  todoChanged = true;
}

function toggleCheck(todoId) {
  let todo = getTodoById(todoId);
  if (todo === false) {
    console.log("Error: todo for given id does not exist.");
  } else {
    todo.isChecked = !todo.isChecked;
    todoChanged = true;
  }
}

function editTodo(todoId, text, dueDate, isChecked) {
  let todo = getTodoById(todoId);
  if (todo === false) {
    console.log("Error: todo for given id does not exist.");
    console.log("Writing new Todo with given Datas.");
    addTodo(text, dueDate, isChecked);
  } else {
    todo.text = text;
    todo.dueDate = dueDate;
    todo.isChecked = isChecked;
  }
  todoChanged = true;
}

function deleteTodo(todoId) {
  let todo = getTodoById(todoId);
  if (todo === false) {
    console.log("Error: todo for given id does not exist. - " + todoId);
    console.log("Nothing to Delete.");
  } else {
    todoDB = todoDB.filter((elem) => elem !== todo);
    todoChanged = true;
  }
}

///////////////////////

function flushTodoDB() {
  if (todoChanged) {
    localStorage.setItem(Consts.TODO_DATAS, JSON.stringify(todoDB));
  } else {
    console.log("todo DB hasn't changed. nothing to Write.");
  }
}

export {
  getTodoDatas,
  generateId,
  whereToAdd,
  addTodo,
  toggleCheck,
  editTodo,
  deleteTodo,
  flushTodoDB,
};
