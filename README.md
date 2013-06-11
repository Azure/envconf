envconf
===========

This module makes it easy to use express-style configuration for whatever application
you want. Easily let your users define separate configuration environments in code
and switch between sets of configuration via a single environment variable.


Usage:

```javascript

var envconf = require('envconf');

var c = envconf.createConfig();

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

It picks up the default environment from the NODE_ENV environment variable, but you can
change that if you want:

```javascript

var c2 = envconf.createConfig({ defaultEnvVar: 'MY_LIBRARY_VAR'});

c2.configure('dev', function (c) {
  c.set('settingOne', 'devValue');
});

c2.configure('prod', function (c) {
  c.set('settingTwo', 'prodValue');
});

c2('dev').get('settingOne').should.equal('devValue');

process.env.MY_LIBRARY_VAR = 'prod';
c.default.get('settingTwo').should.equal('prodValue');
```

Do you want to add helper methods to your configuration? It's easy
with a config customizer:

```javascript

function addConfigHelpers(config) {
    config.useSql = function (host, db) {
        config.set('sql host', host);
        config.set('sql database name', db);
    }
}

var c3 = envconf.createConfig( { customizer: addConfigHelpers });

c3.configure('test', function (c) {
    c.useSql('testmachine', 'testdb');
});

c3.configure('prod', function (c) {
    c.useSql('realDatabase', 'actualDb');
});
```
