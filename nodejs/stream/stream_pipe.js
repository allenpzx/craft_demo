const http = require('http');
const fs = require('fs');
const request = require('request');

http.createServer(function (req,res){

    // fs.readFile('./test.mp4',function (err,data){
    //     if(err){
    //         res.end('File not exist!');
    //     }
    //     else{
    //         res.writeHead(200, {"Content-Type": "text/plain"});
    //         res.write('hello im 6666');
    //         res.end();
    //         // alert(666);
    //     }

    // });

    request('https://www.imooc.com/static/img/index/logo.png').pipe(res);
    // fs.createReadStream('./test.mp4').pipe(res);

}).listen(8090);
console.log('ok');