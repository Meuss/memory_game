// ===================================
// Required node modules
// ===================================
let gulp = require('gulp'),                      // use gulp
  sass = require('gulp-sass'),                 // compiles sass
  plumber = require('gulp-plumber'),              // prevent pipe breaking in gulp
  autoprefixer = require('gulp-autoprefixer'),         // autoprefixes css
  browserSync = require('browser-sync'),              // browser-sync ftw
  reload = browserSync.reload,                   // variable to reload the browser
  notify = require('gulp-notify'),               // notifications for gulp tasks
  babel = require('gulp-babel');                // babel

// ===================================
// Javascript task:
// ===================================

gulp.task('javascript', () => {
  gulp.src('src/script.js')                               // Source
    .pipe(plumber())                                        // Prevent pipe breaking if errors
    .pipe(babel({                                           // Babel to transpile es6
      presets: ['es2015'],
    }))
    .pipe(gulp.dest('./compiled'))                          // Destination folder
    .pipe(reload({ stream: true }))                            // Reload the browser
    .pipe(notify({ message: 'js compiled' }));               // Notification
});

// ===================================
// Sass task
// ===================================

gulp.task('sass', () => {
  gulp.src('src/style.scss')                              // Source
    .pipe(plumber())                                        // Prevent pipe breaking if errors
    .pipe(sass())                                           // Compiles sass
    .pipe(autoprefixer('last 2 versions'))                  // Adds vendor prefixes to css
    .pipe(gulp.dest('./compiled'))                          // Destination folder
    .pipe(reload({ stream: true }))                            // Reload the browser
    .pipe(notify({ message: 'scss compiled' }));             // Notification
});

// ===================================
// html task
// ===================================

gulp.task('html', () => {
  gulp.src('index.html')                                  // Source
    .pipe(plumber())                                        // Prevent pipe breaking if errors
    .pipe(reload({ stream: true }))                            // Reload the browser
    .pipe(notify({ message: 'html reloaded' }));             // Notification
});
// ===================================
// Browser-sync task
// ===================================

gulp.task('browser-sync', () => {
  browserSync({
    proxy: 'localhost:8888',
  });
});

// ===================================
// Watch tasks
// ===================================

gulp.task('watch', () => {
  gulp.watch('src/script.js', ['javascript']);
  gulp.watch('src/style.scss', ['sass']);
  gulp.watch('index.html', ['html']);
});

// ===================================
// Default task
// ===================================

gulp.task('default', ['javascript', 'sass', 'html', 'browser-sync', 'watch']);
