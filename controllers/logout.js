
exports.post = function(req, res){
    delete req.session.loggedin;
    console.log( req.session );

    res.end('{"type" : "logout_response", "msg" : "Logged out", "returnID" : "1"}');
    return 0;

};