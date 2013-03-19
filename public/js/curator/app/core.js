define([
    "app/views/ApplicationView",
    "app/views/StoryView",
    "app/views/AssetsView",
    "app/views/StoryItemView",
    "app/controllers/ApplicationController",
    "app/controllers/StoryController",
    "app/controllers/AssetsController",
    "app/models/Story",
    "app/models/StoryItem",
    "app/router",
    'ember-data'
], function(ApplicationView, StoryView, AssetsView, StoryItemView, ApplicationController, StoryController, AssetsController, Story, StoryItem, Router, DS){
    /*Module Pattern*/
    var App = {
        ApplicationView: ApplicationView,
        StoryItemView: StoryItemView,
        StoryView: StoryView,
        AssetsView: AssetsView,

        Story: Story,
        StoryItem: StoryItem,

        ApplicationController: ApplicationController,
        StoryController: StoryController,
        AssetsContorller: AssetsController,

        Router: Router,

        Store: DS.Store.extend({
            revision: 12,
            adapter: 'DS.FixtureAdapter'
        })

        };

    return App;
});