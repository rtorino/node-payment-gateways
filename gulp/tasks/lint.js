'use strict';

var eslint = require('gulp-eslint');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var lintspaces = require('gulp-lintspaces');
var minimist = require('minimist');

var utils = require('../utils');

var sourceFiles = [];
var knownOptions = {
	string: 'target',
	default: {
		target: 'staged'
	}
};

var options = minimist(process.argv.slice(2), knownOptions);

var getFiles = {
	all: utils.getDirFiles,
	staged: utils.getStagedFiles,
	travis: utils.getPullRequestFiles
};

module.exports = function (gulp) {
	gulp.task('loadFiles', function (cb) {
		getFiles[options.target](function (error, filePaths) {
			if (error) {
				cb(error);
			} else {
				sourceFiles = utils.filterFilePaths(filePaths);
				cb(null, sourceFiles);
			}
		});
	});

	gulp.task('eslint', ['loadFiles'], function () {
		var stream = gulp.src(sourceFiles)
			.pipe(eslint())
			.pipe(eslint.format());

		return stream;
	});

	gulp.task('jscs', ['loadFiles'], function () {
		var stream = gulp.src(sourceFiles)
			.pipe(jscs());

		return stream;
	});

	gulp.task('jshint', ['loadFiles'], function () {
		var stream = gulp.src(sourceFiles)
				.pipe(jshint())
				.pipe(jshint.reporter('jshint-stylish'));

		return stream;
	} );

	gulp.task('lintspaces', ['loadFiles'], function () {
		var stream = gulp.src(sourceFiles)
				.pipe(lintspaces({
					newline: true,
					newlineMaximum: 2,
					trailingspaces: true,
					indentation: 'tabs'
				}))
				.pipe(jshint.reporter());

		return stream;
	} );

	gulp.task('lint', ['eslint', 'jshint', 'lintspaces']);
};
