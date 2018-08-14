const gulp = require('gulp');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const server = require("browser-sync").create();
const imagemin = require('gulp-imagemin');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const pug = require('gulp-pug');
const rimraf = require('rimraf');

gulp.task('styles', function () {
  return gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sass({
      style: 'compressed'
    }))
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]})
    ]))
    .pipe(gulp.dest('build/static/css/'))
    .pipe(server.stream());
});

gulp.task('pug', function () {
  return gulp.src('src/pages/index.pug')
        .pipe(plumber())
        .pipe(pug({
          pretty:true
        }))
        .pipe(gulp.dest('build'))
        .pipe(server.stream());
});

gulp.task('image', function () {
  return gulp.src('img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/static/img'));
});

gulp.task('scripts', function () {
  return gulp.src('js/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('minjs'))
    .pipe(server.stream());
});

//Watch task
//Watches JS

gulp.task('watch', function () {
  
  server.init({
    server: {
      port: 9000,
      baseDir: "build"
    },
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  
  gulp.watch('js/*.js', gulp.series('scripts'));
  gulp.watch('src/**/**/*.pug', gulp.series('pug'));
  gulp.watch('src/components/**/*.{scss,sass}', gulp.series('styles'));
  gulp.watch('img/*', gulp.series('image'));
  gulp.watch('build/**/*').on('change', server.reload);
});

gulp.task('clean', function del(cb) {
  return rimraf('build', cb);
});

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('styles', 'pug', 'scripts', 'image'),
    gulp.parallel('watch')
    )
);