if (!module.parent) { console.log("Please don't call me directly. I am just the main app's minion."); process.exit(1); }

// Third-party libraries
var _ = require('underscore')
    ,async=require('async')
    ,util = require('util')
    ,CONF = require('config');

// Potluck libraries
var themes = require('./models/themes'),
    assets = require('./models/assets');

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

    // Supporting multiple resources potentially
    context.resources = [];
    for (i = 0; i<maxResources; i++) {
        context.resources[i] = {};
        context.resources[i].num = i+1; // JS arrays start from 0;
    }

    async.parallel({
        themes: themes.getActiveThemes
    }, function(err, results){
        context.themes = results.themes;
        editFormRender(res, context);
    });

};

var editFormRender = function(res, ctx) {
    res.render('submission_form', ctx);
}

pub.saveForm = function(req, res) {

    //var output = "Received: <pre>" + JSON.stringify(req.body) + JSON.stringify(req.files) + "</pre>";
    var output = JSON.stringify(req.files);

    // CAUTION: This is Node.js so obviously all file uploads + savetoDB are completely parallel. Do not
    // expect any sequential behavior.
    _.each (req.files, function(file) {
        assets.uploadToS3(file);
    });

    //console.dir(req.headers);
    /**
    async.parallel({
        uploadAssets: function(callback) {

        }
    }, function(err, results){
        context.themes = results.themes;
        editFormRender(res, context);
    });
     **/


}

var saveFormRender = function(res, ctx) {
    //res.render('submission_form', ctx);
    res.send("Saved Successfully "  + output);
}


/* ------ Private Methods ---- */

var save = function(req) {

    var submission = {
        "contact_name": req.name
        ,"contact_email": req.email
        ,"theme_id": theme
    }
    var fileURL = '//' + CONF.aws.cdnDomain + '/' + params.ObjectName;
}

