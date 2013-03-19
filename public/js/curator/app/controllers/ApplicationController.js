define(["ember" ], function(Ember){
    var ApplicationController = Ember.Controller.extend({
        stories: Ember.A([]),
        loadStories: function(){
           this.get('content').addObjects(this.get('store').findAll(Curator.Story));
        }

    });

    return ApplicationController;
});