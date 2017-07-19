import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import {
    Validator,
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
    public canSave: Boolean;
    private controller: ValidationController;

    constructor(private router: Router, private storage: Storage, private validator: Validator, controllerFactory: ValidationControllerFactory) {
        this.controller = controllerFactory.createForCurrentScope(validator);
        this.controller.validateTrigger = validateTrigger.changeOrBlur;
        this.controller.subscribe(event => this.validateWhole());
    }

    private validateWhole() {
        this.validator.validateObject(this.todo)
            .then(results => this.canSave = results.every(result => result.valid));
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
            .ensure('description').required().minLength(3).withMessage('Description must at least be 3 chars long.')
            .on(this.todo);
    }

    public save() {
        if (!this.canSave) {
            return;
        }

        this.storage.saveTodo(this.todo);
        this.router.navigateToRoute('list');
    }

    public cancel() {
        this.router.navigateToRoute('list');
    }
}
