import React from 'react';
import _ from 'eplodash';
import { MENU } from '../utils/constants';
import { browserHistory } from 'react-router';
import MenuItem from './MenuItem';

const PropTypes = React.PropTypes;

export default class Menu extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      hasMenu: true,
      active: props.active,
    }
  }

  static propTypes = {
    active: PropTypes.string,
  }

  static defaultProps = {

  }

  getStyles(){
    return{
      menuItem: {
        float: 'left',
        marginRight: '50px',
        color: 'rgba(0,0,0,.54)',
        fontSize: '16px',
        textTransform: 'capitalize',
        cursor: 'pointer',
      },
      menuItemActive: {
        color: '#004588'
      },
      menu: {
        display: 'inline-block',
      }
    }
  }

  render() {
    let style = this.getStyles();
    let { hasMenu, active } = this.state;
    let menulist = hasMenu? _.map(MENU, (item, index) => {
      let data = _.toLower(_.kebabCase(item));
      let isActived = data === 'home' && active === '' ? true : _.kebabCase(active) === data;
       return(
         <div style={style.menu} key={item} onClick={() => this._handleClick(data)}>
           <MenuItem
             urlParameter={data}
             value={item}
             isActived={isActived}
             style={style.menuItem}
           />
         </div>
       )
     }) : null;
    return (
        <div>{menulist}</div>
    )
  }

  _handleClick = (item) => {
    this.setState({active:item});
  }
}
