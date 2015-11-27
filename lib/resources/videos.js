var Resource = require('../vhx.resource');

module.exports = Resource.extend({
  path: 'videos',
  methods: ['create', 'list', 'retrieve']
});;