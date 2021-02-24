let todos = [];

const todoJSON = localStorage.getItem('todos');
if (todoJSON) {
    todos = JSON.parse(todoJSON);

    todos.forEach(displayTodo);
}

function addTodo() {
    const input = document.getElementById("todoInput").value;
    const newTodoId = (todos.length >= 1) ? todos[todos.length - 1].id + 1 : 0;
    const newTodoObject = {
        id: newTodoId,
        value: input
    }
    if (input === "") {
        return;
    }
    displayTodo(newTodoObject);

    todos.push(newTodoObject);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeTodo(todo) {
    const todoIndex = todos.findIndex(t => t.id === todo.id);
    if (todoIndex === -1) {
        return;
    }

    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));

    document.getElementById("todo" + todo.id).remove();
}
const inputField = document.getElementById("todoInput");
inputField.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTodo()
    }
});
function displayTodo(todo) {
    const node = document.createElement("li");
    node.id = "todo" + todo.id;

    const iconNode = document.createElement("i");
    iconNode.className = "fas fa-trash";
    node.appendChild(iconNode);

    iconNode.onclick = function () {
        removeTodo(todo);
    };

    
    const textNode = document.createTextNode(todo.value);
    node.appendChild(textNode);
    

    document.getElementById("contents").appendChild(node);
    document.getElementById("todoInput").value = '';
}