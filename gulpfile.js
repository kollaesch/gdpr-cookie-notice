const path = require("path"),
  gulp = require("gulp"),
  // watch = require("gulp-watch"),
  sourcemaps = require("gulp-sourcemaps"),
  concat = require("gulp-concat"),
  // uglify = require("gulp-uglify"),
  // https://stackoverflow.com/questions/47439067/uglifyjs-throws-unexpected-token-keyword-const-with-node-modules
  // umstellen gulp-uglify => gulp-uglify-es
  uglify = require("gulp-uglify-es").default,
  notify = require("gulp-notify"),
  plumber = require("gulp-plumber"),
  sass = require("gulp-sass"),
  rename = require("gulp-rename"),
  browserify = require("gulp-browserify"),
  autoprefixer = require("gulp-autoprefixer");
http = require("http");
ecstatic = require("ecstatic");
htmlToJs = require("gulp-html-to-js");
html2js = require("gulp-html2js");
eslint = require("gulp-eslint");

var { src, dest, watch, parallel, series } = require("gulp");

var config = {
  javascript: {
    path: {
      src: path.join("src/js"),
      dist: path.join("dist")
    }
  },
  sass: {
    path: {
      src: path.join("src/sass"),
      dist: path.join("dist")
    }
  }
};

// const onJSError = function(err) {
//   notify({
//     message: err
//   });
// };

// gulp.task("styles:sass", function() {
//   return gulp
//     .src(path.join(config.sass.path.src, "**", "*.scss"))
//     .pipe(sourcemaps.init())
//     .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
//     .pipe(autoprefixer())
//     .pipe(sourcemaps.write("./"))
//     .pipe(gulp.dest(config.sass.path.dist));
// });

function buildJSmin(cb) {
  src([
    "node_modules/js-cookie/src/js.cookie.js",
    "src/js/templates.js",
    "src/js/script.js",
    "src/langs/en.js",
    "src/langs/de.js"
  ])
  .pipe(sourcemaps.init())
  .pipe(concat("script.min.js"))
  .pipe(uglify())
  .pipe(sourcemaps.write("./"))
  .pipe(dest(config.javascript.path.dist));
  cb();
}
gulp.task('buildjsmin', buildJSmin)

function buildJS(cb) {
  src([
      "node_modules/js-cookie/src/js.cookie.js",
      "src/js/templates.js",
      "src/js/script.js",
      "src/langs/en.js",
      "src/langs/de.js"
    ])
    .pipe(sourcemaps.init())
    .pipe(concat("script.js"))
    // .pipe(uglify())
    .pipe(sourcemaps.write("./"))
    .pipe(dest(config.javascript.path.dist));
    cb();
}
gulp.task('buildjs', buildJS)

// gulp.task("watch:sass", function() {
//   const paths = path.join(config.sass.path.src, "**", "*.scss");
//   return gulp.watch(
//     paths,
//     function() {
//       return gulp.start("styles:sass");
//     },
//     { read: false }
//   );
// });

// gulp.task("watch:javascript", function() {
//   return watch(
//     path.join(config.javascript.path.src, "**", "*.js"),
//     function() {
//       return gulp.start("javascript");
//     },
//     { read: false }
//   );
// });

// gulp.task("views:compile", function() {
//   gulp
//     .src("src/html/*.html")
//     .pipe(
//       html2js("templates.js", {
//         adapter: "javascript",
//         base: "src/html",
//         name: "gdpr-cookie-notice-templates"
//       })
//     )
//     .pipe(gulp.dest("src/js/"));
// });

// gulp.task("lint", () => {
//   return gulp
//     .src(["src/js/script.js"])
//     .pipe(eslint())
//     .pipe(eslint.format())
//     .pipe(eslint.failAfterError());
// });

// gulp.task("default", ["lint"], function() {
//   http.createServer(ecstatic({ root: __dirname })).listen(3000);

//   console.log("Listening on :3000");

//   gulp.start("watch:sass");
//   gulp.start("views:compile");
//   gulp.start("watch:javascript");
// });

exports.buildjs = buildJS;
exports.buildjsmin = buildJSmin;