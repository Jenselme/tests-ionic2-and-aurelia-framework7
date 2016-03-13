import {
    FORM_DIRECTIVES,
    AbstractControl,
    ControlGroup,
    Validators,
    Control,
} from 'angular2/common';
import {Page, NavController, NavParams, Storage, SqlStorage} from 'ionic-angular';
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
    private storage: Storage;

    constructor(private nav: NavController, navParams: NavParams) {
        this.storage = new Storage(SqlStorage);

        if (navParams.data.todo) {
            this.todo = navParams.data.todo;
        } else {
            this.todo = new Todo();
        }

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
        if (this.todo.id === undefined) {
            this.storage.query(
                'INSERT INTO todos (title, description, done) VALUES (?, ?, ?);',
                [todoValues.title, todoValues.description, todoValues.done]
            )
                .then(() => this.nav.push(ListTodosPage))
                .catch(err => console.log(err));
        } else {
            this.storage.query(
                'UPDATE todos SET title = ?, description = ?, done = ? WHERE id = ?',
                [todoValues.title, todoValues.description, todoValues.done, this.todo.id]
            )
                .then(() => this.nav.push(ListTodosPage))
                .catch(err => console.log(err));
        }
    }

    private cancel() {
        this.nav.push(ListTodosPage);
    }
}