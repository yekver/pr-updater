var jsdom = require('jsdom'),
	sectionClassName = 'section';

module.exports = {
	getContent: function(id, prDescription, callback) {
		if(!id) {
			return callback('Section ID argument is required!');
		}

		jsdom.env(prDescription, [], function(error, window) {
			if(error) {
				return callback(error);
			}

			var element = window.document.getElementById(id);

			if(!element) {
				return callback('Section doesn\'t exists');
			}

			callback(null, element.innerHTML);
		});
	},
	update: function(id, prDescription, newContent, callback) {
		if(!id) {
			return callback('Section ID argument is required!');
		}

		jsdom.env(prDescription, [], function(error, window) {
			if(error) {
				return callback(error);
			}

			var document = window.document,
				element = document.getElementById(id);

			if(!element) {
				element = document.createElement('div');
				element.id = id;
				element.className = sectionClassName;
				document.body.appendChild(element);
			}

			element.innerHTML = newContent;
			callback(null, document.body.innerHTML);
		});
	},
	remove: function(id, prDescription, callback) {
		if(!id) {
			return callback('Section ID argument is required!');
		}

		jsdom.env(prDescription, [], function(error, window) {
			if(error) {
				return callback(error);
			}

			var document = window.document,
				element = document.getElementById(id);

			if(!element) {
				return callback('Section doesn\'t exists');
			}

			element.parentElement.removeChild(element);
			callback(null, document.body.innerHTML);
		});
	},
	removeAll: function(prDescription, callback) {
		jsdom.env(prDescription, [], function(error, window) {
			if (error) {
				return callback(error);
			}

			var document = window.document,
				elements = document.getElementsByClassName(sectionClassName);

			while(elements.length > 0) {
				elements[0].parentNode.removeChild(elements[0]);
			}

			callback(null, document.body.innerHTML);
		});
	}
};