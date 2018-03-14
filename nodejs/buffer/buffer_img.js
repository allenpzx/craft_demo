var fs = require('fs');

fs.readFile('logo.png', function (error, buffer) {
    // 回调函数的第二个参数是data||buffer,如果没有指定options里的编码,则默认是buffer
    console.log(Buffer.isBuffer(buffer));

    fs.writeFile('logo_buffer.png', buffer, function (err) {
        if (err) { console.log(err); }
    });

    // var bs64Img = Buffer.from(buffer).toString('base64');
    // 图片的buffer数据直接转换成base64编码
    var bs64Img = buffer.toString('base64');
    var decodedImg = Buffer.from(bs64Img, 'base64');
    // 解码之后对比,如果为0表示一样
    console.log(Buffer.compare(buffer, decodedImg));

    fs.writeFile('local_decoded.png', decodedImg, function (err) {
        if (err) { console.log(err) };
    });


});