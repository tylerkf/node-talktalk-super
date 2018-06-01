/**
 * 
 *
 */

const { SuperRouter } = require('../');

const router = new SuperRouter('http://192.168.1.1', 'admin', '8DGJ7M6Y');

router.login((err, res) => {
  if (err)
    return console.log(err);

  router.request('/api/system/HostInfo', (err, res) => {
    if (err)
      return console.log(err);

    try {
      // split html res
			const jsonString = res.split('*')[1];
      // parse into a json object
			const data = JSON.parse(jsonString);
			console.log(data);
		} catch(err) {
			console.log(err);
		}
  });
});