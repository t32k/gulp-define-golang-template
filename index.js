'use strict';

const path = require('path');
const through = require('through2');
const Concat = require('concat-with-sourcemaps');

module.exports = () => {
    function TransformStream(file, enc, cb) {
        let filename = path.basename(file.path);
        let concat = new Concat(false, filename, '\n');

        concat.add(null, new Buffer('{{define "' + filename + '"}}'));
        concat.add(file.relative, file.contents);
        concat.add(null, new Buffer('{{end}}'));
        file.contents = concat.content;
        
        this.push(file);
        cb();
    }
    return through.obj(TransformStream);
};
