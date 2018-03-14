const https = require('https');
const cheerio = require('cheerio');
const url = 'https://www.imooc.com/learn/348';

function filterChaper(html){
    var $ = cheerio.load(html);
    var chapters = $('.chapter');

    var courseData = [];

    chapters.each(function (index,item){
        var chapter = $(this);
        var chapertTitle = chapter.find('strong').text();
        var videos = chapter.find('.video li');

        var chaperData = {
            chapertTitle:chapertTitle,
            videos:[]
        };
        videos.each(function (index,item){
            var video = $(this).find('a');
            var videoTitle = video.text();
            var id = video.attr('href').split('video/')[1];

            chaperData.videos.push({
                title : videoTitle,
                id : id
            });
        });

        courseData.push(chaperData);

    });
    return courseData;
}

function printCourseInfo(courseData){
    courseData.forEach(function (item){
        var chapertTitle = item.chaperTilte;
        console.log(chapertTitle + '\n');
        
        item.videos.forEach(function (video){
            console.log('[' + video.id + ']' + video.title + '\n')
        });
    })
}

https.get(url,function (response){
    var html = '';
    response.on('data',function (data){
        html += data;
    });
    response.on('end',function (){
        var courseData = filterChaper(html);

        printCourseInfo(courseData);
    });
}).on('error',function (){
    console.log('获取课程数据出错');
});