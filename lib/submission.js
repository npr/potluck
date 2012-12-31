if (!module.parent) { console.log("Please don't call me directly. I am just the main app's minion."); process.exit(1); }

// Third-party libraries
var _ = require('underscore')
    ,CONF = require('config');

// Note: if you need to access smth in parent:
// var something = module.parent.exports.something

var pub = module.exports;

var maxResources = CONF.app.max_resources_num;

pub.editForm = function(req, res) {

    var submission_id = req.param('submission_id', -1);
    var site_title = "New Submission";

    var context = {
        site_title: site_title
        ,submission_msg_char_limit: CONF.app.submission_msg_char_limit
        ,layout: "layout_forms"
    }

    /** @TODO: Load this list from the database **/
    context.callouts = [{code: 'CALL1', title: 'Call Out One'}
                       ,{code: 'CALL2', title: 'Call Out Two'}];

    context.resources = [];
    for (i = 0; i<maxResources; i++) {
        context.resources[i] = {};
        context.resources[i].num = i+1; // JS arrays start from 0;
    }

    res.render('submission_form', context);
};
