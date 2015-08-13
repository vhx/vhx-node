'use strict';

VHX.DEFAULT_HOST = 'api.vhx.tv';
VHX.DEFAULT_PORT = '443';
VHX.DEFAULT_BASE_PATH = '/v1/';
VHX.DEFAULT_API_VERSION = null;

// Use node's default timeout:
VHX.DEFAULT_TIMEOUT = require('http').createServer().timeout;
VHX.PACKAGE_VERSION = require('../package.json').version;

VHX.USER_AGENT = {
  bindings_version: VHX.PACKAGE_VERSION,
  lang: 'node',
  lang_version: process.version,
  platform: process.platform,
  publisher: 'VHX',
  uname: null
};

module.exports = VHX;