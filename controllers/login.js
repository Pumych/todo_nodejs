

exports.post = function(req, res){
    console.log( 'req.body.user: ' + req.body.user );
    console.log( 'req.body.pass: ' + req.body.pass );
//    res.writeHead(200, {'Content-Type': 'application/json'});
    res.send('{"n": "NO"}');

//    res.end();
};

//    router.get('/my_secret_page', checkAuth, function (req, res) {
//        res.send('if you are viewing this page it means you are logged in');
//    });
//
//    router.post('/login', function (req, res) {
//        var post = req.body;
//        if (post.user === 'vitaly' && post.password === '123456') {
//            req.session.user_id = johns_user_id_here;
//            res.redirect('/my_secret_page');
//        } else {
//            res.send('Bad user/pass');
//        }
//    });
//
//    router.get('/logout', function (req, res) {
//        delete req.session.user_id;
//        res.redirect('/login');
//    });