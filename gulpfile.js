var gulp = require('gulp');
var header = require('gulp-header');

async function writeSomething() {
    return "something";
}


gulp.task('default', async function() {
    writeSomething().then((x) => console.log(x));
    //console.log("hello");
  });

  
  gulp.task('add-text-to-beginning', function() {
    return gulp.src('src/yossi.txt')
      .pipe(header("/*\nremark\n*/"))
      .pipe(gulp.dest('dist'));
  });