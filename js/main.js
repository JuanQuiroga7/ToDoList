import { fetchTasks, postTask, deleteTask as deleteTaskFromServer } from './data.js';


fetchTasks().then(tasks => {
    updateDisplay(tasks);
  });
  
  function updateDisplay(tasks) {
    const container = document.getElementById('taskList'); 
  
    container.innerHTML = '';
  
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.setAttribute('data-id', task.id);
  
      li.innerHTML = `
        <span>${task.task}</span>
        <div>
          <div class="circular-background">
            <img src="storage/img/check.png" onclick="markAsDone(this)" />
          </div>
          <div class="circular-background">
            <img src="storage/img/trash-can.png" />
          </div>
        </div>
      `;
  
      li.querySelector('img[src="storage/img/trash-can.png"]').addEventListener('click', function() {
        deleteTask(this);
      });
  
      container.appendChild(li);
    });
  }

  
function deleteTask(imgElement) {
    
    const taskElement = imgElement.closest('li');
  
    // Get the unique ID of the task from the 'data-id' attribute
    const taskId = taskElement.getAttribute('data-id');
  
    
    taskElement.remove();
  
    
    deleteTaskFromServer(taskId)
      .then(() => {
        console.log(`Task ${taskId} eliminado del servidor`);
      })
      .catch(error => {
        console.error(`Error al eliminar ${taskId}: `, error);
      });
  }

// // Post a new task
// postTask('New Task', 'ready').then(task => {
//   console.log(`Posted new task with ID: ${task.id}`);
//   // Here you can also update your UI to include the new task
// });
