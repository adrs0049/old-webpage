---
title: Setup Gulp to upload your assets to Amazon S3
author: Wyatt Johnson
layout: post
permalink: /setup-gulp-upload-assets-s3
disqus: https://wyattjoh.ca/setup-gulp-upload-assets-s3
path: 2015-03-03-setup-gulp-s3.md
---

For performance reasons, it may be better suited to upload your assets to serve
via [CloudFront](http://aws.amazon.com/cloudfront/) or directly via
[S3](http://aws.amazon.com/s3/), but it may be a pain to deploy your assets
there. This guide illustrates how to setup your pipeline to upload your compiled
assets directly to S3 using [Gulp](http://gulpjs.com/).

This guide assumes that you already have an Amazon AWS account, and an S3 Bucket setup.

To upload directly to the bucket, we need to create a user in [IAM](https://console.aws.amazon.com/iam/home) with the correct permissions. The permissions on the user to allow upload follow the following template:

{% highlight json %}
{
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl"
      ],
      "Resource": [
        "arn:aws:s3:::<YOUR-BUCKET-NAME>/assets",
        "arn:aws:s3:::<YOUR-BUCKET-NAME>/assets/*"
      ]
    }
  ]
}
{% endhighlight %}

This will permit the Gulp S3 package to upload to your bucket. Be sure to swap out the `<YOUR-BUCKET-NAME>` with the name of your bucket. Note as well the `/assets` after the resource ARN, this is indicating that any object can be put into the folder `assets` under the bucket root. This is important when setting up static hosting from S3 or when serving via a CloudFront distribution.

To complete S3 uploads, we will use the [gulp-s3](https://www.npmjs.com/package/gulp-s3) package, which is easily installed via:

{% highlight bash %}
npm install --save-dev gulp-s3
{% endhighlight %}

Which can then be added to your `gulpfile.js` file as such:

{% highlight js linenos %}
...

var fs = require("fs");
var s3 = require("gulp-s3");
var awsCredentials = JSON.parse(fs.readFileSync('./aws.json'));

...

gulp.task('upload', ['scripts', 'styles'], function() {
  return gulp.src('public/assets/**')
      .pipe(s3(awsCredentials, {
        uploadPath: "/assets/",
        headers: {
          'x-amz-acl': 'public-read'
        }
      }));
});
{% endhighlight %}

Where the file `aws.json` contains the following:

{% highlight json %}
{
  "key": "<YOUR-AWS-KEY>",
  "secret": "<YOUR-AWS-SECRET-KEY>",
  "bucket": "<YOUR-BUCKET-NAME>",
  "region": "<YOUR-BUCKET-REGION>"
}
{% endhighlight %}

Be sure to exclude the `aws.json` file from git by adding it to your `.gitignore`.

In our `gulpfile.js`, we specified the array of actions to be run before the `upload` action as `['scripts', 'styles']`, which would run the `scripts` action first followed by the `styles` action. Both of these example actions place their output into the `public/assets/` folder of my project, so that when I source them on line 10, I end up loading all their output. This is then streamed to S3 via the next pipe command, and uploaded to my bucket as specified in the `awsCredentials` to the `/assets/` path on line 12.

Finally, to perform the upload, we need to run:

{% highlight bash %}
gulp upload
{% endhighlight %}

Which should upload the files to the bucket. You should now be able to view your files uploaded at the url:

```
https://s3.amazonaws.com/<YOUR-BUCKET-NAME>/<YOUR-FILE>
```

If you have any issues with the tutorial, be sure to send me a tweet or leave me a comment!
