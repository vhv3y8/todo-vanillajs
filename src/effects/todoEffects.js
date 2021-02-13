function init() {
  const todoItems = document.getElementsByClassName("todoItem");

  for (let i = 0; i < todoItems.length; i++) {
    let currTodo = todoItems[i];
    currTodo.addEventListener("click", function () {
      if (currTodo.classList.contains("_checked")) {
        currTodo.classList.remove("_checked");
        // currTodo.querySelector("input").checked = false;
      } else {
        currTodo.classList.add("_checked");
        // currTodo.querySelector("input").checked = true;
      }
    });
  }
}

export { init };
