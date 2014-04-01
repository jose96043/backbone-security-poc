define([
	'backbone',
	'backbone.validation'
],
function( Backbone ) {
    'use strict';


	

	/* Return a model class definition */
	return Backbone.Model.extend({
		initialize: function() {
			console.log("initialize a Signupmodel model");
			

			_.extend(Backbone.Validation.callbacks, {
			    valid: function (view, attr, selector) {
			    	console.log("EXTEND")
			        var $el = view.$('[name=' + attr + ']'), 
			            $group = $el.closest('.form-group');
			        
			        $group.removeClass('has-error');
			        $group.find('.help-block').html('').addClass('hidden');
			    },
			    invalid: function (view, attr, error, selector) {
			    	console.log("EXTEND invalid", view, attr, error);
			    	console.log("selector",selector);
			        var $el = view.$('[name=' + attr + ']'), 
			            $group = $el.closest('.form-group');
			        
			        $group.addClass('has-error');
			        $group.find('.help-block').html(error).removeClass('hidden');
			    }
			});
		},

		validation: {
			firstName: {
	    		required: true
	     	},
	     	lastName: {
	    		required: true
	     	},
	     	email: {
	     		required: true,
	     		pattern: 'email'
	     	},
	     	password: {
            	minLength: 8,
            	msg: 'Password has to be at least 8 characters'
        	},
		},

		urlRoot : '/register'

    });
});
