var Story = DS.Model.extend({
        name: DS.attr('string'),
        storyItemOrders: DS.hasMany('App.StoryItemOrder')
});

module.exports = Story;