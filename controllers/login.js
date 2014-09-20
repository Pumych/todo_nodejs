var mongoose    = require('mongoose');

mongoose.connect('mongodb://localhost/todo_nodejs');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var UserSchema = mongoose.Schema({
    name:   String,
    pass:   String,
    timeStamp:       String,
    timeStampExpire: String
});

var SessionSchema = mongoose.Schema({
    sessionID: String,
    userID: String
});

exports.isLoggedIn = function(){

    return true;
};



function getCookie(){}
function setCookie(){}
function createSession(){}
function isCookieExists(){}
function isSID_OK(){}



exports.post = function(req, res, app, express){


    if(req.body.pass == ''){
        res.end('{"type" : "login_response", "msg" : "Empty password", "returnID" : "0"}');
        return 0;
    }

    var UserModel = mongoose.model('user', UserSchema);

    function updateUser(user, pass){
        UserModel.find({'name': user}, function(err, names){
            if(names.length){   // Username found
                console.log(user, ' name found in DB');
                UserModel.find({'name': user, 'pass': pass}, function(err, namesPass){
                    if(namesPass.length){   // Username and pass found
                        console.log(user + ':' + pass, ' found in DB');
                        res.end('{"type" : "login_response", "msg" : "Authentication passed", "returnID" : "1"}');
                        return 1;
                    } else {    // Error pass
                        console.log('Wrong pass, return 0');
                        res.end('{"type" : "login_response", "msg" : "Wrong username or password", "returnID" : "0"}');
                        return 0;
                    }
                });

            } else {    // Name not found in DB, lets add it
                console.log(user, ' name NOT found in DB lets add it to DB');
                var newUser = new UserModel({'name': user, 'pass': pass});

                newUser.save(function(err){
                    if(err) console.log('>>> ', err);
                    res.end('{"type" : "login_response", "msg" : "Error adding new user", "returnID" : "0"}');
//                    return 0;
                });
                res.end('{"type" : "login_response", "msg" : "New user added", "returnID" : "1"}');

                return 1;

            }
        });
    }

    updateUser(req.body.user, req.body.pass);

//    res.end('{"type" : "login_response", "msg" : "Response message", "returnID" : "1"}');
};