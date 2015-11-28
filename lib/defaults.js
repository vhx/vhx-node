var DEFAULTS = {};

DEFAULTS.HOST = 'api.vhx.tv';
DEFAULTS.PROTOCOL = 'https://';
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

module.exports = DEFAULTS;
