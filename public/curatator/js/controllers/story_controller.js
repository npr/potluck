var StoryItem = require('../models/story_item')

var StoryController = Ember.ObjectController.extend({
	needs: ['assets'],
    currentDragItemObserver: function() {
		var draggingStoryItemOrder = this.get('content').get('storyItemOrders').findProperty("isDragging", true);
		var draggingStoryItem = App.StoryItem.all().findProperty("isDragging", true);
        var newText  = this.get('controllers.assets.newText')
		var currentDragItem = null;
		currentDragItem =  ( ! Ember.isEmpty(draggingStoryItemOrder) ? draggingStoryItemOrder : currentDragItem);
		currentDragItem =  ( ! Ember.isEmpty(draggingStoryItem) ? draggingStoryItem : currentDragItem);
        currentDragItem =  ( newText ?  true : currentDragItem)
		this.set('currentDragItem', currentDragItem);
    }.observes('content.storyItemOrders.@each.isDragging', 'controllers.assets.assets.@each.isDragging', 'controllers.assets.newText'),
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
		var _this = this;
		story.get('storyItemOrders').forEach(function(item){
            _this._reorderItem(item, index, type, previousOrder)
		});
		//We have to reduce the index by one, because the droppable regions start before the story items
		storyItemOrder.set('order', (((index >= story.get('storyItemOrders').get('length')) || ( index >= previousOrder)) ? index - 1: index));
	},
    delete: function ( storyItemOrder ){
        var storyItemOrders = this.get('content').get('storyItemOrders');
        var order = storyItemOrder.get('order')
        storyItemOrders.removeObject(storyItemOrder);
        storyItemOrder.deleteRecord();

        var _this = this;
        storyItemOrders.forEach(function(item){
            _this._reorderItem(item, order, "delete")
        });
    },
    _reorderItem: function ( storyOrderItem, index, type, previousOrder ){
        var order = storyOrderItem.get('order');
        if(type == "new"){
            order = ( order >= index? order + 1: order)
        }else if (type == "reorder"){
            if( order < index ){
                //Lets leave the current object where it is
                //	But, if we have the bottom taken out from under it, move it down a node.
                order = (order > previousOrder? order - 1 : order);
            }else if( order >= index && order <= previousOrder){
                //We are bumping the item up
                order = order + 1;
            }
        }else if (type == "delete"){
            order = (order > index ? order - 1: order);
        }

        storyOrderItem.set('order', order)
    }
});

module.exports =  StoryController;