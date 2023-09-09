const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const { series } = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const rev = require('gulp-rev');

function minifyCss() {
  console.log('Minifying CSS');
  return gulp
    .src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));
}

// Define rev task
function revision() {
  console.log('Revising CSS');
  return gulp
    .src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(
      rev.manifest({
        cwd: 'public',
        merge: true,
      })
    )
    .pipe(gulp.dest('./public/assets'));
}

const buildCss = series(minifyCss, revision);

module.exports = {
  css: buildCss,
};



//npm uninstall gulp-rev
//npm install gulp-rev@9.0.0
