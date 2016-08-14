# gulp-defined-template [![Build Status](https://travis-ci.org/t32k/gulp-defined-template.svg?branch=master)](https://travis-ci.org/t32k/gulp-defined-template)

gulp-defined-template is a Gulp extension to define a golang template to files in the pipeline.


## Install

```shell
npm install --save-dev gulp-defined-template
```


## Usage

**gulpfile.js**

```js
var defineTpl = require('gulp-defined-template');

gulp.src('./js/foo.js')
  .pipe(defineTpl())
  .pipe(gulp.dest('./dist/'))

gulp.src('./css/bar.css')
  .pipe(defineTpl())
  .pipe(gulp.dest('./dist/'))
```

**./dist/foo.js**

```golang
{{define "foo.js"}}
(function () {
    alert('Hello world!')
}());
{{end}}
```

**./dist/bar.css**

```golang
{{define "bar.css"}}
body {
    font-size: 16px;
}
{{end}}
```
