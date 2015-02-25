// specific gulp file

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var prefix = require('gulp-autoprefixer');
var cssmin = require('gulp-csso');
var sass = require('gulp-ruby-sass');
var htmlmin = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var stylish = require('jshint-stylish');
// var compass = require('gulp-compass');


// Set variables

var env,
    outputDir,
    sassStyle;

env = 'development';

if (env === 'development') {
    outputDir = 'app/';
    sassStyle = 'expanded';
} else {
    outputDir = 'dist/';
    sassStyle = 'compressed';
}

// Set specific tasks

// Compile compass and sass

// If use compass use this task to compile Sass/Compass
// !! You must uncomment variable line 13 compass

// gulp.task('compass', function() {
//     return gulp.src('app/sass/*.scss')
//         .pipe(compass({
//             sass: 'app/sass/',
//             css: 'app/css',
//             style: 'expanded'
//         }))
//         .pipe(prefix('last 2 version'))
//         .pipe(gulp.dest('app/css'));
// });

// If you don't use Compass , 
// use this task to compile sass (more fast then compass)

gulp.task('sass', function() {
    gulp.src('app/sass/**/*.scss')
        .pipe(sass({
            style: 'expanded',
            require: ['susy', 'breakpoint']

        }))
        .pipe(prefix('last 2 version'))
        .pipe(gulp.dest('app/css/'));
});

//move image folder in build folder
gulp.task('move', function() {
    return gulp.src('app/images/**/*.*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }]
        }))
        .pipe(gulp.dest('dist/images'));
});

// minify js files
gulp.task('uglify', function() {
    return gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
});

// hinting and linting js files
gulp.task('js', function() {
    return gulp.src('app/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));

});

//minify css files
gulp.task('cssmin', function() {
    return gulp.src('app/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});

//minify html files
gulp.task('htmlmin', function() {
    return gulp.src('app/*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('dist/'));
});

//init browser sync via live reloads
gulp.task('browser', function() {
    browserSync.init(['app/css/**/*.css', 'app/*.html', 'app/js/*.js'], {
        server: {
            baseDir: outputDir
        }
    });
});

// watch file changes
gulp.task('watch', function() {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/js/*.js', ['js']);

});

// specific task such as default and build task
gulp.task('build', ['sass', 'js', 'htmlmin', 'cssmin', 'uglify', 'move']);

gulp.task('default', ['sass', 'js', 'watch', 'browser']);