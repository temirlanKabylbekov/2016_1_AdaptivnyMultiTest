define(['backbone'], function(Backbone) {
    var Model = Backbone.Model.extend({
        defaults: {
            id : "",
            login: "",
            password: "",
        },
       
        urlRoot : "api/session",
       
        sync: function (method, model, options) {
            if( method === "create" ) {
                method = "update";
            }
            options || (options = {});
            options.url = this.urlRoot;
            return Backbone.sync.apply(this, arguments);
        },
 
        validate: function(attrs, options) {
            errors = [];
            if( /[^a-zA-Z0-9]/.test(attrs.login) ) {
                errors.push('Your login must consist of only letters and digits');
            }
            if( !attrs.login ) {
                errors.push("Please, input your login");
            }
            if( !attrs.password ) {
                errors.push("Please, input your password");
            }
            if( attrs.password.length < 5 ) {
                errors.push('Your password must have more than 5 characters');
            }
            return errors.length > 0 ? errors : false;
        }
    });
    return Model;
});