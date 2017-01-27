var gulp = require('gulp');
	var browserSync = require('browser-sync');
	var plumber = require('gulp-plumber');
	var concatCss = require('gulp-concat-css');
	var minifyCss = require('gulp-minify-css');
	var sass = require('gulp-sass');
	var jade = require('gulp-jade');

// Directory variables
	var localhostDir = './app/';
	var jadeCompiled = './app/';
	var jadePath = './app/jade/**/*.jade';
	var scssCompiled = './app/css';
	var scssPath = './app/scss/*.scss';

// Таск для работы Jade. Создание функции go-jade
gulp.task('go-jade', function() {
	gulp.src(jadePath)
		.pipe(plumber())
		.pipe(jade({
		pretty: true
		}))
		.pipe(gulp.dest(jadeCompiled))
		.pipe(browserSync.stream());
});

// Таск для работы SASS
gulp.task('go-sass', function() {
	gulp.src(scssPath)
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest(scssCompiled))
		.pipe(browserSync.stream());
})

// Таск для работы BS. Создание функции browser-sync
gulp.task('browser-sync', function () {
  browserSync({
  	port: 9000,
      server: {
          baseDir: localhostDir, index: "index.html"

      }
  });
});



// Слежка за файлами , если изменились, выполнить перезагрузку баузера
gulp.task('watch', function () {
	gulp.watch(scssPath, { interval: 500, debounceDelay: 1000, mode: 'poll' }, ['go-sass']);
	gulp.watch(jadePath, { interval: 500, debounceDelay: 1000, mode: 'poll' }, ['go-jade']);
	gulp.watch([
		'./app/*.html',
		'./app/js/*.js',
		'./app/css/*.css'
		]).on('change', browserSync.reload)
});




// Сборка всех css файлов в один, минификация, сохранение в dist/css
gulp.task('concss', function() {
	return gulp.src('app/css/**/*.css')
	.pipe(concatCss('main.min.css'))
	.pipe(minifyCss())
	.pipe(gulp.dest('dist/css'));
});

// Инициализация всех тасков
gulp.task('default', ['browser-sync', 'watch']);

