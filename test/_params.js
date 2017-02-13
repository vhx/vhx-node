'use strict';

// vars
var HREF = process.env.METHOD === 'href' ? 'http://api.crystal.dev/' : false;
var rand = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var Params = {
  name: function() { return 'Customer ' + rand(1, 100) + ' Name'; },
  email: function() { return 'customer' + rand(1, 500) + '@email.com'; },
  description: 'New Description ' + rand(1, 100),
  site_id: '18713',
  product: function() {
    var id = '14444';
    // var id = '158';
    return (HREF) ? HREF + 'products/' + id : id;
  },
  customer: function() {
    var id = '2041065';
    return (HREF) ? HREF + 'customers/' + id : id;
  },
  video: function() {
    var id = '54379';
    return (HREF) ? HREF + 'videos/' + id : id;
  },
  collection: function() {
    var id = '2017';
    return (HREF) ? HREF + 'collections/' + id : id;
  }
};

module.exports = Params;