'use strict';

var Resource = require('../resource');

module.exports = Resource.extend({
  path: 'watchlist',
  methods: [
    {
      method: 'items',
      resource: 'customers',
      scope: 'watchlist'
    },
    {
      method: 'addItem',
      resource: 'customers',
      scope: 'watchlist'
    },
    {
      method: 'removeItem',
      resource: 'customers',
      scope: 'watchlist'
    }
  ]
});
