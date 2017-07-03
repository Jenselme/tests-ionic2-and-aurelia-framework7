import { Todo } from '../models/todo';

declare var require: any;
const localforage: LocalForage = require("localforage");


export class Storage {
    private storage: LocalForage;

    constructor() {
        this.storage = localforage;
    }

    getTodos(): Promise<Array<Todo>> {
        return this.storage.getItem<string>('todos')
            .then(todos => JSON.parse(todos))
            .then(todos => todos ? todos : []);
    }

    saveTodo(todo: Todo) {
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

    getTodo(id): Promise<Todo> {
        return this.getTodos()
            .then(todos => todos[id]);
    }
}
