define(["ember"], function(Ember){
    var Router = function(router){
        router.map( function(){
               this.route('story', {path: 'story/:story_id'});
        });


    };

    return Router;
});