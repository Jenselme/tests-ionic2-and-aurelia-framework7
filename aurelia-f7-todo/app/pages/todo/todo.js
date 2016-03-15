import {inject} from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Storage } from '../../services/storage';


@inject(Router, Storage)
export class TodoPage {
    constructor(router, storage) {
        this.router = router;
        this.storage = storage;
    }

    activate(params) {
        this.todo = {};
        if (params.id) {
            this.storage.getTodo(params.id)
                .then(todo => this.todo = todo);
        }
    }

    saveTodo() {
        this.storage.saveTodo(this.todo)
            .then(() => this.router.navigateToRoute('todos'));
    }

    cancel() {
        this.router.navigateToRoute('todos');
    }
}
