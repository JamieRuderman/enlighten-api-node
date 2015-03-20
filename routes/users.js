var express = require('express');
var router = express.Router();
var users = require('../settings.json').users;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Enlighten users', users: users });
});

module.exports = router;
