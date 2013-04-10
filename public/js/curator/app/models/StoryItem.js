define('models/StoryItem',['ember-data', 'models/StoryItemOrder'], function(DS, StoryItemOrder){
    "use strict";

    return DS.Model.extend({
        name: DS.attr('string'),
        storyOrderItems: DS.hasMany(StoryItemOrder)

    });
});