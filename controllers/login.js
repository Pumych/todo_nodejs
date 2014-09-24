
exports.isLoggedIn = function(req, res){
    if( req.session.loggedin == 1){
        return true;
    } else {
        return false;
    }
};

function createSession(){}
function isCookieExists(){}
function isSID_OK(){}

exports.post = function(req, res, app, express, db){

    if(req.body.pass == ''){
        res.end('{"type" : "login_response", "msg" : "Empty password", "returnID" : "0"}');
        return 0;
    }

    db.updateUser(req, res, req.body.user, req.body.pass);
};