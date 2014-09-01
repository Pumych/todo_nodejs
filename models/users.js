// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});




db.once('open', function callback (){
    var User = mongoose.model('User', userSchema);

    User.save(function (err, User) {
        if (err) return console.error(err);
    });

    /**
     * Say time goes by and we want to display all the kittens we've seen. We can access all of the kitten documents through our Kitten model.
     */
    Kitten.find(function (err, kittens) {
        if (err) return console.error(err);
        console.log(kittens)
    });

    // methods ======================
// generating a hash
    userSchema.methods.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

// checking if password is valid
    userSchema.methods.validPassword = function(password) {
        return bcrypt.compareSync(password, this.local.password);
    };

// create the model for users and expose it to our app
    module.exports = mongoose.model('User', userSchema);
});



