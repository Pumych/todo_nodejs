
exports.post = function(req, res, db){

    if(req.session.loggedin && req.session.user){
        db.updateTodo(req, res);

        res.end('{"type" : "update_todo_response", "msg" : "Todo updated", "returnID" : "1"}');
    }
    res.end('{"type" : "update_todo_response", "msg" : "Something wrong in update todo", "returnID" : "0", "req.session.loggedin" : "' + req.session.loggedin + '", "req.session.user" : "' + req.session.user + '"}');
};