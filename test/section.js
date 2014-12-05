var section = require('../src/section.js'),
	should = require('should'),
	mocha = require('mocha');

describe('section functions list', function() {
	it('getContent() function is exists', function (done) {
		section.should.be.have.property('getContent');
		section.getContent.should.be.type('function');
		done();
	});

	it('update() function is exists', function (done) {
		section.should.be.have.property('update');
		section.update.should.be.type('function');
		done();
	});

	it('remove() function is exists', function (done) {
		section.should.be.have.property('remove');
		section.remove.should.be.type('function');
		done();
	});

	it('removeAll() function is exists', function (done) {
		section.should.be.have.property('removeAll');
		section.removeAll.should.be.type('function');
		done();
	});

	describe('getContent() is running...', function() {
		it('must get content of undefined section', function(done) {
			section.getContent('', '<div id="test132" class="section">section_content</div>', function(error, content) {
				error.should.be.equal('Section ID argument is required!');
				should.not.exist(content);
				done();
			});
		});

		it('must get content of specified section', function(done) {
			section.getContent('test132', '<div id="test132" class="section">section_content</div>', function(error, content) {
				should.not.exist(error);
				content.should.be.equal('section_content');
				done();
			});
		});
	});

	describe('update() is running...', function() {
		it('must update content of undefined section', function(done) {
			section.update('', '<div id="test132" class="section">section_content</div>', 'new_section_content', function(error, content) {
				error.should.be.equal('Section ID argument is required!');
				should.not.exist(content);
				done();
			});
		});

		it('must get content of specified section', function(done) {
			section.update('test132', '<div id="test132" class="section">section_content</div>', 'new_section_content', function(error, content) {
				should.not.exist(error);
				content.should.be.equal('<div id="test132" class="section">new_section_content</div>');
				done();
			});
		});
	});

	describe('remove() is running...', function() {
		it('must remove content of undefined section', function(done) {
			section.remove('', '<div id="test132" class="section">section_content</div>', function(error, content) {
				error.should.be.equal('Section ID argument is required!');
				should.not.exist(content);
				done();
			});
		});

		it('must remove content of specified section', function(done) {
			section.remove('test132', 'static_content<div id="test132" class="section">section_content</div> be', function(error, content) {
				should.not.exist(error);
				content.should.be.equal('static_content be');
				done();
			});
		});
	});

	describe('removeAll() is running...', function() {
		it('must remove all sections from text', function(done) {
			 var prDescription = 'basic<div id="test132" class="section">section_content</div> content <div id="test132" class="section">section_content</div>\n123';
			section.removeAll(prDescription, function(error, content) {
				should.not.exist(error);
				content.should.be.equal('basic content \n123');
				done();
			});
		});
	});
});