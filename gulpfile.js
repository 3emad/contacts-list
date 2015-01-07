var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    fixmyjs = require('gulp-fixmyjs'),
    uncss = require('gulp-uncss-task'),
    del = require('del'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    karma = require('gulp-karma'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    gutil = require('gulp-util');;

// consider
// https://www.npmjs.org/package/critical
// before fixmyjs
// https://github.com/beautify-web/js-beautify

function handleError(err) {
    console.error(err.toString());
    this.emit('end');
}

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "app"
        },
        open: false,
        host: "192.168.2.21",
        port: 8080
    });
});

// var testFiles = ['app/**/*.js','test/**/*.js'];
var testFiles = [
    //'test/spec/controllers/**/*.js'
];
gulp.task('test', function() {
  // Be sure to return the stream
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

gulp.task('styles', function() {
    return gulp.src('app/styles/*.scss')
        .pipe(sass({
            style: 'expanded'
        }))
        .on('error', handleError)
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('app/styles'))
        .pipe(uncss({
            html: "app/**/*.html" // post processed scss html uncs
        }))
        //.pipe(gulp.dest('dist/assets/css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

gulp.task('scripts', function() {
    return gulp.src('app/scripts/**/*.js')
        //.pipe(fixmyjs()) // fix my js
        .pipe(gulp.dest("app/scripts"))
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});

gulp.task('images', function() {
    return gulp.src('app/images/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(notify({
            message: 'Images task complete'
        }));
});

gulp.task('build', function() {
    // copy views over
    gulp.src('app/views/**/*')
        .pipe(gulp.dest('dist/views'))
        .pipe(notify({
            message: 'Partials task complete'
        }));

    gulp.src('./app/index.html')
    .pipe(usemin({
        css: [minifycss(), rev()],
        //html: [minifyHtml({empty: true})],
        js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('clean', function(cb) {
    //del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
    del(['dist/assets/*',], cb);
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});

gulp.task('test', function() {
  gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});

gulp.task('watch', ['browser-sync'], function() {
    // Watch .scss files
    gulp.watch('app/styles/**/*.scss', ['styles']);
    // Watch .js files
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    // Watch .html files
    gulp.watch('app/views/**/*.html');
    // Watch image files
    gulp.watch('app/images/**/*', ['images']);
    // Create LiveReload server
    livereload.listen();
    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);
});

function startExpress(env) {
    var express = require('express');
    var app = express();
    app.use(express.static(__dirname + '/' + env));
    app.listen(8081);
    gutil.log(gutil.colors.yellow('http://localhost:8081/'));
}

gulp.task('serve', function() {
    startExpress('dist');
});

gulp.task('dev', function() {
    startExpress('app');
});
