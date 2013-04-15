var StoryItem = require('../models/story_item')

var AssetsController = Ember.Controller.extend({
	storyItems: Ember.A([]),
    newText: false,
	assets: (function(){
		return Ember.ArrayController.create({
			content: this.get('storyItems')
		});
	}).property('storyItems')
});


module.exports = AssetsController;
