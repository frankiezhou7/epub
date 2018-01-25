import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
const PropTypes = React.PropTypes;

const getStyles = (props,context)=>{
  const theme = context.muiTheme;
  const {epColor,appBar,zIndex,} = context.muiTheme;
  const styles = {
    wrapper:{
      marginBottom: 10,
      backgroundColor: '#f5f5f5',
    },
    container:{
      maxWidth: 1285,
      margin: 'auto',
      paddingLeft: 24,
      paddingRight: 24,
      paddingTop: 90,
    },
  };
  return styles;
}

class Canvas extends React.Component{

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

  getChildContext() {
    return {
      location: this.props.location
    };
  }

  render() {
    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props,this.context);
    return (
      <div style = {prepareStyles(styles.wrapper)}>
        <Header/>
        <div style = {prepareStyles(styles.container)}>
          {this.props.children}
        </div>
        <Footer/>
      </div>
    );
  }
};
export default Canvas;
