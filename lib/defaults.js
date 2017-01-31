'use strict';

var defaults = function(debug) {
  var DEFAULTS = {};

  DEFAULTS.HOST = debug ? 'api.crystal.dev' : 'api.vhx.tv';
  DEFAULTS.PROTOCOL = debug ? 'http://' : 'https://';
  DEFAULTS.API_VERSION = null;
  DEFAULTS.TIMEOUT = require('http').createServer().timeout;
  DEFAULTS.PACKAGE_VERSION = require('../package.json').version;

  DEFAULTS.USER_AGENT = {
    bindings_version: DEFAULTS.PACKAGE_VERSION,
    lang: 'node',
    lang_version: process.version,
    platform: process.platform,
    publisher: 'VHX'
  };

  return DEFAULTS;
};

module.exports = defaults;
