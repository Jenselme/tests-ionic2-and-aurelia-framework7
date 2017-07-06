import { Todo } from '../models/todo';
import { Storage } from '../services/storage';
import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';


@autoinject
export class List {
    public todos: Todo[];

    constructor(private storage: Storage, private router: Router) {
        this.todos = this.storage.getTodos();
    }

    public viewTodo(todo: Todo) {
        this.router.navigateToRoute('todo', {id: todo.id});
    }

    public addTodo() {
        this.router.navigate('/add');
    }

    toggleDone(todo: Todo) {
        if (todo.done) {
            todo.done = false;
        } else {
            todo.done = true;
        }

        this.storage.saveTodo(todo);
    }
}