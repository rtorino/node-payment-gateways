'use strict';

var _ = require('lodash-node');
var parseArgs = require('minimist');
var readdirp = require('readdirp');

module.exports = function (callback) {
	var files = [];
	var argv = parseArgs(process.argv.slice(2));

	if (argv.dir) {
		return readdirp({
			root: argv.dir,
			fileFilter: '*.js'
		}, function (errors, entries) {
			if (errors) {
				errors.forEach(function (error) {
					console.error('Error: ', error);
				});
			}

			_.forEach(entries.files, function (file) {
				files.push(file.fullPath);
			});

			callback(null, files);
		});
	}

	if (argv.file) {
		callback(null, files);
	}
};
