import React from 'react';

export default class MiniTag extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            isDraging: false
        }
    }

  componentDidMount() {
    this.dragable_MiniTag();
    this.miniWindow();
  }

  miniWindow = () => {
    let btn = document.getElementById('mini_tag_button');
    let content = document.getElementById('mini_tag_content');

    btn.addEventListener('touchend', ()=>{
        console.log(this.state.isDraging)
        if(this.state.isDraging === false){
            console.log(this.state.isDraging)

            let W = document.documentElement.clientWidth || document.body.clientWidth;
            let H = document.documentElement.clientHeight || document.body.clientHeight;
            console.log('ceshi');
            console.log(W);
            console.log(H);
            content.style.zIndex = 9999;
            content.style.height = H + 'px';
            // content.style.outline = '256px solid rgba(0, 0, 0, .5)';   
            window.requestAnimationFrame(this.AniMove);
        }else{
            return 
        }
    })

    content.addEventListener('click', ()=>{
        content.style.zIndex = 1;
        content.style.height = 0 + 'px';
    })

  }

  dragable_MiniTag = () => {
    let btn = document.getElementById('mini_tag_button');
    btn.addEventListener('touchstart', (e)=>{
        e.preventDefault();
        let btnX = btn.offsetLeft;
        let btnY = btn.offsetTop;
        btn.style.cursor = 'move';

        let touch = e.touches[0];
        let touchX = Number(touch.pageX);
        let touchY = Number(touch.pageY);

        window.addEventListener('touchmove', (e)=>{
            this.setState({isDraging: true})
            btn.style.cursor = 'move';
            let new_touch = e.touches[0];
            let new_touchX = Number(new_touch.pageX);
            let new_touchY = Number(new_touch.pageY);

            // 原理: touchstart的一瞬间, 鼠标的点和元素的边界的距离是固定的, 移动之后计算新的鼠标位置减去固定的距离就是元素的新的坐标
            let new_x = new_touchX - (touchX - btnX);
            let new_y = new_touchY - (touchY - btnY);
            let contentAreaX = document.documentElement.clientWidth || document.body.clientWidth;
            let contentAreaY = document.documentElement.clientHeight || document.body.clientHeight;

            // 添加边界
            if(new_x < 0){  
                btn.style.left = 0 + 'px';
                btn.style.top = new_y + 'px';
            }else if(new_x > parseInt(contentAreaX - btn.offsetWidth)){
                btn.style.left = parseInt(contentAreaX - btn.offsetWidth) + 'px';
                btn.style.top = new_y + 'px';
            }else if(new_y < 0){
                btn.style.left = new_x + 'px';
                btn.style.top = 0 + 'px';
            }else if(new_y > parseInt(contentAreaY - btn.offsetHeight)){
                btn.style.left = new_x + 'px';
                btn.style.top = parseInt(contentAreaY - btn.offsetHeight) + 'px';
            }else{
                btn.style.left = new_x + 'px';
                btn.style.top = new_y + 'px';
            }

        })
        
    })

    btn.addEventListener('touchend', (e)=>{
        e.preventDefault();
        btn.style.cursor = 'default';
        window.requestAnimationFrame(this.AniMove);
        setTimeout(() => {
            this.setState({isDraging: false})
        }, 0);
    })
  }

  AniMove = () => {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    let btn = document.getElementById('mini_tag_button');
    let contentArea = document.documentElement.clientWidth || document.body.clientWidth;
    let btnx = btn.offsetLeft;

    if(btnx > parseInt(contentArea / 2) && btnx < parseInt(contentArea - btn.offsetWidth)){
        let speed = parseInt((contentArea - btnx)/10)
        btn.style.left = btnx + speed + 'px';
        window.requestAnimationFrame(this.AniMove);
    }else if(btnx < parseInt(contentArea / 2) && btnx > 0){
        // 注意速度0<speed<1
        let speed = Math.ceil(btnx / 10)
        btn.style.left = btnx - speed + 'px';
        window.requestAnimationFrame(this.AniMove);
    }else{
        return null;
    }
  }

  render(){

    return (
      <div className="mini_tag">

            <div id='mini_tag_button' className="mini_tag_button">
                <img src={require('../../../assets/images/propose.jpg')} alt="mini_tag"/>
            </div>
            
            <div id='mini_tag_content' className="mini_tag_content">
                <img src={require('../../../assets/images/miniPage.jpg')} alt=""/>
            </div>

      </div>
    );
  }

}