const http = require('http');
const querystring = require('querystring');

var postData = querystring.stringify({
    'content':'allen666',
    'cid':348
});

var options = {
    hostname:'www.imooc.com',
    port:80,
    path:'/course/docomment',
    method:'POST',
    headers:{
        'Accept':'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding':'gzip, deflate, br',
        'Accept-Language':'zh-CN,zh;q=0.9,en;q=0.8',
        'Connection':'keep-alive',
        'Content-Length':postData.length,
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie':'imooc_uuid=1935f703-960c-4ab8-a1e0-e96f8fc3f253; imooc_isnew_ct=1510457041; imooc_isnew=2; OUTFOX_SEARCH_USER_ID_NCOO=1762673331.375839; UM_distinctid=1606ca6495d531-0209cec80f1007-16386656-13c680-1606ca6495e4c4; loginstate=1; apsid=YwZjI2Nzc1Y2VjYzZkN2Q1MzY2NDFmNDE4NjU1NDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANDc1NDU1MQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABhbGxlbnB6eEBmb3htYWlsLmNvbQAAAAAAAAAAAAAAADI3Njg1ZjI5OTMwMDc1MDQzYjllYWI1NWMyN2YzMmM2wdJ%2FWsHSf1o%3DOW; PHPSESSID=el5i7eefcho3ptmlhktaqvvfl1; cninfo=banner-e58cdbc3539759f208f82ff347f4e390; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1520833407,1520854317,1520854319,1520854320; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1520904488; cvde=5a86a0eb901b7-1146',
        'Host':'www.imooc.com',
        'Origin':'https://www.imooc.com',
        'Referer':'https://www.imooc.com/comment/348',
        'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36',
        'X-Requested-With':'XMLHttpRequest'
    }
}

const request = http.request(options,function (response){
    console.log('Status:'+response.statusCode);
    console.log('headers:'+JSON.stringify(response.headers));

    response.on('data',function (chunk){
        console.log(Buffer.isBuffer(chunk));
        console.log(typeof chunk);
    });

    response.on('end',function (){
        console.log('评论成功');
    });

});

request.on('error',function (e){
        console.log('评论异常:'+e.message);
    });

request.write(postData);
request.end();