'use strict';

var fs = require('fs');
var path = require('path');
var config = require('../config/config.json');

module.exports = function (filePaths, type) {
	type = type || 'ignoredPathsForLinting';

	return filePaths.filter(String).filter(function (filePath) {
		var exists = fs.existsSync(path.resolve(process.cwd(), filePath));

		return exists && (path.extname(filePath) === '.js' ||
			path.extname(filePath) === 'json') &&
			!filePath.match(config.lint[type].join('|'));
	});
};
