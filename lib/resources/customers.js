var Resource = require('../vhx.resource');

module.exports = Resource.extend({
  path: 'customers',
  methods: ['create', 'list', 'retrieve']
});