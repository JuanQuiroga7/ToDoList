export function fetchTasks() {
    return fetch('https://6674179975872d0e0a950e53.mockapi.io/todoList')
      .then(response => response.json());
  }
  
  export function postTask(taskName, taskStatus) {
    return fetch('https://6674179975872d0e0a950e53.mockapi.io/todoList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task: taskName,
        status: taskStatus,
      }),
    })
    .then(response => response.json());
  }
  
  export function deleteTask(taskId) {
    return fetch(`https://6674179975872d0e0a950e53.mockapi.io/todoList/${taskId}`, {
      method: 'DELETE',
    });
  }

  export function updateTaskOnServer(taskId, updatedTask) {
    return fetch(`https://6674179975872d0e0a950e53.mockapi.io/todoList/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
    .then(response => response.json());
  }