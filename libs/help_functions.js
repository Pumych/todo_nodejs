
exports.isLoggedIn = function(req, res){
    if(req.session.loggedin && req.session.user)
    { return true; }
    else { return false; }
};