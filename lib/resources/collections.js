var Resource = require('../resource');

module.exports = Resource.extend({
  path: 'collections',
  methods: ['create', 'list', 'retrieve', 'items']
});
