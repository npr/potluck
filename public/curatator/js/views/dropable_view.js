var DragNDrop = require('../mixins/drag_n_drop')

var DropableView = Ember.View.extend(DragNDrop.Droppable, {
       tagName: "div",
       classNames: ["droppableArea"],
       classNameBindings: ['storyAction'],
       template: Ember.Handlebars.compile("&#160;"),
	   index: function(){
			var droppableAreas = $(".droppableArea");
			var _this = this;
			var index;
		 	$.each(droppableAreas,function(i, element){
				if(Ember.isEqual(Ember.View.views[element.id], _this)){
					index = i;
				}
			});	
			return index;
			
		}.property(),
       storyAction: function() {
            if(Ember.isEmpty(this.get('dragContext'))) {
                return null;
            }else{
                return 'story-droppable-region';
            }

        }.property('dragContext'),
        drop: function(event){
			this._super(event);
            var viewId = event.originalEvent.dataTransfer.getData('Text'),
                view = Ember.View.views[viewId],
				controller = this.get('controller');

				
            controller.send('reorderStoryItem', this.get('index'), view.get('content'));
			controller.send('unsetDragItem');


		
        },
        click: function(){
           
        }
    });

module.exports = DropableView;