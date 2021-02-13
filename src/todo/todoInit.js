import { getTodoDatas } from "./todoDataHandler.js";

const todoListDiv = document.querySelector("#todoListDiv");

function init() {}

function createTodoItemUI(text, dueDate, isChecked) {
  // <div class="todoItem">
  //   <div class="fl-cen-cen">
  //     <p>MDN 자바스크립트 공부하기</p>
  //   </div>
  //   <div class="fl-row-st attContainer">
  //     <div class="att">
  //       <div class="duetime">
  //         <div style="width: 15px; height: 15px; margin: auto 5px">
  //           <svg
  //             id="clockSvg"
  //             class="iconClickable"
  //             xmlns="http://www.w3.org/2000/svg"
  //             width="16"
  //             height="16"
  //             viewBox="0 0 24 24"
  //             fill="white"
  //           >
  //             <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 12v-6h-2v8h7v-2h-5z" />
  //           </svg>
  //         </div>

  //         <p>Today</p>
  //       </div>
  //     </div>
  //   </div>
  // </div>;
  let todo = document.createElement("div");
  let containsText = document.createElement("div");
}

function removeChecked() {}

function updateCondition(timeArr) {}
