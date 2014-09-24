
exports.post = function(req, res, db){

    if(req.body.text == ''){
        res.end('{"type" : "add_todo_response", "msg" : "Empty text", "returnID" : "0"}');
        return 0;
    }

    if(req.session.loggedin && req.session.user){
        db.addTodo(req, res);

        res.end('{"type" : "add_todo_response", "msg" : "New todo added", "returnID" : "1"}');
    }
    res.end('{"type" : "add_todo_response", "msg" : "Something wrong", "returnID" : "0", "req.session.loggedin" : "' + req.session.loggedin + '", "req.session.user" : "' + req.session.user + '"}');
};