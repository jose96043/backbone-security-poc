define([
	'jquery',
	'core/BaseView',
	'Session',
	'handlebars',
	'text!templates/SignUpTmpl.hbs',
	'backbone.stickit'
],
function($, BaseView, Session, Handlebars, SignUpTmpl){
    'use strict';

	return BaseView.extend({
		id:"signup",
		template: Handlebars.compile(SignUpTmpl),
		initialize: function() {
			console.log("initialize a Signupview View");
			Backbone.Validation.configure({
	   			forceUpdate: true
			});
			Backbone.Validation.bind(this);
		},

		bindings: {
			'[name=firstName]' : {
				observe: 'firstName',
            	setOptions: {
                	validate: true
            	}
            },
            '[name=lastName]' : {
				observe: 'lastName',
            	setOptions: {
                	validate: true
            	}
            },
            '[name=email]' : {
				observe: 'email',
            	setOptions: {
                	validate: true
            	}
            },
            '[name=password]' : {
				observe: 'password',
            	setOptions: {
                	validate: true
            	}
            }
		},

		events: {
			'click #registerSubmit' : 'registerSubmit'
		},

		registerSubmit: function(e){
			e.preventDefault();
			this.signup();
			console.log("registerSubmit");
		},

		signup: function(){
			console.log("signup func")
			if(this.model.isValid(true)) {       
	            this.model.save();
	            alert('Great Success!');
        	}
		},

		render: function(){
			var data = {};
			this.$el.html(this.template(data));
			this.stickit();
			return this;
		}
	});
});
