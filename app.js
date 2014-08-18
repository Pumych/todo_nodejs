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

router.use(function(req, res, next){
    console.log( req.method, req.url );
    next();     // continue doing what we were doing and go to the route
});

router.get('/', function(req, res){
    res.send('Home Page!');
});

router.get('/about', function(req, res){
    res.send('About!');
});

router.get('/hello/:name', function(req, res){
    res.send('Hello ' + req.params.name);
});

app.use('/', router);   // app.use('/parent', router); - call all from localhost:8888/parent/*

// START THE SERVER
// ==============================================

app.listen(port);

console.log( 'Magic happens on port ' + port);