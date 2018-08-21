import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import SKU from './select_sku.jsx';

export default class ProductDetail extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
    this.settings = {
      slidesToShow: 1,
      speed: 500,
      initialSlide: 1,
      adaptiveHeight: true,
      dots: false,
      infinite: true,
      autoplay: true,
      arrows: false,
      afterChange: current => {
        console.log(current);
      }
    }
  }

  componentDidMount(){

  }

  componentWillReceiveProps(nextProps){

  }

  render(){
    return (
      <div className="product_detail">

        {/* 图片banner */}
        <div className='product_images'>            
          <Slider {...this.settings}>

            <div>
              <div className='image_wrap'>
                  <img src={require('../../../assets/images/card-image1.jpg')} />
              </div>
            </div>

            <div>
              <div className='image_wrap'>
                  <img src={require('../../../assets/images/card-nike.jpg')} />
              </div>
            </div>

          </Slider>
          {/* 返回和购物车按钮 */}
          <div className='controller'>
            <span><img src={require('../../../assets/images/back-icon.svg')} alt="back"/></span>
            <span><img src={require('../../../assets/images/shopping-cart.svg')} alt="shopping-cart"/></span>
          </div>

        </div>

        {/* 产品描述区域 */}
        <div className='product_info'>

            <div className='info_row'>
                <span>名字名字名字</span>
            </div>

            <div className='info_row'>
              <span>名字描述名字描述</span>
              <div>
                <img src={require('../../../assets/images/share.svg')} alt="share"/>
                <span>分享</span>
              </div>
            </div>

            <div className='info_row'>
              <div className='info_price'>
                <span className='common_price'>¥ 200</span>
                <span className='vip_special_price'>金卡专享 ¥100</span>
              </div>
              <div>
                <span>123456789人已兑</span>
                <span>库存 2件</span>
              </div>
            </div>

        </div>
        {/* 产品描述区域结尾处 */}

        {/* 金卡权益部分 */}
        <div className='vip_special_competencies'>
          <div>
            金卡专享权益
          </div>

          <div>
            <span>
              <img src={require('../../../assets/images/success.svg')} alt="success"/>
              字体字体字体
            </span>
            <span>
              <img src={require('../../../assets/images/success.svg')} alt="success"/>
              字体字体字体
            </span>
            <span>
              <img src={require('../../../assets/images/success.svg')} alt="success"/>
              字体字体字体
            </span>
            <span className='more_competencies'>
              <img src={require('../../../assets/images/svg/arrow.svg')} alt=""/>
            </span>
          </div>
          {/* 第二行结尾处 */}
        </div>
        {/* 金卡专享权益区域结尾处 */}

        {/* 图文详情区域 */}
        <div className='product_description'>

          <div className='tittle'>
            <img src={require('../../../assets/images/image.svg')} alt=""/>
            <span>图文详情</span>
          </div>

          {/* 下面是图详情 */}
          <div className='img_area'>
              <img src={require('../../../assets/images/propose_bak.png')} alt=""/>
              <img src={require('../../../assets/images/texture-white.jpg')} alt=""/>
          </div>

        </div>

        {/* 品牌介绍区域 */}
        <div className="brand_info">

          <div className='line1'>

            <div className='brand_img_wrap'>
              <img src={require('../../../assets/images/adidas.jpg')} alt=""/>
            </div>

            <div className='brand_name'>
              <span>品牌名</span>
              <span>品牌描述</span>
            </div>

          </div>

          <div className='line2'>
            文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
          </div>

          <div>
            <button>查看更多</button>
          </div>

        </div>

        <div className='product_description_footer'>
            <span className='collection'>
              <img src={require('../../../assets/images/heart.svg')} alt=""/>
              收藏
            </span>
            <span className='add_to_cart'>加入购物车</span>
            <span className='immediately'>立即购买</span>
        </div>

        {/* <button style={{
          backgroundColor: 'red',
          color: 'white'
        }}
          onClick={()=>{
            // this.setState({is_open: true})
            // console.log(this.refs.ceshi)
            this.refs.ceshi.open_sku_list();
          }}
        >立即购买</button> */}


        <SKU ref='ceshi' open={this.state.is_open}/>
      </div>
    );
  }
}