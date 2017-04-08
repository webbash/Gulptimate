var gulp           = require('gulp'), // Подключаем Gulp
    sass           = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync    = require('browser-sync'), // Подключаем Browser Sync
    concat         = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify         = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano        = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename         = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    imagemin       = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant       = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache          = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer   = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    csscomb        = require('gulp-csscomb'), // Для удобства чтения css кода, распределения по функциональным частям.
    combineMq      = require('gulp-combine-mq'), // Для добавления медиа запросов в код препроцессора CSS.
    htmlbeautify   = require('gulp-html-beautify'), // Для форматирования HTML кода
    fileinclude    = require('gulp-file-include'), // Для функции шаблонизатора - включение отдельных компонентов в файл.
    // size        = require('gulp-filesize'), // Размер файла
    sourcemaps     = require('gulp-sourcemaps'), // SorceMaps
    mainBowerFiles = require('main-bower-files'), // Перенос библиотек в определенную папку
    concatCss      = require('gulp-concat-css'), // Для объединения css файлов (так как concat работает тупо)
    useref         = require('gulp-useref'), // Для изменения путей к файлам скриптов и стилям в html
    plumber        = require('gulp-plumber'); // Для отладки ошибок Gulp

// Таск для html компонентов
gulp.task('html', function () {
    // Берем все html файлы кроме компонентов
    gulp.src(['dev/html/**/*.html', '!dev/html/components/**/*.html'])
        .pipe(plumber()) // Делаем отладку модуля
        .pipe(fileinclude({ // Инициализация плагина fileinclude
            prefix: '@@',
            basepath: 'dev/html/components/'
        }))
        .pipe(useref({
            noAssets: true // Отмена стандартной конкатенации (так как мы сами это сжимаем и переносим)
        }))
        .pipe(htmlbeautify()) // Форматируем html
        .pipe(gulp.dest('app/html/')); // Выгружаем в папку app
});

// Таск для Sass
gulp.task('sass', function () {
    return gulp.src(['dev/sass/fonts.sass', 'dev/sass/main.sass']) // Берем источник
        .pipe(plumber()) // Проверяем на ошибки
        .pipe(sourcemaps.init())
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true})) // Создаем префиксы
        .pipe(combineMq({
            beautify: true
        }))
        .pipe(sourcemaps.write())
        .pipe(concatCss("main.css"))
        .pipe(csscomb()) // Причесываем код CSS
        .pipe(gulp.dest('app/css')); // Выгружаем результата в папку app/css
        //.pipe(browserSync.reload({ stream: true })); // Обновляем CSS на странице при изменении
});

// Сервер
gulp.task('browser-sync', function () {
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        files: ['app/html/**/*.html', 'app/js/**/*', 'app/css/**/*.css'],
        notify: false // Отключаем уведомления
    });
});

// Сжатие и конкатенация скриптов JS
gulp.task('scripts', function () {
    return gulp.src([ // Берем все необходимые библиотеки
        'dev/libs/owlcarousel/dist/owl.carousel.js',
        'dev/libs/jquery-ui/jquery-ui.js',
        'dev/libs/inputmask.js'
    ])
    // ВАЖНО: ЕСЛИ 1 ФАЙЛ ТО ФУНКЦИЯ CONCAT БУДЕТ РАБОТАТЬ НЕВЕРНО ПОЭТОМУ ЕСЛИ У ВАС 1 БИБЛИОТЕКА ЗАКОМЕНТИРУЙТЕ ЭТУ СТРОКУ
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(plumber()) // Проверяем на ошибки
        .pipe(uglify()) // Сжимаем JS файл
        // .pipe(rename("libs.min.js")) // ЕСЛИ ФАЙЛОВ НЕСКОЛЬКО ОТКЛЮЧАЕМ ЭТУ СТРОКУ
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

// Сжатие и конкатенация скриптов CSS
gulp.task('css-libs', ['sass'], function () {
    return gulp.src([
        'dev/libs/owlcarousel/dist/assets/owl.carousel.css',
        'dev/libs/owlcarousel/dist/assets/owl.theme.default.css',
        'app/css/animate.css'
    ])
        .pipe(plumber()) // Проверяем на ошибки
        .pipe(concatCss("libs.min.css")) // Объединяем
        .pipe(cssnano()) // Сжимаем
        .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

// Экспорт шрифтов в продакшн
gulp.task('exportFonts', function () {
    return gulp.src(['dev/fonts/**/*'])
        .pipe(gulp.dest('app/fonts'))
});

// Экспорт скриптов JS в продакшн
gulp.task('exportScripts', function () {
    return gulp.src(['dev/js/**/*'])
        .pipe(gulp.dest('app/js'))
});


// Компиляция Bootstrap 4
gulp.task('bootstrapCompile', function() {
    return gulp.src('dev/sass/bootstrap.sass')
        .pipe(plumber()) // Проверяем на ошибки
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true})) // Создаем префиксы
        .pipe(gulp.dest('app/css')); // Выгружаем результата в папку app/css
});


// Экспорт BOWER скриптов в папку dev/libs
gulp.task('bowerExport', function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('dev/libs'))
});

gulp.task('watch', ['browser-sync', 'scripts', 'html', 'sass', 'img', 'exportFonts', 'exportScripts', 'css-libs'], function () {
    gulp.watch('dev/sass/**/*.sass', ['sass']);
    gulp.watch('dev/html/**/*.sass', ['sass']);
    gulp.watch('dev/html/**/*.html', ['html']);
    gulp.watch('dev/fonts/**/*', ['exportFonts']);
    gulp.watch('dev/js/**/*', ['exportScripts']);
    gulp.watch('dev/img/**/*', ['img']);
    gulp.watch('app/img/**/*', ['img']);
});

// Сжатие и перенос изображений в продакшн
gulp.task('img', function () {
    return gulp.src('dev/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('app/img')); // Выгружаем на продакшен
});

// По умолчанию при вызове команды Gulp будет вызываться таск watch.
gulp.task('default', ['watch']);
