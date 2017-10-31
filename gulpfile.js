var gulp = require('gulp'); // Require gulp

var minifyCSS = require('gulp-minify-css'); // Minify the CSS

var minifyHTML = require('gulp-minify-html'); // Minify HTML
var stripDebug = require('gulp-strip-debug'); // Remove debugging stuffs
var uglify = require('gulp-uglify'); // Minify JavaScript
var imagemin = require('gulp-imagemin'); // Minify images

gulp.task('styles', function() {
  gulp.src('css/**/*.css')
    .pipe(minifyCSS({processImport: false}))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('scripts', function() {
  gulp.src(['js/**/*.js'])
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});


gulp.task('html', function() {
  gulp.src('**/*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
  gulp.src('images/**/*')
  .pipe(imagemin({
    progressive: true,
  }))
  .pipe(gulp.dest('dist/images'));
});

gulp.task('movefiles', function() {
	gulp.src('.htaccess')
	 .pipe(gulp.dest('dist/'));
	gulp.src('css/font-awesome/fonts/*.*')
	 .pipe(gulp.dest('dist/css/font-awesome/fonts/'));
});

gulp.task('minifyall',['styles', 'scripts', 'html', 'images', 'movefiles']);
