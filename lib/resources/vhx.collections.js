var Resource = require('../vhx.resource');

module.exports = Resource.extend({
  path: 'collections',
  methods: ['create', 'list', 'retrieve']
});