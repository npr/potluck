var DragNDrop = require('../mixins/drag_n_drop'),
    StoryItem = require('../models/story_item')

var AddTextView = Ember.View.extend(DragNDrop.Draggable, {
    templateName: 'asset',
    template: Ember.Handlebars.compile("<button>Add Text</button>"),
    newText: false,
    content:  (function(){
        return StoryItem.createRecord({
            type: 'text',
            description: "Enter some text here"
        })
    }).property(),

    dragStart: function(event) {
        this._super(event);
        this.set('newText', true);

    },

    dragEnd: function(event) {
        // Let the controller know this view is done dragging
        this.set('newText', false);
    }
});
module.exports = AddTextView;