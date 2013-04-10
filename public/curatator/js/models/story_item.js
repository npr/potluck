var StoryItem = DS.Model.extend({
    name: DS.attr('string'),
    storyOrderItems: DS.hasMany('App.StoryItemOrder')

});

module.exports = StoryItem;