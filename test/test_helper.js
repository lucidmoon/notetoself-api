// Set NODE_ENV environment variable to 'testing'
process.env.NODE_ENV = 'testing';

// Global module dependencies
global.chai = require("chai");
global.restify = require("restify");

// Use chai 'should' syntax 
global.chai.should();

// Create global JSON REST client
global.client = restify.createJsonClient({
    version: '*',
    url: 'http://127.0.0.1:3030'
});

// Global setup
before(function(done) {
	require('../server').start();
	done();
});

// Global teardown
after(function(done) {
	require('../server').stop();
	done();
});



