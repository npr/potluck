var StoryItemOrder = DS.Model.extend({
        order: DS.attr('number'),
        story: DS.belongsTo('App.Story'),
        storyItem: DS.belongsTo('App.StoryItem')
});

module.exports = StoryItemOrder;