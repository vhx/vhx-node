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

    _this.methods.forEach(function(item) {
      var params = {
        resource: _this,
        method: _this.getMethod(item),
        type: _this.getType(_this.path),

      };

      if (item.scope) {
        params.scope = item.scope;
      }
      if (item.resource) {
        params.parentResource = item.resource;
      }

      params.http_method = _this.getHTTPMethod(params.method);

      if (params.method.match(/retrieve|update|listItems|items|listFiles|files/)) {
        _this[params.method] = function() {
          params.args = arguments;
          return new _this.buildMethodWithThreeArgs(params);
        };
      }
      else {
        _this[params.method] = function() {
          params.args = arguments;
          return new _this.buildMethodWithTwoArgs(params);
        };
      }
    });
  },


    buildMethodWithTwoArgs: function(params) {
      var options = {
        http_method: params.http_method,
        client_method: params.method
      };

      options.options = params.args[0];
      options.callback = params.args[1];

      return params.resource.makeRequest.call(params.resource, options);
    },

    buildMethodWithThreeArgs: function(params) {
      var options = {
        http_method: params.http_method,
        client_method: params.method
      };

      if (params.args[0][params.type]) {
       if (params.resource.isCallbackFunction.call(params.resource, params.args[1])) {
         options.callback = params.args[1];
       }
        options.id = params.resource.parseHref.call(params.resource, params.args[0][params.type]);
        delete params.args[0][params.type];
        options.options = params.args[0];
      }
      else {
        options.id = params.resource.parseHref.call(params.resource, params.args[0]);
        if (params.resource.isCallbackFunction.call(params.resource, params.args[1])) {
          options.callback = params.args[1];
        } else {
          options.options = params.args[1];
          options.callback = params.args[2];
        }
      }

      return params.resource.makeRequest.call(params.resource, options);
    },

  getHTTPMethod: function(method) {
    if (method === 'create') {
      return 'post';
    }
    if (method.match(/del|remove/)) {
      return 'del';
    }
    if (method.match(/update|add/)) {
      return 'put';
    }
    return 'get';
  },

  getType: function(resource) {
    if (resource === 'collections') {
      return 'collection';
    }
    if (resource === 'customers' || resource.match(/watching|watchlist/)) {
      return 'customer';
    }
    if (resource === 'videos') {
      return 'video';
    }

    return 'id';
  },

  getMethod: function(params) {
    var _this = this;

    if (_this.isObject(params) && params.method) {
      return params.method;
    }
    else {
      return params;
    }
  },

  parseHref: function(href) {
    var _this = this,
        val;

    if (parseInt(href, 10)) {
      return href;
    }
    else if (href.indexOf(_this._vhx._api.host) >= 0) {
      if (href.substr(-1) === '/') {
        href.substr(0, href.length-1);
      }
      val = href.split('/');
      return val[val.length-1];
    }
  },

  getParams: function(client_method, id, options, scope) {
    var _this = this,
        params = {};

    params.url = _this._vhx._api.protocol + _this._vhx._api.host + '/' + _this.path;
    params.timeout = _this._vhx._api.timeout;
    params.headers = {
      'Authorization': _this._vhx._api.auth,
      'User-Agent': 'VHX/v1 NodeJS/'
    };

    if (client_method.match(/^create$|^update$/)) {
      params.form = options;
    }
    else {
      params.qs = options || null;
    }

    if (!client_method.match(/^list$|^all$|^create$|^report$/)) {
      params.url += '/' + id;
    }
    if (client_method.match(/items/i)) {
      params.url += '/items';
    }
    if (client_method.match(/files/i)) {
      params.url += '/files';
    }
    if (scope) {
      params.url += '/' + scope;
    }

    return params;
  },

  makeRequest: function(args) {
    var _this = this,
        params = _this.getParams(args.client_method, args.id || null, args.options, args.scope);

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

  isObject: function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
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