const
    // development mode?
    devBuild = false,

    // modules
    gulp = require('gulp'),
    htmlclean = require('gulp-htmlclean'),
    noop = require('gulp-noop'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),

    // folders
    src = 'src/',
    build = 'public/';

// HTML processing
function html(){
    return gulp.src(src + 'html/**/*')
        .pipe(devBuild ? noop() : htmlclean())
        .pipe(gulp.dest(build));
}

// CSS processing
function css(){
    const out = build + 'assets/css';

    return gulp.src([
            'node_modules/bootstrap/scss/bootstrap.scss',
            src + 'sass/main.scss'
        ])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(out));
}

function watch(done){
    gulp.watch(src + 'html/**/*', html);
    gulp.watch(src + 'sass/**/*', css);

    done();
}

exports.html = html;
exports.css = css;
exports.watch = watch;

exports.build = gulp.parallel(exports.html, exports.css);

exports.default = gulp.series(exports.build, exports.watch);