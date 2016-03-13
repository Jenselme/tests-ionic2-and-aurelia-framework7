import {Page, NavController, Storage, SqlStorage} from 'ionic-angular';
import {Todo} from '../../models';
import { TodoPage } from '../todo/todo';


@Page({
  templateUrl: 'build/pages/list-todos/list-todos.html',
})
export class ListTodosPage {
    private todos: Todo[];
    private storage: Storage;

    constructor(private nav: NavController) {
        this.storage = new Storage(SqlStorage);
        this.todos = [];
        this.storage.query('CREATE TABLE IF NOT EXISTS todos(id integer primary key unique, title VARCHAR(10), description TEXT, done BOOLEAN)')
            .then(() => this.storage.query('SELECT * FROM todos'))
            .then(results => {
                for (let result of results.res.rows) {
                    this.todos.push(result);
                }
            })
            .catch(err => console.log(err));
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
