const request = require('request');
const cheerio = require('cheerio');
const crypt = require('./crypt');

const LOGIN_URI = "/api/system/user_login";

var login = function(url, username, password, callback) {
  // gets login page
  request({ url }, (err, res, html) => {
    if (err)
      return callback(err);
    // gets csrf token from html
		const csrf = getCsrf(html);
    // gets initial session id cookie from res
		const cookie = getSessionCookie(res.headers);
		if (!cookie) {
			return callback(new Error('Session cookie not found'), null);
		}

    const postData = {
	    csrf,
	    data: {
	    	UserName: username
	    }
	  };

    // encodes and adds password to post data
  	const plaintPwd = username + crypt.encode(crypt.sha256(password)) + csrf.csrf_param + csrf.csrf_token;
    postData['data']['Password'] = crypt.sha256(plaintPwd);

    // sets up cookie
  	const reqCookie = request.cookie(cookie);
  	const cookieJar = request.jar();
  	cookieJar.setCookie(reqCookie, url);

    // sends login request
    const loginUrl = url + LOGIN_URI;
    request.post({
  		url: loginUrl,
  		form: JSON.stringify(postData),
  		jar: cookieJar,
  		headers: {
  			'Content-Type': 'application/json'
  		}
  	}, function(err, res, html) {
    	if (err) {
    		return callback(err, null);
    	}

  		const loginCookie = getSessionCookie(res.headers);
  		if (!loginCookie) {
  			return callback(new Error('Login cookie not found'), null);
  		}
  		return callback(null, { cookie: loginCookie });
    });
	});
}

function getCsrf(document) {
	const $ = cheerio.load(document);

  var csrf = {};
  // meta elements of the page
  var metas = $('meta');

  // finds the csrf_param value
  for(let i = 0; i < metas.length; i++) {
    if (metas[i].attribs['name'] === 'csrf_param') {
      csrf.csrf_param = metas[i].attribs['content'];
      break;
    }
  }
  // finds csrf_token value
  for(let i = 0 ; i < metas.length; i++){
    if (metas[i].attribs['name'] === 'csrf_token') {
      csrf.csrf_token = metas[i].attribs['content'];
      break;
    }
  }

  return csrf;
}

function getSessionCookie(headers) {
  // no cookie found
	if (!headers['set-cookie']) {
		return null;
	}

	const setCookie = headers['set-cookie'][0];
	const cookie = setCookie.split(';')[0];

	return cookie;
}

module.exports = login;
