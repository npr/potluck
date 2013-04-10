var AssetsController = Ember.Controller.extend({
	storyItems: Ember.A([]),
	assets: (function(){
		return Ember.ArrayController.create({
			content: this.get('storyItems')
		});
	}).property('storyItems')
});


module.exports = AssetsController;
