define(function (require) {
	var viewManager = require('views/viewManager');
	var signup = require('views/signup');
	var login = require('views/login');

	QUnit.module("views/viewManager");

	QUnit.test("ViewManager works properly!", function () {
	    viewManager.addViews([
                login,
                signup
            ]);
	    signup.show();
	    var currentView = viewManager.returnCurrentView;
	    QUnit.ok(currentView.$el.css('display') === 'block' && login.$el.css('display') === 'none');
	});
});
