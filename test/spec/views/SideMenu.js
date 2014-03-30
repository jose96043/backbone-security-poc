(function() {
	'use strict';

	var root = this;

	root.define([
		'views/SideMenu'
		],
		function( Sidemenu ) {

			describe('Sidemenu View', function () {

				it('should be an instance of Sidemenu View', function () {
					var SideMenu = new Sidemenu();
					expect( SideMenu ).to.be.an.instanceof( Sidemenu );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );