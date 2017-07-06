import { Todo } from '../models/todo';


const TODO_SAVE_KEY = 'todos';

export class Storage {
    getTodos(): Todo[] {
        let todos = localStorage.getItem(TODO_SAVE_KEY);
        if (todos === null) {
            return [];
        }

        return JSON.parse(todos);
    }

    saveTodo(todo: Todo) {
        let todos;
        if (todo.id === undefined) {
            todos = this.getTodos();
            todo.id = todos.length;
            todos.push(todo);
        } else {
            todos = this.getTodos();
            let index = todo.id;
            todos[index] = todo;
        }

        localStorage.setItem(TODO_SAVE_KEY, JSON.stringify(todos));
    }

    getTodo(id): Todo {
        return this.getTodos()[id];
    }
}
