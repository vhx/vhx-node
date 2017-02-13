'use strict';

var resources = {
  customers:      require('./resources/customers'),
  watching:       require('./resources/watching'),
  watchlist:      require('./resources/watchlist'),
  authorizations: require('./resources/authorizations'),
  collections:    require('./resources/collections'),
  products:       require('./resources/products'),
  videos:         require('./resources/videos'),
  analytics:      require('./resources/analytics')
};

function VHX(key, debug) {
  var _this     = this,
      defaults  = require('./defaults')(debug || false),
      pjson     = require('../package.json');

  if (!(_this instanceof VHX)) {
    return new VHX(key, debug);
  }

  _this._api = {
    auth: 'Basic ' + new Buffer(key).toString('base64'),
    host: defaults.HOST,
    protocol: defaults.PROTOCOL,
    version: pjson.version,
    timeout: defaults.TIMEOUT,
    agent: defaults.USER_AGENT
  };

  _this.prepareResources();
}

VHX.prototype = {

  prepareResources: function() {
    var _this = this;

    for (var name in resources) {
      _this[name[0].toLowerCase() + name.substring(1)] = new resources[name](_this);
    }
  }
};

module.exports = VHX;
