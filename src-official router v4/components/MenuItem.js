import React from 'react';
import _ from 'eplodash';

const PropTypes = React.PropTypes;

export default class MenuItem extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      menuHover: false
    }
  }

  static propTypes = {
    urlParameter: PropTypes.string,
    value: PropTypes.string,
    style: PropTypes.object,
    isActived: PropTypes.bool,
  }

  static defaultProps = {
  }

  getStyles(){
    let menuState = this.state.menuHover? '#004588' : 'rgba(0,0,0,.54)';
    return{
      menuItem: {
        color: menuState
      },
      menuItemActive: {
        color: '#004588'
      }
    }
  }

  handleClick(menu){
    if(menu === "home"){
      this.props.history.push('/')
    }else{
      this.props.history.push(`/${menu}`)
    }
  }

  handleMouseEnter(index){
    this.setState({
      menuHover: true
    })
  }

  handleMouseLeave(index){
    this.setState({
      menuHover: false
    })
  }

  render() {
    const { urlParameter, value, style, isActived } = this.props;
    let menuItem = this.getStyles();
    return (
        <span
          onClick={this.handleClick.bind(this, urlParameter)}
          onMouseEnter={this.handleMouseEnter.bind(this)}
          onMouseLeave={this.handleMouseLeave.bind(this)}
          style={
            isActived? _.merge({}, style, menuItem.menuItemActive) : _.merge({}, style, menuItem.menuItem)
          }>{value}</span>
    )
  }
}
