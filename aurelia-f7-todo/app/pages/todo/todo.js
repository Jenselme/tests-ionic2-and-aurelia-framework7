import {inject} from 'aurelia-framework';
import { Router } from 'aurelia-router';


@inject(Router)
export class TodoPage {
    constructor(router) {
        this.router = router;
    }

    activate(params) {
        this.todo = params.todo;
    }

    saveTodo() {
        this.router.navigateToRoute('todos');
    }

    cancel() {
        this.router.navigateToRoute('todos');
    }
}
