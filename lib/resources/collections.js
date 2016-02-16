'use strict';

var Resource = require('../resource');

module.exports = Resource.extend({
  path: 'collections',
  methods: ['create', 'list', 'all', 'update', 'retrieve', 'listItems', 'items']
});
