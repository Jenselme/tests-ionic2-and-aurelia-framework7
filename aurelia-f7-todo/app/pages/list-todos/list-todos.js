import {F7} from '../../f7';
import { Storage } from '../../services/storage';
import {inject} from 'aurelia-framework';
import { Router } from 'aurelia-router';


@inject(F7, Router, Storage)
export class ListTodosPage {
    heading = 'Welcome to the Aurelia Framework 7 TODO App';

    constructor(f7, router, storage) {
        this.f7 = f7;
        this.router = router;
        this.storage = storage;
        this.todos = [];

        this.storage.getTodos().then(todos => this.todos = todos);
    }

    viewTodo(todo) {
        this.router.navigateToRoute('todo', {id: todo.id});
    }

    addTodo() {
        this.router.navigate('/todo');
    }

    toggleDone(todo) {
        if (todo.done === true || todo.done === 'true') {
            todo.done = 'false';
        } else {
            todo.done = 'true';
        }

        this.storage.saveTodo(todo);
    }
}
