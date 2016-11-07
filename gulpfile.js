const gulp = require("gulp"),
      babel = require("gulp-babel"),
      concat = require("gulp-concat"),
      rename = require('gulp-rename'),
      uglify = require('gulp-uglify'),
      pug = require('gulp-pug');

const DEST = 'build',
      IMAGE_DEST = 'build/images';

gulp.task("default", function () {
  return gulp.src("src/js/index.js")
    .pipe(babel({presets: ['es2015']}))
    .pipe(concat("app.js"))
    .pipe(gulp.dest(DEST))
    .pipe(concat("app.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(DEST));
});

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

gulp.task('watch', function(){
  gulp.watch('src/**', ['js','views', 'manifest', 'images']);
});