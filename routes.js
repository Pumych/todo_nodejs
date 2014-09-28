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
        db.updateUser(req, res, req.body.user, req.body.pass);
    });

    // Logout
    router.post('/logout', function(req, res){
        delete req.session.loggedin;
        res.end('{"type" : "logout_response", "msg" : "Logged out", "returnID" : "1"}');
    });

    // PREVENTS data access if NOT logged in
    router.post('*', function(req, res, next){
        if(!f.isLoggedIn(req, res)){ res.redirect('/'); }
        next();
    });

    // Add new to-do to DB
    router.post('/add_todo', function(req, res){
        db.addTodo(req, res);
    });

    // Returns JSON with list of todos from DB
    router.post('/get_todo', function(req, res){
        db.getTodo(req, res);
    });

    // Remove to-do from DB
    router.post('/remove_todo', function(req, res){
        db.removeTodo(req, res);
    });

    // Update text of to-do in DB
    router.post('/update_todo', function(req, res){
        db.updateTodo(req, res);
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


