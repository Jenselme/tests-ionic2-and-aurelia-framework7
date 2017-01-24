import {bootstrap} from 'aurelia-bootstrapper-webpack';

import 'framework7/dist/css/framework7.material.css'
import 'framework7/dist/css/framework7.material.colors.css'
import 'framework7/dist/js/framework7.js'
import '../styles/style.css';


bootstrap(function (aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging();

    aurelia.start().then(() => aurelia.setRoot('app', document.body));
});
