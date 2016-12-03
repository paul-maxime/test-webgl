'use strict';

var source = require('vinyl-source-stream')
var streamify = require('gulp-streamify')
var browserify = require('browserify')
var babelify = require('babelify')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var gulp = require('gulp')
var del = require('del')

var exitStatus = 0;
process.on('exit', function () {
	if (exitStatus !== 0) {
		process.exit(exitStatus);
	}
});

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
		.on('error', function (err) {
			exitStatus = 1;
			console.log(err.toString());
			this.emit('end');
		})
		.pipe(source('index.js'))
		.pipe(rename('yaje.js'))
		.pipe(gulp.dest('build'))
		.pipe(streamify(uglify()))
		.pipe(rename('yaje.min.js'))
		.pipe(gulp.dest('build'))
});

gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['default']);
});
