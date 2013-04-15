var StoryItem = DS.Model.extend({
    name: DS.attr('string'),
    storyOrderItems: DS.hasMany('App.StoryItemOrder'),
    type: 'image',
    description: null

});

module.exports = StoryItem;