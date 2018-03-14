var Readable = require('stream').Readable;
var Writable = require('stream').Writable;

var readStream = new Readable();
var writStream = new Writable();

readStream.push('111');
readStream.push('222');
readStream.push('333');
readStream.push(null);

writStream._write = function (chunk, encoding, cb){
    console.log(chunk.toString());
    cb();
}

readStream.pipe(writStream);