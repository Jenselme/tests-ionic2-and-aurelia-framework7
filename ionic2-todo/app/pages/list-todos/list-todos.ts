import {Page} from 'ionic-angular';
import {Todo} from '../../models';


@Page({
  templateUrl: 'build/pages/list-todos/list-todos.html',
})
export class ListTodosPage {
    private todos: Todo[];
    
    constructor() {
        this.todos = [{
            title: 'Todo 1',
            description: '',
            done: false,
            created: new Date(),
        }, {
            title: 'Todo 2',
            description: '',
            done: false,
            created: new Date(),
        }];
    }
}
