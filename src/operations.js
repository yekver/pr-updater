var section = require('./section.js'),
	githubAPI = require('./github-api.js');


module.exports = {
	getSection: function(config, id, callback){
		githubAPI.getPRDescription(config.user, config.repo, config.prId, function(error, prDescription){
			if(error){
				return callback(error);
			}

			section.getContent(id, prDescription, callback);
		});
	},
	updateSection: function(config, id, newContent, callback){
		githubAPI.getPRDescription(config.user, config.repo, config.prId, function(error, prDescription){
			if(error){
				return callback(error);
			}

			section.update(id, prDescription, newContent, function(error, updatedContent){
				if(error){
					return callback(error);
				}

				githubAPI.setAuthToken(config.token);
				githubAPI.updatePRDescription(config.user, config.repo, config.prId, updatedContent, callback);
			});
		});
	},
	removeSection: function(config, id, callback){
		githubAPI.getPRDescription(config.user, config.repo, config.prId, function(error, prDescription){
			if(error){
				return callback(error);
			}

			section.remove(id, prDescription, function(error, updatedContent){
				if(error){
					return callback(error);
				}

				githubAPI.setAuthToken(config.token);
				githubAPI.updatePRDescription(config.user, config.repo, config.prId, updatedContent, callback);
			});
		});
	},
	removeAllSections: function(config, callback){
		githubAPI.getPRDescription(config.user, config.repo, config.prId, function(error, prDescription){
			if(error){
				return callback(error);
			}

			section.removeAll(prDescription, function(error, updatedContent){
				if(error){
					return callback(error);
				}

				githubAPI.setAuthToken(config.token);
				githubAPI.updatePRDescription(config.user, config.repo, config.prId, updatedContent, callback);
			});
		});
	}
};