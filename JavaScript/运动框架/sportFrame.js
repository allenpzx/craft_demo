
function getByClass(oParent,sClass)
{
  var aEle=oParent.getElementsByTagName('*');
  var aResult=[];
  for(var i=0;i<aEle.length;i++)
  {
    if(aEle[i].className==sClass)
    {
      aResult.push(aEle[i]);
    }
  }
  return aResult;
};

function getStyle(obj, name)
{
  if (obj.currentStyle)
  {
    return obj.currentStyle[name];
  }
   else
  {
    return getComputedStyle(obj, null)[name];
  }

};

// var alpha=0.3;
function demo(obj,json,fnEnd) {
  clearInterval(obj.timer);

  obj.timer = setInterval(function() {

    var bStop=true;  //假设所有值都已达成
    for(var attr in json)
    {
	    var cur = 0;
	    if(attr=='opacity')
	    {
	      cur =parseFloat(getStyle(obj,attr))*100;
	    }
	    else
	    {
	      cur = parseInt(getStyle(obj, attr));
	    }

	    var speed = (json[attr] - cur) / 10;
	    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

	    if(cur!=json[attr]){bStop=false};

	    if(attr=='opacity')
	    {
	      obj.style.filter='alpha(opacity:'+(cur+speed)+')'
	      obj.style.opacity=(cur+speed)/100;
	    }
	    else
	    {
	      obj.style[attr] = cur + speed + 'px';
	    }

    // if (cur == json[attr])
    // {
    //   clearInterval(obj.timer);
    //   if(fnEnd)fnEnd();
    // }
    // else
    // {
    //   // if(attr=='opacity')
    //   // {
    //   //   obj.style.filter='alpha(opacity:'+(cur+speed)+')'
    //   //   obj.style.opacity=(cur+speed)/100;
    //   // }
    //   // else
    //   // {
    //   //   obj.style[attr] = cur + speed + 'px';
    //   // }
    // }
    };

    if(bStop)
    {
      clearInterval(obj.timer);
      if(fnEnd)fnEnd();
    }

  }, 30);
}
