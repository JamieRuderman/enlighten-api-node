var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Auth User */
router.get('/auth', function(req, res, next) {
  res.render('auth', { user: req.query.user_id });
});

module.exports = router;
