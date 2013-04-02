define(["ember"], function(Ember){
    var StoryController = Ember.ObjectController.extend({
        currentDragItemObserver: function() {
            this.set('currentDragItem', this.get('content.items').findProperty("isDragging", true));
        }.observes('content.items.@each.isDragging'),
        reorderStoryItem: function(newLocation){
            var dragItem = this.get('currentDragItem')
            var s= '';
        }

    });

    return StoryController;
});