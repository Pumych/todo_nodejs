var swig  = require('swig');
var layout_home_tpl = swig.compileFile('views/layout-home.html');
var block_header_tpl = swig.compileFile('views/block-header.html');
var block_footer_tpl = swig.compileFile('views/block-footer.html');

var mainPageOutput = layout_home_tpl({
    HEADER_tpl: block_header_tpl({title:"TODO | Home page"}),
    FOOTER_tpl: block_footer_tpl()
});


exports.get = function( request, response ){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(mainPageOutput);
    response.end();
};