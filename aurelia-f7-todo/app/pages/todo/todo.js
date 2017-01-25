import { inject, ObserverLocator } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ValidationControllerFactory, ValidationRules, Validator, validateTrigger } from 'aurelia-validation';

import { Storage } from '../../services/storage';


/**
 * Custom validator that complies with the Validator interface:
 * https://github.com/aurelia/validation/blob/master/src/validator.ts
 */
class TodoValidator {
    constructor(validator, cb) {
        this.validator = validator;
        this.cb = cb;
    }

    /**
     * This method will be called by the controller when validating a specific field. For instance,
     * when the user is interacting with the title input. So, we need to validate the whole form
     * and call our callback in order for TodoPage.canSave to be correctly updated.
     */
    validateProperty(object, propertyName, rules) {
        let validationDefered = this.validator.validateProperty(object, propertyName, rules);
        validationDefered.then(() => this.validateObject(object, rules));

        return validationDefered;
    }

    /**
     * Each time the whole form is validated, we call the registered callback to do whatever
     * the user wants to do with the results of the validation. In our case: update
     * TodoPage.canSave.
     */
    validateObject(object, rules) {
        return this.validator.validateObject(object, rules).then(results => {
            this.cb(results);
            return results;
        });
    }

    /**
     * Implemented so the interface is complete.
     */
    ruleExists(rules, rule) {
        return this.validator(rules, rule);
    }
}


@inject(Router, Storage, ValidationControllerFactory, Validator, ObserverLocator)
export class TodoPage {
    constructor(router, storage, controllerFactory, validator, ol) {
        this.router = router;
        this.storage = storage;

        this.validator = new TodoValidator(validator, results => this.updateCanSave(results));
        this.controller = controllerFactory.createForCurrentScope(this.validator);
        this.controller.validateTrigger = validateTrigger.changeOrBlur;

        // We don't know if we can save. This will be updated when the view is activated (the form
        // should be valid if we are editing an existing todo but invalid if we are creating a
        // new one).
        this.canSave = false;
    }

    activate(params) {
        if (params.id) {
            // In this case, we are editing a TODO. We fetch it from the storage and assign it to
            // the todo property. We can then setup validation on this property. If we had set it
            // up in the constructor, validation would become uneffective: we replaced the object
            // in this.todo by another one. ValidationRules.on is not tracking the right object.
            // Once this is done, we setup validation and validate the form so this.canSave is
            // true if the edited TODO is valid. If the user modifies the TODO, then the
            // controller will handle the validation and this.canSave will be updated accordingly.
            this.storage.getTodo(params.id)
                .then(todo => this.todo = todo)
                .then(() => {
                    this.setupValidation();
                    this.validate();
                });
        } else {
            // We are creating a new todo. We just need to initialize this.todo and validation.
            this.todo = {};
            this.setupValidation();
        }
    }

    setupValidation() {
        ValidationRules
            .ensure('title').required().minLength(3).withMessage('Title must at least be 3 chars long.')
            .on(this.todo);
    }

    validate() {
        this.validator.validateObject(this.todo);
    }

    updateCanSave(validationResults) {
        let valid = true;

        for (let result of validationResults) {
            valid = valid && result.valid;
        }

        this.canSave = valid;
    }

    saveTodo() {
        this.storage.saveTodo(this.todo)
            .then(() => this.router.navigateToRoute('todos'));
    }

    cancel() {
        this.router.navigateToRoute('todos');
    }
}
