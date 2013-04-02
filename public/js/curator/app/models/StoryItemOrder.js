define(['ember-data', "app/models/Story", "app/models/StoryItem"], function(DS, Story, StoryItem){
    var StoryItemOrder = DS.Model.extend({
        order: DS.attr('number'),
        story: DS.belongsTo('Curator.Story'),
        storyItem: DS.belongsTo('Curator.StoryItem')
    });


    return StoryItemOrder;
});