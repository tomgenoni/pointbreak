const gulp         = require('gulp')
      sass         = require('gulp-sass')

gulp.task('sass', function () {
  gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/assets/css/'));
});

gulp.task('copy', function () {
  gulp.src([
      'app.html',
      'app.js',
      'manifest.json',
      './assets/**/*.*'
  ],{
     base: './'
  })
  .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function() {
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch(['app.html','assets/**/*.*'], ['copy']);
});

gulp.task('default', ['copy', 'sass', 'watch']);
