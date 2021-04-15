const gulp = require('gulp');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const rollup = require('rollup-stream');
const babel = require('gulp-babel');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const replace = require('gulp-replace');
const del = require('del');

const css = () => {
    return gulp.src('dist/css/style.css')
        .pipe(postcss([
            autoprefixer(),
            cssnano()
        ]))
        .pipe(gulp.dest('dist/css'));
};
exports.css = css;

const js = () => {
    return rollup({
        input: 'dist/js/index.js',
        format: 'iife',
    })
        .pipe(source('scripts.js'))
        .pipe(buffer())
        .pipe(babel({
            presets: ['@babel/preset-env'],
        }))
        .pipe(terser())
        .pipe(gulp.dest('dist/js'));
};
exports.js = js;

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

const paths = () => {
    return gulp.src('dist/**/*.html')
        .pipe(replace(
            /(<script) type="module"( src="\/js)\/index(.js">)/, '<script src="/js/scripts.js">'
        ))
        .pipe(gulp.dest('dist'));
};
exports.paths = paths;

const clean = () => {
    return del([
        'dist/js/**/*',
        '!dist/js/scripts.js'
    ]);
};
exports.clean = clean;

const postbuild = gulp.series(
    gulp.parallel(
        css,
        js,
        img,
        paths
    ),
    clean
);
exports.postbuild = postbuild;
