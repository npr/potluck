if (!module.parent) { console.log("Please don't call me directly. I am just the main app's minion."); process.exit(1); }

// Third-party libraries
var _ = require('underscore')
    ,util = require('util')
    ,path = require('path')
    ,fs = require('fs')
    ,fmt = require('fmt')
    ,awssum = require('awssum')
    ,amazon = awssum.load('amazon/amazon')
    ,CONF = require('config');

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

pub.saveForm = function(req, res) {

    //var output = "Received: <pre>" + JSON.stringify(req.body) + JSON.stringify(req.files) + "</pre>";
    var output = JSON.stringify(req.files);
    _.each (req.files, function(file) {

        var basename_hash = file.path.replace(/^.*\/|\.[^.]*$/g, '');
        var file_ext = path.extname(file.name);
        var basename = path.basename(file.name, file_ext);

        // Fingerprinting prevents name clashes!
        var filename_fingerprinted = basename + '-' + basename_hash + file_ext;

        uploadToS3(filename_fingerprinted, file.path);
        fmt.dump(file.path);
        fmt.dump(filename_fingerprinted);
    });
    //console.dir(req.headers);


    res.send("Saved Successfully "  + output);
}


pub.test = function(req, res) {

    var out = processImage('http://smilepanic.com/wp-content/uploads/animals28.jpg');
    res.send(out);

}

/* ------ Private Methods ---- */

/** Upload a submitted file to S3 */
var uploadToS3 = function (filename, filepath) {


    var S3 = awssum.load('amazon/s3').S3;

    var s3 = new S3({
        'accessKeyId'     : process.env.accessKeyId
        ,'region'          : amazon.US_EAST_1
        ,accountId : CONF.aws.accountID
        ,accessKeyId : CONF.aws.accessKeyId
        ,secretAccessKey : CONF.aws.secretKey
    });



    // you must run fs.stat to get the file size for the content-length header (s3 requires this)
    fs.stat (filepath, function(err, file_info) {
        if (err) {
            util.log('Error reading uploaded file: ' + filename + ' at: ' + filepath);
            return;
        }

        fmt.dump(file_info);

        var bodyStream = fs.createReadStream( filepath );

        var params = {
            BucketName    : CONF.aws.bucket,
            ObjectName    : filename,
            ContentLength : file_info.size,
            Body          : bodyStream
        };

        s3.PutObject(params, function(err, data) {
            fmt.dump(err, 'Error');
            fmt.dump(data, 'Data');
        });
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
