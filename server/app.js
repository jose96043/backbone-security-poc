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

var express = require('express')
  , http = require('http')
  , path = require('path')
  , uid = require('uid2');

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
	var email = req.body.email;
	var password = req.body.password;
	for (var i = 0; i < Users.length; i++) {
		var user = Users[i];
		if(user.email == email && user.password == password){
			req.session.user = user;
			return res.send(200, {
				auth : true,
				user : user
			});
		}
	};
	return res.send(401);
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

	for (var i = 0; i < Users.length; i++) {
		if(id == Users[i].id){
			return res.send(Users[i]);
		}
	};
	return res.send(400);
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


/* ------------------------------------------------
	Dummy Database
   ------------------------------------------------*/ 

var Users = [
	{
		firstName : 'Danial',
		lastName : 'Khosravi',
		password : 'pass',
		email : 'backbone@authentication.com',
		id : 1
	},
	{
		firstName : 'Jose',
		lastName : 'Portocarrero',
		password : 'jose',
		email : 'jose@gmail.com',
		id : 2
	},
	{
		firstName : 'm',
		lastName : 'm',
		password : 'm',
		email : 'm',
		id : 3
	}
];

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  console.error("DIRNAME", __dirname+'/../app');

});

