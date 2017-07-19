import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import {
    ValidationController,
    ValidationControllerFactory,
    ValidationRules,
    validateTrigger,
} from 'aurelia-validation';

import { Todo } from '../models/todo';
import { Storage } from '../services/storage';


@autoinject
export class Add {
    public todo: Todo;
    private controller: ValidationController;

    constructor(private router: Router, private storage: Storage, controllerFactory: ValidationControllerFactory) {
        this.controller = controllerFactory.createForCurrentScope();
        this.controller.validateTrigger = validateTrigger.changeOrBlur;
    }

    public activate(params) {
        if (params.id) {
            this.todo = this.storage.getTodo(params.id);
        } else {
            this.todo = new Todo();
        }

        this.setupValidation();
    }

    public setupValidation() {
        ValidationRules
            .ensure('title').required().minLength(3).withMessage('Title must at least be 3 chars long.')
            .on(this.todo);
    }

    public save() {
        this.storage.saveTodo(this.todo);
        this.router.navigateToRoute('list');
    }

    public cancel() {
        this.router.navigateToRoute('list');
    }
}
