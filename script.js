import { db } from './firebase.config.js';
import {
  ref,
  set,
  push,
  onValue,
  update,
  remove
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

const addBtn        = document.getElementById('add-btn');
const taskInput     = document.getElementById('add_task');
const tasksBody     = document.getElementById('tasks-body');

// Add Task
addBtn.addEventListener('click', () => {
  const title = taskInput.value.trim();
  if (!title) {
    alert('Please enter a task');
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
    alert('Task added');
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
  alert('First signup then enter your task');
  window.location.href = './form/Signup.html';
});

// udate delete..
function renderTasks(tasks) {
  tasksBody.innerHTML = '';
  tasks.forEach((t, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td contenteditable="false" id="task-title-${t.id}">${t.title}</td>
      <td>${t.status}</td>
      <td>
        <button  class="update-btn"  onclick="updateTask('${t.id}')">Update</button>
        <button   class="delete-btn"  onclick="deleteTask('${t.id}')">Delete</button>
      </td>
    `;
    tasksBody.appendChild(tr);
  });
}


window.updateTask = function(id) {
  const taskTitle = document.getElementById(`task-title-${id}`);
  const newTitle = prompt('Enter new title:', taskTitle.innerText);

  if (newTitle !== null && newTitle.trim() !== '') {
    const taskRef = ref(db, `tasks/${id}`);
    update(taskRef, {
      title: newTitle.trim()
    })
    .then(() => {
      alert('Task updated successfully!');
    })
    .catch(err => {
      console.error('Update failed:', err);
    });
  }
};

window.deleteTask = function(id) {
  if (confirm('Are you sure you want to delete this task?')) {
    const taskRef = ref(db, `tasks/${id}`);
    remove(taskRef)
    .then(() => {
      alert('Task deleted successfully!');
    })
    .catch(err => {
      console.error('Delete failed:', err);
    });
  }
};
