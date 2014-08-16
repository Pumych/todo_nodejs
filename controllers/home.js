

exports.get = function( request, response ){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('Home page');
    response.end();
}