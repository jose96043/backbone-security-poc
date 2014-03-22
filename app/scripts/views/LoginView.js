define([
	'jquery',
	'core/BaseView',
	'Session',
	'handlebars',
	'text!templates/LoginTmpl.hbs'
],
function($, BaseView, Session, Handlebars, LoginTmpl){
    'use strict';

	return BaseView.extend({
		template : Handlebars.compile(LoginTmpl),
		initialize: function() {
			console.log("initialize a Loginview View");
		},

		events : {
			'click button' : 'submit'
		},

		render : function(){
			this.$el.html(this.template());
			return this;
		},

		submit : function(e){
			e.preventDefault();
			var email = $('#email').val();
			var password = $('#password').val();
			Session.login({
				email : email,
				password : password
			});
		}
	});
});
