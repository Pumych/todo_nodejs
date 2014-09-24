
exports.post = function(req, res, db){

    if(req.body.text == ''){
        res.end('{"type" : "add_todo_response", "msg" : "Empty text", "returnID" : "0"}');
        return 0;
    }

    db.addTodo(req, res);

    res.end('{"type" : "add_todo_response", "msg" : "New todo added", "returnID" : "1"}');
};