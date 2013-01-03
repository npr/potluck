/**
 * Themes domain object
 */

if (!module.parent) { console.log("Please don't call me directly. I am just the main app's minion."); process.exit(1); }

// Third-party libraries
var _ = require('underscore')
fmt = require('fmt')
    ,util = require('util')
    ,CONF = require('config');

// Potluck libraries
var database = require('./database');

var pub = module.exports;

/**
 * Get active themes
 *
 * @param callback - a callback function to call once we have the results; First argument of the callback is errors,
 *                   second argument are the results
 * @return list of theme objects with "id" and "title" fields
 */

pub.getActiveThemes = function(callback) {
    var conn = database.getConnection();

    var query = 'SELECT id, title FROM `themes` WHERE status = 1';
    conn.query(query, function(err, themes, fields) {
        database.closeConnection(conn);
        callback(err, themes);
    });
};