/**
 * router.js
 *
 * Routes all incoming requests
 */

var f = require('./libs/help_functions.js');

module.exports = function(app,  router, express, db){

    /****************************** Page Requests ***************************/
    // Home page (registration/login form)
    router.get('/', function(req, res){
        if(f.isLoggedIn(req, res)){
            res.redirect('/todo');
        } else {
            res.render('registration.html', {
                title: "Home page"
            });
        }
    });

    // To-do page
    router.get('/todo', function(req, res){
        if(!f.isLoggedIn(req, res)){
            res.redirect('/');
        } else {
            res.render('todo.html', {
                username: req.session.user,
                title: "Todo page"
            });
        }
    });

    /****************************** AJAX front-end Requests **********/
    // Login
    router.post('/login', function(req, res){
        if(req.body.pass == ''){ res.end('{"type" : "login_response", "msg" : "Empty password", "returnID" : "0"}'); }
        db.updateUser(req, res, req.body.user, req.body.pass);
    });

    // Logout
    router.post('/logout', function(req, res){
        require('./controllers/logout.js').post(req, res);
    });




    router.post('/add_todo', function(req, res){
        require('./controllers/add_todo.js').post(req, res, db);
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


