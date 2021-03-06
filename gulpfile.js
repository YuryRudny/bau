var syntax = "sass", // Syntax: sass or scss;
  gulpversion = "4"; // Gulp version: 3 or 4

var gulp = require("gulp"),
  gutil = require("gulp-util"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify-es").default,
  cleancss = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  autoprefixer = require("gulp-autoprefixer"),
  notify = require("gulp-notify"),
  rsync = require("gulp-rsync"),
  imagemin = require("gulp-imagemin"),
  imageminPngquant = require("imagemin-pngquant"),
  imageminZopfli = require("imagemin-zopfli"),
  imageminMozjpeg = require("imagemin-mozjpeg"),
  imageminGiflossy = require("imagemin-giflossy"),
  svgSprite = require("gulp-svg-sprite"),
  svgmin = require("gulp-svgmin"),
  cheerio = require("gulp-cheerio"),
  replace = require("gulp-replace"),
  favicons = require("gulp-favicons"),
  sourcemaps = require("gulp-sourcemaps");

gulp.task("browser-sync", function () {
  browserSync({
    server: {
      baseDir: "app",
    },
    notify: false,
    // open: false,
    // online: false, // Work Offline Without Internet Connection
    // tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
  });
});

gulp.task("styles", function () {
  return gulp
    .src("app/" + syntax + "/**/*." + syntax + "")
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", notify.onError())
    )
    .pipe(
      rename({
        suffix: ".min",
        prefix: "",
      })
    )
    .pipe(autoprefixer(["last 15 versions"]))
    .pipe(
      cleancss({
        level: {
          1: {
            specialComments: 0,
          },
        },
      })
    ) // Opt., comment out when debugging
    .pipe(gulp.dest("app/assets/css"))
    .pipe(browserSync.stream());
});

gulp.task("scripts", function () {
  return gulp
    .src([
      "app/js/_lazy.js", // Always at the end
      "app/js/common.js", // Always at the end
    ])
    .pipe(concat("scripts.min.js"))
    .pipe(concat("scripts.min.js"))
    .pipe(uglify()) // Mifify js (opt.)
    .pipe(gulp.dest("app/assets/js"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task("code", function () {
  return gulp.src("app/*.html").pipe(
    browserSync.reload({
      stream: true,
    })
  );
});

gulp.task("img", () =>
  gulp
    .src("app/img/**/*")
    .pipe(
      imagemin([
        imageminGiflossy({
          optimizationLevel: 3,
          optimize: 3,
          lossy: 2,
        }),
        imageminPngquant({
          speed: 5,
          quality: [0.3, 0.5],
        }),
        imageminZopfli({
          more: true,
        }),
        imageminMozjpeg({
          progressive: true,
          quality: 70,
        }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
            },
            {
              removeUnusedNS: false,
            },
            {
              removeUselessStrokeAndFill: false,
            },
            {
              cleanupIDs: false,
            },
            {
              removeComments: true,
            },
            {
              removeEmptyAttrs: true,
            },
            {
              removeEmptyText: true,
            },
            {
              collapseGroups: true,
            },
          ],
        }),
      ])
    )
    .pipe(gulp.dest("app/assets/img"))
);

gulp.task("svg", () => {
  return gulp
    .src("app/img/svg/*.svg")
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(
      cheerio({
        run: function ($) {
          $("[fill]").removeAttr("fill");
          $("[stroke]").removeAttr("stroke");
          $("[style]").removeAttr("style");
          $("style").remove();
        },
        parserOptions: {
          xmlMode: true,
        },
      })
    )
    .pipe(replace("&gt;", ">"))
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: "sprite.svg",
          },
        },
      })
    )
    .pipe(gulp.dest("app/assets/img/svg/"));
});

gulp.task("fav", function () {
  return gulp
    .src("app/img/favicon/favicon.png")
    .pipe(
      favicons({
        icons: {
          appleIcon: true,
          favicons: true,
          online: false,
          appleStartup: false,
          android: false,
          firefox: false,
          yandex: false,
          windows: false,
          coast: false,
        },
      })
    )
    .pipe(gulp.dest("app/assets/img/favicon/"));
});

if (gulpversion == 3) {
  gulp.task("watch", ["styles", "scripts", "browser-sync"], function () {
    gulp.watch("app/" + syntax + "/**/*." + syntax + "", ["styles"]);
    gulp.watch(["libs/**/*.js", "app/js/common.js"], ["scripts"]);
    gulp.watch("app/*.html", ["code"]);
  });
  gulp.task("default", ["watch"]);
}

if (gulpversion == 4) {
  gulp.task("watch", function () {
    gulp.watch(
      "app/" + syntax + "/**/*." + syntax + "",
      gulp.parallel("styles")
    );
    gulp.watch(["libs/**/*.js", "app/js/common.js"], gulp.parallel("scripts"));
    gulp.watch("app/img/svg/*.svg", gulp.parallel("svg"));
    gulp.watch("app/*.html", gulp.parallel("code"));
  });
  gulp.task(
    "default",
    gulp.parallel("styles", "svg", "scripts", "browser-sync", "watch")
  );
}
