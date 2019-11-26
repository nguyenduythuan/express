// const db = require('../db');
const Users = require('../models/user.model');
const Sessions = require('../models/cart.model');

module.exports.requireAuth = async (req, res, next) => {
  const sessionId = req.signedCookies.sessionId;
  if(!req.signedCookies.userId){
    res.redirect('/auth/login');
    return;
  }
  var user = await Users.findById({_id: req.signedCookies.userId});
  if(!user){
    res.redirect('/auth/login');
    return;
  }

  var session  = await Sessions.findOne({idSession: sessionId});
  var numberCart;

  if(session.cart && Object.keys(session.cart)) {
    numberCart = Object.values(session.cart).reduce((number, item) => number + item, 0);
  }else {
    numberCart = 0;
  }
  
  res.locals.user = user;
  res.locals.numCart = numberCart;
  next();
}