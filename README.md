##NodeJS Enphase Enlighten Systems API Sample

Sample code and library for [NodeJS](https://nodejs.org/). Uses the [Express](http://expressjs.com/) application framework with [Jade](http://jade-lang.com/) templates.

The interactions with the API are handled by an [enphase.js](lib/enphase.js) library that could be added to your project.

### Motivation

To provide an example of how to integrate a NodeJS project with the Enphase Enlighten Systems API and create a simple integration library.

### Installation

1. Set your Enphase API key and Application Id environment variables.
  You can find these by logging into your [Enphase developer account](https://developer.enphase.com/admin/applications) and selecting your application. The App id is the last part of the Authorization URL.

  Quick set for the current session in a bash shell *(replace with your info)*:
  ```bash
  export ENPHASE_API_KEY='3aaa01a221a6603a71853fc1cc2c3a5b'
  export ENPHASE_APP_ID='140961117xxxx'
  ```

  To set permanently add it to your .profile or similar setup depending on your system and server configuration.


2. Install NodeJS. Run the following if on a Mac or visit the [NodeJS](https://nodejs.org/) website to install.
  ```bash
  brew install node
  ```

3. Clone the repo
  ```bash
  git clone https://github.com/path_to_project
  ```

4. Start the node server
  ```bash
  node ./bin/www
  ```

5. Visit http://localhost:3000 in your web browser

### Example

Assuming you have your environmental variables set up, you first require the enphase library:
```javascript
var enphase = require('../lib/enphase');
```
Then query the Enphase Enlighten Systems API by instantiating a new `enphase.Request` object.
The simplest request is for a user's systems:
```javascript
new enphase.Request({
  api: 'systems',
  userId: user.id,
  success: function(data) {
    res.render('systemsResponse', data);
  },
  error: function(data) {
    res.render('error', data);
  }
});
```

The most elaborate will have a `systemId` and `query`:
```javascript
new enphase.Request({
  api: 'systems',
  userId: '4d7a45774e6a41320a',
  systemId: 67,
  query: { start_date: '2015-01-01' },
  success: function(data) {
    res.render('response', data);
  },
  error: function(data) {
    res.render('error', data);
  }
});
```
You can also access the enphase api vars directly from the enphase object:
```javascript
var enphaseAuthUrl = enphase.auth,
    enphaseApiKey = enphase.key;
```

### Author
[Jamie Ruderman](http://github.com/JamieRuderman) for Enphase.

### License

GNU General Public License 
