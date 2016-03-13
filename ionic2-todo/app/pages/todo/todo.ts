import {
    FORM_DIRECTIVES,
    AbstractControl,
    ControlGroup,
    Validators,
    Control,
} from 'angular2/common';
import {Page, NavController, NavParams} from 'ionic-angular';
import {Todo} from '../../models';
import { ListTodosPage } from '../list-todos/list-todos';


@Page({
    templateUrl: 'build/pages/todo/todo.html',
})
export class TodoPage {
    private todo: Todo;
    private index: number;
    private todoForm: ControlGroup;
    private title: AbstractControl;
    private description: AbstractControl;
    private done: AbstractControl;
    
    constructor(private nav: NavController, navParams: NavParams) {
        this.todo = navParams.data.todo;
        this.index = navParams.data.index;
        
        let group: {[key: string]: Control} = {
            title: new Control(this.todo.title, Validators.compose([Validators.required])),
            description: new Control(this.todo.description),
            done: new Control(this.todo.done),
        };
        
        this.todoForm = new ControlGroup(group);
        this.title = this.todoForm.controls['title'];
        this.description = this.todoForm.controls['description'];
        this.done = this.todoForm.controls['done'];
    }
    
    private save(todoValues) {
        this.nav.push(ListTodosPage, {
            todo: todoValues,
            index: this.index,
        });
    }
    
    private cancel() {
        this.nav.push(ListTodosPage);
    }
}