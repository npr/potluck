/**
 * Themes domain object
 */

if (!module.parent) { console.log("Please don't call me directly. I am just the main app's minion."); process.exit(1); }

// Third-party libraries
var _ = require('underscore')
    fmt = require('fmt')
    ,moment = require('moment')
    ,util = require('util')
    ,CONF = require('config');

// Potluck libraries
var database = require('./database');

var pub = module.exports;


pub.load = function(theme_id, callback) {
    var conn = database.getConnection();

    var query  = 'SELECT *  FROM `themes` WHERE id = ?';

    conn.query(query, [theme_id], function(err, themes) {

        if (err) {  util.log(err); }
        database.closeConnection(conn);
        callback(err, themes[0]);
    });
}


/**
 * Get active themes
 *
 * @param callback - a callback function to call once we have the results; First argument of the callback is errors,
 *                   second argument are the results
 * @return list of theme objects with "id" and "title" fields
 */

pub.getThemes = function(callback, filterParam) {
    var conn = database.getConnection();

    var filter;
    if (typeof filterParam === 'undefined' ||
          (filterParam != 'all' && filterParam != 'active' && filterParam != 'archived')) {
        filter = 'active';
    } else {
        filter = filterParam;
    }

    //-- @TODO: timezones?
    var currTime = moment().format('YYYY-MM-DD HH:mm:ss');

    var query  = 'SELECT *, UNIX_TIMESTAMP(date_to) as timestamp_to FROM `themes` ';
    if ( filter == 'active' ) {
        query += 'WHERE date_to > \'' + currTime + '\' ';
    }
    if ( filter == 'archived' ) {
        query += 'WHERE date_to < \'' + currTime + '\' ';
    }
        query += 'ORDER BY date_to DESC';

    conn.query(query, function(err, themes, fields) {

        if (err) {  util.log(err); }

        database.closeConnection(conn);
        callback(err, themes);
    });
};

pub.getActiveThemes = function(callback) {
    pub.getThemes(callback, 'active');
}

pub.getAllThemes = function(callback) {
    pub.getThemes(callback, 'all');
}

/**
 * Get list of themes with a sample asset for each theme
 *
 * @param callback
 * @param filterParam
 */
pub.getThemesWithAssets = function(callback, filterParam) {
    var conn = database.getConnection();

    var filter;
    if (typeof filterParam === 'undefined' ||
        (filterParam != 'all' && filterParam != 'active' && filterParam != 'archived')) {
        filter = 'all';
    } else {
        filter = filterParam;
    }

    //-- @TODO: timezones?
    var currTime = moment().format('YYYY-MM-DD HH:mm:ss');

    var query  = 'SELECT *, t.id as theme_id, UNIX_TIMESTAMP(date_to) as timestamp_to FROM `themes` t';
        query += ' JOIN `submissions` s ON s.theme_id = t.id';
        query += ' JOIN `assets` a ON a.submission_id = s.id';

    if ( filter == 'active' ) {
        query += ' WHERE date_to > \'' + currTime + '\' ';
    }
    if ( filter == 'archived' ) {
        query += ' WHERE date_to < \'' + currTime + '\' ';
    }
    query += ' GROUP BY s.theme_id';
    query += ' ORDER BY date_to DESC';

    conn.query(query, function(err, themes, fields) {

        if (err) {  util.log(err); }

        database.closeConnection(conn);
        callback(err, themes);
    });
};



