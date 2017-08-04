const gulp = require('gulp')
const mocha = require('gulp-mocha')
var mochaC = mocha({
  reporter: 'mochawesome'
})

gulp.task('default', () =>
  gulp.src('./spec/**/*.spec.js', {read: false})

    .pipe(mochaC)
)
