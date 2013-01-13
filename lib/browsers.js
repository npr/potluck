if (!module.parent) { console.log("Please don't call me directly. I am just the main app's minion."); process.exit(1); }

// Third-party libraries
var _ = require('underscore')
    ,moment = require('moment')
    ,async=require('async')
    ,util = require('util')
    ,CONF = require('config');

// Potluck libraries
var database = require('./database')
    ,theme = require('./theme')
    ,asset = require('./asset');

var pub = module.exports;


pub.homepage = function(req, res) {

    var context = {
        app_name: CONF.app.name
        ,site_title: CONF.app.name
        ,layout: "layout_index"
    }

    async.parallel({
        themes: theme.getActiveThemes
        ,themes_with_assets: theme.getThemesWithAssets
    }, function(err, results){

        if (err) util.log(err);

        context.themes = results.themes;
        context.themes_with_assets = results.themes_with_assets;


        //-- Mark active vs. non-active themes
        var unixtime = moment().unix();
        context.themes_with_assets = _.map(results.themes_with_assets, function(theme) {
            if (typeof theme.timestamp_to !== 'undefined' && theme.timestamp_to) {

                if (parseInt(theme.timestamp_to) > unixtime) { // active project
                    theme.active = true;
                    return theme;
                }
                theme.active = false;
                return theme;
            }
        });

        context.themes_with_assets = database.columnizeResultset(context.themes_with_assets, 3);

        // Make the first one "active", for Carousel.
        context.themes[0].active = true;

        res.render('homepage', context);
    });
};