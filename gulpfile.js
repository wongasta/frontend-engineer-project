var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var uglifycss = require('gulp-uglifycss');
var ngAnnotate = require('gulp-ng-annotate');

var paths = {
  lib: [
    'bower_components/jquery/jquery.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js', 
    'bower_components/lodash/lodash.js',
    'bower_components/moment/moment.js',
    'bower_components/angular-messages/angular-messages.js',
    'bower_components/ng-dialog/js/ngDialog.js',
    'bower_components/AngularJS-Toaster/toaster.js',
    'bower_components/angular-local-storage/dist/angular-local-storage.js'
  ],
  ng: ['ng/**/*.js'],
  lintjs: ['ng/**/*.js'],
  sass: ['sass/**/*.sass', 'sass/**/*.scss'],
  css: [
    'css/reset.css',
    'bower_components/bootstrap/dist/css/bootstrap.css',
    'bower_components/font-awesome/css/font-awesome.css',
    'bower_components/ng-dialog/css/ngDialog.css',
    'bower_components/ng-dialog/css/ngDialog-theme-plain.css',
    'bower_components/AngularJS-Toaster/toaster.css'
  ]
};

// Error handler
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('lint', function() {
  return gulp.src(paths.lintjs)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
  return gulp.src(paths.sass)
    .pipe(compass({
      config_file: 'config.rb',
      sass: 'sass',
      css: 'dist/con'
    }))
    .on("error", handleError)
    .pipe(gulp.dest('dist/min'));
});

gulp.task('css', function(){
  return gulp.src(paths.css)
    .pipe(uglifycss({
      "max-line-len": 80
    }))
    .pipe(concat('csslib.css'))
    .pipe(gulp.dest('dist/min'))
});

gulp.task('scripts', function() {
  return gulp.src(paths.lib)
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/con'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .on("error", handleError)
    .pipe(gulp.dest('dist/min'));
});

gulp.task("ng", function () {
  return gulp.src(paths.ng)
    .pipe(concat('ngall.js'))
    .pipe(ngAnnotate())
    .on("error", handleError)
    .pipe(gulp.dest('dist/con'))
    .pipe(rename('ng.min.js'))
    .pipe(uglify({mangle: true}))
    .pipe(gulp.dest('dist/min'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.ng, ['ng']);
});

gulp.task('icons', function() {
  return gulp.src('bower_components/font-awesome/fonts/**.*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('default', ['sass', 'scripts', 'ng', 'css', 'icons', 'watch']);

