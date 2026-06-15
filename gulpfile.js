const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const clean = require("gulp-clean");
const webp = require("gulp-webp");
const newer = require("gulp-newer");
const fonter = require("gulp-fonter");
const ttf2woff2 = require("gulp-ttf2woff2");
const fileInclude = require("gulp-file-include");

const scriptsPaths = [
  "node_modules/@fancyapps/ui/dist/fancybox/fancybox.umd.js",
  "node_modules/swiper/swiper-bundle.min.js",
  "node_modules/nouislider/dist/nouislider.js",
  "app/js/_src/*.js",
];

function pages() {
  return src("app/html/pages/*.html")
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(dest("app"))
    .pipe(browserSync.stream());
}

function styles() {
  return src("app/scss/style.scss")
  .pipe(scss({ outputStyle: "compressed" }))
      .pipe(autoprefixer({ overrideBrowserslist: ["last 10 version"] }))
      .pipe(concat("style.min.css"))
      .pipe(dest("app/css"))
      .pipe(browserSync.stream())
}

function scripts() {
  return src(scriptsPaths)
    .pipe(concat("main.min.js"))
    .pipe(
      uglify({
        mangle: false,
      })
    )
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}

// function images() {
//   return src("app/images/_src/**/*.*")
//     .pipe(newer("app/images/"))
//     .pipe(
//       newer({
//         dest: "app/images/",
//         ext: ".webp", // Указываем, что сравниваем с .webp файлами
//       })
//     )
//     .pipe(webp())
//     .pipe(dest("app/images/"));
// }

function images() {
  return src("app/images/_src/**/*.*")
    .pipe(newer({
      dest: "app/images/",
      ext: ".webp"
    }))
    .pipe(webp())
    .pipe(dest("app/images/"));
}


function fonts() {
  return src("app/fonts/_src/*.{ttf,otf}")  // 1. Берем исходники
    .pipe(fonter({ formats: ["woff", "ttf"] })) // 2. Конвертируем в woff и ttf
    .pipe(dest("app/fonts"))                 // 3. Сохраняем обычные форматы
    .pipe(ttf2woff2())                       // 4. Берем ТЕ ЖЕ файлы из потока и конвертируем в woff2
    .pipe(dest("app/fonts"));                // 5. Сохраняем woff2
}

function watching() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
  });
  watch(["app/scss/**/*.scss", ], styles);
  watch(["app/js/_src/*.js"], scripts);
  watch(["app/images/_src/*.*"], images);
  watch(["app/html/**/*.html", "app/images/icons/*.svg"], pages);
  watch(["app/**/*.html"]).on("change", browserSync.reload);
}

function cleanDist() {
  return src("dist").pipe(clean());
}

function building() {
  return src(
    [
      "app/css/style.min.css",
      "app/images/**/*.*",
      "!app/images/_src/**/*.*",
      "app/fonts/*.*",
      "app/js/main.min.js",
      "app/*.html",
      "!app/html",
    ],
    { base: "app" }
  ).pipe(dest("dist"));
}

exports.images = images;
exports.pages = pages;
exports.fonts = fonts;
exports.building = building;
exports.scripts = scripts;
exports.styles = styles;
exports.watching = watching;

exports.build = series(cleanDist, building);
exports.default = parallel(fonts, styles, images, scripts, pages, watching);
