'use strict';

var Resource = require('../resource');

module.exports = Resource.extend({
  path: 'customers',
  methods: [
    'items',
    {
      method: 'addItem',
      scope: 'watchlist'
    },
    {
      method: 'removeItem',
      scope: 'watchlist'
    }
  ]
});
