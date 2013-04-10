(function(root){
    require(["/js/curator/config.js"], function(config){
        requirejs.config(config);
        require(["App", "ember", "ember-data", "app/router"], function(App, Ember, DS, Router){
            var app_name = config.app_name || "App";

            root[app_name] = App;
            App = Ember.Application.createWithMixins(App);
            Router(App.Router);



            App.Story.FIXTURES = [
                {
                    "id": 1,
                    "name": "Firehouse",
                    "storyItemOrders": [6,7]
                },
                {
                    "id": 2,
                    "name": "NPR Digital",
                    "storyItemOrders": []
                },
                {
                    "id": 3,
                    "name": "The Storm",
                    "storyItemOrders": []
                }
            ];

            App.StoryItem.FIXTURES = [
                {
                    "id" : 4,
                    "name" : "Farm",
                    "storyItemOrders": []

                },
                {
                    "id" : 5,
                    "name" : "Farm House",
                    "storyItemOrders": []
                }
            ];

            App.StoryItemOrder.FIXTURES = [
                {
                    "id" : 6,
                    "order": 1,
                    "story": 1,
                    "storyItem": 4
                },
                {
                    "id" : 7,
                    "order": 2,
                    "story": 1,
                    "storyItem": 5
                }
            ];

            App.Store = DS.Store.extend({
                revision: 11,
                adapter: DS.FixtureAdapter.create({})
            });

            App.deferUntilDOMReady();

        });
    });
})(this);