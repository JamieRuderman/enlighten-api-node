var express = require('express'),
    router = express.Router(),
    Enphase = require('../lib/enphase'),
    users = require('../data.json').users;

var actions = [{
      name: 'System summary',
      path: 'summary'
    }, {
      name: 'Energy lifetime',
      path: 'lifetime'
    }, {
      name: 'Envoys',
      path: 'envoys'
    }];

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
        actions: actions,
        index: index, 
        title: user.name, 
        user: user
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
      res.render('response', params);
    }
  });
});

/* System API actions */
router.get('/:id/:api/:system', function(req, res, next) {
  var index = req.params.id,
      user = users[index],
      params = { 
        actions: actions,
        api: req.params.api,
        index: index, 
        systemId: req.params.system,
        title: user.name, 
        user: user 
      };

  new Enphase({
    api: req.params.api,
    system: req.params.system,
    user: user,
    success: function(data) {
      params.data = data;
      res.render('response', params);
    },
    error: function(data) {
      params.data = data;
      res.render('response', params);
    }
  });
});

module.exports = router;
