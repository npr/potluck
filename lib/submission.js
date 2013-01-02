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
    //var output = JSON.stringify(req);
    var output = "Received: <pre>" + JSON.stringify(req.body) + JSON.stringify(req.files) + "</pre>";
    //console.dir(req.headers);
    res.send(output);
}


pub.test = function(req, res) {

    var out = processImage('http://smilepanic.com/wp-content/uploads/animals28.jpg');
    res.send(out);

}

/* ------ Private Methods ---- */

processImage = function(url) {

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
