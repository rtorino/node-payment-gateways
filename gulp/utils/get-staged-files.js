'use strict';

var _ = require('lodash-node');
var exec = require('child_process').exec;

module.exports = function getStagedFiles (callback) {
	var cmd = 'git diff --name-only --staged';

	exec(cmd, function handleResult (error, stdout) {
		if (error) {
			callback(error, null);
		}

		var files = _.without(stdout.split('\n'), '', null, undefined);

		callback(null, files);
	} );
};
