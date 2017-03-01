'use strict';

/* set .env / logger
..................................... */
require('dotenv').load();

var params = require('./_params');
var vhx = require('../lib/vhx')(process.env.TEST_API_KEY, true);

//Require the dev-dependencies
var chai = require('chai');
var expect = chai.expect;

describe('Customers', function() {

  describe('List all customers', function() {
    it('it should GET all customers', function(done) {
      vhx.customers.all({}, function(err, customers) {
        expect(customers).to.be.a('object');
        expect(customers).to.be.property('_links');
        expect(customers).to.be.property('_embedded');
        expect(customers).to.be.property('count');
        expect(customers._embedded).to.be.property('customers');
        done();
      });
    });
    it('it should GET all customers with a header', function(done) {
      vhx.customers.all({}, { 'VHX-X-Header': 'foo' }, function(err, customers) {
        expect(customers).to.be.a('object');
        expect(customers).to.be.property('_links');
        expect(customers).to.be.property('_embedded');
        expect(customers).to.be.property('count');
        expect(customers._embedded).to.be.property('customers');
        done();
      });
    });
  });

  describe('Retrieve a customer', function() {
      it('it should GET a single customer', function(done) {
        vhx.customers.retrieve(params.customer(), function(err, customer) {
          expect(customer).to.be.a('object');
          expect(customer).to.be.property('_links');
          expect(customer).to.be.property('_embedded');
          expect(customer).to.be.property('email');
          expect(customer).to.be.property('name');
          expect(customer._embedded).to.be.property('products');
          done();
        });
      });
      it('it should GET a single customer with a header', function(done) {
        vhx.customers.retrieve(params.customer(), { 'VHX-X-Header': 'foo' }, function(err, customer) {
          expect(customer).to.be.a('object');
          expect(customer).to.be.property('_links');
          expect(customer).to.be.property('_embedded');
          expect(customer).to.be.property('email');
          expect(customer).to.be.property('name');
          expect(customer._embedded).to.be.property('products');
          done();
        });
      });
  });

  describe('Create a customer', function() {
    it('it should create a customer', function(done) {
      var email = params.email();
      var name = params.name();

      vhx.customers.create({ name: name, email: email }, function(err, customer) {
        expect(customer).to.be.a('object');
        expect(customer).to.be.property('_links');
        expect(customer).to.be.property('_embedded');
        expect(customer.name).to.equal(name);
        expect(customer.email).to.equal(email);
        done();
      });
    });

    it('it should create a customer with a header', function(done) {
      var emailWithHeader = params.email();
      var nameWithHeader = params.name();

      vhx.customers.create({ name: nameWithHeader, email: emailWithHeader }, { 'VHX-X-Header': 'foo' }, function(err, customer) {
        expect(customer).to.be.a('object');
        expect(customer).to.be.property('_links');
        expect(customer).to.be.property('_embedded');
        expect(customer.name).to.equal(nameWithHeader);
        expect(customer.email).to.equal(emailWithHeader);
        done();
      });
    });
  });

  describe('Update a customer', function() {
    it('it should update a customer', function(done) {
      var name = params.name();
      vhx.customers.update(params.customer(), { name: name }, function(err, updatedCustomer) {
        expect(updatedCustomer).to.be.a('object');
        expect(updatedCustomer).to.be.property('_links');
        expect(updatedCustomer).to.be.property('_embedded');
        expect(updatedCustomer.name).to.equal(name);
        done();
      });
    });

    it('it should update a customer with a header', function(done) {
      var name = params.name();
      vhx.customers.update(params.customer(), { name: name }, { 'VHX-X-Header': 'foo' }, function(err, updatedCustomer) {
        expect(updatedCustomer).to.be.a('object');
        expect(updatedCustomer).to.be.property('_links');
        expect(updatedCustomer).to.be.property('_embedded');
        expect(updatedCustomer.name).to.equal(name);
        done();
      });
    });
  });

  describe('Delete a customer', function() {
    it('it should delete a customer', function(done) {
      vhx.customers.create({ name: params.name(), email: params.email() }, function(err, customer) {
        vhx.customers.del(customer.id, function(err) {
          expect(err).to.equal(false);
          done();
        });
      });
    });
  });

  describe('Add a product to a customer', function() {
    it('it should add a product to a customer', function(done) {
      vhx.customers.create({ name: params.name(), email: params.email() }, function(err, customer) {
        vhx.customers.addProduct(customer.id, { product: params.product() }, function(err, updatedCustomer) {
          expect(updatedCustomer).to.be.property('_embedded');
          expect(updatedCustomer._embedded.products).to.be.instanceof(Array);
          expect(updatedCustomer._embedded.products[0].id).to.equal(parseInt(params.product(), 10));
          done();
        });
      });
    });
  });

  describe('Remove a product from a customer', function() {
    it('it should remove a product from a customer', function(done) {
      vhx.customers.create({ name: params.name(), email: params.email() }, function(err, customer) {
        vhx.customers.addProduct(customer.id, { product: params.product() }, function() {
          vhx.customers.removeProduct(customer.id, { product: params.product() }, function(err, updatedCustomer) {
            expect(updatedCustomer).to.be.property('_embedded');
            expect(updatedCustomer._embedded.products).to.be.instanceof(Array);
            expect(updatedCustomer._embedded.products).to.have.lengthOf(0);
            done();
          });
        });
      });
    });
  });
});