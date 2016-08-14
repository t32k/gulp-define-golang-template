'use strict';

import test from 'ava';
import gulp from 'gulp';
import gutil from 'gulp-util';
import defineTpl from '../';

var fakeFile;
const getFakeFile =(fileContent) => {
    return new gutil.File({
        cwd: './',
        base: './test/fixtures/',
        path: './test/fixtures/file.txt',
        contents: new Buffer(fileContent || '')
    });
}

test.beforeEach(t => {
    fakeFile = getFakeFile('Hello world');
});

test.cb ('Define as a golang template', t => {
    let stream = defineTpl();

    stream.on('data', function (file) {
        t.truthy(file);
        t.is(file.contents.toString(), '{{define "file.txt"}}\nHello world\n{{end}}');
    });

    stream.on('end', t.end);
    stream.write(fakeFile);
    stream.end();
});

test.cb ('Define multiple templates', t => {
    let stream = gulp.src('./fixtures/*').pipe(defineTpl());
    let files = [];

    stream.on('data', function (file) {
        t.regex(file.contents.toString(), /^\{\{define "(foo|bar)\.(js|css)"\}\}(.|\n)+\{\{end\}\}/);
        files.push(file);
    });

    stream.on('end', () => {
        t.is(files.length, 2);
        t.end();
    });
    stream.on('error', t.end);
});
