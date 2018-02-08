function LimitDrag(id)
{
  Drag.call(this,id);
};

for(var i in Drag.prototype)
{
  LimitDrag.prototype[i]=Drag.prototype[i];
}

//只需要有区别的地方重写即可
LimitDrag.prototype.fnMove=function (ev)
{
  var oEvent=ev||event;
  var L=oEvent.clientX-this.disX;
  var T=oEvent.clientY-this.disY;
  if(L<0)
  {
    L=0;
  }
  else if(L>document.documentElement.clientWidth-this.oDiv.offsetWidth)
  {
    L=document.documentElement.clientWidth-this.oDiv.offsetWidth;
  }
  this.oDiv.style.left=L+'px';
  this.oDiv.style.top=T+'px';
};
