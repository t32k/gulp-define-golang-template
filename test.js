'use strict';

import test from 'ava';
import gutil from 'gulp-util';
import defineTpl from './';

var fakeFile;
const getFakeFile =(fileContent) => {
    return new gutil.File({
        cwd: './',
        base: './test/fixture/',
        path: './test/fixture/file.txt',
        contents: new Buffer(fileContent || '')
    });
}

test.beforeEach(t => {
    fakeFile = getFakeFile('Hello world');
});

test.cb ('Define as a golang template', t => {
    let stream = defineTpl();

    stream.on('data', function (newFile) {
        t.truthy(newFile);
        t.is(newFile.contents.toString(), '{{define "file.txt"}}\nHello world\n{{end}}');
    });

    stream.on('end', t.end);
    stream.write(fakeFile);
    stream.end();
});
