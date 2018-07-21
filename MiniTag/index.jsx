import React from 'react';

export default class MiniTag extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            isDraging: false,
            contentIsShow: false
        }
    }

  componentDidMount() {
    // 初始化可拖拽浮窗
    this.dragable_MiniTag();
    // 初始化弹窗
    this.miniWindow();
    // 初始化弹窗的图片
    this.show_mini_tag_img();
  }

  show_mini_tag_img = () => {
    let img = this.refs.mini_tag_button_img;
    img ? img.style.opacity = 1 : null;
    let contentImg = this.refs.mini_tag_content_img;
    contentImg ? contentImg.style.opacity = 1 : null;
  }

  miniWindow = () => {
    let btn = document.getElementById('mini_tag_button');
    let content = document.getElementById('mini_tag_content');
    let inside_content = document.getElementById('mini_tag_content_inside_container');
    let close_mini_content_btn = document.getElementById('close_mini_tag_btn');

    btn.addEventListener('touchend', ()=>{
        if(this.state.isDraging === false){
            btn.style.webkitAnimationPlayState = 'paused';
            btn.style.zIndex = 1;
            content.style.display = 'block';
            content.style.zIndex = 9999;
            setTimeout(()=>{
                content.style.visibility = 'visible';
                content.style.top = '0';
                content.style.opacity = 1; 
                content.style.backgroundColor = 'rgba(0, 0, 0, .54)';
                this.setState({contentIsShow: true})
                window.requestAnimationFrame(this.AniMove);
                window.requestAnimationFrame(this.scrollToTop);
            }, 100)
        }else{
            return 
        }
    })

    content.addEventListener('click', (e)=>{
        e.preventDefault();
        btn.style.webkitAnimationPlayState = 'running';
        btn.style.zIndex = 9999;
        content.style.zIndex = 1;
        content.style.top = '100vh';
        content.style.opacity = 0;
        content.style.visibility = 'hidden';
        content.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        setTimeout(()=>{
            content.style.display = 'none';
            this.setState({contentIsShow: false})
        }, 100)
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

        btn.addEventListener('touchmove', (e)=>{
            if(this.state.contentIsShow){
                return
            }
            // console.log(btnX, touchX);
            if(touchX < btnX || touchX > (btn.offsetWidth + btnX)){
                return 
            }
            if(touchY < btnY || touchY > (btn.offsetHeight + btnY)){
                return 
            }
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

  scrollToTop = () => {
    let currentTop = document.documentElement.scrollTop || document.body.scrollTop;
    console.log(currentTop)
    if(currentTop > 0){
        let speed = parseInt(currentTop / 10);
        window.scrollTo(0, speed);
        window.requestAnimationFrame(this.scrollToTop);
    }else{
        return
    }
  }

  AniMove = () => {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    let btn = document.getElementById('mini_tag_button');
    let contentArea = document.documentElement.clientWidth || document.body.clientWidth;
    let btnx = btn.offsetLeft;

    if(btnx >= parseInt(contentArea / 2) && btnx < parseInt(contentArea - btn.offsetWidth)){
        let speed = parseInt((contentArea - btnx)/10)

        if((btnx + speed) > parseInt(contentArea - btn.offsetWidth)){
            btn.style.left = parseInt(contentArea - btn.style.left) + 'px'
            return 
        }else{
            btn.style.left = parseInt(btnx + speed) + 'px';
        }
        // console.log(speed)
        // if(btn.style.left > parseInt(contentArea - btn.offsetWidth)){
        //     console.log(parseInt(contentArea - btn.offsetWidth));
        //     btn.style.left = parseInt(contentArea - btn.offsetWidth)
        //     console.log(btn.style.left, btn.offsetLeft);
        // }
        // console.log(contentArea - btn.offsetWidth)
        window.requestAnimationFrame(this.AniMove);
    }else if(btnx <= parseInt(contentArea / 2) && btnx > 0){
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

            <div id='mini_tag_button' className="mini_tag_button mini_tag_button_ripple">
                <img ref='mini_tag_button_img' style={{opacity: 0}} src={require('../../../assets/images/minitag_icon.jpg')} alt="mini_tag"/>
            </div>
            
            <div id='mini_tag_content' className="mini_tag_content">

            <div
                id='mini_tag_content_inside_container'
                className='mini_tag_content_inside_container'
            >
                <div className="content_img_container">
                    <img ref='mini_tag_content_img' src={require('../../../assets/images/mini_page.jpg')} style={{opacity: 0}} alt=""/>
                </div>
            </div>
        
            <img id="close_mini_tag_btn" src={require('../../../assets/images/close.svg')}  alt=""/>

            </div>

      </div>
    );
  }

}