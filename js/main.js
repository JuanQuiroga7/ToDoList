import { fetchTasks, postTask, deleteTask } from './data.js';


fetchTasks().then(tasks => {
    updateDisplay(tasks);
  });
  
  function updateDisplay(tasks) {
    const container = document.getElementById('taskList'); 
  
    container.innerHTML = '';
  
    tasks.forEach(task => {
      const taskHTML = `
        <li>
            <span>${task.task}</span>
            <div>
                <div class="circular-background">
                    <img src="storage/img/check.png" onclick="markAsDone(this)" />
                </div>
                <div class="circular-background">
                    <img src="storage/img/trash-can.png" onclick="deleteTask(this)" />
                </div>
            </div>
        </li>
    `;
  
      container.innerHTML += taskHTML;
    });
  }

// // Post a new task
// postTask('New Task', 'ready').then(task => {
//   console.log(`Posted new task with ID: ${task.id}`);
//   // Here you can also update your UI to include the new task
// });

// // Delete a task
// deleteTask(1).then(() => {
//   console.log('Deleted task with ID: 1');
//   // Here you can also update your UI to remove the deleted task
// });