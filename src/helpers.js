var exec = require('exec'),
	fs = require('fs');

module.exports = {
	parseRemoteURL: function (callback){
		exec('git ls-remote --get-url', function(error, remoteURL){
			if(error){
				callback(error);
			}

			var rePattern = new RegExp(/^.*\.com\/(.*)\/(.*)\.git/);
			var arrMatches = remoteURL.match(rePattern);

			callback(null, {
				user: arrMatches[1],
				repo: arrMatches[2]
			});
		});
	},
	getAuthToken: function(){
		var configFile = this.getConfigPath();

		if(!configFile){
			throw new Error('Failed to find config file!');
		}

		var config = fs.readFileSync(configFile).toString();
		return JSON.parse(config).authToken;
	},
	getConfigPath: function(){
		var configFileName = "./config.json";

		if (fs.existsSync(configFileName)) {
			return configFileName;
		} else {
			var userHomeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
			var getConfigFilePath = userHomeDir + '/' + configFileName;

			if(fs.existsSync(getConfigFilePath)){
				return getConfigFilePath;
			}
		}

		return false;
	}
};