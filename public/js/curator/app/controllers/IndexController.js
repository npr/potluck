define(["ember" ], function(Ember){
    var IndexController = Ember.Controller.extend({
        stories: Ember.A([]),
        selectedStory: null,
        loadStories: function(){
           this.set('selectedStory', Curator.Story.find().objectAt(1))
        }

    });

    return IndexController;
});