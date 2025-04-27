import { db } from './firebase.config.js';
import {
  ref,
  set,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";


const addBtn        = document.getElementById('add-btn');
const taskInput     = document.getElementById('add_task');
const tasksBody     = document.getElementById('tasks-body');

// Add Task
addBtn.addEventListener('click', () => {
  const title = taskInput.value.trim();
  if (!title) {
    notifications.innerText = 'Please enter a task';
    return;
  }

  const tasksRef   = ref(db, 'tasks');
  const newTaskRef = push(tasksRef);

  set(newTaskRef, {
    title,
    status: 'Pending',
    createdAt: Date.now()
  })
  .then(() => {
    notifications.innerText = 'Task added!';
    taskInput.value = '';
    setTimeout(() => notifications.innerText = '', 2000);
  })
  .catch(err => {
    console.error(err);
    notifications.innerText = 'Error adding task';
  });
});

// Real-time UI update
onValue(ref(db, 'tasks'), snapshot => {
  const tasks = [];
  snapshot.forEach(child => {
    tasks.push({ id: child.key, ...child.val() });
  });
  renderTasks(tasks);
}, error => {
  console.error('Read failed: ', error);
  notifications.innerText = 'Error loading tasks';
});

// Render function
function renderTasks(tasks) {
  tasksBody.innerHTML = '';
  tasks.forEach((t, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${t.title}</td>
      <td>${t.status}</td>
    `;
    tasksBody.appendChild(tr);
  });
}




