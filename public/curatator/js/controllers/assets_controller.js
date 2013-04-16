var StoryItem = require('../models/story_item');

var AssetsController = Ember.Controller.extend({
	storyItems: Ember.A([]),
    newText: false,
	assets: (function(){
		return Ember.ArrayController.create({
			content: this.get('storyItems').filterProperty("type", "image")
		});
	}).property('storyItems'),
    previewItem: null,
    closePreview: function( event ){
        this.set('previewItem', null)
    }
});


module.exports = AssetsController;
