const formEl = document.querySelector(".form");
/*we selected the form element to handle task submission.*/
const inputEl = document.querySelector(".input");
/*we selected the input box to handle task submission.*/
const ulEl = document.querySelector(".list");
/*selects the unordered list where tasks will be displayed.*/
let list = JSON.parse(localStorage.getItem("list"));
/*local storage stores data as strings, so we use JSON.parse to convert it back.*/
if (list) { /*checks if there is already any data stored.*/
  list.forEach((task) => {
    toDoList(task);
  }); /*this ensures tasks remain even after refreshing the page.*/
}

formEl.addEventListener("submit", (event) => { /*listens for form submission.*/
  event.preventDefault(); /*prevents the page from refreshing automatically.*/
  toDoList(); /*calls the function to add a new task.*/
});

function toDoList(task) { /*function to create and display tasks*/
  let newTask = inputEl.value; /*gets the text typed by the user.*/
  if (task) {
    newTask = task.name; /*this condition helps handle both new tasks and stored tasks.*/
  }

  const liEl = document.createElement("li"); /*Creates a new list item.*/
  if (task && task.checked) {
    liEl.classList.add("checked"); /*Marks task as completed if it was checked earlier.*/
  }
  liEl.innerText = newTask;
  ulEl.appendChild(liEl); /*Adds task to the list.*/
  inputEl.value = ""; /*Clears input after adding task.*/
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
  localStorage.setItem("list", JSON.stringify(list)); /*converts the data in array to string and saves it*/
}
