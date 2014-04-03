// 'use strict';

// var express = require('express');
// var http = require('http');
// var path = require('path');
// var async = require('async');
// var hbs = require('express-hbs');
// var baucis = require('baucis');
// var socketIO = require('socket.io');
// var mongoose = require('mongoose');


// // start mongoose
// mongoose.connect('mongodb://localhost/sit');
// var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback () {

// 	/* test schema */
//     var testSchema = new mongoose.Schema({
//         test: String
//     });

//     var Test = mongoose.model( 'test', testSchema );

//     /* set Baucis */
//     baucis.rest({
//         singular: 'test'
//     });

// 	var app = express();

// 	app.configure(function(){
// 	    app.set('port', 9000);

// 	    app.set('view engine', 'handlebars');
// 	    app.set('views', __dirname + '../app/scripts/views');
// 	});

//     app.use('/api/v1', baucis());

// 	// simple log
// 	app.use(function(req, res, next){
// 	  console.log('%s %s', req.method, req.url);
// 	  next();
// 	});

// 	// mount static
// 	app.use(express.static( path.join( __dirname, '../app') ));
// 	app.use(express.static( path.join( __dirname, '../.tmp') ));


// 	// route index.html
// 	app.get('/', function(req, res){
// 	  res.sendfile( path.join( __dirname, '../app/index.html' ) );
// 	});

// 	// start server
// 	http.createServer(app).listen(app.get('port'), function(){
// 	    console.log('Express App started!');
// 	});
// });
/**
 * Module dependencies.
 */
var express = require('express'),
	http = require('http'),
  	path = require('path'),
  	uid = require('uid2'),
  	baucis = require('baucis');
  	mongoose = require('mongoose');


// start mongoose
mongoose.connect('mongodb://localhost/users');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {

	/* test schema */
    var usersSchema = new mongoose.Schema({
        firstName: String,
        lastName: String,
        password: String,
        email: String
    });

    var Users = mongoose.model( 'Users', usersSchema );

    /* set Baucis */
    baucis.rest({
        singular: 'Users'
    });

	var app = express();

	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.cookieParser('NOTHING'));
	app.use(express.session());
	// This middleware adds _csrf to 
	// our session
	// req.session._csrf
	app.use(express.csrf());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(function(req, res, next){
		res.setHeader('X-CSRF-Token', req.session._csrf);
		next();
	});

	// mount static
	app.use(express.static( path.join( __dirname, '../app') ));
	app.use(express.static( path.join( __dirname, '../.tmp') ));



	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}


	/* ------------------------------------------------
		Application Routes
	   ------------------------------------------------*/ 

	app.get("/", function(req, res){
		//send and csrf token with frist request
		//and assign it to a global csrf variable
		//inside the template
		res.render('index', {
			csrf : req.session._csrf
		});
	});

	app.get("/session", function(req, res){ 
		//Check for authentication
		if(req.session.user){
			res.send(200, {
				auth : true,
				user : req.session.user
			});
		}else{
			res.send(401, {
				auth : false,
				csrf : req.session._csrf
			});
		}
	});

	app.post("/session/login", function(req, res){ 
		var email = req.body.email,
			password = req.body.password;
		
		Users.find({"email":email}).where("password").equals(password).exec(function(err, user){
			if(user.length===0){
				return res.send(401);
			}else{
				req.session.user = user;
				return res.send(200, {
					auth : true,
					user : user
				});
			}
		});
	});


	app.del("/session/logout", function(req, res){ 
		//Sending new csrf to client when user logged out
		//for next user to sign in without refreshing the page
		req.session.user = null;
		req.session._csrf = uid(24);

		res.send(200, {
			csrf : req.session._csrf
		});
	});

	app.get('/users/:id', Auth, function(req, res){
		//Using the Auth filter for this route
		//to check for authentication before sending data
		var id = req.params.id;
		Users.find({"_id":id}).exec(function(err, user){
			if(user.length===0){

				return res.send(400);
			}else{
				return res.send(user);
			}
		});
	});
	
	//Register new user to mongo DB.
	app.post('/register', function(req, res){
		var reqBody = req.body;
		Users.find({"email":reqBody.email}).exec(function(err, user){
			if(user.length===0){
				var newUser = new Users({
					firstName : reqBody.firstName,
					lastName : reqBody.lastName,
					email : reqBody.email,
					password : reqBody.password
				});
				newUser.save(function (err) {
					if (err) {
						console.error("Error saving user into database.");
						return res.send(404);
					}else{
						console.log("New user added to database.");
						return res.send({response: "success"});
					}
				});
			}else{
				return res.send({response: "exists"});
			}
		});
	});
	http.createServer(app).listen(app.get('port'), function(){
	  	console.log('Express server listening on port ' + app.get('port'));
  		console.error("DIRNAME", __dirname+'/../app');
	});
});


/* ------------------------------------------------
	Route Filters
   ------------------------------------------------*/ 

//Authentication Filter
function Auth (req, res, next) {
	if(req.session.user){
		next();
	}else{
		res.send(401,{
			flash : 'Plase log in first'
		});
	}
}