class Todo {
    constructor(id, subject, todo, dueDate) {
        this.id = id;
        this.subject = subject;
        this.todo = todo;
        this.dueDate = dueDate;
    }
}

let todos = [];

function createTodo() {
    const subjectInput = document.getElementById('subjectInput').value;
    const dateInput = document.getElementById('dateInput').value;
    const todoInput = document.getElementById('todoInput').value;

    let id = (todos.length >= 1) ? todos[todos.length -1].id + 1 : 0

    const newTodoObject = new Todo(id, subjectInput, todoInput, dateInput)

    displayTodo(newTodoObject)
    
    todos.push(newTodoObject);

    localStorage.setItem('todoList', JSON.stringify(todos));
}

document.querySelectorAll('.todoInputs').forEach(e => {
    e.addEventListener("keypress", function(e) {
        if (e.key === "Enter"){
            createTodo()
        }
    });
    e.value = '';
});

function displayTodo(todo) {
    let todoData = todo
    const tableBody = document.getElementById('todoTBody');
    const tableRow = document.createElement('tr');
    tableRow.id = `todo${todo.id}`;
    tableBody.appendChild(tableRow);

    const subjectTableData = document.createElement('td');
    subjectTableData.innerHTML = todoData.subject;
    tableRow.appendChild(subjectTableData);

    const todoTableData = document.createElement('td');
    todoTableData.innerText = todoData.todo;
    tableRow.appendChild(todoTableData);

    const tableDataDate = document.createElement('td');
    tableDataDate.innerText = todoData.dueDate;
    tableRow.appendChild(tableDataDate);

    const tdTrash = document.createElement('td');
    const trashIcon = document.createElement('i');

    trashIcon.id = 'deleteTodoButton'
    trashIcon.className = 'fas fa-trash';
    tdTrash.appendChild(trashIcon);
    tableRow.appendChild(tdTrash);
    
    trashIcon.onclick = function() {
        deleteTodo(todo);
    }

    // TODO: Maybe optimize this, that i dont have to call this twice, when i already listen to those class names
    document.getElementById('subjectInput').value = '';
    document.getElementById('todoInput').value = '';
    document.getElementById('dateInput').value = '';
}

function restoreTodo() {
    const todoJSON = localStorage.getItem('todoList');
    if (todoJSON) {
        todos = JSON.parse(todoJSON);
        todos.forEach(todoItems => {
            displayTodo(todoItems)
        });
    }
}
restoreTodo();

function deleteTodo(todo) {
    const todoIndex = todos.findIndex(t => t.id === todo.id)
    if (todoIndex === -1) {
        return;
    }

    todos.splice(todoIndex, 1);
    localStorage.setItem('todoList', JSON.stringify(todos));

    document.getElementById('todo' + todo.id).remove();
}