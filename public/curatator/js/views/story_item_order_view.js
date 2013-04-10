var DragNDrop = require('../mixins/drag_n_drop')

var StoryItemOrderView = Ember.View.extend(DragNDrop.Draggable, {
    templateName: 'story_item_order',
    dragStart: function(event) {
        this._super(event);
        this.set('content.isDragging', true);

    },

    dragEnd: function(event) {
        // Let the controller know this view is done dragging
        this.set('content.isDragging', false);
    },
    delete: function(event){

    }
});
module.exports = StoryItemOrderView;