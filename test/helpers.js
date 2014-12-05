var helpers = require('../src/helpers.js'),
	should = require('should'),
	mocha = require('mocha');

describe('helpers list', function() {
	it('parseRemoteURL() function is exists', function (done) {
		helpers.should.be.have.property('parseRemoteURL');
		helpers.parseRemoteURL.should.be.type('function');
		done();
	});

	it('getAuthToken() function is exists', function (done) {
		helpers.should.be.have.property('getAuthToken');
		helpers.getAuthToken.should.be.type('function');
		done();
	});

	it('getConfigPath() function is exists', function (done) {
		helpers.should.be.have.property('getConfigPath');
		helpers.getConfigPath.should.be.type('function');
		done();
	});

	describe('getConfigPath() is running...', function() {
		it('must return full path to config file', function(done) {
			var configPath = helpers.getConfigPath();

			should(configPath).be.ok;
			should(configPath).endWith('config.json');
			done();
		});
	});

	describe('getAuthToken() is running...', function() {
		it('must return github authorization token', function(done) {
			var authToken = helpers.getAuthToken();

			should(authToken).be.ok;
			done();
		});
	});

	describe('parseRemoteURL() is running...', function() {
		it('must return user and repository name', function(done) {
			helpers.parseRemoteURL(function(error, result) {
				should.not.exist(error);
				result.should.be.have.property('user');
				result.should.be.have.property('repo');
				should(result.user).be.ok;
				should(result.repo).be.ok;

				done();
			});
		});
	});
});