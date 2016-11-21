'use strict';

var Resource = require('../resource');

module.exports = Resource.extend({
  path: 'watchlist',
  methods: [
    {
      method: 'items',
      scope: 'watchlist'
    },
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
