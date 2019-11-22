const express = require('express');
const router = express.Router();

const controll = require('../controllers/user.controller');

router.get("/", controll.index);

router.get("/search", controll.search);

router.get('/create', controll.create);

router.get('/:id', controll.get);

router.post('/create', controll.postCreate);

module.exports = router;