define(["ember"], function(Ember){
   var Routes = {
        IndexRoute: Ember.Route.extend({
          model: function(){
            return Curator.Story.find();
          },
          setupController: function(controller, model){
            controller.set('stories', model);
          }
        }),
        StoryRoute: Ember.Route.extend({
           setupController: function(controller, model){
               controller.set('content', model)
           }
        })



   };

    return Routes;
});