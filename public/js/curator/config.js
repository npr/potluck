define({
    app_name: "Curator",
    baseUrl: "/js/curator",
    shim : {
        'ember' : {
            deps: ['handlebars', 'jquery'],
            exports: 'Ember'
        },
        'ember-data': {
            deps: ["ember"],
            exports: "DS"
        }
    },
    paths : {
        'App': 'app/core',
        'models': 'app/models',
        'views': 'app/views',
        'controllers': 'app/controllers',
        'templates': 'app/templates',
        /*libs*/
        'jquery': '../lib/jquery',
        'handlebars': '../lib/handlebars',
        'ember': '../lib/ember',
        'ember-data': '../lib/ember-data',
        /*requirejs-plugins*/
        'text': '../lib/require-plugins/text',
        'hbs': '../lib/require-plugins/hbs',
        'domReady': '../lib/require-plugins/domReady'
    },
    /*hbs plugin options*/
    hbs: {
        disableI18n: true,
        templateExtension: "handlebars"
    }

}); 