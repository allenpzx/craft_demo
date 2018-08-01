import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default class CreditShop extends React.Component{

    constructor(props){
        super(props)
        this.state = {
          chosen_activity_show_more: false,
        }
        this.settings = {
          className: "credit_shop_recommend_slide",
          slidesToShow: 2,
          speed: 500,
          arrows: false,
          centerPadding: "60px",
          infinite: false,
          initialSlide: -1,
          variableWidth: true,
          afterChange: current => {
            console.log(current);
          }
      }
    }

    componentDidMount() {
      window.addEventListener('scroll', this.scrollAnimation);
      this.initial_animation();
    }

    componentWillReceiveProps(nextProps){
      // console.log(nextProps)
    }

    initial_animation = () => {
      // slider初始化动画
      this.refs.slider_container.style.left = 0;
    }

    scrollAnimation = () => {

      let header = this.refs.scroll_show_header;
      let header_height = header.offsetHeight;
      let header_bottom = header.getBoundingClientRect().bottom;

      let user_info = this.refs.credit_shop_user_info;
      let user_info_height = user_info.offsetHeight;
      let user_info_bottom = user_info.getBoundingClientRect().bottom;

      let distance_height_static = user_info_height - header_height;
      let distance_bottom_dynamic = user_info_bottom - header_bottom;
      // console.log('高度之差: ', scroll_show_height - header_height);
      // console.log('当前底部之差: ', scroll_show_bottom - header_bottom); 
      let scale_speed = (distance_bottom_dynamic / distance_height_static).toFixed(2);
      // console.log('scale_speed: ', scale_speed);
      let number_scale_speed = parseFloat(scale_speed);
      // console.log('number_scale_speed: ', number_scale_speed);
      if(number_scale_speed < 0){
        return 
      }

      let img_wrap = this.refs.img_wrap;
      let bgc_color = this.refs.bgc_color;
      bgc_color.style.height = `${(1 - number_scale_speed) * 100}%`;
      // 下面是动态调整样式部分
      if(scale_speed <= 0.1){
        header.style.opacity = 1;
      }else{
        header.style.opacity = (1-scale_speed);
      }

      img_wrap.style.transform = `rotate(${360 * number_scale_speed}deg) scale(${number_scale_speed}, ${number_scale_speed})`;

      let items = document.getElementsByClassName('user_detail')[0].children;
      Array.from(items).map((item, value)=>{
        item.style.transform = `rotate(${360 * number_scale_speed}deg) scale(${number_scale_speed}, ${number_scale_speed})`;
      })
      // img_wrap.style.opacity = `${number_scale_speed}`;
      // img_wrap.style.opacity = .5;


    }

    showMore = () => {
      let hidden_items = document.getElementsByClassName('hidden-item')
      
      Array.from(hidden_items).map((value, key)=>{
        setTimeout(()=>{
          value.style.height = '20vh';
          value.style.opacity = 1;
          value.style.visibility = 'visible';
          value.style.transform = `translateY(0)`;
        }, key * 200)
      })
      this.setState({chosen_activity_show_more: true});
    }

    hiddenMore = () => {
      let hidden_items = document.getElementsByClassName('hidden-item')
      
      Array.from(hidden_items).map((value, key)=>{
        setTimeout(()=>{
          value.style.transform = `translateY(-100px)`;
          value.style.opacity = 0;
          value.style.height = '0';
          value.style.visibility = 'hidden';
        }, key * 200)
      })
      this.setState({chosen_activity_show_more: false});
    }

    swiper_view = (e) => {

      Array.from(this.refs.product_tab_ul.children).map((item, key)=>{
        item.classList.remove('active')
      })
      e.target.classList.add('active')
      let index = parseInt(e.target.getAttribute('data-tab-index'))-1
      // console.log(index);
      this.refs.swiper_view_content.style.transform = `translateX(${-100 * index}%)`
    }

    // launchFullscreen = (element) => {
    //   this.exitFullscreen();
    //   if(element.requestFullscreen) {
    //     element.requestFullscreen();
    //   } else if(element.mozRequestFullScreen) {
    //     element.mozRequestFullScreen();
    //   } else if(element.msRequestFullscreen){
    //     element.msRequestFullscreen();
    //   } else if(element.webkitRequestFullscreen) {
    //     element.webkitRequestFullScreen();
    //   }
    // }

    // exitFullscreen = () => {
    //   if (document.exitFullscreen) {
    //     document.exitFullscreen();
    //   } else if (document.msExitFullscreen) {
    //     document.msExitFullscreen();
    //   } else if (document.mozCancelFullScreen) {
    //     document.mozCancelFullScreen();
    //   } else if (document.webkitExitFullscreen) {
    //     document.webkitExitFullscreen();
    //   }
    // }

  render(){

    return (
      <div className="credit_shop">

      <div ref='scroll_show_header' className="scroll_show_header">
            <div className="scroll_show_header_img_wrap">
                <img src={require('../../../assets/images/young-logo.png')} alt="header-logo"/>
            </div>
            <div ref='bgc_color' className="bgc_color">

            </div>
      </div>

      <div ref='credit_shop_content' className="credit_shop_content">

          <div ref="credit_shop_user_info" className="credit_shop_user_info">

            <div className="user_avator">
              <div ref='img_wrap' className='img_wrap'>
                <img ref='user_avator' src={require('../../../assets/images/event.png')} alt="avator"/>
              </div>
              <span>金卡会员</span>
            </div>

            <div className='user_detail'>

              <div className="item">
                <img src={require('../../../assets/images/my-icon.svg')} />
                <span>商品</span>
              </div>
              <div className="item">
                <img src={require('../../../assets/images/my-icon.svg')} />
                <span>商品</span>
              </div>
              <div className="item">
                <img src={require('../../../assets/images/my-icon.svg')} />
                <span>商品</span>
              </div>

            </div>

          </div>

          <div className="recommend_part">
              <div className='wave_rotate'></div>
              <div className='recomment_header'>推荐权益</div>

              <div ref='slider_container' className='slider_container'>

                <Slider {...this.settings}>

                  <div>
                    <div className="slick-slide-main">

                      <div className="slide_img_wrap">
                        <img src={require('../../../assets/images/texture-white.jpg')} alt=""/>
                      </div>

                      <div className="slide_recommend_info">
                          <div>
                            <span>标题标题标题标题</span>
                            <span>描述描述描述描述</span>
                          </div>
                          <div>
                            <button>按钮</button>
                          </div>
                      </div>

                    </div>
                  </div>

                  <div>
                    <div className="slick-slide-main">

                      <div className="slide_img_wrap">
                        <img src={require('../../../assets/images/texture-white.jpg')} alt=""/>
                      </div>

                      <div className="slide_recommend_info">
                          <div>
                            <span>标题标题标题标题</span>
                            <span>描述描述描述描述</span>
                          </div>
                          <div>
                            <button>按钮</button>
                          </div>
                      </div>

                    </div>
                  </div>

                  <div>
                    <div className="slick-slide-main">

                      <div className="slide_img_wrap">
                        <img src={require('../../../assets/images/texture-white.jpg')} alt=""/>
                      </div>

                      <div className="slide_recommend_info">
                          <div>
                            <span>标题标题标题标题</span>
                            <span>描述描述描述描述</span>
                          </div>
                          <div>
                            <button>按钮</button>
                          </div>
                      </div>

                    </div>
                  </div>

                </Slider>

              </div>
          </div>

          <div className="chosen_activity">
              <div className="chosen_header">
                精选活动
              </div>
              <div className="chosen_activity_4">
                  <div className='item'>
                      <div className='item_img_wrap'>
                        <img src={require('../../../assets/images/texture.jpg')} alt=""/>
                      </div>
                      <div className='item_info'>
                            <span>标题标题标题</span>
                            <span>描述描述描述</span>
                      </div>
                  </div>
                  <div className='item'>
                      <div className='item_img_wrap'>
                        <img src={require('../../../assets/images/texture.jpg')} alt=""/>
                      </div>
                      <div className='item_info'>
                            <span>标题标题标题</span>
                            <span>描述描述描述</span>
                      </div>
                  </div>
                  <div className='item'>
                      <div className='item_img_wrap'>
                        <img src={require('../../../assets/images/texture.jpg')} alt=""/>
                      </div>
                      <div className='item_info'>
                            <span>标题标题标题</span>
                            <span>描述描述描述</span>
                      </div>
                  </div>
                  <div className='item'>
                      <div className='item_img_wrap'>
                        <img src={require('../../../assets/images/texture.jpg')} alt=""/>
                      </div>
                      <div className='item_info'>
                            <span>标题标题标题</span>
                            <span>描述描述描述</span>
                      </div>
                  </div>

                  <div className='item hidden-item'>
                      <div className='item_img_wrap'>
                        <img src={require('../../../assets/images/texture.jpg')} alt=""/>
                      </div>
                      <div className='item_info'>
                            <span>标题标题标题</span>
                            <span>描述描述描述</span>
                      </div>
                  </div>
                  <div className='item hidden-item'>
                      <div className='item_img_wrap'>
                        <img src={require('../../../assets/images/texture.jpg')} alt=""/>
                      </div>
                      <div className='item_info'>
                            <span>标题标题标题</span>
                            <span>描述描述描述</span>
                      </div>
                  </div>
                 
              </div>
              <div onClick={()=>{
                this.state.chosen_activity_show_more
                ? this.hiddenMore()
                : this.showMore()
                }} className='see_more_items'>
                    {
                      this.state.chosen_activity_show_more
                      ? '收起'
                      : '查看更多'
                    }
              </div>
          </div>

          <div className="product_list">
              <div className='product_list_header'>会员最爱买</div>

              <div className='product_tab'>
                  <ul ref='product_tab_ul' onClick={(e)=>{this.swiper_view(e)}}>
                    <li data-tab-index='1' className='active'>推荐</li>
                    <li data-tab-index='2'>时尚</li>
                    <li data-tab-index='3'>美妆</li>
                    <li data-tab-index='4'>美食</li>
                    <li data-tab-index='5'>生活方式</li>
                  </ul>
              </div>

              <div className='swiper-view'>
                  <div ref='swiper_view_content' className='swiper-view-container'>

                  <div className='swiper-view-item'>

                      <div onClick={()=>{
                        window.history.pushState('product-detail',null, '/product-detail');
                        window.history.go(0);
                      }} className='credit_product'>
                          <div className='product_img_wrap'>
                            <img src={require('../../../assets/images/levis.jpg')} alt=""/>
                          </div>
                          <div className='product_info'>
                              <div className='title'>标题标题标题</div>
                              <div className='tags'>
                                <span>标签标签</span>
                                <span>标签标签</span>
                              </div>
                              <div className='price'>
                                  <span>¥200</span>
                                  <span>会员专享¥100</span>
                              </div>
                              <div className='check_num'>123456789人已兑</div>
                          </div>
                      </div>
                      <div className='credit_product'>
                          <div className='product_img_wrap'>
                            <img src={require('../../../assets/images/levis.jpg')} alt=""/>
                          </div>
                          <div className='product_info'>
                              <div className='title'>标题标题标题</div>
                              <div className='tags'>
                                <span>标签标签</span>
                                <span>标签标签</span>
                              </div>
                              <div className='price'>
                                  <span>¥200</span>
                                  <span>会员专享¥100</span>
                              </div>
                              <div className='check_num'>123456789人已兑</div>
                          </div>
                      </div>
                      <div className='credit_product'>
                          <div className='product_img_wrap'>
                            <img src={require('../../../assets/images/levis.jpg')} alt=""/>
                          </div>
                          <div className='product_info'>
                              <div className='title'>标题标题标题</div>
                              <div className='tags'>
                                <span>标签标签</span>
                                <span>标签标签</span>
                              </div>
                              <div className='price'>
                                  <span>¥200</span>
                                  <span>会员专享¥100</span>
                              </div>
                              <div className='check_num'>123456789人已兑</div>
                          </div>
                      </div>

                      <div className='no_more_product'><span>别拉了已经没有了</span></div>
                  </div>

                  <div style={{backgroundColor: 'blue'}} className='swiper-view-item'>
                      22
                  </div>

                  <div style={{backgroundColor: 'pink'}} className='swiper-view-item'>
                      33
                  </div>

                  </div>
                  {/* swiper_view_content结尾处 */}
              </div> 
              {/* swiper_view整体容器结尾处 */}
          </div>
            {/* 商品列表结尾处 */}

      </div>
      </div>
    );
  }

}