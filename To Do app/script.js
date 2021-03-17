const form = document.getElementById("form");
const input = document.getElementById("input");
const todos = document.querySelector(".todoss");
const clearAll = document.querySelector("#clearAll");

const todoLi = JSON.parse(localStorage.getItem("todoss"));

if(todoLi) {
    todoLi.forEach((todo) => {
        addTodo(todo);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
});

function addTodo(todo){
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }
    
    if (todoText) {
        const todoEl = document.createElement("li");
        const todoInnerEl = document.createElement("p");
        todoEl.appendChild(todoInnerEl);

        if (todo && todo.completed) {
            todoInnerEl.classList.add("active");
        }

        todoInnerEl.innerText = todoText;

        todoEl.addEventListener("click", () => {
            todoInnerEl.classList.toggle("active");

            updateLS();
        });

        const delBtn = document.createElement("button");
        delBtn.innerText = "X";
        todoEl.appendChild(delBtn);
        delBtn.addEventListener("click", (e) => {
            e.preventDefault();

            todoEl.remove();

        });

        todos.appendChild(todoEl);

        input.value = "";

        updateLS();
    }
}

clearTodos();

function clearTodos(){
    const clearAll = document.getElementById("clearAll");

    clearAll.addEventListener("click", () => {
        todos.innerHTML = "";

        updateLS()

    });

}

function updateLS(){
    const notesEl = document.querySelectorAll(".todoss p");

    const todos = [];

    notesEl.forEach(noteEl =>{
        todos.push({
            text: noteEl.innerText,
            completed: noteEl.classList.contains("active")

        });
    });

    localStorage.setItem("todoss", JSON.stringify(todos));
};

