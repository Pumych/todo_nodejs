var mongoose    = require('mongoose');

mongoose.connect('mongodb://localhost/todo_nodejs');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var CommentsSchema = mongoose.Schema({
    user:       String,
    todoText:   String
});

// Returns all to-do messages for current username
exports.getTodoTexts = function(username){
    var TextsModel = mongoose.model('text', CommentsSchema);
};

// Add new to-do message for current username
exports.addTodoTexts = function(username){

};