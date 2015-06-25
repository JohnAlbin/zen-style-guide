'use strict';

// Include Gulp and tools we will use.
var gulp      = require('gulp'),
  $           = require('gulp-load-plugins')(),
  del         = require('del'),
  runSequence = require('run-sequence'),

// Task configuration.
  theme       = __dirname + '/',
  styleguide  = __dirname + '/styleguide/',
  scssLintYml = theme + '/.scss-lint.yml',

// Get theme sub-directories from Compass' config.rb.
  compass     = require('compass-options').dirs({'config': theme + 'config.rb'});


// The default task.
gulp.task('default', ['build']);

// #################
// Build everything.
// #################
gulp.task('build', ['styles:production', 'styleguide'], function (cb) {
  // Run linting last, otherwise its output gets lost.
  runSequence(['lint'], cb);
});

// ##########
// Build CSS.
// ##########
gulp.task('styles', ['clean:css'], $.shell.task(
  ['bundle exec compass compile --time --sourcemap --output-style expanded'],
  {cwd: theme}
));

gulp.task('styles:production', ['clean:css'], $.shell.task(
  ['bundle exec compass compile --time --no-sourcemap --output-style compressed'],
  {cwd: theme}
));

// ##################
// Build style guide.
// ##################
gulp.task('styleguide', ['clean:styleguide', 'styleguide:chroma-kss-markup'], $.shell.task(
  ['kss-node --config <%= config %>'],
  {templateData: {config: theme + 'kss-config.json'}}
));

gulp.task('styleguide:chroma-kss-markup', $.shell.task(
  [
    'bundle exec sass --compass --scss --sourcemap=none --style expanded sass/style-guide/chroma-kss-markup.scss css/style-guide/chroma-kss-markup.hbs.tmp',
    'head -n 2  css/style-guide/chroma-kss-markup.hbs.tmp | tail -n 1 > css/style-guide/chroma-kss-markup.hbs',
    'rm css/style-guide/chroma-kss-markup.hbs.tmp'
  ],
  {cwd: theme}
));

// #########################
// Lint Sass and JavaScript.
// #########################
gulp.task('lint', function (cb) {
  runSequence(['lint:js', 'lint:sass'], cb);
});

// Lint JavaScript.
gulp.task('lint:js', $.shell.task(
  ['eslint ./'],
  {
    cwd: __dirname,
    ignoreErrors: true
  }
));

// Lint Sass.
gulp.task('lint:sass', function() {
  return gulp.src(theme + compass.sass + '/**/*.scss')
    .pipe($.scssLint({'bundleExec': true, 'config': scssLintYml}));
});

// ##############################
// Watch for changes and rebuild.
// ##############################
gulp.task('watch', ['clean:css', 'watch:lint-styleguide', 'watch:js'], function (cb) {
  // Since watch:css will never return, call it last (not as dependency.)
  runSequence(['watch:css'], cb);
});

gulp.task('watch:css', $.shell.task(
  // The "watch:css" task CANNOT be used in a dependency, because this task will
  // never end as "compass watch" never completes and returns.
  ['bundle exec compass watch --time --sourcemap --output-style expanded'],
  {cwd: theme}
));

gulp.task('watch:lint-styleguide', ['styleguide', 'lint:sass'], function() {
  return gulp.watch(theme + compass.sass + '/**/*.scss', ['styleguide', 'lint:sass']);
});

gulp.task('watch:js', ['lint:js'], function() {
  return gulp.watch(theme + compass.js + '/**/*.js', ['lint:js']);
});

// ######################
// Clean all directories.
// ######################
gulp.task('clean', ['clean:css', 'clean:styleguide']);

// Clean style guide files.
gulp.task('clean:styleguide', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del([
      styleguide + '*.html',
      styleguide + 'public',
      theme + compass.css + '/**/*.hbs'
    ], {force: true}, cb);
});

// Clean CSS files.
gulp.task('clean:css', function(cb) {
  del([
      theme + '**/.sass-cache',
      theme + compass.css + '/**/*.css',
      theme + compass.css + '/**/*.map'
    ], {force: true}, cb);
});


// Resources used to create this gulpfile.js:
// - https://github.com/google/web-starter-kit/blob/master/gulpfile.js
// - https://github.com/north/generator-north/blob/master/app/templates/Gulpfile.js
