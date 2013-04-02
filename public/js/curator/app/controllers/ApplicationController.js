define(["ember" ], function(Ember){
    var IndexController = Ember.Controller.extend({
        stories: Ember.A([]),
        selectedStory: null
    });

    return IndexController;
});