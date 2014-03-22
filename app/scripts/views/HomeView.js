define([
	'core/BaseView',
	'Session',
	'handlebars',
	'text!templates/HomeTmpl.hbs'
],
function(BaseView, Session, Handlebars, HomeTmpl){
    'use strict';

	return BaseView.extend({
		template: Handlebars.compile(HomeTmpl),
		initialize: function() {
			console.log("initialize a Homeview View");
		},
		events : {
			'click .logout' : 'logOut'
		},
		logOut : function(){
			var view = this;
			Session.logout(function(){
				view.render();
			});
		},
		render : function(){
			var user = Session.get('user');
			this.$el.html(this.template({
				user : user
			}));
			return this;
		}
	});
});
