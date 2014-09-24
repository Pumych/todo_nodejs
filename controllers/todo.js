var swig    = require('swig');
var login   = require('./login.js');
var todo    = swig.compileFile('views/todo.html');

exports.get = function( req, res ){

    if(!login.isLoggedIn(req, res)){
        res.redirect('/');
        res.end();
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(todo({username: req.session.user}));
        res.end();
    }
};
