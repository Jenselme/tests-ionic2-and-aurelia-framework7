import * as localforage from '../../node_modules/localforage/dist/localforage.js';


export class Storage {
    constructor() {
        this.storage = localforage;
    }

    getTodos() {
        return this.storage.getItem('todos')
            .then(todos => JSON.parse(todos))
            .then(todos => todos ? todos : []);
    }

    saveTodo(todo) {
        let prepareTodos;
        if (!todo.id) {
            prepareTodos = this.getTodos()
                .then(todos => {
                    todo.id = todos.length;
                    todos.push(todo);
                    return todos;
                });
        } else {
            prepareTodos = this.getTodos()
                .then(todos => {
                    let index = todo.id;
                    todos[index] = todo;

                    return todos;
                });
        }

        return prepareTodos.then(todos => this.storage.setItem('todos', JSON.stringify(todos)));
    }

    getTodo(id) {
        return this.getTodos()
            .then(todos => todos[id]);
    }
}