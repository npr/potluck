if (!module.parent) { console.log("Please don't call me directly. I am just the main app's minion."); process.exit(1); }

// Third-party libraries
var _ = require('underscore')
    ,async=require('async')
    ,util = require('util')
    ,path = require('path')
    ,fs = require('fs')
    ,fmt = require('fmt')
    ,awssum = require('awssum')
    ,amazon = awssum.load('amazon/amazon')
    ,CONF = require('config');

// Potluck libraries
var themes = require('./themes');

// Note: if you need to access smth in parent:
// var something = module.parent.exports.something

var pub = module.exports;

var maxResources = CONF.app.max_resources_num
    ,queueName = CONF.aws.SQSQueueName
    ,queueRegion = CONF.aws.SQSregion
    ,accountId = CONF.aws.accountID
    ,accessKey = CONF.aws.accessKeyId
    ,secretKey = CONF.aws.secretKey;

pub.editForm = function(req, res) {

    var submission_id = req.param('submission_id', -1);
    var site_title = "New Submission";

    var context = {
        site_title: site_title
        ,submission_msg_char_limit: CONF.app.submission_msg_char_limit
        ,layout: "layout_forms"
    }

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

    database.connect();

    // CAUTION: This is Node.js so obviously all file uploads + savetoDB are completely parallel. Do not
    // expect any sequential behavior.
    saveToDB(req);

    _.each (req.files, function(file) {
        uploadToS3(file);
    });

    //console.dir(req.headers);

    res.send("Saved Successfully "  + output);
}

/* ------ Private Methods ---- */



var saveToDB = function(req) {


    var fileURL = '//' + CONF.aws.cdnDomain + '/' + params.ObjectName;
}

/**
 *
 * Create a fingerprinted name of a multipart-form uploaded file
 *
 * @param {String} file - file object as it comes through Express.js's req.files array
 *
 */
var fingerprintFile = function(file) {

    var basename_hash = file.path.replace(/^.*\/|\.[^.]*$/g, '');
    var file_ext = path.extname(file.name);
    var basename = path.basename(file.name, file_ext);

    // Fingerprinting prevents name clashes!
    var filename_fingerprinted = basename + '-' + basename_hash + file_ext;

    return filename_fingerprinted;
}

/** Upload a submitted file to S3 */
var uploadToS3 = function (file) {

    var filename = fingerprintFile(file);
    var filepath = file.path;

    var S3 = awssum.load('amazon/s3').S3;

    var s3 = new S3({
        'accessKeyId'     : process.env.accessKeyId
        ,'region'          : amazon.US_EAST_1
        ,accountId : CONF.aws.accountID
        ,accessKeyId : CONF.aws.accessKeyId
        ,secretAccessKey : CONF.aws.secretKey
    });

    var bodyStream = fs.createReadStream( filepath );

    var params = {
        BucketName    : CONF.aws.bucket
        ,ObjectName    : filename
        ,ContentLength : file.size
        ,ContentType   : file.type
        ,CacheControl  : CONF.aws.cacheTTL
        ,Acl           : "public-read"
        ,Body          : bodyStream
    };

    s3.PutObject(params, function s3PutCallback(err, data) {
        fmt.dump(err, 'Error');
        fmt.dump(data, 'Data');

        var fileURL = '//' + CONF.aws.cdnDomain + '/' + params.ObjectName;
        console.dir ("FILENAME: " + fileURL);

        if (err === null) {
            return fileURL;
        }
    });


}

/** @TODO Process Uploaded image to S3 through SQS **/
var processImage = function(url) {

    var Sqs = awssum.load('amazon/sqs').Sqs;
    var out = "HELLO ";

    var sqs = new Sqs({
        'accessKeyId'      : accessKey
        ,'secretAccessKey' : secretKey
        ,'region'          : amazon[queueRegion]
        ,'awsAccountId'    : accountId
    });

    var asset = {
        url                 : url
    };
    var msg = {
        type                : "image"
        ,content            : asset
    };
    var params = {
        QueueName   : queueName,
        MessageBody : JSON.stringify(msg)
    };

    sqs.SendMessage(params, function(err, data) {
        //fmt.dump(err, 'Error');
        //fmt.dump(data, 'Data');
        out = out + "\n" + JSON.stringify(err);
    });

    return out;

}
