const gulp      = require('gulp')
      sass      = require('gulp-sass'),
      concat    = require('gulp-concat'),
      svgSprite = require('gulp-svg-sprite');

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
      './i/*.*',
      './font/*.*',
      './icons/*.*'
  ],{
     base: './'
  })
  .pipe(gulp.dest('./dist/'));
});

gulp.task('js', function() {
  gulp.src([
    './js/dragula.js',
    './js/defaults.js',
    './js/selectors.js',
    './js/listeners.js',
    './js/functions.js',
    './js/renderTemplate.js',
    './js/utility.js'
    ])
    .pipe(concat('pointbreak.js'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('svg', function() {
  gulp.src('./svg/*.svg')
    .pipe(svgSprite({
      mode: {
        symbol: true
      }
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./js/*.*', ['js']);
  gulp.watch('./js/*.*', ['js']);
  gulp.watch(['app.html','i/*.*'], ['copy']);
});

gulp.task('default', ['copy', 'svg', 'sass', 'js', 'watch']);
