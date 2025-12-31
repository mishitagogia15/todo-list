const formEl = document.querySelector(".form");

const inputEl = document.querySelector(".input");

const ulEl = document.querySelector(".list");

let list = JSON.parse(localStorage.getItem("list"));
if (list) {
  list.forEach((task) => {
    toDoList(task);
  });
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  toDoList();
});

function toDoList(task) {
  let newTask = inputEl.value;
  if (task) {
    newTask = task.name;
  }

  const liEl = document.createElement("li");
  if (task && task.checked) {
    liEl.classList.add("checked");
  }
  liEl.innerText = newTask;
  ulEl.appendChild(liEl);
  inputEl.value = "";
  const checkBtnEl = document.createElement("div"); /* Adds placeholder for check icon*/
  checkBtnEl.innerHTML = `
  <i class="fas fa-check-square">
  `; /*adds font awesome check icon*/
  liEl.appendChild(checkBtnEl); /*adds the icon in the placeholder*/
  const trashBtnEl = document.createElement("div");
  trashBtnEl.innerHTML = `
  <i class="fas fa-trash"></i>
  `;
  liEl.appendChild(trashBtnEl);

  checkBtnEl.addEventListener("click", () => { /*runs when check icon is clicked - marks as done*/
    liEl.classList.toggle("checked"); /*adds or removes the styling*/
    updateLocalStorage(); /*updates the saved data to local storage*/
  });
/*below portion is same as the above checked one - it is just for trash*/
  trashBtnEl.addEventListener("click", () => {
    liEl.remove();
    updateLocalStorage();
  });
  updateLocalStorage(); /*function call to save the tasks*/
}

function updateLocalStorage() { 
  const liEls = document.querySelectorAll("li"); /*selects all task items*/
  list = []; /*clears old data - to save the new one into storage - otherwise overwriting will happen*/
  liEls.forEach((liEl) => { /*loops through tasks*/
    list.push({ /*saves tasks and completion status*/
      name: liEl.innerText,
      checked: liEl.classList.contains("checked"),
    });
  });
  localStorage.setItem("list", JSON.stringify(list));
}
