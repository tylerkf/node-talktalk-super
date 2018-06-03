const request = require('request');
const login = require('./login');

const DEFAULT_URL = 'http://192.168.1.1';
const DEFAULT_USERNAME = 'admin';

class SuperRouter {
  constructor(url = DEFAULT_URL, username = DEFAULT_USERNAME, password = '') {
    this.url = url;
    this.username = username;
    this.password = password;
    this.cookieJar = request.jar();
  }

  // login method
  // call every hour or so
  login(callback) {
    login(this.url, this.username, this.password, (err, res) => {
      if (err)
        return callback(err);

      const reqCookie = request.cookie(res.cookie);
      this.cookieJar = request.jar();
    	this.cookieJar.setCookie(reqCookie, this.url);
      callback();
    });
  }

  // generic request method
  request(uri, callback) {
    request({ url: this.url + uri, jar: this.cookieJar }, callback);
  }
}

module.exports.SuperRouter = SuperRouter;
