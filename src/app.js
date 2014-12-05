#!/usr/bin/env node

var program = require('commander'),
	operations = require('./operations.js'),
	helpers = require('./helpers.js');

program
	.version('0.1.3')
	.option('--pr [number]', 'Pull Request number (required)')
	.option('--section [name]', 'View section text in Pull Request description')
	.option('--delete [section name]', 'Delete section in Pull Request description')
	.option('--clear', 'Clear all sections')
	.parse(process.argv);

try {
	if (!program.pr) {
		return console.error('--pr is required');
	}

	var config = {
		prId: parseInt(program.pr, 10),
		token: helpers.getAuthToken()
	};

	helpers.parseRemoteURL(function(error, result) {
		if(error) {
			throw error;
		}

		config.user = result.user;
		config.repo = result.repo;

		main(config);
	});
} catch(e) {
	console.error(e);
}

function main(config) {
	if(program.section) {
		if(program.delete) {
			operations.removeSection(config, program.section, function(error) {
				if(error) {
					throw error;
				}
			});
		} else {
			if(program.args.length > 0) {
				operations.updateSection(config, program.section, program.args[0], function(error) {
					if(error) {
						throw error;
					}
				});
			} else {
				operations.getSection(config, program.section, function(error, content) {
					if(error) {
						throw error;
					}

					console.log(content);
				});
			}
		}
	} else {
		if(program.clear) {
			operations.removeAllSections(config, function(error) {
				if(error) {
					throw error;
				}
			});
		} else {
			return console.error('--section or --clear is required');
		}
	}
}