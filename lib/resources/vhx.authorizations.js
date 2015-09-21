function Authorizations(vhx) {
  var _this = this,
      request = require("request");

  _this.create = function(options, callback) {
    var request_params = {
      url: vhx._api.protocol + vhx._api.host + '/authorizations',
      headers: {
        'Authorization': vhx._api.auth,
        'User-Agent': 'VHX/v1 NodeJS/'
      },
      form: options || {}
    };

    request.post(request_params, function (error, response, body) {
      if (!error && response.statusCode >= 200 && response.statusCode < 300) {
        callback(false, JSON.parse(body));
      } else {
        callback(true, JSON.parse(body));
      }
    });
  };
}

module.exports = Authorizations;