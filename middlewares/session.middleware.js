const shortid = require("shortid");
const Sessions = require("../models/cart.model");
// const db = require('../db');

module.exports = (req, res, next) => {
  if(!req.signedCookies.sessionId){
    const sessionId = shortid.generate();
    res.cookie('sessionId', sessionId,{
      signed: true
    });

    var session = new Sessions({idSession: sessionId, cart: {}});
    session.save((err, session) => {
      err ? console.log(err) : console.log(session);
    });
  }
  next();
}