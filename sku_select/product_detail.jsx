import React from 'react';
import SKU from './select_sku.jsx';

const testdata = {
  "code": 1,
  "data": {
      "id": 2,
      "min_price": "",
      "name": "时尚积分商品",
      "description": "时尚积分商品简介",
      "image": "996022f4.png",
      "created_at": "2018-07-26 16:48:35",
      "updated_at": "2018-07-30 10:31:12",
      "deleted_at": null,
      "category_id": "1",
      "sort_num": "0",
      "sliders": [
          "11a69794.png",
          "5cd14822.jpg"
      ],
      "vip_level_slug": "level1",
      "max_price": "",
      "is_virtual": false,
      "used_num": "1111",
      "details": "<p>时尚积分商品简介</p >\r\n",
      "limit_num": "1111",
      "partner_shop_id": "174",
      "type": [
          "大小",
          "颜色",
          "性别"
      ],
      "skus": [
          {
              "id": 10,
              "name": "时尚SKU1",
              "description": "时尚SKU1简介",
              "price": {
                  "price_level1": "110",
                  "price_level2": "10"
              },
              "type": {
                  "大小": "L",
                  "颜色": "黄",
                  "性别": "男"
              },
              "image": "default_point_shop_product_sku.jpg",
              "stock": "10",
              "point_shop_product_id": "2"
          },
          {
              "id": 11,
              "name": "时尚SKU2",
              "description": "时尚SKU2简介",
              "price": {
                  "price_level1": "110",
                  "price_level2": "10"
              },
              "type": {
                  "大小": "XL",
                  "颜色": "红",
                  "性别": "女"
              },
              "image": "default_point_shop_product_sku.jpg",
              "stock": "110",
              "point_shop_product_id": "2"
          },
          {
            "id": 12,
            "name": "时尚SKU2",
            "description": "时尚SKU2简介",
            "price": {
                "price_level1": "110",
                "price_level2": "10"
            },
            "type": {
                "大小": "L",
                "颜色": "大红",
                "性别": "男"
            },
            "image": "default_point_shop_product_sku.jpg",
            "stock": "110",
            "point_shop_product_id": "2"
        },
        {
          "id": 15,
          "name": "时尚SKU2",
          "description": "时尚SKU2简介",
          "price": {
              "price_level1": "110",
              "price_level2": "10"
          },
          "type": {
              "大小": "L",
              "颜色": "黑",
              "性别": "男"
          },
          "image": "default_point_shop_product_sku.jpg",
          "stock": "110",
          "point_shop_product_id": "2"
        },
        {
          "id": 16,
          "name": "时尚SKU2",
          "description": "时尚SKU2简介",
          "price": {
              "price_level1": "110",
              "price_level2": "10"
          },
          "type": {
              "大小": "L",
              "颜色": "黑",
              "性别": "女"
          },
          "image": "default_point_shop_product_sku.jpg",
          "stock": "110",
          "point_shop_product_id": "2"
        }
      ]
  }
}

export default class ProductDetail extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      sku_type: null,
      is_open: false
    }
    // this.all_sku = {};
    this.already_chosen = {};
  }

  componentDidMount(){
    // this.filter_skus();
  }

  componentWillReceiveProps(nextProps){

  }

  render(){
    return (
      <div className="product_detail">
        <button style={{
          backgroundColor: 'red',
          color: 'white'
        }}
          onClick={()=>{
            // this.setState({is_open: true})
            // console.log(this.refs.ceshi)
            this.refs.ceshi.open_sku_list();
          }}
        >立即购买</button>


          <SKU ref='ceshi' open={this.state.is_open}/>
      </div>
    );
  }
}