'use strict';

var resources = {
  customers:      require('./resources/customers'),
  authorizations: require('./resources/authorizations'),
  collections:    require('./resources/collections'),
  videos:         require('./resources/videos')
};

function VHX(key, version) {
  var _this     = this,
      defaults  = require('./defaults'),
      pjson     = require('../package.json');

  if (!(_this instanceof VHX)) {
    return new VHX(key, version);
  }

  _this._api = {
    auth: 'Basic ' + new Buffer(key).toString('base64'),
    host: defaults.HOST,
    port: defaults.PORT,
    protocol: defaults.PROTOCOL,
    basePath: defaults.BASE_PATH,
    version: pjson.version,
    timeout: defaults.TIMEOUT,
    agent: null
  };

  _this.prepareResources();
}

VHX.prototype = {

  getClientUserAgent: function(cb) {
    var exec = require('child_process').exec;

    if (VHX.USER_AGENT_SERIALIZED) {
      return cb(VHX.USER_AGENT_SERIALIZED);
    }
    exec('uname -a', function(err, uname) {
      VHX.USER_AGENT.uname = uname || 'UNKNOWN';
      VHX.USER_AGENT_SERIALIZED = JSON.stringify(VHX.USER_AGENT);
      cb(VHX.USER_AGENT_SERIALIZED);
    });
  },

  prepareResources: function() {
    var _this = this;

    for (var name in resources) {
      _this[name[0].toLowerCase() + name.substring(1)] = new resources[name](_this);
    }
  }
};

module.exports = VHX;
