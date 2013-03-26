define([
    "ember",
    "app/utils/DragNDrop"
], function(Ember, DragNDrop) {

    var IndexView = Ember.View.extend(DragNDrop.Droppable, {
       tagName: "div",
       classNames: ["droppableArea"],
       template: Ember.Handlebars.compile("&#160;")
    });

    return IndexView;
});