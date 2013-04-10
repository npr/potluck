var App = require('./app');

App.Router.map(function() {
	this.route('story', {path: 'story/:story_id'});
});

