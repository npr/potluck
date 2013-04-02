define(["ember"], function(Ember){
   var Routes = {
        ApplicationRoute: Ember.Route.extend({
          renderTemplate: function(){
              this.render();
              this.render('story', {
                  outlet: 'story',
                  into: 'application'
              });
              this.render('assets', {
                  outlet: 'assets',
                  into: 'application'
              });
          },
          model: function(){
            return Curator.Story.all();
          },
          setupController: function(controller, model){
            controller.set('stories', model);
          }
        }),
        StoryRoute: Ember.Route.extend({
           renderTemplate: function() {
                this.render('index' );
           },
           setupController: function(controller, model){
               controller.set('content', model)
           }
        })



   };

    return Routes;
});