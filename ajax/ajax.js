function ajax(url,fnSucc,fnFaild)
{
  //1.创建Ajax对象
  if(window.XMLHttpRequest)
  {
    var oAjax=new XMLHttpRequest();
  }
  else
  {
    var oAjax=new ActiveXObject("Microsoft.XMLHTTP");
  }

  //2.连接服务器
  oAjax.open('GET',url,true);

  //3.发送请求
  oAjax.send();

  //4.接受返回值
  oAjax.onreadystatechange=function ()
  {
    //浏览器和服务器进行状态
    //4代表完成，成功失败都会达到4
    if(oAjax.readyState==4)
    {

      if(oAjax.status==200)  //成功
      {
        fnSucc(oAjax.responseText);
      }
      else
      {
          if(fnFaild)
          {
            fnFaild(oAjax.status);
          }
      }
    }

  };
}
