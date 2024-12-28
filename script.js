const API_ENDPOINT = 'https://2izf6rjpe6.execute-api.us-east-1.amazonaws.com/prod';
const USER_ID = 'test-user';

async function createTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;

    const response = await fetch(`${API_ENDPOINT}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            userId: USER_ID, title, description
        })
    });

    if (response.ok) {
        document.getElementById('task-title').value = '';
        document.getElementById('task-description').value = '';
        fetchTasks();
    }
}

async function fetchTasks() {
    try {
        console.log('Fetching tasks with URL:', `${API_ENDPOINT}/tasks?userId=${USER_ID}`);
        
        const response = await fetch(`${API_ENDPOINT}/tasks?userId=${encodeURIComponent(USER_ID)}`);
        console.log('Response:', response);
        
        const responseData = await response.json();
        console.log('Response data:', responseData);
        
        // Check if there's an error in the response
        if (responseData.body && typeof responseData.body === 'string') {
            const bodyData = JSON.parse(responseData.body);
            if (bodyData.error) {
                console.error('Error from API:', bodyData.error);
                return;
            }
        }
        
        const data = typeof responseData.body === 'string' 
            ? JSON.parse(responseData.body) 
            : responseData.body;

        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';

        if (Array.isArray(data)) {
            data.forEach(task => {
                const taskElement = document.createElement('div');
                taskElement.className = 'task-item';
                taskElement.innerHTML = `
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <p>Status: ${task.status}</p>
                    <button 
                        onclick="updateTaskStatus('${task.taskId}', '${task.status === 'PENDING' ? 'COMPLETED' : 'PENDING'}')">
                            ${task.status === 'PENDING' ? 'Mark Complete' : 'Mark Pending'}
                    </button>
                    <button onclick="deleteTask('${task.taskId}')">
                        Delete
                    </button>
                `;
                taskList.appendChild(taskElement);
            });
        } else {
            console.error('Expected an array of tasks, but received:', data);
            // Add this line to help debug the response
            console.log('Full response:', responseData);
        }
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}


async function updateTaskStatus(taskId, newStatus) {
    const response = await fetch(`${API_ENDPOINT}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: USER_ID,
            status: newStatus
        })
    });

    if (response.ok) {
        fetchTasks();
    }
}

async function deleteTask(taskId) {
    const response = await fetch(`${API_ENDPOINT}/tasks/${taskId}?userId=${USER_ID}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        fetchTasks();
    }
}

fetchTasks();