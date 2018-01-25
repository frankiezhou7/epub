import AppCanvas from 'epui-md/lib/AppCanvas';
import React from 'react';
import Router from 'react-router';
import ThemeManager from '../styles/theme-manager';
import BlueRawTheme from '../styles/raw-themes/blue-raw-theme';

const PropTypes = React.PropTypes;

const getStyles = (props,context)=>{
  return {
    root:{
      backgroundColor: '#f5f5f5',
    }
  };
};

export default class Master extends React.Component{

  static propTypes = {
    children: PropTypes.element,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
    router: PropTypes.object,
  };

  static childContextTypes = {
    name: React.PropTypes.string,
    muiTheme: PropTypes.object,
    location: React.PropTypes.object,
  };

  state = {
    muiTheme: ThemeManager.getMuiTheme(BlueRawTheme)
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      location: this.props.location
    };
  }

  render() {
    const styles = getStyles(this.props,this.context);
    return (<AppCanvas style = {styles.root}>{this.props.children}</AppCanvas>);
  }
};
