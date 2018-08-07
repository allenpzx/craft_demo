import React from 'react';

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

export default class SelectSKU extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      sku_type: null,
      stock: null,
      select_detail: null,
      count_number: 1,
      confirm_sku: null
    }
    // this.all_sku = {};
    this.already_chosen = {};
  }

  componentDidMount(){
    this.filter_skus();
  }

//   打开窗口
  open_sku_list = () => {
    document.querySelector('.sku_list_area').classList.add('open_sku_list');
  }

//   关闭窗口
  close_sku_list = () => {
    document.querySelector('.sku_list_area').classList.remove('open_sku_list');
  }

  //   格式化初始数据, 方便渲染
  filter_skus = () => {

    let m = {};
    testdata.data.type.map((type, num)=>{
      let s = new Set();
      testdata.data.skus.map((sku, index)=>{
        Object.entries(sku.type).map((value, key)=>{
          if(value[0] === type){
            s.add(value[1])
          }
        })
      })
      m[type] = [...s];
      // this.already_chosen[type] = '';
    })

    // this.all_sku = Object.assign({}, m);
    this.setState({sku_type: Object.assign({}, m)});
    // console.log(m, this.already_chosen);
  }

  chosen_sku = (e) => {

    // 禁选的返回
    if(e.target.classList.contains('cant_chose')){
      return
    }

    // 点击的时候如果目标的类型和当前类型一样，但是值不一样，则灰掉(一个类型只有一个参数可以选)
    Array.from(document.getElementsByClassName('type_info')).map((btn, btn_index)=>{
      if(btn.dataset.type === e.target.dataset.type && btn.dataset.typeDetail !== e.target.dataset.typeDetail){
        btn.classList.add('cant_chose');
      }
    })

    // 点击已选重置同类型
    if(e.target.dataset.ischosen === 'true'){
      Array.from(document.getElementsByClassName('type_info')).map((btn, btn_index)=>{
        if(btn.dataset.type === e.target.dataset.type){
          btn.classList.remove('cant_chose');
          btn.dataset.ischosen = 'false';
        }
      })

      // this.already_chosen[e.target.dataset.type] = '';
      delete this.already_chosen[e.target.dataset.type];
      // console.log('点了重置的按钮', this.already_chosen);
      // this.already_chosen[]
    }else{
      e.target.dataset.ischosen = true
      // 设置已选的sku
      this.already_chosen[e.target.dataset.type.toString()] = e.target.dataset.typeDetail.toString();
    }

    console.log('already_chosen', this.already_chosen);

    // 筛选复合条件的SKU
    let origin_sku_copy = [...testdata.data.skus];
    let after_chosen = [];
    origin_sku_copy.map((sku, sku_index, sku_arr)=>{
      let index = 0;
      let is_ok = 0;
      Object.entries(this.already_chosen).map((item, i)=>{
        index += 1;
        if(sku.type[item[0]] === item[1]){
          is_ok +=1;
        }
      })
      // 啥也没选就把原始数组给返回
      if(index === is_ok){
        after_chosen.push(sku);
      }
    })
    console.log('after_chosen: ', after_chosen);
    
    // 数据格式处理, 方便渲染
    let sort_sku = {};
    testdata.data.type.map(type=>{
      let s = new Set();

      after_chosen.map((sku, key)=>{
        Object.entries(sku.type).map((value, key)=>{
          if(value[0] === type){
            s.add(value[1])
          }
        })
      })

      sort_sku[type] = [...s];
    })

    console.log('sort_sku: ', sort_sku);

    // 根据已选重新渲染视图
    // Object.entries(sort_sku).map((x)=>{
    //    Array.from(document.getElementsByClassName('type_info')).map(btn=>{
    //      if(btn.dataset.type === x[0] && x[1].indexOf(btn.dataset.typeDetail) === -1){
    //         btn.classList.add('cant_chose');
    //      }
    //    })
    // })

    Array.from(document.getElementsByClassName('type_info')).map(btn=>{
      if(sort_sku[btn.dataset.type].indexOf(btn.dataset.typeDetail) === -1){
        btn.classList.add('cant_chose');
        // console.log(btn)
      }else{
        btn.classList.remove('cant_chose')
      }
    })

    let condition_is_ok = testdata.data.type.every(type=>{

      let isok = Object.keys(this.already_chosen).indexOf(type) !== -1;
      if(isok){
        return true
      }

    })

    // 找到展示细节的sku
    let confirm_sku = null;
    if(condition_is_ok){
        testdata.data.skus.map(sku=>{
          let is_this_sku = Object.entries(this.already_chosen).every(item=>{
            if(sku.type[item[0]] === item[1]){
              return true
            }
          })
          if(is_this_sku){
            confirm_sku = sku;
          }
        })
    }
    console.log(confirm_sku);

    this.setState({confirm_sku: confirm_sku})

    // 展示产品详情
    if(confirm_sku){
        this.setState({stock: confirm_sku.stock});
        console.log(Object.keys(this.already_chosen))
        let select_detail = '';
        Object.keys(this.already_chosen).map((item, index, arr)=>{
            select_detail += `${item}:${this.already_chosen[item]} `;
        })
        this.setState({select_detail: select_detail});
    }

  }

  //   调整数量
  count_number = (e) => {
      if(e.target.dataset.count === 'add'){
        if(this.state.stock !== null && this.state.count_number >= this.state.stock){
            return
        }else{
            this.setState({count_number: this.state.count_number+1})
        }
      }else if(e.target.dataset.count === 'subtract'){
          if(this.state.count_number <= 0){
              return
          }else{
            this.setState({count_number: this.state.count_number-1})
          }
      }
  }


  submit_order = () => {
    //   console.log(this.state.confirm_sku);
    if(this.state.confirm_sku !== null){
        console.log(this.state.confirm_sku)
    }
  }
  

  componentWillReceiveProps(nextProps){
    console.log('nextProps: ', nextProps);
    this.props.open === true ? this.open_sku_list() : this.close_sku_list();
  }

  render(){
    return (
        
        <div className='sku_list_area'>

          <div className='select_sku'>
            <span className='close_sku_list_button' 
            onClick={()=>{
              this.close_sku_list()
            }}>
              <img src={require('../../../assets/images/close_sku_list_btn.png')} alt=""/>
            </span>
            <div className='sku_info'>
                <div className='sku_img_wrap'><img src={require('../../../assets/images/texture.jpg')} alt=""/></div>
                <div className='sku_detail'>
                    <div className='price'>
                      <span className='common_price'>¥200</span>
                      <span className='vip_price'>金卡专享¥100</span>
                    </div>
                    <div className='stock'>
                      库存<span>{this.state.stock === null ? ' ' : this.state.stock}</span>件
                    </div>
                    <div className='chosen_arg'>
                      {
                          this.state.select_detail === null ? '请选择种类'
                          : this.state.select_detail
                      }
                    </div>
                </div>
                <div className='remark'>
                    <div>快递: ¥10</div>
                    <div>注意: 商品兑换邮寄费用需自行承担。</div>
                </div>
            </div>

            <div className='wrap_type'>
            {
              this.state.sku_type !== null
              ?
              (
                Object.keys(this.state.sku_type).map((item, index)=>{
                    return (
                      <div key={index} className='type'>
                          <div className='type_tittle'>{item}</div>
                          <div className='type_info_wrap'>
                          {
                            this.state.sku_type[item].map((x, i)=>{

                              return <span onClick={(e)=>{this.chosen_sku(e)}}
                                           data-ischosen={false}
                                           data-type={item}
                                           data-type-detail={x}
                                           className='type_info' 
                                           key={i}
                                     >
                                              {x}
                                     </span>
                                     
                            })
                          }
                          </div>
                      </div>
                    )
                })
              )
              : null
            }
            </div>

            <div className='select_number'>
              <span>购买数量</span>
              <span onClick={(e)=>{this.count_number(e)}}>
                  <span data-count='subtract'>-</span>
                  <span ref='stock'>{this.state.count_number}</span>
                  <span data-count='add'>+</span>
              </span>
            </div>

            <button className='confirm_convert' onClick={()=>{
                this.submit_order()
            }}>
              确认兑换
            </button>
          </div>
        </div>
    );
  }
}