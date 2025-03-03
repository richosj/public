import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import { deleteSync } from 'del';
import gulp from 'gulp';
import cached from 'gulp-cached';
import concat from 'gulp-concat';
import fileInclude from 'gulp-file-include';
import plumber from 'gulp-plumber';
import postCss from 'gulp-postcss';

import gulpSass from 'gulp-sass';
import sassModern from 'sass'; // 최신 Sass 모듈을 sass-modern으로 설정
import sourcemaps from 'gulp-sourcemaps';

import imagemin from 'gulp-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminOptipng from 'imagemin-optipng';



const sassCompiler = gulpSass(sassModern); // sass-modern으로 컴파일러 설정

const server = browserSync.create();

const paths = {
  includeHtml: 'src/html/include/**/*.html',
  html: 'src/html/**/*.html',
  scss: 'src/assets/css',
  js: 'src/assets/js/**/*.js',
  vendorJs: 'src/assets/js/vendor/**/*',
  jsCP: 'src/assets/js/components/**/*',
  images: 'src/assets/images/**/*',
  dist: 'dist',
  distCss: 'dist/assets/css',
  distJs: 'dist/assets/js',
  distVendorJs: 'dist/assets/js/vendor',
  distCpJs: 'dist/assets/js/components',
  distImages: 'dist/dfip/static/front/common/images',
  fonts: 'src/assets/font/**/*',
  distFonts: 'dist/assets/font',
};

// Clean task
function clean() {
  return new Promise((resolve) => {
    deleteSync([paths.dist]);
    resolve();
  });
}

// HTML task
function html() {
  return gulp.src([paths.html, `!${paths.includeHtml}`])
    .pipe(plumber())
    .pipe(fileInclude({ 
      prefix: '@@',
      basepath: '@file',
      context: {
        title: null,
        title2: null,
      }
    })) 
    .pipe(cached('html'))
    .pipe(gulp.dest(paths.dist))
    .pipe(server.stream());
}


// SCSS task
function styles() {
  return gulp.src(`${paths.scss}/**/*.scss`, { allowEmpty: true })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sassCompiler({ outputStyle: 'expanded', sourceMap: true }).on('error', sassCompiler.logError))
    .pipe(postCss([autoprefixer()]))  // cssnano() 제거
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.distCss))
    .pipe(server.stream());
}

// JavaScript task
function scripts() {
  return gulp.src([
      paths.js, // 일반 JS 파일
      `!${paths.vendorJs}`, // vendor 제외
      `!${paths.jsCP}` // components 제외
    ])
    .pipe(plumber())
    .pipe(concat('all.js')) // 모든 JS 병합
    .pipe(gulp.dest(paths.distJs)) // dist 경로 지정
    .pipe(server.stream());
}
function scriptsComponents() {
  return gulp.src([paths.jsCP])
    .pipe(gulp.dest(paths.distCpJs)) // dist 경로 지정
    .pipe(server.stream());
}
// Fonts task
function fonts() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.distFonts));
}

// Vendor JavaScript task
function vendors() {
  return gulp.src(paths.vendorJs)
    .pipe(gulp.dest(paths.distVendorJs));
}

// Images task
// 이미지 최적화 Task
function images() {
  return gulp.src(paths.images, {encoding: false})
    .pipe(imagemin([
      imageminMozjpeg({ quality: 1, progressive: true }),
      imageminOptipng({ optimizationLevel: 1 }),
    ]))
    .pipe(gulp.dest(paths.distImages))
}

// BrowserSync task
function serve(done) {
  server.init({
    server: {
      baseDir: paths.dist
    }
  });

  gulp.watch(paths.html, gulp.series(html, (done) => { server.reload(); done(); }));
  gulp.watch(`${paths.scss}/**/*.scss`, gulp.series(styles));
  gulp.watch(paths.js, gulp.series(scripts, (done) => { server.reload(); done(); }));
  gulp.watch(paths.jsCP, gulp.series(scriptsComponents, (done) => { server.reload(); done(); }));
  gulp.watch(paths.images, gulp.series(images, (done) => { server.reload(); done(); }));
  done();
}

// Build task
const build = gulp.series(clean, gulp.parallel(html, gulp.series(styles), scripts, images, vendors , scriptsComponents));

// Default task
export default gulp.series(build, serve);

export { clean };

