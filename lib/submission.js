if (!module.parent) { console.log("Please don't call me directly. I am just the main app's minion."); process.exit(1); }

// Third-party libraries
var _ = require('underscore')
    ,CONF = require('config');

// Note: if you need to access smth in parent:
// var something = module.parent.exports.something

var pub = module.exports;

pub.editForm = function(req, res) {

    var submission_id = req.param('submission_id', -1);
    var site_title = "New Submission";

    var context = {
        site_title: site_title
    }

    res.render('submission_form', context);
};
