import { fieldEntry, buttonAdd, listTask } from './elements.js';
import { Todo, createToDo } from './сreationFunctions.js';
import { todos } from './connectionLocalStorage.js';

export function eventListeners() {
    fieldEntry.addEventListener('input', (event) => buttonAdd.disabled = event.currentTarget.value === '');

    buttonAdd.addEventListener('click', () => {
        const id = todos.length >= 1 ? todos.at(-1).id + 1 : 1;
        const todo = new Todo(id, fieldEntry.value, false);
        const newTodoItem = createToDo(todo.id, todo.description, todo.isCompleted);
        todos.push(todo);
        listTask.append(newTodoItem);
        localStorage.setItem('todos', JSON.stringify(todos));
        fieldEntry.value = '';
        buttonAdd.disabled = true;
    });

    listTask.addEventListener('click', (event) => {
        switch (event.target.dataset.action) {
            case 'remove': {
                const li = event.target.closest('.todo__item');
                li.remove();
                const index = todos.findIndex(todo => todo.id === +li.dataset.id);
                todos.splice(index, 1);
                localStorage.setItem('todos', JSON.stringify(todos));
                break;
            }
            case 'cross': {
                const li = event.target.closest('.todo__item');
                li.classList.toggle('todo__item_completed');
                const todo = todos.find(todo => todo.id === +li.dataset.id);
                todo.isCompleted = !todo.isCompleted;
                localStorage.setItem('todos', JSON.stringify(todos));
                break;
            }
            default: break;
        }
    });
}