'use strict';

/* set .env / logger
..................................... */
require('dotenv').load();

var params = require('./_params');
var vhx = require('../lib/vhx')(process.env.TEST_API_KEY, true);

//Require the dev-dependencies
var chai = require('chai');
var expect = chai.expect;

describe('Videos', function() {

  describe('List all videos', function() {
    it('it should GET all videos', function(done) {
      vhx.videos.all({}, function(err, videos) {
        expect(videos).to.be.a('object');
        expect(videos).to.be.property('_links');
        expect(videos).to.be.property('_embedded');
        expect(videos).to.be.property('count');
        expect(videos._embedded).to.be.property('videos');
        done();
      });
    });
  });

  describe('Retrieve a video', function() {
      it('it should GET a single video', function(done) {
        vhx.videos.retrieve(params.video(), function(err, video) {
          expect(video).to.be.a('object');
          expect(video).to.be.property('_links');
          expect(video).to.be.property('_embedded');
          expect(video._embedded).to.be.property('files');
          done();
        });
      });
  });

  describe('Create a video', function() {
    it('it should create a video', function(done) {
      vhx.videos.create({ title: 'My Video' }, function(err, video) {
        expect(video).to.be.a('object');
        expect(video).to.be.property('_links');
        expect(video).to.be.property('_embedded');
        expect(video.title).to.equal('My Video');
        expect(video._embedded).to.be.property('files');
        done();
      });
    });
  });

  describe('Update a video', function() {
    it('it should update a video', function(done) {
      var desc = 'New Description ' + Math.random();
      vhx.videos.update(params.video(), { description: desc }, function(err, updatedVideo) {
        expect(updatedVideo).to.be.a('object');
        expect(updatedVideo).to.be.property('_links');
        expect(updatedVideo).to.be.property('_embedded');
        expect(updatedVideo.description).to.equal(desc);
        expect(updatedVideo._embedded).to.be.property('files');
        done();
      });
    });
  });

  describe('Retrieve a Video\'s Files', function() {
    it('it should retrieve all files for a video', function(done) {
      vhx.videos.files(params.video(), function(err, files) {
        expect(files).to.be.a('array');
        expect(files).to.have.deep.property('[0].size');
        expect(files).to.have.deep.property('[0].format');
        expect(files).to.have.deep.property('[0].quality');
        done();
      });
    });
  });

});