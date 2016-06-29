/// <binding />
"use strict";
var gulp = require("gulp");

var requireDir = require('require-dir')('node_modules/gulp-ius-web');
var requireDir = require('require-dir')('node_modules/gulp-appsettings');

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
