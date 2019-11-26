var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
  idSession: String,
  cart: {},
});

var Sessions = mongoose.model('Sessions', sessionSchema, 'sessions');

module.exports = Sessions;