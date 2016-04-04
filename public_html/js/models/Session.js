define(['backbone'], function(Backbone) {
    var Model = Backbone.Model.extend({
    	defaults: {
    		id : "",
			login: "",
			password: "",
		},

		urlRoot : "api/session",
		
		getCustomUrl: function (method) {
	        switch (method) {
	            case 'update': //login
	                return this.urlRoot;
	                break;
	            case 'read':
	            	return this.urlRoot;
	            	break;
	        }
    	},
    	sync: function (method, model, options) {
    		if( method == "create" )
    			method = "update"
        	options || (options = {});
        	options.url = this.getCustomUrl(method.toLowerCase());
        	return Backbone.sync.apply(this, arguments);
    	},
		validation: {
    		login: function(value, attr, computedState) {
		      	if( /[^a-zA-Z0-9]/.test(value) ) {
		        	return 'Your login must consist of only letters and digits';
		        }
		        if( value.length === 0 ) {
		        	return 'Input your login';
		        }
		    },
		    password: {
		    	required: true,
      			minLength: 5,
      			msg: 'Your password must have more than 5 characters'
		    }
		}
    });
    return Model;
});



