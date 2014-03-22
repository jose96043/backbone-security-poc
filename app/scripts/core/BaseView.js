define([
	'underscore',
	'backbone',
	'handlebars'
], function(_, Backbone, Handlebars){

	var BaseView = Backbone.View.extend({
		initialize: function(options) { 
			console.log(Handlebars);
	        _.bindAll(this, 'beforeRender', 'render', 'afterRender'); 
	        var _this = this; 
	        this.render = _.wrap(this.render, function(render) { 
	            _this.beforeRender(); 
	            render(); 
	            _this.afterRender(); 
	            return _this; 
	        }); 
	    },

	    beforeRender: function() { 
       		console.log('beforeRender'); 
    	}, 

	    render: function() { 
	        return this; 
	    }, 

	    afterRender: function() { 
	        console.log('afterRender'); 
	    }, 

		close : function(){
			if(this.childViews){
				this.childViews.close();
			}
			this.remove();
		}

	});
	return BaseView;
});