const express = require('express');
const multer = require('multer');

const controll = require('../controllers/user.controller');

const validate = require('../validate/user.validate');

const router = express.Router();

const upload = multer({dest: './public/upload/'});

router.get("/", controll.index);

router.get("/search", controll.search);

router.get('/create', controll.create);

router.get('/:id', controll.get);

router.post('/create', 
  upload.single('avatar'), 
  validate.postCreate, 
  controll.postCreate
);

module.exports = router;