let todoCategory = {
    title: 'TODO',
};


export let routes = [
    { route: '', redirect: 'list' },
    { settings: { category: todoCategory }, route: 'list', moduleId: './pages/list', name: 'list', title: 'TODO list',  nav: true },

    { settings: { category: todoCategory }, route: 'add', moduleId: './pages/edit', name: 'add', title: 'Add todo', nav: true },
    { route: 'edit', moduleId: './pages/edit', name: 'edit', title: 'Edit todo' },
];
