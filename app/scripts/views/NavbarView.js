define([
	'jquery',
	'core/BaseView',
	'Session',
	'handlebars',
	'text!templates/NavbarTmpl.hbs'
],
function($, BaseView, Session, Handlebars, NavbarTmpl){
    'use strict';

	return BaseView.extend({
		template: Handlebars.compile(NavbarTmpl),
		initialize: function(model) {
			this.model = model;
			console.log("initialize a Navbarview View");
		},

		events : {
			'click .logout' : 'logOut'
		},

		logOut : function(){
			var view = this;
			Session.logout(function(){
				if (Backbone.history.fragment === '') {
  					Backbone.history.loadUrl(Backbone.history.fragment);
 				} else {
				     Backbone.history.navigate('', {'trigger': true});
				}
			});
		},

		render : function(){
			var data = this.model;
			this.$el.html(this.template(data));
			return this;
		},
	});
});
