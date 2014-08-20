/**
 * Server - express version
 */
console.log('\n\n\n\n\n\n\n\n\n<<<<<<<<<< ------------------ todo_nodejs START ------------------------ >>>>>>>>>');
// BASE SETUP
// ==============================================

var express = require('express');
var app     = express();
var router  = express.Router();
var port    = process.env.PORT || 8888;



// ROUTES
// ==============================================

/** Log data about all requests */
router.use(function(req, res, next){
    console.log( req.method, req.url );
    next();     // continue doing what we were doing and go to the route
});

/** Route static (public) folder */
app.use(express.static(__dirname + '/public'));

/** Route home page */
router.get('/', function(req, res){
    require('./controllers/home.js').get(req, res);
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