let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

const User = mongoose.Schema({
  username: {type: String},
  //password is hashed, no need to create it 
  //password: {type: String},
  email: {type: String}
});

let options = ({ missingPasswordError: 'Wrong / Missing Password'});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);