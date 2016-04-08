define(
    function (require) {
        var Backbone = require('backbone');
        var Model = Backbone.Model.extend({
	    defaults: {
	    themes: []
	},
	urlRoot : "api/game/new",
	getCustomUrl: function (method) {
	    switch (method) {
	        case 'read': 
		    return this.urlRoot;
		    break; 
	    }
	},
	sync: function (method, model, options) {
	    options || (options = {});
	    options.url = this.getCustomUrl(method.toLowerCase());
	    return Backbone.sync.apply(this, arguments);
	}
    });
    return Model;  
});


