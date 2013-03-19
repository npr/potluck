define([
    "ember",
    "text!templates/assetsTemplate.handlebars"
], function(Ember, assetsTemplate) {

    var AssetsView = Ember.View.extend({
        defaultTemplate: Ember.Handlebars.compile(assetsTemplate)
    });
    return AssetsView;
});