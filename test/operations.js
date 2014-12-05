var operations = require('../src/operations.js'),
	config = require('./config.json'),
	should = require('should'),
	mocha = require('mocha');

describe('application operations list', function() {
	it('getSection() function is exists', function (done) {
		operations.should.be.have.property('getSection');
		operations.getSection.should.be.type('function');
		done();
	});

	it('updateSection() function is exists', function (done) {
		operations.should.be.have.property('updateSection');
		operations.updateSection.should.be.type('function');
		done();
	});

	it('removeSection() function is exists', function (done) {
		operations.should.be.have.property('removeSection');
		operations.removeSection.should.be.type('function');
		done();
	});

	it('removeAllSections() function is exists', function (done) {
		operations.should.be.have.property('removeAllSections');
		operations.removeAllSections.should.be.type('function');
		done();
	});

	describe('getSection() is running...', function() {
		it('must get a non existing pull request section', function(done) {
			operations.getSection(config, 'test_section123', function(error, content) {
				error.should.be.equal('Section doesn\'t exists');
				done();
			});
		});
	});

	describe('updateSection() is running...', function() {
		it('must add/update pull request section', function(done) {
			var newContent = 'TestContent';
			operations.updateSection(config, 'upd_sect', newContent, function(error, pullRequestInfo) {
				should.not.exist(error);
				(pullRequestInfo.body).should.be.containEql('upd_sect');
				(pullRequestInfo.body).should.be.containEql(newContent);
				done();
			});
		});
	});

	describe('removeSection() is running...', function() {
		it('must remove pull request section', function(done) {
			operations.removeSection(config, 'upd_sect', function(error, pullRequestInfo) {
				should.not.exist(error);
				(pullRequestInfo.body).should.not.be.containEql('upd_sect');
				done();
			});
		});
	});

	describe('removeAllSections() is running...', function() {
		it('must remove all pull request sections', function(done) {
			operations.removeAllSections(config, function(error, pullRequestInfo) {
				should.not.exist(error);
				(pullRequestInfo.body).should.not.be.containEql('class="section');
				done();
			});
		});
	});
});