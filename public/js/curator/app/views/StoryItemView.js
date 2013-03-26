define([
    "ember",
    "app/utils/DragNDrop",
    "text!templates/storyItemTemplate.handlebars"
], function(Ember, DragNDrop, storyItemTemplate) {

    var StoryItemView = Ember.View.extend(DragNDrop.Draggable, {
        defaultTemplate: Ember.Handlebars.compile(storyItemTemplate)
    });
    return StoryItemView;
});