define([
    "app/views/IndexView",
    "app/views/ApplicationView",
    "app/views/StoryView",
    "app/views/AssetsView",
    "app/views/StoryItemView",
    "app/controllers/ApplicationController",
    "app/controllers/StoryController",
    "app/controllers/AssetsController",
    "app/models/Story",
    "app/models/StoryItem",
    "app/routes",
    'ember-data'
], function(IndexView, ApplicationView, StoryView, AssetsView, StoryItemView, ApplicationController, StoryController, AssetsController, Story, StoryItem, Routes, DS){
    /*Module Pattern*/
    var App = {
        rootElement : '#canvas',
        IndexView: IndexView,
        ApplicationView: ApplicationView,
        StoryItemView: StoryItemView,
        StoryView: StoryView,
        AssetsView: AssetsView,

        Story: Story,
        StoryItem: StoryItem,

        ApplicationController: ApplicationController,
        StoryController: StoryController,
        AssetsContorller: AssetsController,

        };

        //Lets add the routes
        for( var attributeName in Routes){
            App[attributeName] = Routes[attributeName];
        }


    return App;
});