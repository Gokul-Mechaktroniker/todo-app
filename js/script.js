const taskForm = document.getElementById("taskForm");
const taskName = document.getElementById("taskName");
const taskStatus = document.getElementById("taskStatus");
const taskId = document.getElementById("taskId");
const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");
const searchInput = document.getElementById("searchInput");
const modal = new bootstrap.Modal(document.getElementById("myModal"));

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addTaskBtn.addEventListener("click", () => {
  taskForm.reset();
  taskId.value = "";
  modal.show();
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTask = {
    id: taskId.value || Date.now(),
    taskName: taskName.value.trim(),
    status: taskStatus.value
  };

  if (!newTask.taskName) return;

  if (taskId.value) {
    tasks = tasks.map(t => t.id == newTask.id ? newTask : t);
  } else {
    tasks.push(newTask);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  modal.hide();
});

function deleteTask(id) {
  if (confirm("Delete this task?")) {
    tasks = tasks.filter(t => t.id != id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
}

function editTask(id) {
  const t = tasks.find(t => t.id == id);
  taskName.value = t.taskName;
  taskStatus.value = t.status;
  taskId.value = t.id;
  modal.show();
}

function renderTasks(searchTerm = "") {
  taskList.innerHTML = "";
  const lowerSearch = searchTerm.toLowerCase();

  for (let i = 0; i < tasks.length; i++) {
    const t = tasks[i];
    if (t.taskName.toLowerCase().includes(lowerSearch)) {
      taskList.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${t.taskName}</td>
          <td>${t.status}</td>
          <td><button class="btn btn-sm btn-success" onclick="editTask(${t.id})"><i class="bi bi-pencil-square"></i></button></td>
          <td><button class="btn btn-sm btn-danger" onclick="deleteTask(${t.id})"><i class="bi bi-trash"></i></button></td>
        </tr>`;
    }
  }
}

searchInput.addEventListener("input", () => {
  renderTasks(searchInput.value);
});

renderTasks();
