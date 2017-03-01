'use strict';

/* set .env / logger
..................................... */
require('dotenv').load();

var params = require('./_params');
var vhx = require('../lib/vhx')(process.env.TEST_API_KEY, true);

//Require the dev-dependencies
var chai = require('chai');
var expect = chai.expect;

describe('Analytics', function() {

  describe('Retrieve reports', function() {
    it('it should GET an income report', function(done) {
      vhx.analytics.report({
        type: 'income_statement',
        from: '2016-10-01',
        to: 'today'
      }, { 'VHX-X-Header': 'foo' }, function(err, report) {
        expect(report).to.be.a('object');
        expect(report).to.be.property('_links');
        expect(report).to.be.property('data');
        expect(report.data).to.be.property('revenue');
        expect(report.data).to.be.property('expenses');
        done();
      });
    });

    it('it should GET an traffic report', function(done) {
      vhx.analytics.report({
        type: 'traffic',
        from: '1-month-ago',
        to: 'today'
      }, function(err, report) {
        expect(report).to.be.a('object');
        expect(report).to.be.property('_links');
        expect(report).to.be.property('data');
        expect(report.data).to.be.property('geo');
        expect(report.data).to.be.property('referrers');
        done();
      });
    });

    it('it should GET a units aggregate report', function(done) {
      vhx.analytics.report({
        type: 'units',
        from: '2016-07-19',
        to: '2016-07-20'
      }, function(err, report) {
        expect(report).to.be.a('object');
        expect(report).to.be.property('_links');
        expect(report).to.be.property('data');
        expect(report.data).to.be.property('products');
        done();
      });
    });

    it('it should GET a units time series report', function(done) {
      vhx.analytics.report({
        type: 'units',
        from: '2016-07-19',
        to: '2016-07-20',
        by: 'day'
      }, { 'VHX-X-Header': 'foo' }, function(err, report) {
        expect(report).to.be.a('object');
        expect(report).to.be.property('_links');
        expect(report).to.be.property('data');
        expect(report.data).to.be.a('array');
        expect(report.data[0]).to.be.property('timestamp');
        expect(report.data[0]).to.be.property('products');
        done();
      });
    });

    it('it should GET a subscribers aggregate report', function(done) {
      vhx.analytics.report({
        type: 'subscribers',
        from: '2016-07-19',
        to: '2016-07-20'
      }, function(err, report) {
        expect(report).to.be.a('object');
        expect(report).to.be.property('_links');
        expect(report).to.be.property('data');
        expect(report.data).to.be.property('trend_metrics');
        done();
      });
    });

    it('it should GET a subscribers time series report', function(done) {
      vhx.analytics.report({
        type: 'subscribers',
        from: '2016-07-19',
        to: '2016-07-20',
        by: 'day'
      }, { 'VHX-X-Header': 'foo' }, function(err, report) {
        expect(report).to.be.a('object');
        expect(report).to.be.property('_links');
        expect(report).to.be.property('data');
        expect(report.data).to.be.a('array');
        expect(report.data[0]).to.be.property('timestamp');
        expect(report.data[0]).to.be.property('free_trial_created');
        done();
      });
    });

    it('it should GET a churn aggregate report', function(done) {
      vhx.analytics.report({
        type: 'churn',
        from: '2016-07-19',
        to: '2016-07-20'
      }, function(err, report) {
        expect(report).to.be.a('object');
        expect(report).to.be.property('_links');
        expect(report).to.be.property('data');
        expect(report.data).to.be.property('pause_reasons');
        done();
      });
    });

    it('it should GET a churn time series report', function(done) {
      vhx.analytics.report({
        type: 'churn',
        from: '2016-07-20',
        to: '2016-08-20',
        by: 'month'
      }, { 'VHX-X-Header': 'foo' }, function(err, report) {
        expect(report).to.be.a('object');
        expect(report).to.be.property('_links');
        expect(report).to.be.property('data');
        expect(report.data).to.be.a('array');
        expect(report.data[0]).to.be.property('timestamp');
        expect(report.data[0]).to.be.property('pause_reasons');
        done();
      });
    });

    it('it should GET a video aggregate report', function(done) {
      vhx.analytics.report({
        type: 'video',
        video_id: params.video(),
        from: '2016-07-19',
        to: '2016-07-20'
      }, function(err, report) {
        expect(report).to.be.a('object');
        expect(report).to.be.property('_links');
        expect(report).to.be.property('data');
        expect(report.type).to.equal('video');
        expect(report.data).to.be.a('array');
        expect(report.data[0]).to.be.property('plays');
        done();
      });
    });

    it('it should GET a video time series report', function(done) {
      vhx.analytics.report({
        type: 'video',
        video_id: params.video(),
        from: '2016-07-19',
        to: '2016-07-20',
        by: 'day'
      }, function(err, report) {
        expect(report).to.be.a('object');
        expect(report).to.be.property('_links');
        expect(report).to.be.property('data');
        expect(report.type).to.equal('video');
        expect(report.data).to.be.a('array');
        expect(report.data[0]).to.be.property('interval_timestamp');
        done();
      });
    });

  });
});