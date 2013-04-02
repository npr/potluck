define([
    "ember",
    "app/utils/DragNDrop"
], function(Ember, DragNDrop) {

    var DropableView = Ember.View.extend(DragNDrop.Droppable, {
       tagName: "div",
       classNames: ["droppableArea"],
       classNameBindings: ['storyAction'],
       template: Ember.Handlebars.compile("&#160;"),
       didInsertElement: function(){
           this.set('index', $(".droppableArea").length);
       },
       storyAction: function() {
            if(Ember.isEmpty(this.get('dragContext'))) {
                return null;
            }else{
                return 'story-droppable-region';
            }

        }.property('dragContext'),
        drop: function(event){
            var viewId = event.originalEvent.dataTransfer.getData('Text'),
                view = Ember.View.views[viewId];
            this.get('controller').send('reorderStoryItem', this.get('index'));
        },
        click: function(){
            alert('click');
        }
    });

    return DropableView;
});