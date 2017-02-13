'use strict';

/* set .env / logger
..................................... */
require('dotenv').load();

var params = require('./_params');
var vhx = require('../lib/vhx')(process.env.TEST_API_KEY, true);

//Require the dev-dependencies
var chai = require('chai');
var expect = chai.expect;

describe('Authorizations', function() {

  describe('Create an authorization', function() {
    it('it should CREATE an authorization for playback', function(done) {
      vhx.authorizations.create({
        customer: params.customer(),
        video: params.video()
      }, function(err, authorization) {
        expect(authorization).to.be.a('object');
        expect(authorization).to.be.property('_links');
        expect(authorization).to.be.property('_embedded');
        expect(authorization).to.be.property('token');
        expect(authorization).to.be.property('player');
        done();
      });
    });
  });

});