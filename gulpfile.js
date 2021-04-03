const gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    cssnano = require('cssnano'),
    autoprefixer = require('autoprefixer'),
    imagemin = require('gulp-imagemin');

const css = () => {
    return gulp.src('dist/css/style.css')
        .pipe(postcss([
            autoprefixer(),
            cssnano()
        ]))
        .pipe(gulp.dest('dist/css'));
};
exports.css = css;

const img = () => {
    return gulp.src('dist/**/*.{jpg,png,svg}', {
        base: 'dist',
    })
        .pipe(imagemin([
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.svgo({
                plugins: [
                    {cleanupIDs: true}
                ]
            })
        ]))
        .pipe(gulp.dest('dist'));
};
exports.img = img;

const postbuild = gulp.series(
    gulp.parallel(
        css,
        img
    ),
);
exports.postbuild = postbuild;
