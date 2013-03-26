define([
    "ember",
    "app/utils/DragNDrop"
], function(Ember, DragNDrop) {

    var IndexView = Ember.View.extend(DragNDrop.Droppable, {
       tagName: "div",
       classNames: ["droppableArea"],
       classNameBindings: ['storyAction'],
       template: Ember.Handlebars.compile("&#160;"),
       storyAction: function() {
            if(Ember.isEmpty(this.get('dragContext'))) {
                return null;
            }else{
                return 'story-droppable-region';
            }

        }.property('dragContext'),
        drop: function(event){

        }
    });

    return IndexView;
});