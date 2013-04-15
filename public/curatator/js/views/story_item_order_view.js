var DragNDrop = require('../mixins/drag_n_drop')

var StoryItemOrderView = Ember.View.extend(DragNDrop.Draggable, {
    type: "image",
    isEditing: false,
    templateName: function() {
        this.set('type', this.get("content.storyItem.type"))
        var templateName = "story_item_image_order";
        switch(this.get('type')){
            case 'image':
                templateName = "story_item_image_order";
                break;
            case 'text':
                templateName = "story_item_text_order"

        }
        return templateName;
    }.property('content.storyItem').cacheable(),

    dragStart: function(event) {
        this._super(event);
        this.set('content.isDragging', true);

    },

    dragEnd: function(event) {
        // Let the controller know this view is done dragging
        this.set('content.isDragging', false);
    },
    doubleClick: function(event){
        if(this.get('type') == "text"){
            this.set('isEditing', true);
        }
    },
    save: function(event){
        this.set('isEditing', false)
    }
});
module.exports = StoryItemOrderView;