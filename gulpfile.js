const gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    csso = require('gulp-csso'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    webp = require('gulp-webp'),
    del = require('del'),
    imageResize = require('gulp-image-resize'),
    browserSync = require('browser-sync').create();

const cutImg = () => {
    return gulp.src('src/img/name/*.jpg')
        .pipe(imageResize({
            width: 458 * 2,
            height: 300 * 2,
            crop : true
        }))
        .pipe(rename({ suffix: '-size' }))
        .pipe(gulp.dest('src/img/name/size/'));
};
exports.cutImg = cutImg;

const scss = () => {
    return gulp.src('src/scss/style.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.stream());
        // .pipe(csso())
        // .pipe(rename({ suffix: '.min' }))
        // .pipe(gulp.dest('dist/css/'))
};
exports.scss = scss;

const js = () => {
    return gulp.src('src/js/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.stream());
        // .pipe(uglify())
        // .pipe(rename({ suffix: '.min' }))
        // .pipe(gulp.dest('dist/static/js'))
};
exports.js = js;

const img = () => {
    return gulp.src('src/img/**/*.{jpg,png,svg}')
        .pipe(imagemin([
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.svgo({
                plugins: [
                    {cleanupIDs: true}
                ]
            })
        ]))
        .pipe(gulp.dest('dist/img'))
        .pipe(webp())
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream());
};
exports.img = img;

const fonts = () => {
    return gulp.src('src/fonts/**/*.woff2')
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.stream());
};
exports.fonts = fonts;

const clear = () => {
    return del('dist');
};
exports.clear = clear;

const cp = require("child_process");
const render = () => {
    return cp.spawn("npx", ["eleventy", "--quiet"], { stdio: "inherit" });
};
exports.render = render;

const reload = (done) => {
    browserSync.reload();
    done();
};
const watch = () => {
    browserSync.init({
        server: 'dist'
    });

    gulp.watch('src/scss/**/*.scss', gulp.series(scss));
    gulp.watch('src/js/**/*.js', gulp.series(js));
    gulp.watch('src/img/**/*{jpg,png,svg}', gulp.series(img));
    gulp.watch('src/fonts/**/*{woff,woff2}', gulp.series(fonts));
    gulp.watch('src/**/*{html,njk,md,njk}', gulp.series(render, reload));
};
exports.watch = watch;

const build = gulp.series(
    clear,
    gulp.parallel(
        render,
        scss,
        js,
        fonts,
        img
    ),
);
exports.build = build;

exports.default = gulp.series(
    build,
    watch
);
