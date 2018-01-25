import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RaisedButton from 'epui-md/lib/RaisedButton';
import ThemeManager from '../../styles/theme-manager';
import BlueRawTheme from '../../styles/raw-themes/blue-raw-theme';

const PropTypes = React.PropTypes;
const Img500 = require('../../../static/people.svg');

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
      width: 900,
      margin: '100px auto',
    },
    img:{
      height: 382,
      display: 'inline-block',
      verticalAlign: 'middle',
    },
    content:{
    },
    textLarge:{
      color: theme.epColor.primaryColor,
      fontSize: 85,
      marginBottom: 22,
    },
    textSmall:{
      marginBottom: 50,
    },
    text:{
      color: theme.epColor.primaryColor,
      fontSize: 30,
      width: 470,
    },
    right:{
      marginLeft: 72,
      display: 'inline-block',
      verticalAlign: 'middle',
    },
  };
  return styles;
}

class Page500 extends React.Component{

  static propTypes = {
    nText500Message : PropTypes.string,
    nLabelBackHome: PropTypes.string,
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
    nText500Message: 'Looks Like something went wrong. We are working on it',
    nLabelBackHome: 'Return to Home page',
  };

  getChildContext() {
    return {
      //for server render : context.muiTheme is null, load from theme manager
      muiTheme: this.context.muiTheme || ThemeManager.getMuiTheme(BlueRawTheme),
    };
  }

  handleTouchTap = ()=>{
    this.props.history.push('/');
  }

  render() {
    let context = this.context || {};
    //for server render : context.muiTheme is null, load from theme manager
    context.muiTheme = context.muiTheme || ThemeManager.getMuiTheme(BlueRawTheme);
    const prepareStyles = context.muiTheme.prepareStyles;
    const styles = getStyles(this.props,this.state,context);
    const textStyle = prepareStyles(styles.text);
    return (
      <div style = {prepareStyles(styles.root)}>
        <Header/>
        <div style = {prepareStyles(styles.container)}>
          <div style = {prepareStyles(styles.wrapper)} ref = 'wrapper'>
            <div style = {prepareStyles(styles.content)}>
              <img
                src={Img500}
                style = {prepareStyles(styles.img)}
              />
              <div style = {prepareStyles(styles.right)}>
                <div style = {prepareStyles(styles.textLarge)}>OOPS!</div>
                <div style = {prepareStyles(styles.textSmall)}>
                  <div style = {textStyle} >{this.props.nText500Message}</div>
                </div>
                <RaisedButton
                  href = '/'
                  label= {this.props.nLabelBackHome}
                  backgroundColor = {this.context.muiTheme.epColor.primaryColor}
                  labelColor = {'#fff'}
                  onTouchTap = {this.handleTouchTap}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};
export default Page500;
