var mongoose    = require('mongoose');

mongoose.connect('mongodb://localhost/todo_nodejs');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var UserSchema = mongoose.Schema({
    name: String,
    pass: String
});

exports.post = function(req, res){

    var UserModel = mongoose.model('user', UserSchema);

    function updateUser(user, pass){
        UserModel.find({'name': user}, function(err, names){
            if(names.length){   // Username found
                console.log(user, ' name found in DB');
                UserModel.find({'name': user, 'pass': pass}, function(err, namesPass){
                    if(namesPass.length){   // Username and pass found
                        console.log(user + ':' + pass, ' found in DB');
//                        res.end('{"name" : "OK", "pass": "OK", "return" : "1"}');
                        res.end('{"type" : "login_response", "msg" : "Authentication passed", "returnID" : "1"}');
                        return 1;
                    } else {    // Error pass
                        console.log('Wrong pass, return 0');
//                        res.end('{"name" : "OK", "pass": "wrong", "return" : "0"}');
                        res.end('{"type" : "login_response", "msg" : "Wrong username or password", "returnID" : "0"}');
                        return 0;
                    }
                });

            } else {    // Name not found in DB, lets add it
                console.log(user, ' name NOT found in DB lets add it to DB');
                var newUser = new UserModel({'name': user, 'pass': pass});

                newUser.save(function(err){
                    if(err) console.log('>>> ', err);
//                    res.end('{"err" : '+ err +', "msg" : "Error adding new user"}');
                    res.end('{"type" : "login_response", "msg" : "Error adding new user", "returnID" : "0", "err" : ' + err + '}');
                    return 0;
                });
//                res.end('{"msg":"New user would be added now"}');
                res.end('{"type" : "login_response", "msg" : "New user added, "returnID" : "1"}');

                return 1;

            }
        });
    }

    updateUser(req.body.user, req.body.pass);

//    res.end('{"type" : "login_response", "msg" : "Response message", "returnID" : "1"}');
};
//    res.writeHead(200, {'Content-Type': 'application/json'});

//    if(users.exists(req.body.user, req.body.pass)){
//
//    }




/**
 * 1. Check username exists
 * 2. If 1-OK check that pass is OK
 * 3. If 1-NOTOK add new user
 * 4. If 2-OK show todo list
 */

//    db.on('open', function callback (){





//        console.log(UserModel.db.host); // localhost
//        console.log(UserModel.db.port); // 27017
//        console.log(UserModel.db.name); // myDatabase
//        console.log('>>> mongoose.connection.readyState', mongoose.connection.readyState);
//        mongoose.connection.db.collectionNames(function (err, names) {
//            console.log(names); // [{ name: 'dbname.myCollection' }]
//        });

//        UserModel.find({'name': req.body.user}, function(err, docs){
//            console.log('>>> err', err);
//
//            console.log('>>> docs:', docs);
//
//        });

//        var user = new UserModel({'name': req.body.user , 'pass':req.body.pass});
//
//        user.save();


//

//        mongoose.connection.close();
//    });

//    res.end();
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


//    console.log( 'req.body.user>: ' + req.body.user );
//    console.log( 'req.body.pass>: ' + req.body.pass );
