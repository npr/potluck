define(['ember-data'], function(DS){
   var Story = DS.Model.extend({
        name: DS.attr('string'),
        items: DS.hasMany("Curator.StoryItem", {
            embedded: true
        })
   });



   return Story;
});