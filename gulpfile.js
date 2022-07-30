import gulp from 'gulp'
import i18nextParser from './i18next-parser.config'

gulp.task('i18next', () => {
  gulp
    .src('app/**')
    .pipe(
      // eslint-disable-next-line new-cap
      new i18nextParser({
        locales: ['en', 'de'],
        output: 'locales/$LOCALE/$NAMESPACE.json',
      }),
    )
    .pipe(gulp.dest('./'))
})
