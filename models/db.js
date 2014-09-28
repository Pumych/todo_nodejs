// TODO: move all methods to Schema
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todo_nodejs');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


var UserSchema = mongoose.Schema({
    name:   String,
    pass:   String,
    timeStamp:       String,
    timeStampExpire: String
});


var TodoSchema = mongoose.Schema({
    id:     String,
    user:   String,
    text:   String
});

var TodoModel = mongoose.model('todo', TodoSchema);

/**
 *
 * @param req
 * @param res
 * @param user
 * @param pass
 */
exports.updateUser = function(req, res, user, pass){
    if(req.body.pass == ''){ res.end('{"type" : "login_response", "msg" : "Empty password", "returnID" : "0"}'); }

    var UserModel = mongoose.model('user', UserSchema);

    UserModel.find({'name': user}, function(err, names){
        if(names.length){   // Username found
            UserModel.find({'name': user, 'pass': pass}, function(err, namesPass){
                if(namesPass.length){   // Username and pass found
                    console.log(user + ':' + pass, ' found in DB');
                    req.session.loggedin = 1;
                    req.session.user = user;
                    res.end('{"type" : "login_response", "msg" : "Authentication passed", "returnID" : "1"}');
                } else {    // Error pass
                    console.log('Wrong pass, return 0');
                    res.end('{"type" : "login_response", "msg" : "Wrong username or password", "returnID" : "0"}');
                }
            });

        } else {    // Name not found in DB, lets add it
            console.log(user, ' name NOT found in DB lets add it to DB');
            var newUser = new UserModel({'name': user, 'pass': pass});

            newUser.save(function(err){
                if(err) {
                    console.log('>>> ', err);
                    res.end('{"type" : "login_response", "msg" : "Error adding new user", "returnID" : "0"}');
                }
                req.session.loggedin = 1;
                req.session.user = user;
                console.log( '>>> New user added to DB' );
                res.end('{"type" : "login_response", "msg" : "New user added to DB", "returnID" : "1"}');
            });
        }
    });
};

exports.addTodo = function(req, res){

    if(req.body.text == ''){ res.end('{"type" : "add_todo_response", "msg" : "Empty text", "returnID" : "0"}'); }

    var newTodo = new TodoModel({'user': req.session.user, 'text': req.body.text});

    newTodo.save(function(err){
        if(err) {
            console.log('>>> newTodo.save err: ', err);
            res.end('{"type" : "add_todo_response", "msg" : "Error adding todo", "returnID" : "0"}');
        }
        res.end('{"type" : "add_todo_response", "msg" : "Todo added", "returnID" : "1"}');
    });
};

exports.getTodo = function(req, res){
    TodoModel.find({'user': req.session.user}, function(err, todos){
        if(err) console.log('>>> ', err);
        todos = JSON.stringify(todos);
        res.end('{"log" : "get_todo.js response", "todos": '+todos+'}');
    });
};

exports.removeTodo = function(req, res){
    console.log( 'req.body.todo_id: ', req.body.todo_id );

    TodoModel.find({ _id: req.body.todo_id }).remove(function(err){
        console.log( 'in remove' );
        if(err) {
            console.log('db.js::removeTodo() error: ', err);
            res.end('{"log" : "db.js::removeTodo() error", "err": '+err+'}');
            res.end('{"type" : "remove_todo_response", "err" : "'+err+'", "returnID" : "0"}');
        } else {
            res.end('{"type" : "remove_todo_response", "msg" : "Todo removed", "returnID" : "1"}');
        }
    });
};

exports.updateTodo = function(req, res){
    TodoModel.findOneAndUpdate({'_id': req.body.todo_id}, {'text': req.body.text}, function(err, numberAffected, raw){
        if(err){
            console.log('>>> err:', err);
            res.end('{"type" : "update_todo_response", "msg" : "Something wrong", "returnID" : "0"}');
        }
        res.end('{"type" : "update_todo_response", "msg" : "One todo updated", "returnID" : "1"}');
    });
}