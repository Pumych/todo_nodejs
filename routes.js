module.exports = function(app, pasport, router, express){

    /** Route static (public) folder */
    app.use(express.static(__dirname + '/public'));


    /** Route home page */
    router.get('/', function(req, res){
        require('./controllers/index').get(req, res);
    });

//    router.post('/login', function(req, res){
//        require('./controllers/login.js').post(req, res);
//    });

    /**This would be the last router, if no page/file found return 404 */
    router.get('*', function(req, res){
        require('./controllers/404.js').get(req, res);
    });

    /** Add router to the application */
    app.use('/', router);   // app.use('/parent', router); - call all from localhost:8888/parent/*
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

