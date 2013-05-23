if (!module.parent) { console.log("Please don't call me directly. I am just the main app's minion."); process.exit(1); }

// Third-party libraries
var _       = require('underscore')
    , moment  = require('moment')
    , async   = require('async')
    , util    = require('util')
    , CONF    = require('config');

// Potluck libraries
var database    = require('./database')
    , mod_asset  = require('./asset')
    , mod_theme       = require('./theme');


exports = module.exports;

exports.index = function(req, res) {

    var site_title = "Curator";

    var context = {
      app_name   : CONF.app.name
    , site_title : site_title
    , layout     : "layout"
    }

    res.render('curator', context);
}

exports.getThemes = function( req, res ) {
	mod_theme.getAllThemes(function(err, obj) {
  	if (!err) {
   	  res.setHeader('Content-Type', 'application/javascript');
    	res.send(200, JSON.stringify({"themes": obj}));
  	}
	})
}

exports.getAssets = function( req, res ) {
	mod_asset.getAllAssets(function(err, obj) {
  	if (!err) {
   	  res.setHeader('Content-Type', 'application/javascript');
    	res.send(200, JSON.stringify({"assets": obj}));
  	}
	})
}

