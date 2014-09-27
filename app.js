/**
 * Server - express version
 *
 * Check those modules: static-favicon, debug, path, jade
 */
console.log('\n\n\n\n\n\n\n\n\n<<<<<<<<<< ------------------ todo_nodejs START ------------------------ >>>>>>>>>');

// BASE SETUP ==============================================
var express     = require('express');
var app         = express();
var port        = process.env.PORT || 8888;

var morgan          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');   // get information from html forms
var session         = require('express-session');
var router          = express.Router();

var mongoose        = require('mongoose');
var db              = require('./models/db.js');

// set up express application
app.use(morgan('dev'));     // log every request to the console
app.use(cookieParser());    // read cookies (needed for auth)
app.use(bodyParser());      // get information from html forms
app.use(session({ secret: 'yahomthfka' })); // session secret

app.set('view engine', 'swig'); // set up swig for templating

require('./routes.js')(app,  router, express, db); // load our routes and pass in our app and fully configured passport

app.listen(port);

console.log( 'Magic happens on port ' + port);

