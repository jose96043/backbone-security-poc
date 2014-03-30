define([
	'jquery',
    'core/BaseView',
    'Session',
    'handlebars',
    'text!templates/SideMenuTmpl.hbs'
],
function($,BaseView,Session,Handlebars, SideMenuTmpl){
    'use strict';

	return BaseView.extend({
		id:'accordian',
    	tagName:'div',
    	className:'col-md-2',
        template: Handlebars.compile(SideMenuTmpl),
		initialize: function() {
			console.log("initialize a Sidemenu View");
		},
		events: {
        	"click h3": "menuClickEvent"
        },

        menuClickEvent: function(ev){
        	var $elem = $(ev.currentTarget);
        	$(this.el).find("ul ul").slideUp();
        	if(!$elem.next().is(":visible")){
                $elem.next().slideDown();
            }
        },
		render : function(){
			var data = {};
			this.$el.html(this.template(data));
			return this;
		}
	});
});
