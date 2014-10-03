'use strict';

// Configuring the Articles module
angular.module('templates').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Templates', 'templates', 'dropdown', '/templates(/create)?');
		Menus.addSubMenuItem('topbar', 'templates', 'List Templates', 'templates');
		Menus.addSubMenuItem('topbar', 'templates', 'New Template', 'templates/create');
	}
]);