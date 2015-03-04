var gulp = require('gulp');
var fs = require("fs");
var s3 = require("gulp-s3");
var awsCredentials = JSON.parse(fs.readFileSync('./aws.json'));

gulp.task('upload', function() {
  gulp.src('./assets/**')
      .pipe(s3(awsCredentials, {
        uploadPath: "/assets/",
        headers: {
          'x-amz-acl': 'public-read'
        }
      }));
});
