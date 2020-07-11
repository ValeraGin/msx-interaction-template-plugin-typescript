var gulp = require('gulp');
var browserify = require('browserify');
var connect = require('gulp-connect');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');

var paths = {
    pages: ['src/*.html'],
    styles: ['src/css/*.css'],
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



gulp.task('default', gulp.series(
 //   gulp.parallel('copy-html'),
//    gulp.parallel('copy-css'),
    function () {
        return watchify(browserify({
                basedir: '.',
                debug: true,
                entries: ['src/main.ts'],
                cache: {},
                packageCache: {}
            })
        )
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
            .pipe(connect.reload());
    },
    gulp.parallel('server:test')
    )
);
