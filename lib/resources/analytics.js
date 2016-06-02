'use strict';

var Resource = require('../resource');

module.exports = Resource.extend({
  path: 'analytics',
  methods: [
    'report'
  ]
});
