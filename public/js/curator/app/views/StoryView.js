define([
    "ember",
    "text!templates/storyTemplate.handlebars"
], function(Ember, storyTemplate) {

    var StoryView = Ember.View.extend({
        defaultTemplate: Ember.Handlebars.compile(storyTemplate)
    });
    return StoryView;
});