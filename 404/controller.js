
exports.get = function( request, response ){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('404 page');
    response.end();
}