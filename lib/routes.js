if (!module.parent) { console.log("Please don't call me directly. I am just the main app's minion."); process.exit(1); }

var app = module.parent.exports.app;

// Local includes
var mod_submission = require('./submission')
    ,mod_browsers = require('./browsers');


/** ROUTES **/
app.get('/', mod_browsers.homepage);
app.get('/themes/:theme_id/submissions', mod_submission.browse);
app.get('/submissions/:submission_id', mod_submission.show);


app.get('/themes/:theme_id/submissions/new', mod_submission.editForm);
app.post('/submissions/save', mod_submission.saveForm);


//app.get('/submissions/:submission_id/edit', mod_submission.editform);
