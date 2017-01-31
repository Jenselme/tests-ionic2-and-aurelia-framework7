let todoCategory = {
    title: 'TODO',
};


export let routes = [
    { route: '', redirect: 'home' },
    { route: 'home', moduleId: './home', name: 'home', title: 'Home' },

    { settings: { category: todoCategory }, route: 'todo', moduleId: './pages/todo', name: 'todo', title: 'Add todo', nav: true },
];
