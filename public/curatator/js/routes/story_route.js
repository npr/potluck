var StoryRoute = Ember.Route.extend({
   renderTemplate: function() {
        this.render('index' );
   },
   setupController: function(controller, model){
       controller.set('content', model)
   }
});

module.exports = StoryRoute;