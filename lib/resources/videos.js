'use strict';

var Resource = require('../resource');

module.exports = Resource.extend({
  path: 'videos',
  methods: ['create', 'list', 'retrieve', 'listFiles', 'files']
});
