var StoryController = Ember.ObjectController.extend({
	needs: ['assets'],
    currentDragItemObserver: function() {
		var draggingStoryItemOrder = this.get('content').get('storyItemOrders').findProperty("isDragging", true);
		var draggingStoryItem = App.StoryItem.all().findProperty("isDragging", true);
		var currentDragItem = null;
		currentDragItem =  ( ! Ember.isEmpty(draggingStoryItemOrder) ? draggingStoryItemOrder : currentDragItem);
		currentDragItem =  ( ! Ember.isEmpty(draggingStoryItem) ? draggingStoryItem : currentDragItem)
		this.set('currentDragItem', currentDragItem);
    }.observes('content.storyItemOrders.@each.isDragging', 'controllers.assets.assets.@each.isDragging'),
	unsetDragItem: function(){
		var storyItemOrders = [];
		var story = this.get('content');
		if(!Ember.isEmpty(story)){
			storyItemOrders = story.get('storyItemOrders');
		}
		storyItemOrders.forEach(function(item){
			item.set('isDragging', false)
		});
	
	},
    sortedStoryItems: (function(){
		var storyItemOrders = [];
		var story = this.get('content');
		if(!Ember.isEmpty(story)){
			storyItemOrders = story.get('storyItemOrders');
		}
		var array = Ember.ArrayController.create({
	      content: storyItemOrders.toArray(),
	      sortProperties: ['order'],
	      sortAscending: true
	    });
		return array;
	}).property('content.storyItemOrders.@each.order'),
	reorderStoryItem: function(index, storyItem){
		var storyItemOrder,
			type,
			previousOrder;
		if( storyItem instanceof App.StoryItem){
			storyItemOrder = App.StoryItemOrder.createRecord({
				story: this.get('content'),
				storyItem: storyItem,
				order: index
			});
			type = "new";
		}else{
			storyItemOrder = storyItem;
			type = "reorder";
			previousOrder = storyItemOrder.get('order')
		}
		var story = storyItemOrder.get('story');
		
		story.get('storyItemOrders').forEach(function(item){
			var order = item.get('order');
			if(type == "new"){
				order = ( order >= index? order + 1: order)
			}else if (type == "reorder"){
				if( ! Ember.isEqual(storyItemOrder, item)){
					if( order < index ){
						//Lets leave the current object where it is
						//	But, if we have the bottom taken out from under it, move it down a node.
						order = (order > previousOrder? order - 1 : order);
					}else if( order >= index && order <= previousOrder){
						//We are bumping the item up
						order = order + 1;
					}
				}
			}
			
			item.set('order', order)
		});
		//We have to reduce the index by one, because the droppable regions start before the story items
		storyItemOrder.set('order', (((index >= story.get('storyItemOrders').get('length')) || ( index >= previousOrder)) ? index - 1: index));
	}
});

module.exports =  StoryController;