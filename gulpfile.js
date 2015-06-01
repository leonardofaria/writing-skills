var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var rsync = require('rsyncwrapper').rsync;

gulp.task('rsync', function() {
	rsync({
    src: './app/',
    dest: 'leonardo@leonardofaria.net:~/public_html/writingskills.leonardofaria.net',
    recursive: true,
    deleteAll: true,
    exclude: ['.DS_Store'],
    args: [ '--verbose' ]
  }, function(error, stdout, stderr, cmd) {
    console.log(stdout, 'END!');
  });
});

gulp.task('css', function(){
  gulp.src('app/css/**/*.css')
    .pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('app'));
});

gulp.task('default', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });

  gulp.src('app/css/**/*.css')
    .pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('app'));

  gulp.watch(['*.html', 'css/**/*.css', 'scripts/**/*.js'], {cwd: 'app'}, ['css', reload]);
});