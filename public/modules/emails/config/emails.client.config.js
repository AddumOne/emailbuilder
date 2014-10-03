'use strict';

// Configuring the Articles module
angular.module('emails').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Emails', 'emails', 'dropdown', '/emails(/create)?');
		Menus.addSubMenuItem('topbar', 'emails', 'List Emails', 'emails');
		Menus.addSubMenuItem('topbar', 'emails', 'New Email', 'emails/create');
	}
]);