module.exports = function(app, pasport, router, express){

    /** Route static (public) folder */
    app.use(express.static(__dirname + '/public'));

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
}


