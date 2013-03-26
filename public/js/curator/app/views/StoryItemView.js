define([
    "ember",
    "app/utils/DragNDrop",
    "text!templates/storyItemTemplate.handlebars"
], function(Ember, DragNDrop, storyItemTemplate) {

    var StoryItemView = Ember.View.extend(DragNDrop.Draggable, {
        defaultTemplate: Ember.Handlebars.compile(storyItemTemplate),
        dragStart: function(event) {
            this._super(event);
            this.set('content.isDragging', true);

        },

        dragEnd: function(event) {
            // Let the controller know this view is done dragging
            this.set('content.isDragging', false);
        }
    });
    return StoryItemView;
});