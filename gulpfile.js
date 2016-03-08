/**
 * Created by Luke on 2/23/2016.
 */
'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');
var sass = require('gulp-sass');
var angularFilesort = require('gulp-angular-filesort');

var path = {
    index: './public/index.html',
    styles: [
        './public/stylesheets/**/*.css',
        './public/bower_components/angular-material/angular-material.css'],
    sass: [
        './public/stylesheets/**/*.scss',
        './public/scripts/**/*.scss'],
    scripts: [
        './public/scripts/app/**/*.js',
        './public/scripts/components/**/*.js',
        './public/scripts/vendors/**/*.js']
};

gulp.task('sass', function() {
    return gulp.src(path.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('watch', function() {
    gulp.watch(path.scripts, ['scripts']);
    gulp.watch(path.sass, ['sass']);
    gulp.watch(path.styles, ['styles']);
});

gulp.task('wiredep', function() {

    // Bower components
    require('wiredep')({
        src: path.index
    });

    // Styles
    gulp.src(path.index)
        .pipe(inject(
            gulp.src(path.styles),
            {
                relative: true
            }
        ))
        .pipe(gulp.dest('public'));

    // App and angular
    gulp.src(path.index)
        .pipe(inject(
            gulp.src(path.scripts).pipe(angularFilesort()),
            {
                relative: true
            }
        ))
        .pipe(gulp.dest('public'));

});


gulp.task('default', ['wiredep']);
