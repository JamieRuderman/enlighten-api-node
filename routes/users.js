var express = require('express'),
    router = express.Router(),
    Enphase = require('../lib/enphase'),
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
router.get('/:id/systems', function(req, res, next) {
  var index = req.params.id,
      user = users[index],
      params = { 
        title: user.name, 
        user: user, 
        index: index, 
        actions: [{
          name: 'System summary',
          path: 'systems'
        }, {
          name: 'Energy lifetime',
          path: 'lifetime'
        }] 
      };
  
  new Enphase({
    api: 'systems',
    user: user,
    success: function(data) {
      params.data = data;
      res.render('systems', params);
    },
    error: function(data) {
      params.data = data;
      res.render('api_error', params);
    }
  });
});

/* Single User Summary */
router.get('/:id/systems/:system', function(req, res, next) {
  var index = req.params.id,
      user = users[index];

  new Enphase({
    api: 'summary',
    system: req.params.system,
    user: user,
    success: function(data) {
      res.render('summary', { title: user.name, user: user, index: index, data: data });
    }
  });
});

module.exports = router;
