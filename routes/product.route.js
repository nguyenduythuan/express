const express = require('express');
const router = express.Router();

const controll = require('../controllers/product.controller');

router.get("/", controll.index);

module.exports = router;