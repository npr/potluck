define([
    "app/views/IndexView",
    "app/views/ApplicationView",
    "app/views/StoryView",
    "app/views/AssetsView",
    "app/views/StoryItemView",
    "app/views/DropableView",
    "app/controllers/ApplicationController",
    "app/controllers/StoryController",
    "app/controllers/AssetsController",
    "app/models/Story",
    "app/models/StoryItem",
    "app/routes",
    "app/utils/DragNDrop"
], function(IndexView, ApplicationView, StoryView, AssetsView, StoryItemView, DropableView, ApplicationController, StoryController, AssetsController, Story, StoryItem, Routes, DragNDrop){
    /*Module Pattern*/
    var App = {
        rootElement : '#canvas',
        IndexView: IndexView,
        ApplicationView: ApplicationView,
        StoryItemView: StoryItemView,
        StoryView: StoryView,
        AssetsView: AssetsView,
        DropableView: DropableView,

        Story: Story,
        StoryItem: StoryItem,

        ApplicationController: ApplicationController,
        StoryController: StoryController,
        AssetsContorller: AssetsController,
        DragNDrop: DragNDrop
        };

        //Lets add the routes
        for( var attributeName in Routes){
            App[attributeName] = Routes[attributeName];
        }


    return App;
});