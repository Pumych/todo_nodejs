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
    switch( fileType ){
        case 'css':
            contentType = 'text/css';
            break;
        case 'js':
            contentType = 'text/javascript';
            break;
        default:
            // TODO:
            contentType = 'text/unknown';
    }

    response.writeHead(200, {'Content-Type': contentType});
    fs.readFile(__dirname + pathname, 'utf8', function(err, data){
        if(err) throw err;
        response.write(data, 'utf8');
        response.end();
    });
}

exports.get = function(request, response){
    var requestUrl = url.parse(request.url, true);  // Parse requested URL
    var pathname = requestUrl.pathname;             // Get pathname

//    console.log( requestUrl );

    /**
     * Route by requested filename extension
     */
    if( /.(css)$/.test( pathname ) ){
        responseByType(pathname, 'css', response);

    } else if(/.(js)$/.test(pathname)){
        responseByType(pathname, 'js', response);

    } else {
        var controllerPath;
        switch(pathname){
            case '/':
            case '/home':
                controllerPath = 'home/controller.js';
//                require('./home/controller.js').get(request, response);
                break;
            default:
                controllerPath = '404/controller.js';
        }

        require('./' + controllerPath).get(request, response);
    }
}