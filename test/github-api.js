var githubAPI = require('../src/github-api.js'),
	config = require('./config.json'),
	should = require('should'),
	mocha = require('mocha');

describe('github api requests', function() {
	it('setAuthToken() function is exists', function(done) {
		githubAPI.should.be.have.property('setAuthToken');
		githubAPI.setAuthToken.should.be.type('function');
		done();
	});

	it('getPullRequestInfo() function is exists', function(done) {
		githubAPI.should.be.have.property('getPullRequestInfo');
		githubAPI.getPullRequestInfo.should.be.type('function');
		done();
	});

	it('getPRDescription() function is exists', function(done) {
		githubAPI.should.be.have.property('getPRDescription');
		githubAPI.getPRDescription.should.be.type('function');
		done();
	});

	it('updatePRDescription() function is exists', function(done) {
		githubAPI.should.be.have.property('updatePRDescription');
		githubAPI.updatePRDescription.should.be.type('function');
		done();
	});

	describe('getPullRequestInfo() is running...', function() {
		it('must return pull request details', function(done) {
			githubAPI.getPullRequestInfo(config.user, config.repo, config.prId, function(error, pullRequestInfo) {
				should.not.exist(error);
				pullRequestInfo.should.be.have.property('body');
				pullRequestInfo.should.be.have.property('title');
				done();
			});
		});
	});

	describe('updatePRDescription() is running...', function() {
		it('must update pull request description', function (done) {
			var newPullRequestDescription = 'test Content13_';

			githubAPI.setAuthToken(config.token);
			githubAPI.updatePRDescription(config.user, config.repo, config.prId, newPullRequestDescription, function (error, pullRequestInfo) {
				should.not.exist(error);
				should(pullRequestInfo).be.ok;
				(pullRequestInfo.body).should.equal(newPullRequestDescription);
				done();
			});
		});
	});

	describe('getPRDescription() is running...', function() {
		it('must return pull request description', function(done) {
			githubAPI.getPRDescription(config.user, config.repo, config.prId, function(error, pullRequestDescription) {
				should.not.exist(error);
				should(pullRequestDescription).be.ok;
				done();
			});
		});
	});
});