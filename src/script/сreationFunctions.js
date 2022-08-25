function elementsCreate(tagName, className, id, action, type) {
    const element = document.createElement(tagName);
    if (className) {
        element.className = className;
    }
    if (id) {
        element.dataset.id = id;
    }
    if (action) {
        element.dataset.action = action;
    }
    if (type) {
        element.type = type;
    }
    return element;
}

export function createToDo(id, description = '', isCompleted) {
    const li = elementsCreate('li', (isCompleted ? 'todo__item todo__item_completed' : 'todo__item'), id);
    const label = elementsCreate('label', 'todo__label');
    const input = elementsCreate('input', 'todo__checkbox', '', 'cross', 'checkbox');
    const div = elementsCreate('div', 'todo__switch');
    const span = elementsCreate('span', 'todo__text');
    const button = elementsCreate('button', 'todo__delete', '', 'remove');

    li.append(label, button);
    label.append(input, div, span);
    input.checked = isCompleted;
    span.append(description);
    button.append('X');

    return li;
}

export const Todo = function(id, value, bool) {
    this.id = id;
    this.description = value;
    this.isCompleted = bool;
};