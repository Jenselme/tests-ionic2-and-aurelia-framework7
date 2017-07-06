import { AureliaUX } from 'aurelia-ux';
import { autoinject } from 'aurelia-dependency-injection';
import { routes } from './routes';


const MAIN_THEME = {
    primary: '#009688',
    accent: '#4CAF50',
};
const ALTERNATE_THEME = {
    primary: '#4CAF50',
    accent: '#009688',
};

@autoinject
export class App {
    router;
    showNavigationMenu: Boolean;
    public theme: Boolean;

    constructor(private ux: AureliaUX) {
        ux.design.primary = MAIN_THEME.primary;
        ux.design.accent = MAIN_THEME.accent;

        this.showNavigationMenu = false;
    }

    configureRouter(config, router) {
        this.router = router;
        config.map(routes);
    }

    toggleNavigationMenu() {
        this.showNavigationMenu = !this.showNavigationMenu;
    }

    themeChanged() {
        if (this.theme) {
            this.ux.design.primary = ALTERNATE_THEME.primary;
            this.ux.design.accent = ALTERNATE_THEME.accent;
        } else {
            this.ux.design.primary = MAIN_THEME.primary;
            this.ux.design.accent = MAIN_THEME.accent;
        }
    }
}


export class CategoriesValueConverter {
    toView(navModels) {
        let categories = new Map();

        for (let model of navModels) {
            let routes = categories.get(model.settings.category);

            if (!routes) {
                categories.set(model.settings.category, routes = []);
            }

            routes.push(model);
        }

        return categories;
    }
}
