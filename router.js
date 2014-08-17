var url = require('url');   // URL resolution and parsing module
var fs = require('fs');     // File System module

exports.get = function(request, response){
    var requestUrl = url.parse(request.url, true);  // Parse requested URL
    var pathname = requestUrl.pathname;             // Get pathname

    /**
     * Route by requested filename extension
     */
    if( /.(css)$/.test( pathname ) ){
        responseDataByRequestType(pathname, 'css', response);

    } else if(/.(js)$/.test(pathname)){
        responseDataByRequestType(pathname, 'js', response);

    } else if(/.(jpg)$/.test(pathname)){
        responseDataByRequestType(pathname, 'jpg', response);

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
};

/**
 * Sends response (header and file) to request by file type
 *
 * @param pathname
 * @param fileExt - 'css', 'js', 'jpg' etc.
 * @param response
 */

var responseDataByRequestType = function( pathname, fileExt, response ){
    var router = new Router();
    router.setFileExt( fileExt );

    /** There is state of wrong css/js... file */
//    var data;
//    try {
//        data = fs.readFile(__dirname + pathname, router.getEncoding());
//    } catch( e ) {
//        response.writeHead('404', {'Content-Type': 'text/plain'});
//        response.write('>>> 404 err');
//    } finally {
//        response.writeHead(router.getStatus(), {'Content-Type': router.getContentType()});
//        response.write(data, router.getEncoding());
//        response.end();
//    }

    fs.readFile(__dirname + pathname, router.getEncoding(), function(err, data){
        if(err) throw err;
        response.writeHead(router.getStatus(), {'Content-Type': router.getContentType()});
        response.write(data, router.getEncoding());
        response.end();
    });


}

var Router = function(){
    var _ = this;
    var fileExt = '';

    this.setFileExt = function( fileExt ){
        _.fileExt = fileExt;
    }

    this.getContentType = function(){
        switch( _.fileExt ){
            case 'css': return 'text/css';
            case 'js': return 'text/javascript';
            // TODO: Add all file types
            case 'jpg': return 'image/jpeg';
            default: return 'unknown/unknown';
        }
    }

    this.getStatus = function(){
        return 200;
    }

    this.getEncoding = function(){
        switch( _.fileExt ){
            case 'jpg':
            case 'png':
            case 'img': return 'binary';
            default: return 'utf8';
        }
    }
};