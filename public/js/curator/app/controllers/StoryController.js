define(["ember"], function(Ember){
    var StoryController = Ember.ObjectController.extend({
       loadItem: function(){
           alert('hi');
       }
    });

    return StoryController;
});