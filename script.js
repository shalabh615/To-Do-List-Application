const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render tasks
function renderTasks(filter = "all") {
  taskList.innerHTML = "";
  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    if (task.completed) taskItem.classList.add("completed");

    taskItem.innerHTML = `
      <span>${task.name}</span>
      <div>
        <button onclick="toggleTask(${index})">${task.completed ? "Undo" : "Complete"}</button>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
}

// Function to add a task
addTaskBtn.addEventListener("click", () => {
  const taskName = taskInput.value.trim();
  if (taskName) {
    tasks.push({ name: taskName, completed: false });
    taskInput.value = "";
    saveAndRender();
  }
});

// To toggle task completion
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

// To edit task
function editTask(index) {
  const newTaskName = prompt("Edit task:", tasks[index].name);
  if (newTaskName) {
    tasks[index].name = newTaskName;
    saveAndRender();
  }
}

//  To delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

// Save tasks to local storage and render
function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks(document.querySelector(".filter-btn.active").dataset.filter);
}

// Filter tasks
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    button.classList.add("active");
    renderTasks(button.dataset.filter);
  });
});

// Initial render
renderTasks();