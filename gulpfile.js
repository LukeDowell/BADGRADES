/**
 * Created by Luke on 2/23/2016.
 */
(function() {
    'use strict';

    var gulp = require('gulp');

    var paths = {
        index: ['./public/index.html']
    };

    gulp.task('watch', function() {
        gulp.watch(['./public/**/*'], ['wiredep']);
    });

    gulp.task('wiredep', function() {
        require('wiredep')({
            src: paths.index
        });
    });

})();
