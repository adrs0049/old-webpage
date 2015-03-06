var gulp = require('gulp');
var fs = require("fs");
var s3 = require("gulp-s3");
var revall = require('gulp-rev-all');

var awsCredentials = JSON.parse(fs.readFileSync('./aws.json'));

var jsyaml = require('js-yaml');
var jekylConfig = jsyaml.load(fs.readFileSync('./_config.yml'));

gulp.task('manifest', function() {
  gulp.src('./assets/**')
  .pipe(revall())
  .pipe(revall.manifest({ fileName: 'manifest.json', prefix: jekylConfig["asset_url"] }))
  .pipe(gulp.dest('./_data'));
})

gulp.task('upload', ['manifest'], function() {
  gulp.src('./assets/**')
    .pipe(revall())
    .pipe(s3(awsCredentials, {
      uploadPath: "/assets/",
      headers: {
        'x-amz-acl': 'public-read'
      }
    }));
});
