'use strict';

var Resource = require('../resource');

module.exports = Resource.extend({
  path: 'customers',
  methods: [
    'create',
    'list', 'all',
    'update',
    'retrieve',
    'del',
    {
      method: 'addProduct',
      scope: 'products'
    },
    {
      method: 'removeProduct',
      scope: 'products'
    }]
});
