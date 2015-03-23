var https = require('https'),
    url = require('querystring'),
    api = require('../data.json').api;

/*
  Enphase API Integration Class
    Instance can make a single request to a specified api endpoint

  @options:
    user     obj       User who's site we're querying
    callback function  Callback to recieve the query data
    api      string    api name to access
*/
module.exports = function(options) {

  var self = {};

  self.init = function() {
    if (options.api) self[options.api]();
  };

  self.summary = function() {
    var query, req;

    query = url.stringify({
      'key': api.key,
      'user_id': options.user.id
    });

    req = https.get({
      host: 'api.enphaseenergy.com',
      path: '/api/v2/systems/67/summary?' + query
    }, self.responseHandler);

    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });

  };

  self.responseHandler = function(res) {
    var data = '';

    res.on('data', function(chunk) {
      data += chunk;
    });

    res.on('end', function(arg) {
      console.log('end', data.toString());
      options.callback(JSON.parse(data));
    });
  };

  self.init();

  return self;
}
