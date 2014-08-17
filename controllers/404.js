var swig  = require('swig');
var _404_tpl = swig.compileFile('views/404.html');

exports.get = function( request, response ){
    response.writeHead(404, {'Content-Type': 'text/html'});
    response.write(_404_tpl());
    response.end();
}