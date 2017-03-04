const gulp = require('gulp')
const precss = require('precss')
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()

gulp.task('build')

gulp.task('js-watch', function (done) {
  browserSync.reload()
  done()
})

gulp.task('sass', function () {
  return gulp.src('src/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['node_modules/susy/sass']
    }))
    .pipe(postcss([ precss, autoprefixer ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('src/css/'))
})

// Static server
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './src/'
    }
  })

  gulp.watch('src/js/*.js', ['js-watch'])
  gulp.watch('src/sass/**/*', ['sass']).on('change', browserSync.reload)
  gulp.watch('src/index.html').on('change', browserSync.reload)
})
