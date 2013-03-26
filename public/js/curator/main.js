(function(root){
    require(["/js/curator/config.js"], function(config){
        requirejs.config(config);
        require(["App", "ember", "ember-data", "app/router"], function(App, Ember, DS, Router){
            var app_name = config.app_name || "App";
            root[app_name] = App = Ember.Application.create(App);

            Router(App.Router);

            //App.deferUntilDOMReady();

            Curator.StoryItem.FIXTURES = [
                {
                    "id": 1,
                    "name": "Story Item 1"
                },
                {
                    "id": 2,
                    "name": "Story Item 2"
                },
                {
                    "id": 3,
                    "name": "Story Item 3"
                }
            ];

            Curator.Story.FIXTURES = [
                {
                    "id": 1,
                    "name": "Firehouse",
                    "items": [1,2]
                },
                {
                    "id": 2,
                    "name": "NPR Digital",
                    "items": [2,3]
                },
                {
                    "id": 3,
                    "name": "The Storm",
                    "items": [1,2,3]
                }
            ];
            Curator.Store = DS.Store.extend({
                revision: 11,
                adapter: DS.FixtureAdapter
            });

        });
    });
})(this);