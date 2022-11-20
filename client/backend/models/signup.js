const mongoose = require('mongoose');

const signupSchema = mongoose.Schema({
  email: {type: String},
  username: {type: String},
  gender: {type: String},
  age:{type: Int32Array},
  password: {type:String},
  confirm_password:{type:string}

});

module.exports = mongoose.model('Signup', signupSchema);
