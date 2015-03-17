'use strict';

var path = require('path');
var GitHubApi = require('github');
var config = require('../config/config.json');

module.exports = function ( callback ) {
	var repo = process.env.TRAVIS_REPO_SLUG &&
		path.basename( process.env.TRAVIS_REPO_SLUG );
	var PRNumber = process.env.TRAVIS_PULL_REQUEST &&
		JSON.parse( process.env.TRAVIS_PULL_REQUEST );

	if (!repo) {
		throw new Error('exiting because there is no repo');
	}

	if (!PRNumber) {
		throw new Error('exiting because there is no PRNumber');
	}

	var github = new GitHubApi({
		version: '3.0.0',
		timeout: 5000,
		debug: false
	});

	github.authenticate({
		type: 'oauth',
		token: config.github.oauthToken
	});

	github.pullRequests.getFiles({
		user: 'rtorino',
		repo: repo,
		number: PRNumber
	}, function (error, response) {
		if (error) {
			throw new Error(error);
		}

		var files = [];
		response.forEach(function (file) {
			if (file.status !== 'removed') {
				files.push(file.filename);
			}
		});

		callback(error, files);
	});
};
