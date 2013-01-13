/**
 * Themes domain object
 */

if (!module.parent) { console.log("Please don't call me directly. I am just the main app's minion."); process.exit(1); }

// Third-party libraries
// Third-party libraries
var _ = require('underscore')
  , async=require('async')
  , util = require('util')
  , path = require('path')
  , fs = require('fs')
  , fmt = require('fmt')
  , awssum = require('awssum')
  , amazon = awssum.load('amazon/amazon')
  , log = require('tracer').console()
  , CONF = require('config');

// Potluck libraries
var database = require('./database');

var exports = module.exports;

exports.TYPE = {};
exports.TYPE.IMAGE = 1;
exports.TYPE.AUDIO = 2;
exports.TYPE.VIDEO = 3;

var queueName  = CONF.aws.SQSQueueName
  ,queueRegion = CONF.aws.SQSregion
  ,accountId   = CONF.aws.accountID
  ,accessKey   = CONF.aws.accessKeyId
  ,secretKey   = CONF.aws.secretKey;


/**
 * @TODO make this smarter
 *
 * @param mimeType
 */
exports.detectAssetType = function(mimeType) {
  if (mimeType === 'image/jpeg' || mimeType === 'image/png') {
    return exports.TYPE.IMAGE;
  }
}

/**
 * Look up image URL by a unique ID.
 *
 * @param encodedURL
 */
exports.lookup = function(encoded, callback) {

  var conn = database.getConnection();

  var query = conn.query('SELECT url FROM `assets` WHERE `id` = ? AND type_id = ?',
                          [encoded, exports.TYPE.IMAGE],
                          function(err, result) {

                            database.closeConnection(conn);

                            if (err) {  util.log(err); }

                            // Image URLs in the database are saved without protocol. Need to add protocol:
                            var url = 'http:' + result[0]['url'];

                            if (typeof callback !== 'undefined') {
                              callback(err, url);
                            }
                        });


  //callback(null, url);
}

exports.save = function(asset, callback) {

  var conn = database.getConnection();

  var query = conn.query('INSERT INTO `assets` SET ?', asset, function(err, result) {
    database.closeConnection(conn);

    if (err) {  util.log(err); }

    if (typeof callback !== 'undefined') {
      callback(err, result);
    }
  });
}

exports.saveAll = function(assets, callback) {

  for (i=0; i<assets.length; i++) {
    exports.save(assets[i]);
  }

  callback(null, 'done');

}

/**
 * Upload a HTTP POST-submitted file to S3
 *
 * @param {Object} file - file object as it comes through Express.js's req.files array
 *
 * */
exports.uploadToS3 = function (file) {

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
    if (err === null) {
      // @TODO error handling
    }
  });

}

/**
 * Get expected full URL of the uploaded file.
 *
 * @param {Object} file - file object as it comes through Express.js's req.files array
 */
exports.fileURL = function(file) {
  var filename = fingerprintFile(file);
  var fileURL = '//' + CONF.aws.cdnDomain + '/' + filename;

  return fileURL;
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
