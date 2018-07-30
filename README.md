# node-talktalk-super

[![NPM](https://nodei.co/npm/talktalk-super.png?compact=true)](https://nodei.co/npm/talktalk-super/)

Designed for making API calls to TalkTalk Super Routers.

## Installation
```
npm install talktalk-super
```

## Usage
Import the ```SuperRouter``` class and create an instance:
```js
const { SuperRouter } = require('talktalk-super');

const router = new SuperRouter('http://192.168.1.1', 'admin', 'password')
```

Then login and use the request function to make calls

```js
router.login((err, res) => {
  if (err)
    return;

  router.request('/api/system/HostInfo', (err, res, html) => {
    if (err)
      return;

    print(html);
  });
});
```
