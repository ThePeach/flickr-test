/* global done */
var gulp = require('gulp')
var browserSync = require('browser-sync').create()

gulp.task('js-watch', function () {
  browserSync.reload()
  done()
})

// Static server
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })

  gulp.watch('js/*.js', ['js-watch'])
  gulp.watch('index.html').on('change', browserSync.reload)
})
