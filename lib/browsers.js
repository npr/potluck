if (!module.parent) { console.log("Please don't call me directly. I am just the main app's minion."); process.exit(1); }

// Third-party libraries
var _ = require('underscore')
    ,util = require('util')
    ,awssum = require('awssum')
    ,amazon = awssum.load('amazon/amazon')
    ,CONF = require('config');

// Note: if you need to access smth in parent:
// var something = module.parent.exports.something

var pub = module.exports;


pub.index = function(req, res) {

    var site_title = "NPR Potluck: Crowd-sourced content";

    var context = {
        site_title: site_title
        //,layout: "layout_forms"
    }

    res.render('browser_index', context);
};
