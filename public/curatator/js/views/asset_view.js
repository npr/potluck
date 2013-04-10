var DragNDrop = require('../mixins/drag_n_drop')

var AssetView = Ember.View.extend(DragNDrop.Draggable, {
    templateName: 'asset',
    dragStart: function(event) {
        this._super(event);
        this.set('content.isDragging', true);

    },

    dragEnd: function(event) {
        // Let the controller know this view is done dragging
        this.set('content.isDragging', false);
    }
});
module.exports = AssetView;