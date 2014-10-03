'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var emails = require('../../app/controllers/emails');

	// Emails Routes
	app.route('/emails')
		.get(emails.list)
		.post(users.requiresLogin, emails.create);

	app.route('/emails/:emailId')
		.get(emails.read)
		.put(users.requiresLogin, emails.hasAuthorization, emails.update)
		.delete(users.requiresLogin, emails.hasAuthorization, emails.delete);

	// Finish by binding the Email middleware
	app.param('emailId', emails.emailByID);
};