if (!module.parent) { console.log("Please don't call me directly. I am just the main app's minion."); process.exit(1); }

// Third-party libraries
var _       = require('underscore')
    , moment  = require('moment')
    , async   = require('async')
    , util    = require('util')
    , CONF    = require('config');

// Potluck libraries
var database    = require('./database')
    , mod_assets  = require('./asset')
    , theme       = require('./theme')
    , asset       = require('./asset');


exports = module.exports;

exports.index = function(req, res) {

    var site_title = "Curator";

    var context = {
        app_name: CONF.app.name
        ,site_title: site_title
        ,layout: "layout"
    }

    async.parallel({

    }, function(err, results){

        res.render('curator', context);
    });
}

