'use strict';

function VHX(key, version) {
  var exec = require('child_process').exec;

  if (!(this instanceof VHX)) {
    return new VHX(key, version);
  }

  this._api = {
    auth: null,
    host: VHX.DEFAULT_HOST,
    port: VHX.DEFAULT_PORT,
    protocol: VHX.DEFAULT_PROTOCOL,
    basePath: VHX.DEFAULT_BASE_PATH,
    version: VHX.DEFAULT_API_VERSION,
    timeout: VHX.DEFAULT_TIMEOUT,
    agent: null,
    dev: false
  };

  this._prepResources();
  this.setApiKey(key);
  this.setApiVersion(version);
}

var resources = {
  customers: require('./resources/vhx.customers'),
};

VHX.prototype = {
  _setApiField: function(key, value) {
    this._api[key] = value;
  },

  setHost: function(host, port, protocol) {
    this._setApiField('host', host);
    if (port) {
      this.setPort(port);
    }
    if (protocol) {
      this.setProtocol(protocol);
    }
  },

  setProtocol: function(protocol) {
    this._setApiField('protocol', protocol.toLowerCase());
  },

  setPort: function(port) {
    this._setApiField('port', port);
  },

  setApiVersion: function(version) {
    if (version) {
      this._setApiField('version', version);
    }
  },

  setApiKey: function(key) {
    if (key) {
      this._setApiField(
        'auth',
        'Basic ' + new Buffer(key).toString('base64')
      );
    }
  },

  setTimeout: function(timeout) {
    this._setApiField(
      'timeout',
      timeout === null ? VHX.DEFAULT_TIMEOUT : timeout
    );
  },

  setHttpAgent: function(agent) {
    this._setApiField('agent', agent);
  },

  getApiField: function(key) {
    return this._api[key];
  },

  getConstant: function(c) {
    return VHX[c];
  },

  getClientUserAgent: function(cb) {
    if (VHX.USER_AGENT_SERIALIZED) {
      return cb(VHX.USER_AGENT_SERIALIZED);
    }
    exec('uname -a', function(err, uname) {
      VHX.USER_AGENT.uname = uname || 'UNKNOWN';
      VHX.USER_AGENT_SERIALIZED = JSON.stringify(VHX.USER_AGENT);
      cb(VHX.USER_AGENT_SERIALIZED);
    });
  },

  _prepResources: function() {

    for (var name in resources) {
      this[name[0].toLowerCase() + name.substring(1)] = new resources[name](this);
    }

  }
};

VHX.DEFAULT_HOST = 'api.crystal.dev';
VHX.DEFAULT_PROTOCOL = 'http://';
VHX.DEFAULT_PORT = '7000';
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