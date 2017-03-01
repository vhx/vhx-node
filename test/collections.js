'use strict';

/* set .env / logger
..................................... */
require('dotenv').load();

var params = require('./_params');
var vhx = require('../lib/vhx')(process.env.TEST_API_KEY, true);

//Require the dev-dependencies
var chai = require('chai');
var expect = chai.expect;

describe('Collections', function() {

  describe('List all collections', function() {
    it('it should GET all collections', function(done) {
      vhx.collections.all({}, { 'VHX-X-Header': 'foo' }, function(err, collections) {
        expect(collections).to.be.a('object');
        expect(collections).to.be.property('_links');
        expect(collections).to.be.property('_embedded');
        expect(collections).to.be.property('count');
        expect(collections._embedded).to.be.property('collections');
        done();
      });
    });
  });

  describe('Retrieve a collection', function() {
      it('it should GET a single collection', function(done) {
        vhx.collections.retrieve(params.collection(), function(err, collection) {
          expect(collection).to.be.a('object');
          expect(collection).to.be.property('_links');
          expect(collection).to.be.property('_embedded');
          done();
        });
      });
  });

  describe('Create a collection', function() {
    it('it should create a collection', function(done) {
      vhx.collections.create({ name: 'My Collection', type: 'series' }, function(err, collection) {
        expect(collection).to.be.a('object');
        expect(collection).to.be.property('_links');
        expect(collection).to.be.property('_embedded');
        expect(collection.name).to.equal('My Collection');
        done();
      });
    });
  });

  describe('Update a collection', function() {
    it('it should update a collection', function(done) {

      vhx.collections.update(params.collection(), { description: params.description }, { 'VHX-X-Header': 'foo' }, function(err, updatedCollection) {
        expect(updatedCollection).to.be.a('object');
        expect(updatedCollection).to.be.property('_links');
        expect(updatedCollection).to.be.property('_embedded');
        expect(updatedCollection.description).to.equal(params.description);
        done();
      });
    });
  });

});