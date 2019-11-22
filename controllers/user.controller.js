const db = require('../db');
const shortid = require("shortid");

module.exports.index = (req, res) => {
  res.render("users/index", {
    users: db.get('users').value()
  });
};

module.exports.search = (req, res) => {
  var q = req.query.q;
  var users = db.get('users').value();
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

module.exports.get = (req, res) => {
  const id = req.params.id;
  const user = db.get('users').find({id}).value();
  res.render('users/view', {
    user
  });
};

module.exports.postCreate = (req, res) => {
  let name = req.body.name;
  let phone = req.body.phone;
  let errors = [];
  if(!name) {
    errors.push('Name is required');
  }

  if(!phone) {
    errors.push('Phone is required');
  }

  if(errors.length) {
    res.render('users/create', {
      errors: errors,
      values: req.body
    });
    return;
  }
  db.get('users').push({id: shortid.generate(), name, phone}).write();
  res.redirect('/users');
};