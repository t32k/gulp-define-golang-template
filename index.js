'use strict';

var Concat = require('concat-with-sourcemaps');
var extend = require('object-assign');
var through = require('through2');
var gutil = require('gulp-util');
var stream = require('stream');
var path = require('path');
var fs = require('fs');

module.exports = function () {

    function TransformStream(file, enc, cb) {
        var filename = path.basename(file.path);
        var concat = new Concat(false, filename, '\n');

        concat.add(null, new Buffer('{{define "' + filename + '"}}'));
        concat.add(file.relative, file.contents);
        concat.add(null, new Buffer('{{end}}'));
        file.contents = concat.content;
        
        this.push(file);
	    cb();
    }

    return through.obj(TransformStream);
};