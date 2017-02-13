'use strict';

/* set .env / logger
..................................... */
require('dotenv').load();

var params = require('./_params');
var vhx = require('../lib/vhx')(process.env.TEST_API_KEY, true);

//Require the dev-dependencies
var chai = require('chai');
var expect = chai.expect;

describe('Products', function() {

  describe('List all products', function() {
    it('it should GET all products', function(done) {
      vhx.products.all({}, function(err, products) {
        expect(products).to.be.a('object');
        expect(products).to.be.property('_links');
        expect(products).to.be.property('_embedded');
        expect(products).to.be.property('count');
        expect(products._embedded).to.be.property('products');
        done();
      });
    });
  });

  describe('Retrieve a product', function() {
      it('it should GET a single product', function(done) {
        vhx.products.retrieve(params.product(), function(err, product) {
          expect(product).to.be.a('object');
          expect(product).to.be.property('_links');
          expect(product).to.be.property('price');
          expect(product).to.be.property('is_active');
          done();
        });
      });
  });

  // describe('Create a product', function() {
  //   it('it should create a product', function(done) {
  //     vhx.products.create({ title: 'My Product' }, function(err, product) {
  //       expect(product).to.be.a('object');
  //       expect(product).to.be.property('_links');
  //       expect(product).to.be.property('_embedded');
  //       expect(product.title).to.equal('My Product');
  //       expect(product._embedded).to.be.property('files');
  //       done();
  //     });
  //   });
  // });

  // describe('Update a product', function() {
  //   it('it should update a product', function(done) {
  //     var desc = 'New Description ' + Math.random();
  //     vhx.products.update(54379, { description: desc }, function(err, updatedProduct) {
  //       expect(updatedProduct).to.be.a('object');
  //       expect(updatedProduct).to.be.property('_links');
  //       expect(updatedProduct).to.be.property('_embedded');
  //       expect(updatedProduct.description).to.equal(desc);
  //       expect(updatedProduct._embedded).to.be.property('files');
  //       done();
  //     });
  //   });
  // });

});