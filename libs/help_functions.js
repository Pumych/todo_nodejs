
exports.isLoggedIn = function(req, res){
    if( req.session.loggedin == 1)
    { return true; }
    else { return false; }
};