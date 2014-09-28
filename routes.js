/**
 * router.js
 *
 * Routes all incoming requests
 */

var login   = require('./controllers/login.js');

module.exports = function(app,  router, express, db){

    /**
     * Route home page
     */
    router.get('/', function(req, res){
        if(login.isLoggedIn(req, res)){
            res.redirect('/todo');
        } else {
            res.render('registration.html', {
//                css_path: "/styles/styles.css",
                title: "Home page"
            });
        }
    });

    router.get('/todo', function(req, res){
        require('./controllers/todo.js').get(req, res);
    });

    router.post('/login', function(req, res){
        require('./controllers/login.js').post(req, res, app, express, db);
    });

    router.post('/add_todo', function(req, res){
        require('./controllers/add_todo.js').post(req, res, db);
    });

    router.post('/logout', function(req, res){
        require('./controllers/logout.js').post(req, res);
    });

    router.post('/get_todo', function(req, res){
        require('./controllers/get_todo.js').post(req, res, db);
    });

    router.post('/remove_todo', function(req, res){
        require('./controllers/remove_todo.js').post(req, res, db);
    });

    router.post('/update_todo', function(req, res){
        require('./controllers/update_todo.js').post(req, res, db);
    });

    /**This would be the last router, if no page/file found return 404 */
    router.get('*', function(req, res){
        res.render('404.html', {
            css_path: "/styles/styles.css",
            title: "404 page",
            text: "Обана, 404 на!"
        });
    });

    /** Add router to the application */
    app.use('/', router);   // app.use('/parent', router); - call all from localhost:8888/parent/*
}


