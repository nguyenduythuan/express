// const db = require('../db');
const Product = require('../models/product.model');

module.exports.index = async (req, res) => {
  // let page = parseInt(req.query.page) || 1;
  // let perPage = 8;

  // let drop = (page -1) * perPage;

  // res.render('products/index', {
  //   products: db.get("products").drop(drop).take(perPage).value()
  // });

  var products = await Product.find();
  res.render('products/index', {
    products
  });
}