const { series, src, dest, watch } = require("gulp");
const sass = require("gulp-dart-sass");
const imagemin = require ("gulp-imagemin")
const notify = require ("gulp-notify");
const webp = require ("gulp-webp");
const concat = require ("gulp-concat");


//Utilidades para css
const autoprefixer = require ("autoprefixer");
const postcss = require ("gulp-postcss");
const cssnano = require ("cssnano");



//Paths

const paths = {
    imagenes: "src/img/**/*",
    scss: "src/scss/**/*.scss",
    js: "src/js/***.js"
}


//Compilar SASS

function css() {
    return src(paths.scss)
    .pipe( sass({
        outputStyle: "expanded"
    }))
    .pipe( postcss( [autoprefixer(), cssnano() ]))
    .pipe( dest("./build/css") )
}

//Minificar CSS.
function imagenes() {
    return src(paths.imagenes)
    .pipe(imagemin() )
    .pipe( dest("./build/img"))
    .pipe( notify({ message: "Imagen Minificada"}));
}

function minificarcss() {
    return src("src/scss/app.scss")
    .pipe( sass({
        outputStyle: "compressed"
    }))
    .pipe( dest("./build/css") )
}

function javascript(){
    return src(paths.js)
    .pipe( concat("bundle.js") )
    .pipe( dest("./build/js") )
}

//Convertir jpg a webp
function versionWebp() {
    return src(paths.imagenes)
    .pipe( webp() )
    .pipe(dest("./build/img"))
    .pipe(notify({message: "Version Webp lista"}));
}

//Watch

function watchArchivos() {
    watch( "src/scss/**/*.scss", css );
    watch(paths.js, javascript);
}



exports.css = css;
exports.imagenes = imagenes;
exports.minificarcss = minificarcss;
exports.watchArchivos = watchArchivos

exports.default = series (css, javascript, imagenes, versionWebp, watchArchivos);