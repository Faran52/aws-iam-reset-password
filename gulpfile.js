const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');

const SRC = 'src/**/*.js';
const DIST = './dist';

function build() {
  return gulp.src(SRC)
    .pipe(babel())
    .pipe(gulp.dest(DIST));
}

function watch() {
  gulp.watch(SRC, { ignoreInitial: false }, build);
}

function clean() {
  return del('dist');
}

gulp.task('default', watch);
gulp.task(watch);
gulp.task('build', gulp.series(clean, build));
gulp.task(clean);
