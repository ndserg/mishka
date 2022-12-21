const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const csso = require("postcss-csso");
const autoprefixer = require("autoprefixer");
const imagemin = require("gulp-imagemin");
const svgstore = require("gulp-svgstore");
const webp = require("gulp-webp");
const uglify = require("gulp-uglify-es").default;
const htmlmin = require("gulp-htmlmin");
const rename = require("gulp-rename");
const del = require("del");
const { parallel } = require("gulp");
const sync = require("browser-sync").create();

// Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Images

const images = () => {
  return gulp.src(["source/img/**/*.{jpg,png,svg}", "!source/img/icons/*.svg"])
  .pipe(imagemin([
    imagemin.mozjpeg({quality: 75, progressive: true}),
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("build/img"))
}

exports.images = images;

// Icons

const icons = () => {
  return gulp.src("source/img/icons/*.svg")
  .pipe(imagemin([
    imagemin.svgo({plugins: [
      { removeAttrs: { attrs: 'fill|opacity' } }
    ]})
  ]))
  .pipe(svgstore())
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img/icons"))
}

exports.icons = icons;

// Wepp

const createWebp = () => {
  return gulp.src(["source/img/products/*.jpg"])
  .pipe(webp({quality: 80}))
  .pipe(gulp.dest("build/img/products"))
}

exports.createWebp = createWebp;

// HTML

const html = () => {
  return gulp.src("source/*.html")
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest("build"))
}

exports.html = html;

// Scripts

const scripts = () => {
  return gulp.src("source/js/*.js")
  .pipe(uglify())
  .pipe(rename({
    extname: '.min.js'
  }))
  .pipe(gulp.dest("build/js"))
  .pipe(sync.stream());
}

exports.scripts = scripts;

// copy

const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff2,woff}",
    "source/*.ico",
    "source/*.webmanifest"
    ], {
    base: "source"
    })
    .pipe(gulp.dest("build"))
}

exports.copy = copy;

// Clean

const clean = () => {
  return del("build")
}

exports.clean = clean;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Reload

const reload = (done) => {
  sync.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series(styles));
  gulp.watch("source/js/**/*.js", gulp.series(scripts));
  gulp.watch("source/*.html",  gulp.series(html, reload));
}

//Build

const build = gulp.series(
  clean,
  parallel(
    styles,
    html,
    scripts,
    icons,
    copy,
    images,
    createWebp
  )
)

exports.build = build;

exports.default = gulp.series(
  clean,
  parallel(
    styles,
    html,
    scripts,
    icons,
    copy,
    images,
    createWebp
  ),
  gulp.series(
    server, watcher
  ));
