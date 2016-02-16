'use strict';

var Resource = require('../resource');

module.exports = Resource.extend({
  path: 'customers',
  methods: ['create', 'list', 'update', 'retrieve', 'del']
});
