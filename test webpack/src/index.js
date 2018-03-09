import './style.css';
import Icon from './icon.png';
import Data from './data.xml';
import printMe from './print.js';
import { cube } from './math.js';
import layer from './components/layer/layer.js';

console.log(layer);

function component() {

    //创建元素,添加文字
    var element = document.createElement('div');
    element.innerHTML = "Hello Webpack";
    element.classList.add('hello');

    //引入图片插入已有元素
    var myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);

    console.log(Data);

    var btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console!'+cube('100');
    btn.onclick = printMe;
    element.appendChild(btn);

    const App = function(layer) {

      var dom = document.createElement('div');
    
      var layer = new layer();
    
      dom.innerHTML = layer.tpl;
    
      element.appendChild(dom);
    }
    new App(layer);

    return element;

    

}

// document.body.appendChild(component());
let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);

if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!');

    // printMe();
    document.body.removeChild(element);
    element = component(); // 重新渲染页面后，component 更新 click 事件处理
    document.body.appendChild(element);
  })
}