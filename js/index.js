const lists = document.querySelectorAll(".list");
const modal = document.querySelector(".boards__item");
const addBnt = document.querySelector(".add__item-btn");
const form = document.querySelector(".modal");
const plus = document.querySelector(".plus");
const changeBtn = document.querySelector(".change__item-btn");
const deleteBtn = document.querySelector(".delete__item-btn");

let nowBoard;
let valutTitle;
let valutText;
let valueColor;

function openForm(e) {
  if (e.target.tagName != "SPAN" && e.target.classList == "boards__item") {
    nowBoard = this;
    const textareaTitle = document.querySelector(".textarea-title");
    const textareaText = document.querySelector(".textarea-text");
    const form = document.querySelector(".modal");
    const color = document.querySelector(".color");

    addBnt.style.display = "block";
    changeBtn.style.display = "none";

    form.addEventListener(
      "submit",
      function (e) {
        e.preventDefault();
      },
      false
    );

    form.style.display = "flex";

    textareaTitle.addEventListener("input", (e) => {
      valutTitle = e.target.value;
    });

    textareaText.addEventListener("input", (e) => {
      valutText = e.target.value;
    });

    color.addEventListener("input", (e) => {
      valueColor = e.target.value;
    });

    textareaTitle.value = "";
    textareaText.value = "";
    valutText = "";
    valutTitle = "";
  }
}

modal.addEventListener("click", openForm);

function addTask() {
  const newItem = document.createElement("div");
  const newTitle = document.createElement("div");
  const newText = document.createElement("div");
  const textareaTitle = document.querySelector(".textarea-title");
  const textareaText = document.querySelector(".textarea-text");

  addBnt.style.display = "block";

  newItem.classList.add("list__item");
  newItem.draggable = "true";

  newTitle.classList.add("list__title");
  newTitle.textContent = valutTitle;

  newText.classList.add("list__text");
  newText.textContent = valutText;

  nowBoard.append(newItem);
  newItem.append(newTitle);
  newItem.append(newText);
  newItem.style.background = valueColor;

  textareaTitle.value = "";
  textareaText.value = "";

  form.style.display = "none";

  function changeTask() {
    const changeBtn = document.querySelector(".change__item-btn");
    const cancelBtn = document.querySelector(".cancel__item-btn");

    form.style.display = "flex";

    deleteBtn.style.display = "flex";
    addBnt.style.display = "none";
    changeBtn.style.display = "block";
    item = this;

    deleteBtn.addEventListener("click", () => {
      item.remove();
      form.style.display = "none";
      deleteBtn.style.display = "none";
    });

    cancelBtn.addEventListener("click", () => {
      console.log("стоп");
      textareaTitle.value = "";
      textareaText.value = "";
      valutText = "";
      valutTitle = "";
      form.style.display = "none";
      changeBtn.removeEventListener("click", change);
    });

    function change() {
      console.log("change");

      item.style.background = valueColor;

      newTitle.textContent = valutTitle;
      newText.textContent = valutText;

      form.style.display = "none";

      textareaTitle.value = "";
      textareaText.value = "";
      changeBtn.removeEventListener("click", change);
    }

    changeBtn.addEventListener("click", change);
  }

  newItem.addEventListener("click", changeTask);
  dragAndDrop();
}

addBnt.addEventListener("click", addTask);

function createBoard() {
  const board = document.createElement("div");
  const list = document.createElement("div");
  board.classList.add("boards__item");
  list.classList.add("list");

  board.innerHTML = `<span contenteditable="true" class="title">Введите название</span>`;
  board.append(list);

  return board;
}

function addBoard() {
  const boards = document.querySelector(".boards");
  const newBoard = createBoard();
  boards.append(newBoard);
  newBoard.addEventListener("click", openForm);
  changeTitle();
  dragAndDrop();
}

plus.addEventListener("click", addBoard);

function changeTitle() {
  const titles = document.querySelectorAll(".title");

  titles.forEach((title) => {
    title.addEventListener("click", (e) => (e.target.textContent = ""));
  });
}

let draggedItem = null;

function dragAndDrop() {
  const listItems = document.querySelectorAll(".list__item");
  const lists = document.querySelectorAll(".list");

  for (let i = 0; i < listItems.length; i++) {
    const item = listItems[i];

    item.addEventListener("dragstart", () => {
      draggedItem = item;

      setTimeout(() => {
        item.style.display = "none";
      }, 0);
    });

    item.addEventListener("dragend", () => {
      setTimeout(() => {
        item.style.display = "block";
        draggedItem = null;
      }, 0);
    });

    for (let j = 0; j < lists.length; j++) {
      const list = lists[j];

      list.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      list.addEventListener("dragenter", function (e) {
        e.preventDefault();
        this.style.backgroundColor = "rgba(0,0,0,.1)";
      });

      list.addEventListener("dragleave", function (e) {
        this.style.backgroundColor = "rgba(0,0,0, 0)";
      });

      list.addEventListener("drop", function (e) {
        this.style.backgroundColor = "rgba(0,0,0, 0)";
        this.append(draggedItem);
      });
    }
  }
}
