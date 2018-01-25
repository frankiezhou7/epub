import React from 'react';
import Paper from 'epui-md/lib/Paper';
import { browserHistory } from 'react-router';

const PropTypes = React.PropTypes;

const getStyles = (props,context)=>{
  const theme = context.muiTheme;
  const {epColor,appBar,zIndex,} = context.muiTheme;
  const styles = {
    root:{
      width: '100%',
      textAlign: 'center',
      paddingTop: 50,
      paddingBottom: 30,
      fontSize: 12,
      color: '#999',
    },
    separator:{
      marginLeft: 5,
      marginRight: 5,
    },
    link:{
      fontSize: 12,
      color: '#999',
      textDecoration: 'none',
    },
  };
  return styles;
}

export default class Header extends React.Component{

  static propTypes = {
    children: PropTypes.element,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
    router: PropTypes.object,
  };

  render() {
    const {prepareStyles} = this.context.muiTheme;
    let styles = getStyles(this.props,this.context);
    return (
      <div style = {prepareStyles(styles.root)}>
        <a
          href = 'http://www.miibeian.gov.cn/state/outPortal/loginPortal.action'
          target = '_blank'
          style = {prepareStyles(styles.link)}
        >沪ICP备16025182号-1</a>
        <span style = {prepareStyles(styles.separator)}>|</span>
        ©2016 e-ports.com, All Rights Reserved.
      </div>
    );
  }
};
