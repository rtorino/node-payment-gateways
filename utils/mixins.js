'use strict';

var utils = {};

utils.capitalize = function(str) {
	str = str === null ? '' : String(str);

	return str.charAt(0).toUpperCase() + str.slice(1);
};

module.exports = utils;
