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


// main.js
const input = document.getElementById('input__search');
const button = document.getElementById('button__search');

button.addEventListener('click', function(event) {
  event.preventDefault();

  const taskName = input.value;
  const taskStatus = 'On hold'; 

  postTask(taskName, taskStatus)
    .then(task => {
      console.log(`Task ${task.id} added to server`);
      
      fetchTasks().then(tasks => {
        updateDisplay(tasks);
      });
      
      input.value = '';
    })
    .catch(error => {
      console.error(`Error al añadir el task: `, error);
    });
});


