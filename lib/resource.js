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
      var http_method = _this.getHTTPMethod(method),
          params = {
            http_method: http_method,
            client_method: method
          };

      if (method.match(/retrieve|update|items|files/)) {
        _this[method] = function(id, options, callback) {
          if (id.id && _this.isFunction(options)) {
            params.callback = options;
            params.id = id.id;
            delete options.id;
            params.options = id;
          }
          else {
            params.id = id;
            if (_this.isFunction(options)) {
              params.callback = options;
            } else {
              params.options = options;
              params.callback = callback;
            }
          }

          _this.makeRequest(params);
        };
      }
      else {
        _this[method] = function(options, callback) {
          params.options = options;
          params.callback = callback;

          _this.makeRequest(params);
        };
      }
    });
  },

  getHTTPMethod: function(method) {
    if (method === 'create') {
      return 'post';
    }
    if (method === 'update') {
      return 'put';
    }
    return 'get';
  },

  getParams: function(client_method, id, options) {
    var _this = this,
        params = {};

    params.url = _this._vhx._api.protocol + _this._vhx._api.host + '/' + _this.path;
    params.timeout = _this._vhx._api.timeout;
    params.headers = {
      'Authorization': _this._vhx._api.auth,
      'User-Agent': 'VHX/v1 NodeJS/'
    };

    if (client_method.match(/create|update/)) {
      params.form = options;
    }
    if (client_method.match(/list|items|retrieve|files/)) {
      params.qs = options;
    }
    if (client_method.match(/retrieve|items|update|files/)) {
      params.url += '/' + id;
    }
    if (client_method.match(/items/)) {
      params.url += '/items';
    }
    if (client_method.match(/files/)) {
      params.url += '/files';
    }

    return params;
  },

  makeRequest: function(args) {
    var _this = this,
        params = _this.getParams(args.client_method, args.id || null, args.options);

    if (_this.isCallbackFunction(args.options)) {
      args.callback = args.options;
    }

    request[args.http_method](params, function (error, response, body) {
      if (error && error.code === 'ETIMEDOUT') {
        _this.errorHandler({
          status: 408,
          body: '{"message": "The request timed out.","documentation_url": "http://dev.vhx.tv/docs/api"}',
          callback: args.callback
        });
      }
      else if (!error && response.statusCode >= 200 && response.statusCode < 300) {
        _this.successHandler({
          body: body || null,
          callback: args.callback
        });
      }
      else {
        _this.errorHandler({
          status: response.statusCode,
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
    var error = JSON.parse(args.body),
        error_types = {
          400: 'VHXInvalidRequestError',
          401: 'VHXAuthenticationError',
          404: 'VHXResourceNotFound',
          408: 'VHXConnectionError',
          500: 'VHXAPIError'
        };

    error.status = args.status;
    error.type = error_types[error.status];
    args.callback(error, null);
  },

  isCallbackFunction: function(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  },

  isFunction: function(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
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
