import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import EventListener from 'epui-md/lib/internal/EventListener';
const PropTypes = React.PropTypes;

const Sizes = {
  MD: 1190,
  SM: 990,
}

const getStyles = (props,context,state)=>{
  const theme = context.muiTheme;
  const {epColor,appBar,zIndex,} = context.muiTheme;
  let height = window.innerHeight - 386;
  const styles = {
    wrapper:{
      // marginBottom: 10,
      backgroundColor: '#fff',
      height: '100%',
    },
    container:{
      width: state.deviceSize,
      minHeight: __SERVER__? '692px' : 'calc(100% - 386px)',
      margin: 'auto',
      paddingLeft: 24,
      paddingRight: 24,
    },
    headerStation: {
      height: state.isScroll ? 142 : 0,
    },
  };
  return styles;
}

class Canvas extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isScroll: false,
    };
  }

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
    size: React.PropTypes.number,
  };

  getChildContext() {
    return {
      location: this.props.location,
      size: this.state.deviceSize
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this._handleWindowScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._handleWindowScroll);
  }

  render() {
    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props,this.context,this.state);
    return (
      <div style = {prepareStyles(styles.wrapper)}>
        <EventListener
          target={window}
          onResize={this._updateDeviceSize}
          onLoad={this._updateDeviceSize}
        />
        <Header
          isScroll={this.state.isScroll}
          deviceSize={this.state.deviceSize}
        />
        <div style={prepareStyles(styles.headerStation)}></div>
        <div style = {prepareStyles(styles.container)}>
          {this.props.children}
        </div>
         <Footer/>
      </div>
    );
  }

  _handleWindowScroll = (e) => {
    let target = e.target;
    let scrollingElement = target.scrollingElement
    let scrollTop = scrollingElement.scrollTop;
    this.setState({
      isScroll: scrollTop > 142,
    })
  }
  _updateDeviceSize = () => {
    let width = window.innerWidth;
    if( width >= 1366) this.setState({deviceSize: Sizes.MD});
    else this.setState({deviceSize: Sizes.SM});
  }
};
export default Canvas;
