const fs = require('fs');
const readStream = fs.createReadStream('test.mp4');
const writeStream = fs.createWriteStream('test2.mp4');

// 当有数据流入时
readStream.on('data', function (chunk) {
    // console.log(chunk);
    // console.log(chunk.toString());
    // console.log(Buffer.isBuffer(chunk));

    // 如果数据还在缓存区还没有写入,就暂停读文件
    if (writeStream.write(chunk) === false) {
        console.log('data still cached then read paused');
        readStream.pause();
    }
});

readStream.on('end', function () {
    writeStream.on('drain', function () {
        writeStream.end()
    });
});

// 数据写入完毕,没有数据可以写的时候
writeStream.on('drain', function () {
    console.log('write data drains');
    // 恢复继续读文件
    readStream.resume();
});

// readStream.on('readable',function (){
//     console.log('data readable');
// });



