import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RaisedButton from 'epui-md/lib/RaisedButton';
import ThemeManager from '../../styles/theme-manager';
import BlueRawTheme from '../../styles/raw-themes/blue-raw-theme';
import { browserHistory } from 'react-router';

const PropTypes = React.PropTypes;
const Img404 = require('../../../static/404.svg');

const getStyles = (props,state,context)=>{
  const theme = context.muiTheme;
  const {epColor,appBar,zIndex,} = context.muiTheme;
  const styles = {
    root:{

    },
    container:{
      margin: 'auto',
      paddingTop: 90,
    },
    wrapper:{
    },
    img:{
      marginTop: 100,
      height: 346
    },
    content:{
      textAlign: 'center',
      width: 600,
      margin: 'auto',
      marginBottom: 100,
    },
    text:{
      color: theme.epColor.primaryColor,
      fontSize: 30,
      marginBottom: 44,
      marginTop: 50
    },
  };
  return styles;
}

class Page404 extends React.Component{

  static propTypes = {
    nText404Message: PropTypes.string,
    nLabelBackHome: PropTypes.string,
    showHeader: PropTypes.bool,
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

  static defaultProps ={
    nText404Message: 'Sorry, This page not be found!',
    nLabelBackHome: 'Return to Home page',
    showHeader: true,
  };

  getChildContext() {
    return {
      //for server render : context.muiTheme is null, load from theme manager
      muiTheme: this.context.muiTheme || ThemeManager.getMuiTheme(BlueRawTheme),
    };
  }

  handleTouchTap = ()=>{
    browserHistory.push('/');
  }

  render() {
    let context = this.context || {};
    //for server render : context.muiTheme is null, load from theme manager
    context.muiTheme = context.muiTheme || ThemeManager.getMuiTheme(BlueRawTheme);
    const styles = getStyles(this.props,this.state,context);
    const prepareStyles = context.muiTheme.prepareStyles;
    return (
      <div style = {prepareStyles(styles.root)}>
        { this.props.showHeader ? <Header/> : null }
        <div style = {prepareStyles(styles.container)}>
          <div style = {prepareStyles(styles.wrapper)} ref = 'wrapper'>
            <div style = {prepareStyles(styles.content)}>
              <img
                src={Img404}
                style = {prepareStyles(styles.img)}
              />
            <div style = {prepareStyles(styles.text)}>{this.props.nText404Message}</div>
              <RaisedButton
                href = '/'
                label= {this.props.nLabelBackHome}
                backgroundColor = {this.context.muiTheme.epColor.primaryColor}
                labelColor = {'#fff'}
                onTouchTap = {this.handleTouchTap}
                capitalized = {'initial'}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};
export default Page404;
