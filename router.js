var url = require('url');   // URL resolution and parsing module
var fs = require('fs');     // File System module

/**
 * Sends response (header and file) to request by file type
 *
 * @param pathname
 * @param fileType - 'css', 'js' etc.
 * @param response
 */
var responseByType = function( pathname, fileType, response ){
    var contentType;
    var status = 200;
    var encoding = 'utf8';
    switch( fileType ){
        case 'css': contentType = 'text/css';
            break;
        case 'js': contentType = 'text/javascript';
            break;
        case 'jpg':
            contentType = 'image/jpeg';
            encoding = 'binary';
            break;
        default: contentType = 'unknown/unknown';
    }

    fs.readFile(__dirname + pathname, encoding, function(err, data){
        if(err) throw err;
        response.writeHead(status, {'Content-Type': contentType});
        response.write(data, encoding);
        response.end();
    });


}

exports.get = function(request, response){
    var requestUrl = url.parse(request.url, true);  // Parse requested URL
    var pathname = requestUrl.pathname;             // Get pathname

//    console.log( 'requestUrl: ', requestUrl );
//    console.log( 'pathname:', pathname );

    /**
     * Route by requested filename extension
     */
    if( /.(css)$/.test( pathname ) ){
        responseByType(pathname, 'css', response);

    } else if(/.(js)$/.test(pathname)){
        responseByType(pathname, 'js', response);

    } else if(/.(jpg)$/.test(pathname)){
        responseByType(pathname, 'jpg', response);

    } else {
        var controllerPath;
        switch(pathname){
            case '/':
            case '/home':
                controllerPath = 'home.js';
                break;
            default:
                controllerPath = '404.js';
        }

        require('./controllers/' + controllerPath).get(request, response);
    }
}