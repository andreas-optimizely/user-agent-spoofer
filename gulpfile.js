'use strict';
const gulp = require("gulp"),
      babel = require("gulp-babel"),
      concat = require("gulp-concat"),
      rename = require('gulp-rename'),
      uglify = require('gulp-uglify'),
      pug = require('gulp-pug'),
      zip = require('gulp-zip');

const DEST = 'build',
      IMAGE_DEST = 'build/images';

gulp.task("default", ['js','manifest','images']);

gulp.task('js', ()=>{
  return gulp.src("src/js/index.js")
    .pipe(babel({presets: ['es2015']}))
    .pipe(concat("app.js"))
    .pipe(gulp.dest(DEST))
    .pipe(concat("app.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(DEST));
});

gulp.task('views', ()=>{
  return gulp.src('src/views/*.pug')
    .pipe(pug({}))
    .pipe(concat("app.html"))
    .pipe(gulp.dest(DEST));
});

gulp.task('manifest', ()=>{
  return gulp.src('manifest.json')
      .pipe(gulp.dest(DEST));
});

gulp.task('images', ()=>{
  return gulp.src('src/images/*')
    .pipe(gulp.dest(IMAGE_DEST));
});

gulp.task('compile:prod', ['default'], () => {
  let date = new Date();
  let dateString = (date.getMonth()+1) + '-' + date.getDate() + '-' + date.getFullYear();
  return gulp.src('build/*')
    .pipe(zip(dateString + '-ua-spoofer-build.zip'))
    .pipe(gulp.dest('prod-build'));
});

gulp.task('watch', function(){
  gulp.watch('src/**', ['default']);
});