/// <binding />
"use strict";
var gulp = require("gulp");
var sass = require('gulp-sass');
var ts = require("gulp-typescript");
var rename = require("gulp-rename");
var fs = require("fs");

fs.stat('gulp-ius-web', function(err,stat){
	if(err == null)
		require('require-dir')('gulp-ius-web');
});

fs.stat('node_modules/gulp-ius-web', function(err,stat){
	if(err == null)
		require('require-dir')('node_modules/gulp-ius-web');
});

fs.stat('gulp-appsettings', function(err,stat){
	if(err == null)
		require('require-dir')('gulp-appsettings');
});

fs.stat('node_modules/gulp-appsettings', function(err,stat){
	if(err == null)
		require('require-dir')('node/modules/gulp-appsettings');
});



var BOWER_COMPONENTS = global.BowerComponents || "wwwroot/lib";

gulp.task('sass', ['sass:benefits', 'sass:ius']);

gulp.task('sass:benefits', function () {
    return gulp.src('./' + BOWER_COMPONENTS + '/Benefits.UX/css/site.scss')
        .pipe(sass())
        .pipe(rename("benefits.css"))
        .pipe(gulp.dest('./wwwroot/app/css'));
});

gulp.task('typescript', ['typescript:ius', 'typescript:benefits']);

gulp.task('typescript:benefits', function () {
    return gulp.src(['./' + BOWER_COMPONENTS + '/Benefits.UX/js/**/*.ts'])
        .pipe(ts({
            noExternalResolve: false
        }))
        .pipe(gulp.dest('./wwwroot/app/Benefits.UX'));
});

gulp.task("build", ['sass', 'typescript', 'concat', 'uglify:js','copyfonts', 'copyimages']);
