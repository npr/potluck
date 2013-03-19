(function(root){
    require(["/js/curator/config.js"], function(config){
        requirejs.config(config);
        require(["App", "ember", "ember-data"], function(App, Ember, DS){
            var app_name = config.app_name || "App";
            root[app_name] = App = Ember.Application.create(App);

            Curator.Router.map
            App.deferUntilDOMReady();

            App.Story.FIXTURES = [
                {
                    id: 1,
                    name: "Epic Story Bro"
                },
                {
                    id: 2,
                    name: "NPR Digitial"
                }
            ];

        });
    });
})(this);