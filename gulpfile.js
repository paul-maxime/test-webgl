'use strict';

var source = require('vinyl-source-stream')
var streamify = require('gulp-streamify')
var browserify = require('browserify')
var babelify = require('babelify')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var gulp = require('gulp')
var del = require('del')

var paths = {
	scripts: ['src/**.js']
};

gulp.task('clean', function() {
	return del(['build']);
});

gulp.task('default', ['clean'], function() {
	return browserify('./src/index.js')
		.transform('babelify')
		.bundle()
		.pipe(source('index.js'))
		.pipe(streamify(uglify()))
		.pipe(rename('yaje.min.js'))
		.pipe(gulp.dest('build'))
});

gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['default']);
});
