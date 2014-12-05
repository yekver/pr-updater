var github = require('github');

var githubAPI = new github({
	version: "3.0.0",
	timeout: 5000
});

module.exports = {
	setAuthToken: function(authToken) {
		githubAPI.authenticate({
			type: "oauth",
			token: authToken
		});
	},
	getPullRequestInfo: function(user, repo, prId, callback) {
		githubAPI.pullRequests.get({
			user: user,
			repo: repo,
			number: prId
		}, callback);
	},
	getPRDescription: function(user, repo, prId, callback) {
		this.getPullRequestInfo(user, repo, prId, function(error, pullRequestInfo) {
			if(error) {
				return callback(error);
			}

			callback(null, pullRequestInfo.body);
		});
	},
	updatePRDescription: function(user, repo, prId, newContent, callback) {
		this.getPullRequestInfo(user, repo, prId, function(error, pullRequestInfo) {
			if(error) {
				return callback(error);
			}

			githubAPI.pullRequests.update({
				user: user,
				repo: repo,
				number: prId,
				title: pullRequestInfo.title,
				body: newContent
			}, callback);
		});
	}
};