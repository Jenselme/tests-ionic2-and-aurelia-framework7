import {F7} from '../../f7';
import {inject} from 'aurelia-framework';


@inject(F7)
export class ListTodosPage {
    heading = 'Welcome to the Aurelia Framework 7 TODO App';

    constructor(f7) {
        this.f7 = f7;
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
}
