Gulptimate
======

Gulp for all projects 

Система сборки для обычных и сложных проектов.


# Установка
```
1. Запустите npm install чтобы установить все пакеты Gulp.
2. Запустите gulp watch (gulp) и вы можете уже начинать работу, папку app не нужно изменять
```

Что входит в пакет ?
---

1. <a href="https://www.npmjs.com/package/gulp-sass">Gulp-sass</a> - Препроцессор Sass
2. <a href="https://www.npmjs.com/package/gulp-sourcemaps">Gulp-sourcemaps</a> - Для отслеживания изменений Sass файлов в браузере
3. <a href="https://www.npmjs.com/package/browser-sync">browser-Sync</a> - Сервер с LiveReload (Автоматическое обновление страниц при изменении файлов)
4. <a href="https://www.npmjs.com/package/gulp-concat">Gulp-concat</a> - Конкатенация (объединение нескольких файлов)
5. <a href="https://www.npmjs.com/package/gulp-uglifyjs">Gulp-uglifyJS</a> - Сжатие js скриптов
6. <a href="https://www.npmjs.com/package/gulp-cssnano">Gulp-cssnano</a> - Сжатие css скриптов
7. <a href="https://www.npmjs.com/package/gulp-rename">Gulp-rename</a> - Переимнование файлов
8. <a href="https://www.npmjs.com/package/gulp-csscomb">Gulp-csscomb</a> -  Форматирование css файлов в удобочитаемый вид
9. <a href="https://www.npmjs.com/package/gulp-combine-mq">Gulp-combine-mq</a> - Для объединения media файлов css
10. <a href="https://www.npmjs.com/package/gulp-html-beautify">Gulp-html-beautify</a> - Для форматирования HTML кода
11. <a href="https://www.npmjs.com/package/gulp-file-include">Gulp-file-include</a> - Плагин для создания и внедрения компонентов в верстку
12. <a href="https://www.npmjs.com/package/main-bower-files">Main-bower-files</a> - Автоматический перенос только нужных скриптов из библиотек Bower
13. <a href="https://www.npmjs.com/package/gulp-concat-css">Gulp-concat-css</a> - Правильное объединения css файлов
14. <a href="https://www.npmjs.com/package/gulp-useref">Gulp-useref</a> - Для изменения путей к скриптам в HTML файлах
15. <a href="https://www.npmjs.com/package/gulp-plumber">Gulp-plumber</a> - Отслеживание ошибок
16. <a href="https://www.npmjs.com/package/gulp-autoprefixer">Gulp-autoprefixer</a> - Автоматические префиксы для css через Sass компиляцию
17. <a href="https://www.npmjs.com/package/gulp-cache">Gulp-cache</a> - Кеш для изображений
18. <a href="https://www.npmjs.com/package/imagemin-pngquant">Imagemin-pngquant</a> - Сжатие изображений.
19. <a href="https://www.npmjs.com/package/gulp-imagemin">Gulp-imagemin</a> - Сжатие изображений.


Файловая структура
---


    dev/ - Папка с файлами разработки

    dev/sass/_vars - Переменные для Sass
    dev/sass/_base - Стили которые не относятся к отдельным страницам (например header, footer)
    dev/sass/bootstrap - Компиляция bootstrap 4
    dev/sass/fonts - Подключение шрифтов

    dev/html - Корневая папка со всеми страницами проекта
    dev/html/components - Отдельные компоненты проекта (header,footer,nav)

    dev/fonts - Шрифты проекта
    dev/img - Изображения проекта
    dev/js - Файлы js скриптов
    dev/libs - Папка с библиотеками проекта

    app/ - Папка продакшн (готовая верстка)
    
### Важно
>В своей разработке используйте в основном папку html для отдельных страниц, например если у вас есть page_1 и page_2 страницы то структура будет следующей:

```
--html
  --page_1
    --index.html
    --main.sass
    --media.sass
    --vars.sass
  --page_2
    --index.html
    --main.sass
    --media.sass
```
>vars.sass использовать нужно тогда когда нужно переопределить переменные в Sass

>Если вы пишите стили для header,footer, стандартные стили для ссылок, список и.т.д. используйте папку Sass.


## Использование

> Перед началом работы некобходимо изменить gulpfile.js под себя (css-libs, scripts)




