define(["ember"], function(Ember){
    var DragNDrop = Ember.Namespace.extend();

    DragNDrop.cancel = function(event) {
        event.preventDefault();
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
            event.preventDefault();
            return false;
        }
    });
    return DragNDrop;
});