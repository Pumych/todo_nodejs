var swig  = require('swig');
var registration = swig.compileFile('views/registration.html');
var login   = require('./login.js');

exports.get = function( req, res ){



    if(login.isLoggedIn(req, res)){
        res.redirect('/todo');
        res.end();
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(registration());
        res.end();
    }

};