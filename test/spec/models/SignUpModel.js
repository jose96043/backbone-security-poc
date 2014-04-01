(function() {
	'use strict';

	var root = this;

	root.define([
		'models/SignUpModel'
		],
		function( Signupmodel ) {

			describe('Signupmodel Model', function () {

				it('should be an instance of Signupmodel Model', function () {
					var SignUpModel = new Signupmodel();
					expect( SignUpModel ).to.be.an.instanceof( Signupmodel );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );