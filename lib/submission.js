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

// Note: if you need to access smth in parent:
// var something = module.parent.exports.something

var pub = module.exports;

var maxResources = CONF.app.max_resources_num;

pub.browse = function(req, res) {
    //var submission_id = req.param('submission_id', -1);
    var theme_id = req.param('theme_id', -1);

    var site_title = "Browse Submissions";

    var context = {
        app_name: CONF.app.name
        ,site_title: site_title
        ,layout: "layout_forms"
    }

    async.parallel({
        theme: function(callback) {
            theme.load(theme_id, callback);
        },
        submissions: function(callback) {
            pub.getAllByTheme(theme_id, callback);
        }
    }, function(err, results){
        context.theme = results.theme;
        context.submissions = database.columnizeResultset(results.submissions, 3);
        console.log("SUBMISSSSIOOOOOONS");
        console.log(context.submissions);
        res.render('submission_browse', context);
    });

}

pub.editForm = function(req, res) {

    //var submission_id = req.param('submission_id', -1);
    var theme_id = req.param('theme_id', -1);

    var site_title = "New Submission";

    var context = {
        app_name: CONF.app.name
        ,site_title: site_title
        ,submission_msg_char_limit: CONF.app.submission_msg_char_limit
        ,layout: "layout_forms"
    }

    // Is this a forward from a previous save?
    var sess = req.session;
    context.forwardedUpload = false;
    if (sess && typeof sess.saveStatus !== 'undefined' && sess.saveStatus) {
        context.forwardedUpload = true;
    }
    sess.saveStatus = null;

    // Supporting multiple resources potentially
    context.resources = [];
    for (i = 0; i<maxResources; i++) {
        context.resources[i] = {};
        context.resources[i].num = i; // JS arrays start from 0;
    }

    async.parallel({
        themes: theme.getActiveThemes,
        currTheme: function(callback) {
            callback(null, "");
        }
    }, function(err, results){
        var themes = _.map(results.themes, function(theme) {
            if (theme.id == theme_id) {
                theme.active = true;
            }
            return theme;
        });
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
        assets[i].date = moment(req.body.date[i], 'MM/DD/YYYY').format('YYYY-MM-DD HH:mm:ss');
        assets[i].copyright = req.body.copyright[i];
        assets[i].type_id = asset.detectAssetType(req.files.assets[i].type);
        assets[i].url = asset.fileURL(req.files.assets[i]);
    }

    //-- CAUTION: At this point the array of assets is not ready for DB saving, because we do not yet know submission_id!

    //res.send("opa: " + JSON.stringify(req.body)); // for debugging only
    //return;

    // CAUTION: These uploads are async.
    _.each (req.files.assets, function(file) {
        asset.uploadToS3(file);
    });

    var context = JSON.stringify(req.body);

    async.waterfall([
        function (callback) {
            pub.save(submission, callback);
        },
        function(submission_id, callback) {
            assets = _.map(assets, function(asset) {
                asset.submission_id = submission_id;
                return asset;
            });
            asset.saveAll(assets, callback);
        }
    ], function (err, result) {
        if (!err) {
            var sess = req.session;
            sess.saveStatus =  "success";
            res.redirect('/themes/' + req.body.theme + '/submissions/new');
            //res.send ("SAVED Successfully: " + context); //for debugging only
        }
        else {
            res.send("ERROR OCCURRED while trying to save the submission! "); //ctx
        }
    });

}

pub.getAllByTheme = function (theme_id, callback) {
    var conn = database.getConnection();

    var query  = 'SELECT s.id, s.contact_name, s.contact_email, ';
        query += 'a. url, a.caption, a.copyright, a.location  FROM `assets` a ';
        query += 'JOIN `submissions` s ON a.submission_id = s.id '
        query += 'WHERE s.theme_id = ?';

    conn.query(query, [theme_id], function(err, assets) {

        if (err) {  util.log(err); }

        database.closeConnection(conn);
        callback(err, assets);
    });
}

pub.save = function(submission, callback) {

    var conn = database.getConnection();

    var query = conn.query('INSERT INTO `submissions` SET ?', submission, function(err, result) {

        if (err) {  util.log(err); }

        database.closeConnection(conn);
        var submission_id = result.insertId;
        callback(err, submission_id);
    });
}

