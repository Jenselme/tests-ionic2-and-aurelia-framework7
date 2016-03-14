import {F7} from '../../f7';
import {inject} from 'aurelia-framework';
import { Router } from 'aurelia-router';


@inject(F7, Router)
export class ListTodosPage {
    heading = 'Welcome to the Aurelia Framework 7 TODO App';

    constructor(f7, router) {
        this.f7 = f7;
        this.router = router;
        this.todos = [{
            title: 'TODO 1',
            done: false,
            description: '',
        }, {
            title: 'TODO2',
            done: false,
            description: '',
        }];
    }

    viewTodo(todo) {
        this.router.navigateToRoute('todo', {todo: todo});
    }
}
