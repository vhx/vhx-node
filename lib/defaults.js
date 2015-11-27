var DEFAULTS = {};

DEFAULTS.HOST = 'api.crystal.dev';
DEFAULTS.PROTOCOL = 'http://';
DEFAULTS.PORT = '7000';
DEFAULTS.BASE_PATH = '/v1/';
DEFAULTS.API_VERSION = null;
DEFAULTS.TIMEOUT = require('http').createServer().timeout;
DEFAULTS.PACKAGE_VERSION = require('../package.json').version;

DEFAULTS.USER_AGENT = {
  bindings_version: DEFAULTS.PACKAGE_VERSION,
  lang: 'node',
  lang_version: process.version,
  platform: process.platform,
  publisher: 'VHX',
  uname: null
};

module.exports = DEFAULTS;
