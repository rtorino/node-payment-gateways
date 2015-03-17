'use strict';

var fs = require( 'fs' );
var path = require( 'path' );

module.exports = {
	'loadJSHintConfig': function loadJSHintConfig () {
		return JSON.parse(fs
			.readFileSync(path
				.join(process.cwd(), '.jshintrc'),
				'utf8'));
	}
};
