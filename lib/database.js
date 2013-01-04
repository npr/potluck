if (!module.parent) { console.log("Please don't call me directly. I am just the main app's minion."); process.exit(1); }

// Third-party libraries
var _ = require('underscore')
    ,util = require('util')
    ,mysql = require('mysql')
    ,CONF = require('config');

var database = mysql.createConnection({
    host     : CONF.mysql.host
    ,user     : CONF.mysql.user
    ,password : CONF.mysql.pass
});

var pub = module.exports;

pub.getConnection = function() {
    return mysql.createConnection({
        host      : CONF.mysql.host
        ,user     : CONF.mysql.user
        ,password : CONF.mysql.pass
        ,database : CONF.mysql.database
    });
};

pub.closeConnection = function(connection, callback) {
    // other cleanup here in the future, potentially
    if (typeof callback === 'undefined' || callback === null) {
        connection.end();
    } else {
        connection.end(function() {
            callback(err, info);
        });
    }
};

pub.columnizeResultset = function (rows, colsPerRow) {

    var colStart = true;
    var colEnd = false;
    var idx = 1;

    rows = _.map(rows, function(row) {
        if (idx % colsPerRow == 0) {
            row.colEnd = true;
        } else {
            row.colEnd = false;
        }

        if (idx > 0 && (((idx-1) % colsPerRow) == 0)) {
            row.colStart = true;
        } else {
            row.colStart = false;
        }

        if (idx === 1) {
            row.colStart = true;
            row.colEnd = false;
        }

        idx++;

        return row;

    });

    return rows;
}