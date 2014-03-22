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
		initialize: function() {
			console.log("initialize a Navbarview View");
		},
		render : function(){
			this.$el.html(this.template());
			return this;
		},
	});
});
