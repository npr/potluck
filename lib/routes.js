if (!module.parent) { console.log("Please don't call me directly. I am just the main app's minion."); process.exit(1); }

var app = module.parent.exports.app;

// Local includes
var mod_submission = require('./submission');


/** ROUTES **/
app.get('/submissions/new', mod_submission.editForm);
//app.get('/submissions/:submission_id/edit', mod_submission.editform);
