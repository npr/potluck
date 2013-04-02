define(["ember"], function(Ember){
    var ArrayUtil = Ember.Namespace.extend();

    DragNDrop.cancel = function(e) {
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
            if(e.preventDefault) { e.preventDefault(); }
            this._super(event);
            return false;
        }
    });
    return DragNDrop;
});