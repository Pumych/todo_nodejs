/**
 * Server - express version
 *
 * Check those modules: static-favicon, debug, path, jade
 */
console.log('\n\n\n\n\n\n\n\n\n<<<<<<<<<< ------------------ todo_nodejs START ------------------------ >>>>>>>>>');
//http://scotch.io/tutorials/javascript/easy-node-authentication-setup-and-local
// BASE SETUP ==============================================

var express     = require('express');
var app         = express();
var port        = process.env.PORT || 8888;
var mongoose    = require('mongoose');
var passport    = require('passport');
var flash       = require('connect-flash');

var morgan          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');   // get information from html forms
var session         = require('express-session');
var router          = express.Router();

var configDB = require('./config/database.js');

// CONFIG ==============================================
//mongoose.connect((configDB.url));

// require('./config/passport')(passport); // pass passport for configuration

// set up express application
app.use(morgan('dev'));     // log every request to the console
app.use(cookieParser());    // read cookies (needed for auth)
app.use(bodyParser());      // get information from html forms

app.set('view engine', 'swig'); // set up swig for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes.js')(app, passport, router, express); // load our routes and pass in our app and fully configured passport

// START THE SERVER ==============================================

app.listen(port);

console.log( 'Magic happens on port ' + port);

