var express = require('express'),
    router = express.Router(),
    Enphase = require('../controllers/enphase'),
    users = require('../data.json').users;


/* All Users */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Enlighten users', users: users });
});


/* Single User */
router.get('/:id', function(req, res, next) {
  var index = req.params.id,
      user = users[index];
  res.render('user', { title: user.name, user: user, index: index });
});


/* Single User Summary */
router.get('/:id/summary', function(req, res, next) {
  var index = req.params.id,
      user = users[index];
  
  var api = new Enphase({
    api: 'summary',
    user: user,
    callback: function(data) {
      res.render('summary', { title: user.name, user: user, data: data })
    }
  });

});

module.exports = router;
