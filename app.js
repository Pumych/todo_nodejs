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
var mongoose    = require('mongoose');
var passport    = require('passport');
var flash       = require('connect-flash');

var morgan          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');   // get information from html forms
var session         = require('express-session');
var router          = express.Router();

var configDB = require('./config/database.js');


//mongoose.connect('mongodb://localhost/my_database');

/** Нах? */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** Route static (public) folder */
app.use(express.static(__dirname + '/public'));
// ROUTES
// ==============================================

/** Log data about all requests */
router.use(function(req, res, next){
    console.log( req.method, req.url);
    next();     // continue doing what we were doing and go to the route
});


/** Route home page */
router.get('/', function(req, res){
    require('./controllers/home.js').get(req, res);
});

router.post('/login', function(req, res){
    require('./controllers/login.js').post(req, res);
});

/**This would be the last router, if no page/file found return 404 */
router.get('*', function(req, res){
    require('./controllers/404.js').get(req, res);
});

/** Add router to the application */
app.use('/', router);   // app.use('/parent', router); - call all from localhost:8888/parent/*

// START THE SERVER
// ==============================================

app.listen(port);

console.log( 'Magic happens on port ' + port);

