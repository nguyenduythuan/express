const express = require('express');
const router = express.Router();

const controll = require('../controllers/auth.controller');

router.get("/login", controll.login);
router.post("/login", controll.postLogin);


module.exports = router;