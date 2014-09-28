
exports.post = function(req, res, db){

    if(req.session.loggedin && req.session.user){
        db.removeTodo(req, res);

//        res.end('{"type" : "remove_todo_response", "msg" : "Todo removed", "returnID" : "1"}');
    } else {
        res.end('{"type" : "remove_todo_response", "msg" : "Something wrong in remove_todo.js", "returnID" : "0", "req.session.loggedin" : "' + req.session.loggedin + '", "req.session.user" : "' + req.session.user + '"}');

    }
};