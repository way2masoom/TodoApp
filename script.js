
// Crating a function to store some todo
function loadTodos() {
    // localStorage.setItem("todos", ["todos-1", "todos-12", "todos-13"])
    const todos = JSON.parse(localStorage.getItem("todos")) || { "todoList": [] };
    console.log(todos);
    return todos;
}

// creating a function to store the todo text in the local storage
function addTodoLocalStorage(todo) {
    const todos = loadTodos(); // get all todo 
    todos.todoList.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos))
}

// function to refresh todos or to delete the local Storages todos
function refreshTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos))
}

// Function to new add TOdo 
function addNewTodo() {
    const todoText = todoInput.value
    // condition to check it's empty or not
    if (todoText == '') {
        alert("Please write something for todos")
    } else {
        let todos = loadTodos() // reloading the todo before adding
        const id = todos.todoList.length;
        // add the todo to the local storage
        addTodoLocalStorage({ text: todoText, isCompleted: false, id });
        appendTodoInHtml({ text: todoText, isCompleted: false, id }); // calling the function to Display the Todo List
        todoInput.value = '';  // to make values empty
    }
}

// Function to reset HTML TOdo
function resetHtmlTodos(todos) {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = '';
    todos.todoList.forEach(todo => {
        appendTodoInHtml(todo);
    })
}

// Function for complete Todo
function toggleTodo(event) {
    const todoItem = event.target.parentElement.parentElement;
    const todoId = todoItem.getAttribute("data-id");
    const todos = loadTodos();
    todos.todoList.forEach(todo => {
        if (todo.id == todoId) {
            todo.isCompleted = !todo.isCompleted;
        }
    });
    refreshTodos(todos);
    resetHtmlTodos(todos);

}

// Function to edit the Todo
function editTodo(event) {
    const todoItem = event.target.parentElement.parentElement;
    const todoId = todoItem.getAttribute("data-id");
    const todos = loadTodos();
    const response = prompt("Enter new Todo you want to set");

    todos.todoList.forEach(todo => {
        if (todo.id == todoId) {
            todo.text = response;
        }
    });

    refreshTodos(todos);
    resetHtmlTodos(todos);
}

//Function to Delete TODO
function deleteTodo(event) {
    const todoItem = event.target.parentElement.parentElement;
    const todoId = todoItem.getAttribute("data-id");
    let todos = loadTodos();
    todos.todoList = todos.todoList.filter(todo => todo.id != todoId);
    refreshTodos(todos);
    resetHtmlTodos(todos);
}

// Function to append intoHTML
function appendTodoInHtml(todo) {
    const todoList = document.getElementById("todoList");

    const todoItem = document.createElement("li");

    // Setting the unique value to the items list
    todoItem.setAttribute("data-id", todo.id)

    // Making a DIV for the text Items
    const textDiv = document.createElement("div");

    if (todo.isCompleted) {
        textDiv.classList.add("completed");
    }

    textDiv.textContent = todo.text;
    todoItem.classList.add("todoItem");

    // Making a Wrapper DIV
    const Wrapper = document.createElement("div");
    Wrapper.classList.add("todoButtons")

    // creating some button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn");

    editBtn.addEventListener("click", editTodo)

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn");

    deleteBtn.addEventListener("click", deleteTodo)

    const completedBtn = document.createElement("button");
    completedBtn.textContent = (todo.isCompleted) ? "Reset" : "completed";
    completedBtn.classList.add("completedBtn");
    // Attach the toggleTodo event listener
    completedBtn.addEventListener("click", toggleTodo);

    // Adding the button to the todo Items List
    Wrapper.appendChild(editBtn)
    Wrapper.appendChild(deleteBtn)
    Wrapper.appendChild(completedBtn)

    todoItem.appendChild(textDiv)

    todoItem.appendChild(Wrapper)

    todoList.appendChild(todoItem);

}

// Function for the Filter Buttons actions
function executeFilterAction(event) {
    // Fetching the todoList 
    const todoList = document.getElementById("todoList");

    const element = event.target;
    const value = element.getAttribute("data-filter")
    console.log(value);
    todoList.innerHTML = ''; // Resting the TODOList items
    const todos = loadTodos(); // Loading all the TodoList items

    // condition for each buttons 
    if (value == "all") {
        console.log(todoList);
        todos.todoList.forEach(todo => {
            appendTodoInHtml(todo)
        })

    } else if (value == "pending") {
        todos.todoList.forEach(todo => {
            if (todo.isCompleted !== true)
                appendTodoInHtml(todo)
        })

    } else {

        todos.todoList.forEach(todo => {
            if (todo.isCompleted === true)
                appendTodoInHtml(todo)
        })
    }

}

// do after loading DOM
document.addEventListener("DOMContentLoaded", () => {

    // todos Input part
    const todoInput = document.getElementById("todoInput");

    // button
    const submitButton = document.getElementById("addTodo");

    // calling the loadTodos function 
    let todos = loadTodos()

    // TodoList
    const todoList = document.getElementById("todoList");

    // working of completedBtn
    const completedBtns = document.getElementsByClassName("completeBtn")

    // Fetching All Filter Buttons 
    const filterBtns = document.getElementsByClassName("filterBtn");
    console.log(filterBtns);
    for (const btn of filterBtns) {
        console.log(btn);

        btn.addEventListener("click", executeFilterAction);
    }

    // getting the completed btn unique id
    for (const btn of completedBtns) {
        btn.addEventListener("click", toggleTodo);
    }

    // click event
    submitButton.addEventListener("click", (event) => {
        const todoText = todoInput.value
        // condition to check it's empty or not
        if (todoText == '') {
            alert("Please write something for todos")
        } else {
            let todos = loadTodos() // reloading the todo before adding
            const id = todos.todoList.length;
            // add the todo to the local storage
            addTodoLocalStorage({ text: todoText, isCompleted: false, id });
            appendTodoInHtml({ text: todoText, isCompleted: false, id }); // calling the function to Display the Todo List
            todoInput.value = '';  // to make values empty
        }
    })


    todoInput.addEventListener("change", (event) => {
        const todoText = event.target.value
        event.target.value = todoText.trim();
        console.log(event.target.value);

    });


    todos.todoList.forEach(todo => {
        appendTodoInHtml(todo)
    })

    document.addEventListener("keypress", (event) => {
        if (event.code == 'Enter') {
            addNewTodo();
        }
    })

}) 