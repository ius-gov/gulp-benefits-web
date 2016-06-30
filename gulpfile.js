/// <binding />
"use strict";
var gulp = require("gulp");
var sass = require('gulp-sass');
var ts = require("gulp-typescript");
var rename = require("gulp-rename");
var fileExists = require('file-exists');
var requireDir = require('require-dir');

// This is the case it is being used in another gulp file
// So we actually need to require from one level up
if(fileExists("gulp-ius-web/gulpfile.js"))
	requireDir('../gulp-ius-web');
else if (fileExists("node_modules/gulp-ius-web/gulpfile.js"))
	requireDir('node_modules/gulp-ius-web');
else
	console.log("Error loading gulp-ius-web package");

if(fileExists("gulp-appsettings/gulpfile.js"))
	requireDir('../gulp-appsettings');
else if(fileExists("node_modules/gulp-appsettings/gulpfile.js"))
	requireDir('node_modules/gulp-appsettings');
else
	console.log("Error loading gulp-appsettings package");	



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
