envconf
===========

This module makes it easy to use express-style configuration for whatever application
you want. Easily let your users define separate configuration environments in code
and switch between sets of configuration via a single environment variable.


Usage:

```javascript

var Config = require('envconf');

var c = new Config();
c.configure('dev', function (c) {
  c.set('settingOne', 'devValue');
});

c.configure('prod', function (c) {
  c.set('settingTwo', 'prodValue');
});

c('dev').get('settingOne').should.equal('devValue');

process.env.NODE_ENV = 'prod';
c.default.get('settingTwo').should.equal('prodValue');
```

It picks up the default environment from the NODE_ENV environment variable.
