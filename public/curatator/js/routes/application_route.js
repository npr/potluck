var ApplicationRoute = Ember.Route.extend({
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
    return App.Story.all();
  },
  setupController: function(controller, model){
    controller.set('stories', model);
	this.controllerFor('assets').set('storyItems', App.StoryItem.all());
  }
});

module.exports = ApplicationRoute;