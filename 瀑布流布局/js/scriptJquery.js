$(window).on("load",function (){
	waterFall();
	var dataInt={"data":[{"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'}]};
	$(window).on("scroll",function (){
		//是否具备加载条件
		if(checkScroll)
		{
			$.each(dataInt.data,function (key,value){
				// console.log($(value).attr("src"));
				var oBox=$("<div>").addClass("box").appendTo($("#main"));
				var oPic=$("<div>").addClass("pic").appendTo($(oBox));
				var oImg=$("<img>").attr("src","images/"+$(value).attr("src"));
				oImg.appendTo($(oPic));
			})
			waterFall();
		}
	})
	
	$(window).on("resize",function (){
		var $boxs = $('#main>div');

    	$boxs.each(function(index,value){

      	$(value).css('position','')

    	});

    	waterFall();
	});
})

function waterFall()
{
  var $boxs=$("#main>div");
  var W=$boxs.eq(0).outerWidth();
  var cols=Math.floor($(window).width()/W);
  $("#main").width(W*cols).css("margin","0 auto");
  var arrHeight=[];
  $boxs.each(function (index,value)
  {
  	var H=$boxs.eq(index).outerHeight();
  	if(index<cols)
  	{
  		// arrHeight.push(H);
  		//下面这种方法也可以
  		arrHeight[index]=H;

      
  	}
  	else
  	{
  		var minH=Math.min.apply(null,arrHeight);
  		var minHIndex=$.inArray(minH,arrHeight);

  		$(value).css({
  			"position":"absolute",
  			"top":minH+"px",
  			"left":minHIndex*W+"px"
  			})
  		arrHeight[minHIndex]+=$boxs.eq(index).outerHeight();
  	}
  	
  })
};

function checkScroll()
{
	var $lastBox=$("#main>div").last();
	var lastBoxDis=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
	var scrollTop=$(window).scrollTop();
	var documentH=$(window).height();
	return (lastBoxDis<scrollTop+documentH)?true:false;
};






