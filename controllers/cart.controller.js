// const db = require('../db');
const Sessions = require("../models/cart.model");

module.exports.addToCart = async (req, res) => {
  const productId = req.params.productId;
  const sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect("/product");
    return;
  }

  var session = await Sessions.findOne({ idSession: sessionId });
  var carts = session.cart;

  if (!carts) {
    Sessions.updateOne(
      { _id: session.id },
      { $set: { cart: { [productId]: 1 } } },
      (err, succ) => (err ? console.log(err) : console.log("done"))
    );
    res.redirect("/products");
    return;
  }

  var sessions = await Sessions.findOne({ idSession: sessionId });
  var count = sessions.cart[productId];
  var cart = sessions.cart;
  if(!count) {
    count = 0;
  }
  Sessions.updateOne(
    { _id: session.id },
    { 
      $set: { 
        cart: {
          ...cart,
          [productId]: count + 1
        } 
      } 
    },
    (err, succ) => (err ? console.log(err) : console.log("done"))
  );

  // Sessions.updateOne(
  //   { _id: session.id },
  //   {
  //     $addToSet: {
  //       cart: product
  //     }
  //   },
  //   (err, succ) => (err ? console.log(err) : console.log(succ))
  // );

  // var count = db
  //   .get('sessions')
  //   .find({id: sessionId })
  //   .get('cart.'+productId, 0)
  //   .value();

  // db.get('sessions')
  //   .find({id: sessionId})
  //   .set('cart.'+productId, count + 1)
  //   .write();

  res.redirect("/products");
};
