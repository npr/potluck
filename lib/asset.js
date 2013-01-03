/**
 * Themes domain object
 */

if (!module.parent) { console.log("Please don't call me directly. I am just the main app's minion."); process.exit(1); }

// Third-party libraries
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
var database = require('./database');

var pub = module.exports;

var maxResources = CONF.app.max_resources_num
    ,queueName = CONF.aws.SQSQueueName
    ,queueRegion = CONF.aws.SQSregion
    ,accountId = CONF.aws.accountID
    ,accessKey = CONF.aws.accessKeyId
    ,secretKey = CONF.aws.secretKey;


pub.save = function(asset, callback) {

    console.dir(asset);

    var conn = database.getConnection();

    var query = conn.query('INSERT INTO `assets` SET ?', asset, function(err, result) {
        database.closeConnection(conn);
        callback(err, result);
    });
}

/**
 * Upload a HTTP POST-submitted file to S3
 *
 * @param {Object} file - file object as it comes through Express.js's req.files array
 *
 * */
pub.uploadToS3 = function (file) {

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

/**
 *
 * Create a fingerprinted name of a multipart-form uploaded file
 *
 * @param {Object} file - file object as it comes through Express.js's req.files array
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
