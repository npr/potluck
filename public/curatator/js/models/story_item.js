var StoryItem = DS.Model.extend({
    name: DS.attr('string'),
    storyOrderItems: DS.hasMany('App.StoryItemOrder'),
    type: 'image',
    description: null,
    isTextItem: function(){
        return this.get('type') == 'text';
    },
    isImageItem: function(){
        return this.get('type') == 'image';
    }

});

module.exports = StoryItem;