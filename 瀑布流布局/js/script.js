window.onload=function ()
{
	waterFall("main","box");
	window.onresize=function ()
	{
		waterFall("main","box");
	};
	var dataInt={"data":[{"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'}]};
	window.onscroll=function ()
	{
		if(checkScroll())
		{
			var oParent=document.getElementById("main");

			//把数据块渲染到页面的尾部
			for(var i=0;i<dataInt.data.length;i++)
			{
				var newBox=document.createElement('div');
				newBox.className="box";
				oParent.appendChild(newBox);
				var newPic=document.createElement('div');
				newPic.className="pic";
				newBox.appendChild(newPic);
				var newImg=document.createElement("img");
				newImg.src="images/"+dataInt.data[i].src;
				newPic.appendChild(newImg);
			}
			waterFall("main","box");
		}
	};
};

function waterFall(parent,box)
{
	var oParent=document.getElementById(parent);
	var aBox=getByClass(oParent,box);
	// console.log(aBox.length);
	//计算页面的列数
	var boxW=aBox[0].offsetWidth;
	var windowWidth=document.documentElement.clientWidth||document.body.clientWidth;
	var cols=Math.floor(windowWidth/boxW);
	oParent.style.cssText="width:"+boxW*cols+"px;margin:0 auto;";
	var aHeight=[];  //存放每一列高度的数组
	for(var i=0;i<aBox.length;i++)
	{
		if(i<cols)
		{
			aHeight.push(aBox[i].offsetHeight);

			//下面这行是为了窗口调整时，如果若窗口变小,只放下3张图，第4,5,6张会被添加上else后的style，所以style还要改回来
			aBox[i].style.position="";
			aBox[i].style.top="";
			aBox[i].style.top="";
		}
		else
		{
			//高度最小的列,当apply第一个值为null,this指向全局变量
			var minHeight=Math.min.apply(null,aHeight);
			//高度最小值的列所在第几列
			var index=getminHIndex(aHeight,minHeight);
			aBox[i].style.position="absolute";
			//aBox[i].style.left=aBox[index].offsetLeft+"px";
			aBox[i].style.left=index*boxW+"px";
			aBox[i].style.top=minHeight+"px";

			aHeight[index]+=aBox[i].offsetHeight;
		}
	}
	console.log(aHeight);
};

function getByClass(oParent,clsName)
{
	var arr=new Array;
	var all=oParent.getElementsByTagName("*");
	for(var i=0;i<all.length;i++)
	{
		var _this=all[i];
		if(_this.className==clsName)
		{
			arr.push(_this);
		}
	}
	return arr;
};

function getminHIndex(arr,value)
{
	for(var i in arr)
	{
		if(arr[i]==value)
		{
			return i;
		}
	}
};

//检测是否需要刷新加载
function checkScroll()
{
	var oParent=document.getElementById("main");
	var aBox=getByClass(oParent,"box");
	var lastBoxH=aBox[aBox.length-1].offsetTop+Math.floor(aBox[aBox.length-1].offsetHeight/2);
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	var windowHeight=document.body.clientHeight||document.documentElement.clientHeight;

	return (lastBoxH<scrollTop+windowHeight)?true:false;
	console.log(windowHeight);
};