import { createToDo } from './сreationFunctions.js';
import { listTask } from './elements.js';

export let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

export function render() {
    const todoItems = todos.map((item) => createToDo(item.id, item.description, item.isCompleted));
    listTask.append(...todoItems);
}