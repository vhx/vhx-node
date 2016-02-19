'use strict';

var Resource = require('../resource');

module.exports = Resource.extend({
  path: 'videos',
  methods: [
    'create',
    'all', 'list',
    'retrieve',
    'files', 'listFiles'
  ]
});
