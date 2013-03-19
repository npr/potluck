define([
    "ember",
    "text!templates/storyItemTemplate.handlebars"
], function(Ember, storyItemTemplate) {

    var StoryItemView = Ember.View.extend({
        defaultTemplate: Ember.Handlebars.compile(storyItemTemplate)
    });
    return StoryItemView;
});