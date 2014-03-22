(function() {
	'use strict';

	var root = this;

	root.define([
		'views/NavbarView'
		],
		function( Navbarview ) {

			describe('Navbarview View', function () {

				it('should be an instance of Navbarview View', function () {
					var NavbarView = new Navbarview();
					expect( NavbarView ).to.be.an.instanceof( Navbarview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );