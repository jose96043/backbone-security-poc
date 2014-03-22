(function() {
	'use strict';

	var root = this;

	root.define([
		'views/LoginView'
		],
		function( Loginview ) {

			describe('Loginview View', function () {

				it('should be an instance of Loginview View', function () {
					var LoginView = new Loginview();
					expect( LoginView ).to.be.an.instanceof( Loginview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );