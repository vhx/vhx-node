'use strict';

var request = require("request");

function Resource(vhx) {
  var _this = this;

  _this._vhx = vhx;
  _this.init();
}

Resource.prototype = {
  init: function() {
    var _this = this;

    _this.methods.forEach(function(method) {
      _this[method] = function(options, callback) {
        var http_method = _this.getHTTPMethod(method);

        _this.makeRequest({
          http_method: http_method,
          client_method: method,
          options: options,
          callback: callback
        });
      };
    });
  },

  getHTTPMethod: function(method) {
    if (method === 'create') {
      return 'post';
    }

    return 'get';
  },

  getParams: function(client_method, options) {
    var _this = this,
        params = {};

    params.url = _this._vhx._api.protocol + _this._vhx._api.host + '/' + _this.path;
    params.headers = {
      'Authorization': _this._vhx._api.auth,
      'User-Agent': 'VHX/v1 NodeJS/'
    };

    if (client_method.match(/create|update/)) {
      params.form = options;
    }
    if (client_method.match(/list|items|retreive/)) {
      params.qs = options;
    }
    if (client_method.match(/items|retrieve/)) {
      delete params.qs.id;
      params.url += '/' + options.id;
    }
    if (client_method === 'items') {
      params.url += '/items';
    }

    return params;
  },

  makeRequest: function(args) {
    var _this = this,
        params = _this.getParams(args.client_method, args.options);

    request[args.http_method](params, function (error, response, body) {
      if (!error && response.statusCode >= 200 && response.statusCode < 300) {
        _this.successHandler({
          body: body,
          callback: args.callback
        });
      } else {
        _this.errorHandler({
          body: body,
          callback: args.callback
        });
      }
    });
  },

  successHandler: function(args) {
    args.callback(false, JSON.parse(args.body));
  },

  errorHandler: function(args) {
    args.callback(true, JSON.parse(args.body));
  }
};

Resource.extend = function(sub) {
  var Super = this,
      hasOwn = {}.hasOwnProperty,
      Constructor;

  Constructor = hasOwn.call(sub, 'constructor') ? sub.constructor : function() {
    Super.apply(this, arguments);
  };

  Constructor.prototype = Object.create(Super.prototype);

  for (var i in sub) {
    if (hasOwn.call(sub, i)) {
      Constructor.prototype[i] = sub[i];
    }
  }

  for (i in Super) {
    if (hasOwn.call(Super, i)) {
      Constructor[i] = Super[i];
    }
  }

  return Constructor;
};

module.exports = Resource;
