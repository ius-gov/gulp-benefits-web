/// <binding />
"use strict";
var gulp = require("gulp");
var concat = require("gulp-concat");
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var bower = require('gulp-bower');
var clean = require("gulp-clean");
var ts = require("gulp-typescript");
var debug = require('gulp-debug');

// Set the global.Filename to override this
var OUTPUT_FILE_NAME = global.FileName || "site";

gulp.task("clean", ["clean:app", "clean:js", "clean:css"]);

gulp.task('clean:app', function () {
    return gulp.src('./wwwroot/app')
        .pipe(clean());
});

gulp.task("clean:js", function () {
    return gulp.src('./wwwroot/js/*.js')
        .pipe(clean());
});

gulp.task("clean:css", function () {
    return gulp.src("./wwwroot/css/*.css")
        .pipe(clean());
});

gulp.task("clean:bower", function () {
    return gulp.src('./wwwroot/lib')
        .pipe(clean());
});

gulp.task("concat", ["concat:js", "concat:css"]);


gulp.task('concat:js', ['typescript'], function () {
    return gulp.src([
            './wwwroot/lib/jquery/dist/jquery.js',
            './wwwroot/lib/jquery-ui/jquery-ui.js',
            './wwwroot/lib/jquery-validation/dist/jquery.validate.js',
            './wwwroot/lib/jquery-validation/dist/additional-methods.js',
            './wwwroot/lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.js',
            './wwwroot/lib/datatables/media/js/dataTables.js',
            './wwwroot/lib/system.js/dist/system.js',
            './wwwroot/app/iUS.UX/*.js'
    ])
    .pipe(debug())
        .pipe(concat(OUTPUT_FILE_NAME + '.js'))
        .pipe(gulp.dest('./wwwroot/js/'));
});

gulp.task('concat:css', ['sass'], function () {
    return gulp.src([
            './wwwroot/lib/pure/pure.css',
            './wwwroot/lib/pure/grids-responsive.css',
            './wwwroot/lib/iUS.UX/fonts/icomoon/style.css',
            './wwwroot/lib/iUS.UX/css/external/jquery-ui.css',
            './wwwroot/lib/iUS.UX/css/external/jquery-ui.theme.css',
            './wwwroot/app/css/ius.css',
            './wwwroot/app/css/benefits.css'
    ])
        .pipe(concat(OUTPUT_FILE_NAME + '.css'))
        .pipe(gulp.dest('./wwwroot/css/'));
});

gulp.task('uglify:js', ['concat:js'], function () {
    return gulp.src('./wwwroot/js/*.js')
        .pipe(debug())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./wwwroot/js/'));
});

gulp.task('sass', ['sass:benefits', 'sass:ius']);

gulp.task('sass:benefits', function () {
    return gulp.src('./wwwroot/lib/Benefits.UX/css/site.scss')
        .pipe(sass())
        .pipe(rename("benefits.css"))
        .pipe(gulp.dest('./wwwroot/app/css'));
});

gulp.task('sass:ius', function () {
    return gulp.src('./wwwroot/lib/iUs.UX/scss/ius.scss')
        .pipe(sass())
        .pipe(rename("ius.css"))
        .pipe(gulp.dest('./wwwroot/app/css'));
});

gulp.task('typescript', ['typescript:ius', 'typescript:benefits']);

gulp.task('typescript:ius', function () {
    return gulp.src(['./wwwroot/lib/iUS.UX/typescript/**/*.ts'])
        .pipe(ts({
            noExternalResolve: false
        }))
        .pipe(gulp.dest('./wwwroot/app/iUS.UX'));
});

gulp.task('typescript:benefits', function () {
    return gulp.src(['./wwwroot/lib/Benefits.UX/js/**/*.ts'])
        .pipe(ts({
            noExternalResolve: false
        }))
        .pipe(gulp.dest('./wwwroot/app/Benefits.UX'));
});

gulp.task('appsettings', function() {
        return gulp.src(["./wwwroot/lib/BenefitsAppSettings/*.json"])
            .pipe(debug())
            .pipe(gulp.dest('./Configuration/'));
});

gulp.task('watch', function () {
    gulp.watch('./wwwroot/**/*.ts', ['typescript']);
    gulp.watch('./wwwroot/**/*.scss', ['sass']);
});

gulp.task('bower', function () {
    return bower();
});

gulp.task("build", ['sass', 'typescript', 'concat', 'uglify:js']);