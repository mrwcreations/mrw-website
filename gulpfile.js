
var gulp = require('gulp'); // Require gulp

var minifyCSS = require('gulp-minify-css'); // Minify the CSS

var minifyHTML = require('gulp-minify-html'); // Minify HTML
var stripDebug = require('gulp-strip-debug'); // Remove debugging stuffs
var uglify = require('gulp-uglify'); // Minify JavaScript
var imagemin = require('gulp-imagemin'); // Minify images
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );


gulp.task('styles', function() {
  gulp.src(['css/**/*.css', '!node_modules/**/*'])
    .pipe(minifyCSS({processImport: false}))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('scripts', function() {
  gulp.src(['js/**/*.js', '!node_modules/**/*'])
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});


gulp.task('html', function() {
  gulp.src(['**/*.html', '!node_modules/**/*', '!mailer/**/*'])
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

gulp.task( 'deploy', function () {

  var conn = ftp.create( {
    host:     'home617787432.1and1-data.host',
    user:     'u84366911-amitnandan',
    password: 'Nandan1!',
    log:      gutil.log,
    idleTimeout: 10000
  } );

  var globs = [
    'dist/**/*',
  ];

  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance

  return gulp.src( globs, { base: '.', buffer: false } )
    .pipe( conn.newer( '/beta' ) ) // only upload newer files
    .pipe( conn.dest( '/beta' ) );

} );

gulp.task('minifyall',['styles', 'scripts', 'html', 'images', 'movefiles']);
