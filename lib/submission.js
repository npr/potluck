if (!module.parent) { console.log("Please don't call me directly. I am just the main app's minion."); process.exit(1); }

// Third-party libraries
var _ = require('underscore')
    ,async=require('async')
    ,util = require('util')
    ,CONF = require('config');

// Potluck libraries
var database = require('./database')
    ,theme = require('./theme')
    ,asset = require('./asset');

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
        context.resources[i].num = i; // JS arrays start from 0;
    }

    async.parallel({
        themes: theme.getActiveThemes
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

    // Validation part

    var submission = {
        "contact_name": req.body.name
        ,"contact_email": req.body.email
        ,"theme_id": req.body.theme
    }

    var assets = [];
    for (i=0; i< req.body.caption.length; i++) { // only processing one asset for now.
        assets[i] = {};
        assets[i].caption = req.body.caption[i];
        assets[i].location = req.body.location[i];
        assets[i].date = req.body.date[i];
        assets[i].copyright = req.body.copyright[i];
        //assets[i].fileUrl = '//' + CONF.aws.cdnDomain + '/' + req.files[i].filename;
    }

    console.dir(req.files);

    console.dir(assets);

    res.send("opa: " + JSON.stringify(req.body));
    return;

    // CAUTION: This is Node.js so obviously all file uploads + savetoDB are completely parallel. Do not
    // expect any sequential behavior.
    _.each (req.files, function(file) {
        asset.uploadToS3(file);
    });

    var context = "";

    async.parallel({
        saveSubmission: function(callback) {
            save(submission, callback);
        }
    }, function(err, results){
        saveFormRender(res, context);
    });



}

var saveFormRender = function(res, ctx) {
    //res.render('submission_form', ctx);
    res.send("Saved Successfully "  + ctx);
}


/* ------ Private Methods ---- */

pub.save = function(submission, callback) {

    //var fileURL = '//' + CONF.aws.cdnDomain + '/' + params.ObjectName;

    console.dir(submission);

    var conn = database.getConnection();

    var post  = {id: 1, title: 'Hello MySQL'};
    var query = conn.query('INSERT INTO `submissions` SET ?', submission, function(err, result) {
        database.closeConnection(conn);
        callback(err, result);
    });
}

