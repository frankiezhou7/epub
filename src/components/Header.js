import React from 'react';
import Paper from 'epui-md/lib/Paper';
import { browserHistory } from 'react-router';

const PropTypes = React.PropTypes;
const WhiteLogo = require('../../static/css/logo-white.svg');

const getStyles = (props,context)=>{
  const theme = context.muiTheme;
  const {epColor,appBar,zIndex,} = context.muiTheme;
  const styles = {
    root:{
      position: 'fixed',
      zIndex: zIndex.appBar,
      width: '100%',
      backgroundColor: appBar.color,
      paddingLeft: appBar.padding,
      paddingRight: appBar.padding,
      backgroundColor: epColor.primaryColor,
      height: 90,
      borderRadius: 0,
    },
    appBar:{
      maxWidth: 1000,
      width: '100%',
      margin: 'auto',
      marginTop: 30,
    },
    logo:{
      cursor: 'pointer',
      width: 165,
    }
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

  handleTouchTap = ()=>{
    browserHistory.push("/");
  }

  render() {
    const {prepareStyles} = this.context.muiTheme;
    let styles = getStyles(this.props,this.context);
    return (
      <Paper style = {styles.root}>
        <div style = {prepareStyles(styles.appBar)}>
          <a href= '/'><img
            src={WhiteLogo}
            style = {prepareStyles(styles.logo)}
            onTouchTap = {this.handleTouchTap}
          /></a>
        </div>
      </Paper>
    );
  }
};
