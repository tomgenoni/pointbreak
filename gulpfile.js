const gulp   = require('gulp')
      sass   = require('gulp-sass'),
      concat = require('gulp-concat')

gulp.task('sass', function () {
  gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('copy', function () {
  gulp.src([
      'app.html',
      'app.js',
      'manifest.json',
      './i/*.*'
  ],{
     base: './'
  })
  .pipe(gulp.dest('./dist/'));
});

gulp.task('js', function() {
  gulp.src([
    './js/dragula.js',
    './js/defaults.js',
    './js/functions.js',
    './js/renderTemplate.js',
    './js/utility.js'
    ])
    .pipe(concat('pointbreak.js'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('watch', function() {
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./js/*.*', ['js']);
  gulp.watch(['app.html','i/*.*'], ['copy']);
});

gulp.task('default', ['copy', 'sass', 'js', 'watch']);
