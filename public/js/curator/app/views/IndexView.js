define([
    "ember",
    "text!templates/indexTemplate.handlebars"
], function(Ember, indexTemplate) {

    var IndexView = Ember.View.extend({
        defaultTemplate: Ember.Handlebars.compile(indexTemplate)
    });

    return IndexView;
});