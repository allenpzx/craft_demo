var buffer = Buffer.from('test');
var demo = buffer.write(' imoocimoocimooc',2,16);

// console.log(buffer);
// console.log(buffer.length);
// console.log(buffer.toString());
// console.log(buffer.write('allen666'));
// console.log(demo);

// var buffer1 = Buffer.from(('菜鸟教程'));
// var buffer2 = Buffer.from(('www.runoob.com'));
// var buffer3 = Buffer.concat([buffer1,buffer2]);
// console.log("buffer3 内容: " + buffer3.toString());

// var buffer1 = Buffer.from('ABC');
// var buffer2 = Buffer.from('ABCD');
// var result = buffer1.compare(buffer2);
// console.log(buffer1.compare(buffer2));
// console.log(buffer1);
// if(result < 0) {
//    console.log(buffer1 + " 在 " + buffer2 + "之前");
// }else if(result == 0){
//    console.log(buffer1 + " 与 " + buffer2 + "相同");
// }else {
//    console.log(buffer1 + " 在 " + buffer2 + "之后");
// }

var test = Buffer.from('allen');
console.log(test);
var str = test.toString('base64');
console.log(str);
var test2 = Buffer.from(str,'base64');
console.log(test2);
console.log(test2.toString());