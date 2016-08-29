"use strict";
var gulp = require("gulp");
var sass = require('gulp-sass');
var ts = require("gulp-typescript");
var rename = require("gulp-rename");
var requireDir = require('require-dir');
var path = require('path');
var debug = require('gulp-debug');

var iusPath = path.join(process.cwd(), 'node_modules/gulp-benefits-web/node_modules/gulp-ius-web');
var ius = requireDir(iusPath);

var appSettingsPath = path.join(process.cwd(), 'node_modules/gulp-benefits-web/node_modules/gulp-appsettings');
var appSettings = requireDir(appSettingsPath);

var BOWER_COMPONENTS = global.BowerComponents || "wwwroot/lib";

gulp.task("sass", ["sass:local-app", "concat:benefits-css"]);

gulp.task("concat", ["concat:js", "concat:css","copy:benefits-js"]);

gulp.task("copy:benefits-js", function () {
    return gulp.src([
            "./" + BOWER_COMPONENTS + "/Benefits.UX/scripts/dist/*.js"
    ])
    .pipe(debug())
        .pipe(gulp.dest("./wwwroot/app/Benefits.UX/"));
});


gulp.task("concat:benefits-css", function(){
    return gulp.src(["./" + BOWER_COMPONENTS + "/Benefits.UX/css/site.css"])
        .pipe(debug())
        .pipe(rename("benefits.css"))
        .pipe(gulp.dest("./wwwroot/css/"));
});

gulp.task('typescript', ['typescript:app']);

gulp.task('typescript:app', function() {
      return gulp.src(['./Scripts/**/*.ts'])
        .pipe(debug())
        .pipe(ts({
            noExternalResolve: false
        }))
        .pipe(gulp.dest('./wwwroot/js/Scripts'));
});

gulp.task("build", ['sass', 'typescript', 'concat', 'uglify:js','copyfonts', 'copyimages']);
