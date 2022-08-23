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
    e.target.reset();
    displayTodos();
});

// create todo state 
let todoArr = [];

// 
// add async complete todo handler function
// async function completeTodo(id)
//  // call completeTodo function
// completeTodo();
//  // swap out todo in array with completed todo object (with completed: true)
// if (todos.complete) {
//     todos[i] = {
//         todo: todos, 
//         completed: true,
//     };
// }
// update the todo in the array
// render the todo list


// call displayTodos
    

async function displayTodos() {
    // clear the container (.innerHTML = '')
    const todos = await getTodos(); 
    todosEl.textContent = '';
    
    // call render function, pass in state and complete handler function!
    for (let todo of todos) {
        const todoEl = renderTodo(todo);

        todoEl.addEventListener('click', async () => {
            await completeTodo(todo.id);
        });
        todosEl.append(todoEl);
    }

    
        
        
}

// add page load function
window.addEventListener('load', displayTodos);
    // fetch the todos and store in state   


    // call displayTodos

logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async () => {
    // delete all todos
    await deleteAllTodos();
    // modify state to match new state (empty array)
    todoArr = []; 
    
    displayTodos();
    // re displayTodos
});
