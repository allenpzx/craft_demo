var handle={
	//添加句柄
	addHandle:function(element,type,handle)
	{
		if(element.addEventListener)
		{
			element.addEventListener(type,handle,false);
		}
		else if(element.attachEvent)
		{
			element.attachEvent('on'+type,handle);
		}
		else
		{
			element['on'+type]=handle;
		}
	};

	//删除句柄
	removeHandle:function(element,type,handle)
	{
		if(element.removeEventListener)
		{
			element.removeEventListener(type,handle,false);
		}
		else if(element.detachEvent)
		{
			element.detachEvent('on'+type,handle);
		}
		else
		{
			element['on'+type]=null;
		}
	};
};


function demo()
{
	alert('这是demo fn');
}