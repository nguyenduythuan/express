var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  password: String,
  avatar: String,
});

var Users = mongoose.model('Users', userSchema, 'users');

module.exports = Users;