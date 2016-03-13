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
                    console.log(result)
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

    private markTodoDone(todo) {
        let done;
        if (todo.done == true || todo.done === 'true') {
            done = 'false';
        } else {
            done = 'true';
        }

        this.storage.query('UPDATE todos SET done = ?', [done])
            .then(() => todo.done = done)
            .catch(err => console.log(err));
    }

    private getClass(todo) {
        // When retrieved from SQLStorage, done is not a boolean but a string.
        return (todo.done == true || todo.done === 'true') ? 'done clickable' : 'clickable';
    }
}
