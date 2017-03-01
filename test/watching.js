'use strict';

/* set .env / logger
..................................... */
require('dotenv').load();

var params = require('./_params');
var vhx = require('../lib/vhx')(process.env.TEST_API_KEY, true);

// Require test suite dependencies
var chai = require('chai');
var expect = chai.expect;

describe('Watching', function() {

  describe('List all videos', function() {
    it('it should GET all videos being watched', function(done) {
      vhx.watching.items(params.customer(), { 'VHX-X-Header': 'foo' }, function(err, videos) {
        expect(videos).to.be.a('object');
        expect(videos).to.be.property('_links');
        expect(videos).to.be.property('_embedded');
        expect(videos).to.be.property('count');
        expect(videos._embedded).to.be.property('items');
        done();
      });
    });
  });

});