var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var php = require('gulp-connect-php');
var compass = require('compass-importer');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var useref = require('gulp-useref');

function onError(err) {
    console.log(err); //or other way you may prefer to log
    this.emit('end');
 };

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./scss/**/*.scss")
        .pipe(plumber(onError))
        .pipe(sourcemaps.init())
        .pipe(sass({ importer: compass }))
        .pipe(sourcemaps.write())
        .pipe(plumber.stop())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});


gulp.task('php', function(){
    php.server({base:'.', port:8010, keepalive:true});
});

// Static Server + watching scss/html files
gulp.task('browserSync',['php'], function() {

    
    browserSync.init({
        proxy:"https://serviceworker.dev",
        https: {
            key: "D:/xampp/apache/conf/service-worker/serviceworker.dev.key",
            cert: "D:/xampp/apache/conf/service-worker/serviceworker.dev.crt"
        },
        host: 'serviceworker.dev',
        open: "external",
        port: 9000,
        notify:false
    });
    
    /*
    browserSync.init({
        proxy:"http://localserviceworker.net",
        host: 'localserviceworker.net',
        open: "external",
        port: 9000,
        notify:false
    });

    */
    gulp.watch("./scss/**/*.scss", ['sass']);
    gulp.watch("./js/**/*.js", browserSync.reload);
    //gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch('./**/*.php', browserSync.reload);
    gulp.watch('./**/*.html', browserSync.reload);
});

gulp.task('serve', ['sass', 'browserSync']);