
var content=document.getElementById("content");

var contentW=content.clientWidth;

var contentH=content.clientHeight;

var oUl=content.getElementsByTagName("ul")[0];

var aLi=oUl.getElementsByTagName("li");

var oBoy=document.getElementById("boy");

var sun=document.getElementById("sun");

var cloud=document.getElementById("cloud");
var cloud1=cloud.getElementsByTagName("div")[0];
var cloud2=cloud.getElementsByTagName("div")[1];

var door=document.getElementById("door");
var door_left=door.getElementsByTagName("*")[0];
var door_right=door.getElementsByTagName("*")[1];

var bird=document.getElementById("bird");

for(var i=0;i<aLi.length;i++)
{
	aLi[i].style.width=contentW+"px";
	aLi[i].style.height=contentH+"px";
}

oUl.style.width=contentW*aLi.length+"px";

// 背景图片分三截,中间截出人物走的路,用路的top值+路的高度一半就是路的中心,既人物的底端值
var path=aLi[0].children[0].children[1];
var pathY=Math.round(path.offsetTop+path.offsetHeight/2);
oBoy.style.top=pathY-oBoy.offsetHeight+25+"px";

function demo()
{
	// 人物移动走路
	run("8s","0.5","0.5");
	// 太阳运动
	addClass(sun,"rotation");
	// 云彩运动
	addClass(cloud1,"cloud_1Anim");
	addClass(cloud2,"cloud_2Anim");

	// 人物走到指定位置移动背景图片
	oBoy.addEventListener("transitionend",function (){
		moveBG();
	})
};

function run(time,rateX,rateY)
{
	var disX=calculateDis("x",rateX);
	var disY=calculateDis("y",rateY);
	addClass(oBoy,"startWalk");
	removeClass(oBoy,"pauseWalk");
	oBoy.style.transition="all "+time+" linear";
	oBoy.style.transform="translate3d("+(disX)+"px,0px,0px)";
};

function moveBG()
{
	// 水平移动背景图片
	oUl.style.transition="all 10s linear";
	oUl.style.transform="translate3d(-"+(contentW * 2)+"px,0px,0px)";

	setTimeout(function ()
	{
		page2();
	},5000);
};

function page2()
{
		// 男主在花店门口停下脚步
		addClass(oBoy,"pauseWalk");

		// 停止在第二张图片位置
		oUl.style.transition="all 10s linear";
		oUl.style.transform="translate3d(-"+(contentW)+"px,0px,0px)";

		// 花店开门
		door_left.style.transition="all 1s linear";
		door_left.style.transform="translate3d(-100%,0px,0px)";
		door_right.style.transition="all 1s linear";
		door_right.style.transform="translate3d(100%,0px,0px)";

		addClass(bird,"birdFly");
		bird.style.transition="all 15s linear";
		bird.style.transform="translate3d(-"+(contentW * 1)+"px,0px,0px)"

		// 监听开门后,男主添加进入花店取花的动画
		door_left.addEventListener("transitionend",function ()
		{
			// 添加背景图片开灯
			var b_bg=document.getElementById("b_bg");
			addClass(b_bg,"lamp_bright");

			// 延时取花
			setTimeout(function (){

			// 飞鸟
			addClass(bird,"birdFly");
			bird.style.transition="all 15s linear";
			bird.style.transform="translate3d(-"+(contentW * 1)+"px,0px,0px)"

			addClass(oBoy,"takeFlower");
			removeClass(b_bg,"lamp_bright");
			removeClass(oBoy,"pauseWalk");

			// 关门
			door_left.style.transition="all 1s linear";
			door_left.style.transform="translate3d(0%,0px,0px)";
			door_right.style.transition="all 1s linear";
			door_right.style.transform="translate3d(-0%,0px,0px)";

            oUl.style.transition="all 10s linear";
            oUl.style.transform="translate3d(-"+(contentW * 2)+"px,0px,0px)";

            oUl.addEventListener("transitionend",function (){
            	alert("123");
            })

            setGirl();
	            
			},1000);
		});
};

function setGirl()
{
	var girl=document.getElementById("girl");
	var bridgeTop=document.getElementById("c_background_middle").offsetTop;
	girl.style.top=bridgeTop-girl.offsetHeight+"px";
	girl.style.left=Math.round(contentW/2)+"px";

	var oBoy=document.getElementById("boy");
	var targetBottom=girl.offsetHeight+girl.offsetTop+"px";
	var bridgeA=Math.round(contentW*0.15);
	var bridgeB=Math.round(contentW*0.25);

	var girlL=girl.offsetLeft;
	var girlT=girl.offsetTop;
	oBoy.style.transition="all 10s linear";
	oBoy.style.transform="translate("+bridgeA+"px,0px)";
};

function moveMan()
{
	// 移动人物
	oBoy.style.transition="all 10s linear";
	oBoy.style.transform="translate3d("+contentW+"px,0px,0px)"
};

function pauseMan()
{
	var nowX=oBoy.offsetLeft;
	oBoy.style.left=nowX;
	// oBoy.style.transform="translate3d("+nowX+"px,0px,0px)"
};

//人物开始有走路的动画
function startWalk()
{
	toggleClass(oBoy,"startWalk");
};

//人物走路的动画停止
function pauseWalk()
{
	// oBoy.style.animationPlayState="paused";
	// oBoy.style.left=oBoy.offsetLeft+0+"px";

	// var nowX=oBoy.offsetLeft;
	// oBoy.style.transform="translate3d("+nowX+"px,0px,0px)"

	// addClass(oBoy,"pauseWalk");
	addClass(oBoy,"pauseWalk");
};

function calculateDis(direction,rate)
{
	// 我们把小男孩子所有的动作分解一下
	// 走路到页面的2/3的时候，主题页面开始滑动
	// 走路到1/2的时候，到了商店门口
	// 进出商店
	// 走路到1/4到了桥边
	// 走路到1/2到了桥上
	// 注意：小男孩走路范围其实只有一个页面区域，因为父容器是content元素
	// 小男孩不管是往X还是Y轴变化，我们可以做一个比例换算出来，按照百分比的比例去换算实际的距离
	// 例如：走到1/2的位置 ，具体的坐标值的计算就是 ： 实际X轴位置 = 0.5 * 页面宽度 ，同样Y轴的计算也是如此
	// 因为背景图片自适应,所以人物的距顶部和左侧的距离需要根据 比率 计算
	return (direction=="x"?contentW:contentH)*rate;
};

// 下面是原生JS动态处理class
function hasClass(obj,cls)
{ 
  return obj.className.match( new RegExp( "(\\s|^)" + cls + "(\\s|$)"));
}; 

function addClass(obj,cls)
{ 
  if(!hasClass(obj,cls))
  { 
    obj.className+=" "+cls; 
  }; 
}; 

function removeClass( obj,cls )
{ 
  if(hasClass(obj,cls))
  { 
    obj.className =obj.className.replace(new RegExp("(\\s|^)"+cls+"(\\s|$)")," ");
  }; 
};

function toggleClass(obj,cls)
{
	if(hasClass(obj,cls))
	{
		removeClass(obj,cls);
	}
	else
	{
		addClass(obj,cls);
	}
};

//获取样式
function getStyle(obj,attr)
{
	// return window.getComputedStyle ? window.getComputedStyle(obj,null)[attr]:obj.currentStyle[attr]; 
	return obj.currentStyle?obj.currentStyle[attr]:window.getComputedStyle(obj,null)[attr];
};