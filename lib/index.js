/**
* Copyright (c) Microsoft.  All rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

function Config(parent, defaultEnvVar, customizer) {
  var environments = { };
  var settings = { };

  if (!defaultEnvVar) {
    defaultEnvVar = 'NODE_ENV';
  }

  function config(envName) {
    if (!envName) {
      return config;
    }
    if (!environments[envName]) {
      environments[envName] = new Config(config, defaultEnvVar, customizer);
    }
    return environments[envName];
  }

  config.configure = function (env, callback) {
    if (arguments.length === 1) {
      env(this);
    } else {
      callback(this(env));
    }
  };

  config.set = function (setting, value) {
    settings[setting] = value;
    return this;
  };

  config.get = function (setting) {
    if (!settings.hasOwnProperty(setting)) {
      if (parent) {
        return parent.get(setting);
      }
      return undefined;
    }
    return settings[setting];
  };

  config.has = function (setting) {
    return settings.hasOwnProperty(setting) || (!!parent && parent.has(setting));
  };

  Object.defineProperties(config, {
    default: {
      get: function () {
        return config(process.env[defaultEnvVar]);
      },
      enumerable: true
    },

    environments: {
      get: function () {
        return Object.keys(environments);
      }
    },

    settings: {
      get: function () {
        var s = {};
        var allSettings = Object.keys(settings).concat(parent ? parent.settings : []);
        allSettings.forEach(function (setting) {
          s[setting] = 1;
        });
        return Object.keys(s);
      }
    }
  });

  if (customizer) {
    customizer(config);
  }

  return config;
}

function createConfig(options) {
  var defaultEnvVar = (options && options.defaultEnvVar) || null;
  var customizer = (options && options.customizer) || null;

  return new Config(null, defaultEnvVar, customizer);
}

exports.createConfig = createConfig;