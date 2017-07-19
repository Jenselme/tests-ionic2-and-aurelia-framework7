import { Aurelia } from 'aurelia-framework'
import environment from './environment';

//Configure Bluebird Promises.
(<any>Promise).config({
    warnings: {
        wForgottenReturn: false
    }
});

export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .plugin('aurelia-validation')
        .plugin('aurelia-ux');

    if (environment.debug) {
        aurelia.use.developmentLogging();
    }

    if (environment.testing) {
        aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(() => aurelia.setRoot());
}
