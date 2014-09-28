/**
 * app_node.js
 *
 * This is a server file
 */

var http = require('http');
var router = require('./router_node');
var http_ip = 'localhost';
var http_port = 8888;

console.log('\n\n\n\n\n\n\n\n\n<<<<<<<<<< ------------------ todo_nodejs START ------------------------ >>>>>>>>>');

/** Create server and call ROUTER to handle URL requests */
var server = http.createServer(function(request, response){
    router.get(request, response);
});

/** Listen server for incoming requests */
server.listen(http_port, http_ip);
console.log('Listening to http://' + http_ip + ':' + http_port);


