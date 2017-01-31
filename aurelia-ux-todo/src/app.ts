import { AureliaUX } from 'aurelia-ux';
import { inject } from 'aurelia-dependency-injection';
import { routes } from './routes';


@inject(AureliaUX)
export class App {
    router;
    showNavigationMenu: Boolean;

    constructor(ux) {
        ux.design.primary = '#009688';
        ux.design.accent = '#4CAF50';

        this.showNavigationMenu = false;
    }

    configureRouter(config, router) {
        this.router = router;
        config.map(routes);
    }

    toggleNavigationMenu() {
        this.showNavigationMenu = !this.showNavigationMenu;
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
