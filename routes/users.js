var express = require('express');
var router = express.Router();
var users = require('../settings.json').users;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Enlighten users', users: users });
});

router.get('/:id', function(req, res, next) {
  var user = users[req.params.id];
  res.render('user', { title: user.name, user: user });
});

module.exports = router;
