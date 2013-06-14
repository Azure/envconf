envconf
===========

This module makes it easy to use express-style configuration for any application. It easily allows to let your users define separate configuration environments in code
and switch between sets of configuration via a single environment variable.


Usage:

```javascript

var envconf = require('envconf');

var c = envconf.createConfig();

c.configure('development', function (c) {
  c.set('settingOne', 'devValue');
});

c.configure('production', function (c) {
  c.set('settingTwo', 'prodValue');
});

c('dev').get('settingOne').should.equal('devValue');

process.env.NODE_ENV = 'production';
c.default.get('settingTwo').should.equal('prodValue');
```

The previous code shows picking up the default environment from the NODE_ENV environment variable.

You can however configure to use your own environment variables as shown below.

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

Do you want to add helper methods for your specific configuration? It's easy
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
