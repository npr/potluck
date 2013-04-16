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
    },
    doubleClick: function(event){
        var controller = this.get('controller');
        controller.set('previewItem', this.get('content'))
    }
});
module.exports = AssetView;