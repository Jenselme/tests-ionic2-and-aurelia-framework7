export class App {
    configureRouter(config, router) {
        config.title = 'Aurelia';
        config.map([
            {
                route: ['', 'todos'],
                name: 'todos',
                moduleId: 'pages/list-todos/list-todos',
                nav: true,
                title: 'todos'
            }, {
                route: ['todo', 'todo/:id'],
                name: 'todo',
                moduleId: 'pages/todo/todo',
                nav: true,
                title: 'View Todo',
            }
        ]);

        this.router = router;
    }
}
