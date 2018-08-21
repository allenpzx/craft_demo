import React from 'react';

export default class Footer extends React.Component{
  render(){
    return (
      <div className="credit_shop_footer">
        <div>
            <img src={require('../../../assets/images/cup.svg')} alt=""/>
            <span>权益</span>
        </div>
        <div>
            <img src={require('../../../assets/images/cup.svg')} alt=""/>
            <span>我的</span>
        </div>
      </div>
    );
  }

}