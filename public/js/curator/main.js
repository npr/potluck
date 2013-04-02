(function(root){
    require(["/js/curator/config.js"], function(config){
        requirejs.config(config);
        require(["App", "ember", "ember-data", "app/router"], function(App, Ember, DS, Router){
            var app_name = config.app_name || "App";

            root[app_name] = App;
            App.ready = function(){
                var story1 = App.Story.createRecord({
                    id: 1,
                    name: "NPR Farmhouse"
                });
                App.Story.createRecord({
                    id: 2,
                    name: "NPR Riverland"
                });
                App.Story.createRecord({
                    id: 3,
                    name: "Safari Adventure"
                });
                var si1 = App.StoryItem.createRecord({
                    id: 1,
                    name: "Farm 1"
                });
                var si2 = App.StoryItem.createRecord({
                    id: 2,
                    name: "Farm 2"
                });
                var si3 = App.StoryItem.createRecord({
                    id: 3,
                    name: "Barn"
                });
                App.StoryItemOrder.createRecord({
                    id: 1,
                    order: 0,
                    storyItem: si1,
                    story: story1
                });
                App.StoryItemOrder.createRecord({
                    id: 2,
                    order: 1,
                    storyItem: si2,
                    story: story1
                });

            }
            App = Ember.Application.createWithMixins(App);
            Router(App.Router);

            App.Store = DS.Store.extend({
                revision: 11,
                adapter: 'DS.FixtureAdapter'
            });






            App.deferUntilDOMReady();

        });
    });
})(this);