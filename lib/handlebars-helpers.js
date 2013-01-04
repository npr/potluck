/**
 * Adapted from: https://github.com/kevinw/gitviz/blob/master/handlebars-helpers.js
 * Also @see: https://github.com/donpark/hbs/tree/master/examples/partial
 */

var fs = require('fs')
    ,path = require('path')
    ,hbs = require('hbs');

var partialsDir = "";

module.exports = function(hbs, partialsDirectory) {

    partialsDir = partialsDirectory;

    // Register any partials
    if (fs.existsSync(partialsDir)) {
        fs.readdirSync(partialsDir).forEach(function(filename) {
            var partial = filename.slice(0, -4);
            var file_ext = path.extname(filename);
            var basename = path.basename(filename, file_ext);
            var partial = basename;

            hbs.registerPartial(partial, fs.readFileSync(partialsDir + '/' + filename, 'utf8'));
        });;
    }


    var blocks = {};

    hbs.registerHelper('extend', function(name, context) {
        var block = blocks[name];
        if (!block) {
            block = blocks[name] = [];
        }

        block.push(context.fn(this));
    });

    hbs.registerHelper('block', function(name) {
        var val = (blocks[name] || []).join('\n');

        // clear the block
        blocks[name] = [];
        return val;
    });
};

