import { 
    checkAuth, 
    createTodo, 
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos, 
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');

todoForm.addEventListener('submit', async (e) => {
    // on submit, create a todo, reset the form, and display the todos
    e.preventDefault();
    const formData = new FormData(todoForm);
    const todo = formData.get('todo');
    await createTodo(todo);
    todos = await getTodos();
    e.target.reset();
    displayTodos();
});

let todos = [];

// 
// add async complete todo handler function
async function handleComplete(todo) {

    await completeTodo(todo.id);
    todos = await getTodos();
    displayTodos();

}

    

async function displayTodos() {
    
    todosEl.textContent = '';
    for (let todo of todos) {
        const todoEl = renderTodo(todo, handleComplete);
        todosEl.append(todoEl);
    }

}


async function onLoad() {
    todos = await getTodos();
    displayTodos();
    
}
onLoad();

logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async () => {
    await deleteAllTodos();
    todos = [];
    displayTodos();
});
