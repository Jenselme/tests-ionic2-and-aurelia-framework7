import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

import { Todo } from '../models/todo';
import { Storage } from '../services/storage';


@autoinject
export class Add {
    public todo: Todo;

    constructor(private router: Router, private storage: Storage) {
    }

    public activate(params) {
        if (params.id) {
            this.todo = this.storage.getTodo(params.id);
        } else {
            this.todo = new Todo();
        }
    }

    public save() {
        this.storage.saveTodo(this.todo);
        this.router.navigateToRoute('list');
    }

    public cancel() {
        this.router.navigateToRoute('list');
    }
}
