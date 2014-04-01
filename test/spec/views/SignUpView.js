(function() {
	'use strict';

	var root = this;

	root.define([
		'views/SignUpView'
		],
		function( Signupview ) {

			describe('Signupview View', function () {

				it('should be an instance of Signupview View', function () {
					var SignUpView = new Signupview();
					expect( SignUpView ).to.be.an.instanceof( Signupview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );