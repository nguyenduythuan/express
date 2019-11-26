const express = require('express');
const router = express.Router();

const controll = require('../controllers/cart.controller');

router.get("/add/:productId", controll.addToCart);


module.exports = router;