'use strict';

var gulp = require('gulp');
var loadTasks = require('gulp-load')(gulp);

// load tasks from tasks directory and
// dependencies of start with `gulp-` in package.json
loadTasks('./gulp');

gulp.task('default', ['lint'], function () {} );
