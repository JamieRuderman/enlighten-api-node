var https = require('https'),
    url = require('querystring');

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

  var api = {
    host: 'api.enphaseenergy.com',
    root: '/api/v2',
    key: '3aaa01a221a6603a71853fc1cc2c3a5b',
    auth: 'https://enlighten.enphaseenergy.com/app_user_auth/new?app_id=1409611176801'
  }

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
      host: api.host,
      path: api.root + '/systems/67/summary?' + query
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
      options.response(JSON.parse(data));
    });

    // res.on('error', function() {
    //   options.error('Get ' + options.api + ' failed.');
    // });
  };

  self.init();

  return self;
}
