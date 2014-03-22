(function() {
	'use strict';

	var root = this;

	root.define([
		'models/Session'
		],
		function( Session ) {

			describe('Session Model', function () {

				it('should be an instance of Session Model', function () {
					var Session = new Session();
					expect( Session ).to.be.an.instanceof( Session );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );