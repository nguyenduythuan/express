// const db = require('../db');
// const shortid = require("shortid");
const Users = require('../models/user.model');

module.exports.index = async (req, res) => {
  var users = await Users.find();
  res.render("users/index", {
    users
  });
};

module.exports.search = async (req, res) => {
  var q = req.query.q;
  var users = await Users.find();
  var matchedUsers = users.filter(
    user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
  );
  res.render('users/index', {
    users: matchedUsers,
    search: q
  });
};

module.exports.create = (req, res) => {
  res.render('users/create');
};

module.exports.get = async (req, res) => {
  const id = req.params.id;
  var user = await Users.findById({_id: id});
  // const user = db.get('users').find({id}).value();
  res.render('users/view', {
    user
  });
};

module.exports.postCreate = (req, res) => {
  let {name, phone} = req.body;
  let avatar = req.file.path.split('/').slice(1).join('/');
  // db.get('users').push({id: shortid.generate(), name, phone, avatar}).write();
  // 
  var user = new Users({name, phone, avatar});
  user.save((err, mess) => {
    err ? console.log(err) : res.redirect('/users');
  });
};