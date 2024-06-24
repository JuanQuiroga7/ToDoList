import { fetchTasks, postTask, deleteTask as deleteTaskFromServer, updateTaskOnServer } from './data.js';


fetchTasks().then(tasks => {
    updateDisplay(tasks);
  });
  
  function updateDisplay(tasks) {
    const container = document.getElementById('taskList'); 
  
    container.innerHTML = '';
  
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.setAttribute('data-id', task.id);

      const checkImageSrc = task.status === 'ready' ? 'storage/img/return.png' : 'storage/img/check.png';
  
      li.innerHTML = `
        <span>${task.task}</span>
        <div>
          <div class="circular-background">
            <img src="${checkImageSrc}"/>
          </div>
          <div class="circular-background">
            <img src="storage/img/trash-can.png" />
          </div>
        </div>
      `;

      if (task.status === 'ready') {
        li.classList.add('done');
      }
  
      li.querySelector('img[src="storage/img/trash-can.png"]').addEventListener('click', function() {
        deleteTask(this);
      });
  
    const checkButton = li.querySelector('img[src="' + checkImageSrc + '"]');
    checkButton.addEventListener('click', function() {
      const updatedTask = {
        ...task,
        status: task.status === 'ready' ? 'on-hold' : 'ready',
      };

      updateTaskOnServer(task.id, updatedTask)
        .then(() => {
          console.log(`Task ${task.id} cambiado a estado 'ready'`);
          
          fetchTasks().then(tasks => {
            updateDisplay(tasks);
          });
        })
        .catch(error => {
          console.error(`Error al actualizar task ${task.id}: `, error);
        });
    });

    container.appendChild(li);
  });
}

// Funcion para eliminar un task
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


// Funcion para añadir un task
const input = document.getElementById('input__search');
const button = document.getElementById('button__search');

button.addEventListener('click', function(event) {
  event.preventDefault();

  const taskName = input.value;
  const taskStatus = 'On hold'; 

  postTask(taskName, taskStatus)
    .then(task => {
      console.log(`Task ${task.id} añadido al servidor`);
      
      fetchTasks().then(tasks => {
        updateDisplay(tasks);
      });
      
      input.value = '';
    })
    .catch(error => {
      console.error(`Error al añadir el task: `, error);
    });
});


