var swig    = require('swig');
var login   = require('./login.js');
var comments= require('../models/comments.js');
var todo    = swig.compileFile('views/todo.html');

exports.get = function( req, res ){
//    var isLoggedIn = login.isLoggedIn();
    if(!login.isLoggedIn()){
        res.redirect('/');
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(todo());
        res.end();
    }
};
