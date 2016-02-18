'use strict';

var Resource = require('../resource');

module.exports = Resource.extend({
  path: 'collections',
  methods: [
    'create',
    'all', 'list',
    'update',
    'retrieve',
    'items', 'listItems'
  ]
});
