'use strict';

var Resource = require('../resource');

module.exports = Resource.extend({
  path: 'watching',
  methods: [
    {
      method: 'items',
      resource: 'customers',
      scope: 'watching'
    }
  ]
});
