let todoCategory = {
    title: 'TODO',
};


export let routes = [
    { route: '', redirect: 'list' },
    { route: 'list', moduleId: './pages/list', name: 'list', title: 'TODO list' },

    { settings: { category: todoCategory }, route: 'add', moduleId: './pages/add', name: 'add', title: 'Add todo', nav: true },
];
