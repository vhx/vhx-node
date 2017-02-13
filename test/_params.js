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
  site_id: process.env.TEST_SITE_ID,
  product: function() {
    var id = process.env.TEST_PRODUCT_ID;
    return (HREF) ? HREF + 'products/' + id : id;
  },
  customer: function() {
    var id = process.env.TEST_CUSTOMER_ID;
    return (HREF) ? HREF + 'customers/' + id : id;
  },
  video: function() {
    var id = process.env.TEST_VIDEO_ID;
    return (HREF) ? HREF + 'videos/' + id : id;
  },
  collection: function() {
    var id = process.env.TEST_COLLECTION_ID;
    return (HREF) ? HREF + 'collections/' + id : id;
  }
};

module.exports = Params;