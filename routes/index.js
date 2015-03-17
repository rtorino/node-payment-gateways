'use strict';

var fs = require('fs');
var path = require('path');
var mixins = require('../utils/mixins');

var routes = {};

fs
	.readdirSync( __dirname )
	.filter(function (file) {
		return (file.indexOf('.') !== 0) && (file !== 'index.js');
	})
	.forEach(function (file) {
		var fileName = mixins.capitalize(path.basename(file, '-routes.js'));
		routes[fileName] = require('./' + file);
	});

module.exports = routes;
