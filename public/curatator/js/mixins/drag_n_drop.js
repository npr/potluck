var DragNDrop = Ember.Namespace.extend();

DragNDrop.cancel = function(e) {
	e.originalEvent.preventDefault();
	e.originalEvent.stopPropagation();
    if(e.preventDefault) { e.preventDefault(); }
    if(e.stopPropagation) { e.stopPropagation(); }
    return false;
};

DragNDrop.Draggable = Ember.Mixin.create({
    attributeBindings: 'draggable',
    draggable: 'true',
    dragStart: function(event) {
        var dataTransfer = event.originalEvent.dataTransfer;
        dataTransfer.setData('Text', this.get('elementId'));
    }
});

DragNDrop.Droppable = Ember.Mixin.create({
    dragEnter: DragNDrop.cancel,
    dragOver: DragNDrop.cancel,
    drop: function(event) {
		DragNDrop.cancel(event);
        return false;
    }
});

module.exports = DragNDrop;
