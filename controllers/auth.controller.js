const md5 = require('md5');

// const db = require('../db');
const Users = require('../models/user.model');

module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.postLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let user = await Users.findOne({email});

  if(!user) {
    res.render('auth/login', {
      errors: [
        "Email khong ton tai",
      ],
      values: req.body
    });
    return;
  }

  var hasPassword = md5(password);

  if(user.password !== hasPassword) {
    res.render('auth/login', {
      errors: [
        "Password khong dung",
      ],
      values: req.body
    });
    return;
  }

  res.cookie('userId', user._id,{
    signed: true
  });
  res.redirect('/users');
};