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
			 _.bindAll(this);
			this._initialize();
			console.log("initialize a Homeview View");
			this.childViews;
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
		},
		afterRender : function(){
			var self = this;
			if(Session.get('user')){
				require(['views/SideMenu'], function(SideMenu){
					console.log("SIDEMENU")
					self.childViews = new SideMenu();

					$(".sideMenu").append(self.childViews.render().el);
				});
			}
		}
	});
});
