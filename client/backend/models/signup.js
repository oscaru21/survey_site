const mongoose = require('mongoose');

const signupSchema = mongoose.Schema({
  email: {type: String},
  username: {type: String},
  gender: {type: String},
  age:{type: String},
  password: {type:String},
  confirm_password:{type:String}

});

module.exports = mongoose.model('Signup', signupSchema);
