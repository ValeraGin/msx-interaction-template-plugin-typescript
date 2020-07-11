'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var tsify = require('tsify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');

var paths = {
    pages: ['src/*.html'],
    styles: ['src/css/*.css'],
};

var b = function() {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
};

var w = watchify(b());

w.on('log', gutil.log);

var bundle = function(pkg) {
    return pkg
        .plugin(tsify)
        .transform('babelify', {
            presets: ['es2015'],
            extensions: ['.ts']
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'))
};

gulp.task('copy-html', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-css', function () {
    return gulp.src(paths.styles)
        .pipe(gulp.dest('dist/css'));
});

var cors = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
};

gulp.task('server:test', function () {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 9000,
        middleware: function () {
            return [cors];
        }
    });
});

gulp.task('watch', function() {
    bundle(w);
    w.on('update', bundle.bind(null, w));
});

gulp.task('build', bundle.bind(null, b()));

gulp.task('default', gulp.parallel(

    gulp.parallel(['copy-html', 'copy-css']),

    gulp.series('watch'),

    gulp.series('server:test'),

));
