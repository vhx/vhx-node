'use strict';

var Resource = require('../resource');

module.exports = Resource.extend({
  path: 'products',
  methods: [
    'all',
    'list',
    'retrieve'
  ]
});
