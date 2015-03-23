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

  var endpoints = {
    systems: '/systems',
    summary: '/systems/#{system}/summary'
  }

  self.init = function() {
    // trigger request based on requested api endpoint
    if (options.api) {
      endpoint = endpoints[options.api].replace('#{system}', options.system);
      self.request(endpoint);
    }
  };

  self.request = function(endpoint) {
    var query, req;

    query = '?' + url.stringify({
      'key': api.key,
      'user_id': options.user.id
    });

    req = https.get({
      host: api.host,
      path: api.root + endpoint + query
    }, self.responseHandler);

    // req.on('error', function(e) {
    //   console.log('problem with request: ' + e.message);
    // });

  };

  self.responseHandler = function(res) {
    var data = '';

    res.on('data', function(chunk) {
      data += chunk;
    });

    res.on('end', function(arg) {
      data = JSON.parse(data);

      if (res.statusCode == 200)
        options.success(data);
      else
        options.error(data);
      
      console.log('end', data);
    });

    // res.on('error', function(e) {
    //   console.log('problem with response: ' + e);
    //   options.error('Get ' + options.api + ' failed.');
    // });
  };

  self.init();

  return self;
}
