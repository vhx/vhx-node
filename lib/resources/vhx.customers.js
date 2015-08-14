function Customers(vhx) {
  var _this = this,
      request = require("request");

  _this.create = function(obj) {
    var options = {
          url: vhx._api.protocol + vhx._api.host + '/customers',
          headers: {
            'Authorization': vhx._api.auth
          },
          qs: params
        },
        params = {
          // TODO need a way to make call to api without a site
          site_id: 2019,
          user: {
            email: obj.email,
            name: obj.name.first + ' ' + obj.name.last
          }
        };

    if (obj.subscription) {
      params.subscription_id = obj.subscription
    }

    request.post(options, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        // callback(JSON.parse(body));
        console.log(error);
        console.log(response);
        console.log(body);
      } else {
        console.log(response);
      }
    });
  };

  _this.update = function(uid, obj) {
    var params = {
      site_id: 2019,
      user_id: uid,
      subscription_id: obj.subscription
    };

    var options = {
      url: vhx._api.protocol + vhx._api.host + '/customers',
      headers: {
        'Authorization': vhx._api.auth
      },
      qs: params
    };

    request.put(options, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        // callback(JSON.parse(body));
        console.log(error);
        console.log(response);
        console.log(body);
      } else {
        console.log(response);
      }
    });
  };

  _this.authorize = function(uid, obj, callback) {
    var params = {
          site_id: 2019,
          user_id: uid,
          video_id: obj.video
        };

    var options = {
      url: vhx._api.protocol + vhx._api.host + '/customers/authorize',
      headers: {
        'Authorization': vhx._api.auth
      },
      qs: params
    };

    request.get(options, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log('success');
        callback(JSON.parse(body));
      } else {
      }
    });
  };
}

module.exports = Customers;