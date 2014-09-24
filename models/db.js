var configDB        = require('../config/database.js');
var mongoose        = require('mongoose');

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

var TodoSchema = mongoose.Schema({
    user:   String,
    text:   String
});


/**
 *
 * @param req
 * @param res
 * @param user
 * @param pass
 */
exports.updateUser = function(req, res, user, pass){
    var UserModel = mongoose.model('user', UserSchema);

    UserModel.find({'name': user}, function(err, names){
        if(names.length){   // Username found
            console.log(user, ' name found in DB');
            UserModel.find({'name': user, 'pass': pass}, function(err, namesPass){
                if(namesPass.length){   // Username and pass found
                    console.log(user + ':' + pass, ' found in DB');
                    req.session.loggedin = 1;
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
                req.session.loggedin = 1;
                res.end('{"type" : "login_response", "msg" : "Error adding new user", "returnID" : "0"}');
//                    return 0;
            });
            res.end('{"type" : "login_response", "msg" : "New user added", "returnID" : "1"}');

            return 1;

        }
    });
}

exports.addTodo = function(req, res){
    var TodoModel = mongoose.model('todo', TodoSchema);

    var newTodo = new TodoModel({'user': 'tester_nax', 'text': req.body.text});

    newTodo.save(function(err){
        if(err) console.log('>>> ', err);
        res.end('{"type" : "add_todo_response", "msg" : "Error adding new todo", "returnID" : "0"}');
//                    return 0;
    });
}