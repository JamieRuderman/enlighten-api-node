var express = require('express'),
    router = express.Router(),
    enphase = require('../lib/enphase'),
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
    }, {
      name: 'Inventory',
      path: 'inventory'
    }, {
      name: 'Stats',
      path: 'stats'
    }, {
      name: 'RGM stats',
      path: 'rgm'
    }, {
      name: 'Monthly production',
      path: 'monthly',
      query: 'start_date=2015-01-01'
    }];

/* All Users */
router.get('/', function(req, res, next) {
  res.render('users', { 
    title: 'Enlighten users', 
    users: users,
    redirect: 'http://' + req.headers.host + '/auth',
    auth: enphase.auth
  });
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
  
  new enphase.Request({
    api: 'systems',
    userId: user.id,
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

  new enphase.Request({
    api: req.params.api,
    systemId: req.params.system,
    userId: user.id,
    query: req.query,
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
