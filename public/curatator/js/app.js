module.exports = Ember.Application.create({
	ready: function(){
		var story = App.Story.createRecord({id: 1, name: "NPR Farmhouse"});
		var storyItem = App.StoryItem.createRecord({name: "Barn"});
		var storyItem2 = App.StoryItem.createRecord({name: "Race car!"});
		App.StoryItem.createRecord({name: "Horsey"});
		App.StoryItem.createRecord({name: "Miss Piggy"});
		App.StoryItem.createRecord({name: "Lucy Lizzard"});
		App.StoryItem.createRecord({name: "Puff Man"});
		var storyItemOrder = App.StoryItemOrder.createRecord({story: story, storyItem: storyItem, order: 0});
		App.StoryItemOrder.createRecord({story: story, storyItem: storyItem2, order: 1});
	}
});
