define([
    "ember",
    "text!templates/applicationTemplate.handlebars"
], function(Ember, applicationTemplate) {

    var ApplicationView = Ember.View.extend({
        defaultTemplate: Ember.Handlebars.compile(applicationTemplate)
    });

    return ApplicationView;
});