import { Consts } from "../Consts.js";

let todoDB = JSON.parse(localStorage.getItem(Consts.TODO_DATAS)) || [];
let dbChanged = false;

function getTodoDatas() {
  // for testing
  return todoDB;
}

// function flushTodoDatas(givenDB) {
//   localStorage.setItem(Consts.TODO_DATAS, givenDB);
// }

function flushTodoDB() {
  if (dbChanged) {
    localStorage.setItem(Consts.TODO_DATAS, todoDB);
  } else {
    console.log("todo DB hasn't changed. nothing to Write.");
  }
}

function addTodo(text, dueDate, isChecked) {
  function generateId() {
    if (todoDB.length == 0) {
      return 0;
    } else {
      return todoDB[-1].id;
    }
  }

  // flow start
  todoDB.push({
    id: generateId(),
    text,
    dueDate,
    isChecked,
  });
  dbChanged = true;
}

function getTodoById(id) {
  for (let i = 0; i < todoDB.length; i++) {
    if (todoDB[i].id == id) {
      return todoDB[i];
    }
  }
  return false;
}

function toggleCheck(todoId) {
  let todo = getTodoById(todoId);
  if (todo === false) {
    console.log("Error: todo for given id does not exist.");
  } else {
    todo.isChecked = !todo.isChecked;
    dbChanged = true;
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
  dbChanged = true;
}

function deleteTodo(todoId) {
  let todo = getTodoById(todoId);
  if (todo === false) {
    console.log("Error: todo for given id does not exist.");
    console.log("Nothing to Delete.");
  } else {
    todoDB = todoDB.filter((elem) => elem !== todo);
    dbChanged = true;
  }
}

export { getTodoDatas, flushTodoDatas };
