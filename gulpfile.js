const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');

const SRC = 'src/**/*.js';
const LIB = './lib';

function build() {
  return gulp.src(SRC)
    .pipe(babel())
    .pipe(gulp.dest(LIB));
}

function watch() {
  gulp.watch(SRC, { ignoreInitial: false }, build);
}

function clean() {
  return del('lib');
}

gulp.task('default', watch);
gulp.task(watch);
gulp.task('build', gulp.series(clean, build));
gulp.task(clean);
