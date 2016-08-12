'use strict';

var defineTpl = require('../');
var should = require('should');
var gutil = require('gulp-util');
require('mocha');

describe('gulp-defined-template', function() {
  var fakeFile;

  function getFakeFile(fileContent){
    return new gutil.File({
      path: './test/fixture/foo.js',
      cwd: './test/',
      base: './test/fixture/',
      contents: new Buffer(fileContent || '')
    });
  }

  beforeEach(function(){
    fakeFile = getFakeFile('a{color:green}');
  });

  describe('Define template', function() {

    it('file should pass through', function(done) {
      var file_count = 0;
      var stream = defineTpl();
      stream.on('data', function(newFile){
        should.exist(newFile);
        should.exist(newFile.path);
        should.exist(newFile.relative);
        should.exist(newFile.contents);
        newFile.path.should.equal('./test/fixture/foo.js');
        newFile.relative.should.equal('foo.js');
        newFile.contents.toString().should.equal('a{color:green}');
        ++file_count;
      });

      stream.once('end', function () {
        file_count.should.equal(1);
        done();
      });

      stream.write(fakeFile);
      stream.end();
    });


  });

});