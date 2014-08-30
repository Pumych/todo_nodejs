var swig  = require('swig');
var login = swig.compileFile('views/registration.html');

exports.get = function( request, response ){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(login());
    response.end();
};