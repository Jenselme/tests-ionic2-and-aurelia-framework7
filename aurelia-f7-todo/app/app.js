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
            },
        ]);

        this.router = router;
    }
}
