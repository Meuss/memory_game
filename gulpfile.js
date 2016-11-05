// ===================================
// Required node modules
// ===================================
var gulp            = require('gulp'),                      // use gulp
    sass            = require('gulp-sass'),                 // compiles sass
    plumber         = require('gulp-plumber'),              // prevent pipe breaking in gulp
    autoprefixer    = require('gulp-autoprefixer'),         // autoprefixes css
    browserSync     = require('browser-sync'),              // browser-sync ftw
    reload          = browserSync.reload,                   // variable to reload the browser
    notify          = require('gulp-notify');               // notifications for gulp tasks

// ===================================
// Javascript task:
// ===================================

gulp.task('javascript', function(){
    gulp.src('src/script.js')                           // Source: all .js files
    .pipe(plumber())                                        // Prevent pipe breaking if errors
    .pipe(gulp.dest(''))                          // Destination folder
    .pipe(reload({stream:true}))                            // Reload the browser
    .pipe(notify({ message: 'js minified'}));       // Notification
});

// ===================================
// Sass task
// ===================================

gulp.task('sass', function(){
    gulp.src('src/style.scss')                      // Source: sass file that imports all others
    .pipe(plumber())                                        // Prevent pipe breaking if errors
    .pipe(sass())                                           // Compiles sass
    .pipe(autoprefixer('last 2 versions'))                  // Adds vendor prefixes to css
    .pipe(gulp.dest(''))                          // Destination folder
    .pipe(reload({stream:true}))                            // Reload the browser
    .pipe(notify({ message: 'scss compiled'}));             // Notification
});

// ===================================
// html task
// ===================================

gulp.task('html', function(){
    gulp.src('index.html')                      // Source: sass file that imports all others
    .pipe(plumber())                                        // Prevent pipe breaking if errors
    .pipe(reload({stream:true}))                            // Reload the browser
});
// ===================================
// Browser-sync task
// ===================================

gulp.task('browser-sync', function(){
    browserSync({
        proxy: "localhost:8888"
    });
});

// ===================================
// Watch tasks
// ===================================

gulp.task('watch', function(){
    gulp.watch('src/script.js', ['javascript']);
    gulp.watch('src/style.scss', ['sass']);
    gulp.watch('index.html', ['html']);
});

// ===================================
// Default task
// ===================================

gulp.task('default', ['javascript', 'sass', 'html', 'browser-sync', 'watch']);