
exports.post = function(req, res, db, user){

//    if(req.body.text == ''){
//        res.end('{"type" : "add_todo_response", "msg" : "Empty text", "returnID" : "0"}');
//    }

    if(req.session.loggedin && req.session.user){
        db.getTodo(req, res);


        res.end('{}');
    }

};