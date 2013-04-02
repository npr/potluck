define(['ember-data'], function(DS){
    var StoryItem = DS.Model.extend({
        name: DS.attr('string')

    });


    return StoryItem;
});