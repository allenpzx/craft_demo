

function demo(obj,json,fn)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function ()
	{	
		var allAttr=true;//假设多个attr都达到目标值，注意这行代码的位置，setInterval定时器之内，json的for循环之前
		for(var attr in json)
		{

		//取当前obj.attr的值
		var now=0;
		//如果是opacity做特殊处理
		if(attr=='opacity')
		{
			now=Math.round(parseFloat(getStyle(obj,attr))*100);
		}
		else
		{
			now=parseInt(getStyle(obj,attr));
		}

		//建立速度
		var speed=(json[attr]-now)/6;
		//速度进行向上和向下取整
		speed=speed>0?Math.ceil(speed):Math.floor(speed);

		//检测运动目标是否 全部 达成
		if(now!=json[attr])
		{
			//如果还有attr没有达到目标址，给中间值allAttr标记为false
			allAttr=false;
		}
		
			if(attr=='opacity')
			{
				//兼容IE
				obj.style.filter='alpha(opacity:'+(now+speed)+')';
				//兼容fireFox Chrome
				obj.style.opacity=(now+speed)/100;
			}
			else{
				obj.style[attr]=now+speed+'px';
			}
		
		//json的for循环结束括号
		}
		
		//如果所有的attr都达到目标，注意这行代码的位置，for之后，定时器之内
		if(allAttr)
		{
			clearInterval(obj.timer);
			//如果有回调函数则执行
			if(fn)
			{
				fn()
			}
		}
	//setInterval的结束处			
	},30);
	// console.log('iTarget:'+iTarget+'\n'+'now:'+now+'\n'+'speed:'+speed+'\n'+'timer:'+timer);
};

function getStyle(obj,attr)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[attr];
	}
	else
	{
		return getComputedStyle(obj,null)[attr];
	}
};
