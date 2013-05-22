node-config
===========

Experimental module to build generic config express/socket.io style

Usage:

```javascript

var Config = require('cct-node-config-exp');

var c = new Config();
c.configure('dev', function (c) {
  c.set('settingOne', 'devValue');
});

c.configure('prod', function (c) {
  c.set('settingTwo', 'prodValue');
});

c('dev').get('settingOne').should.equal('devValue');
```

It picks up the default environment from NODE_ENV environment variable.
