'use strict';

/* set .env / logger
..................................... */
require('dotenv').load();

var params = require('./_params');
var vhx = require('../lib/vhx')(process.env.TEST_API_KEY, true);

// Require test suite dependencies
var chai = require('chai');
var expect = chai.expect;

describe('Watchlist', function() {

  describe('List all videos', function() {
    it('it should GET all videos in customer\'s watchlist', function(done) {
      vhx.watchlist.items(params.customer(), function(err, videos) {
        expect(videos).to.be.a('object');
        expect(videos).to.be.property('_links');
        expect(videos).to.be.property('_embedded');
        expect(videos).to.be.property('count');
        expect(videos._embedded).to.be.property('items');
        done();
      });
    });
  });

  describe('Add to queue', function() {
    it('it should ADD a video to customer\'s watchlist queue', function(done) {
      vhx.watchlist.addItem(params.customer(), {
        video: params.video()
      }, { 'VHX-X-Header': 'foo' }, function(err) {
        expect(err).to.equal(false);
        done();
      });
    });
  });

  describe('Remove from queue', function() {
    it('it should REMOVE a video from customer\'s watchlist queue', function(done) {
      vhx.watchlist.addItem(params.customer(), {
        video: params.video()
      }, function() {
        vhx.watchlist.removeItem(params.customer(), {
          video: params.video()
        }, function(err) {
          expect(err).to.equal(false);
          done();
        });
      });
    });
  });

});