import {Page, NavController, NavParams} from 'ionic-angular';
import {Todo} from '../../models';
import { TodoPage } from '../todo/todo';


@Page({
  templateUrl: 'build/pages/list-todos/list-todos.html',
})
export class ListTodosPage {
    private todos: Todo[];
    
    constructor(private nav: NavController, navParams: NavParams) {
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
        
        if (navParams.data) {
            let index = navParams.data.index;
            let todo = navParams.data.todo;
            this.todos[index] = todo;
        }
    }
    
    private viewTodo(index) {
        this.nav.push(TodoPage, {
            todo: this.todos[index],
            index: index,
        });
    }
    
    private addTodo() {
        this.nav.push(TodoPage);
    }
}
