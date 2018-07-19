var gulp = require('gulp');
var minify = require('gulp-minify');
var less = require('gulp-less');

var paths = {
  scripts: ['./chessboard.js'],
  styles: ['./chessboard.less'],
};

gulp.task('default', ['minify', 'less'])

gulp.task('minify', function() {
  return gulp.src(paths.scripts)
    .pipe(minify({'preserveComments': 'some'}))
    .pipe(gulp.dest('./'));
});

gulp.task('less', function () {
  return gulp.src(paths.styles)
    .pipe(less())
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['minify']);
  gulp.watch(paths.styles, ['less']);
});