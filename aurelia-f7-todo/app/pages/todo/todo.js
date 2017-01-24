import { inject, ObserverLocator } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ValidationControllerFactory, ValidationRules, Validator, validateTrigger } from 'aurelia-validation';

import { Storage } from '../../services/storage';


@inject(Router, Storage, ValidationControllerFactory, Validator, ObserverLocator)
export class TodoPage {
    constructor(router, storage, controllerFactory, validator, ol) {
        this.router = router;
        this.storage = storage;
        // We rely on the controller to display the errors.
        this.controller = controllerFactory.createForCurrentScope();
        // We rely on the validator to know if the canSave the todo or not
        // (update the canSave property in the validation method)
        this.validator = validator;
        this.canSave = false;

        this.todo = {};
        ValidationRules
            .ensure('title').required().minLength(3).withMessage('Title must at least be 3 chars long.')
            .on(this.todo);
        this.controller.validateTrigger = validateTrigger.changeOrBlur;

        ol.getObserver(this.todo, 'title').subscribe(() => {
            this.validate();
        });
    }

    activate(params) {
        if (params.id) {
            this.storage.getTodo(params.id)
                .then(todo => this.todo = todo);
        }
    }

    attached() {
        this.validate();
    }

    validate() {
        this.validator.validateObject(this.todo).then(results => {
            let valid = true;

            for (let result of results) {
                valid = valid && result.valid;
            }

            this.canSave = valid;
        });
    }

    saveTodo() {
        this.storage.saveTodo(this.todo)
            .then(() => this.router.navigateToRoute('todos'));
    }

    cancel() {
        this.router.navigateToRoute('todos');
    }
}
