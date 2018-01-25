import React from 'react';
import _ from 'eplodash';
import Paper from 'epui-md/lib/Paper';
import ClearFix from 'epui-md/lib/internal/ClearFix';
import EventListener from 'epui-md/lib/internal/EventListener';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../redux/reducers/user';
import SearchAssembly from './SearchAssembly';
import Menu from './Menu';
import ActionTel from 'epui-md/lib/svg-icons/action/tel';
// import Transitions from 'epui-md/lib/styles/transitions';

const PropTypes = React.PropTypes;
const WhiteLogo = require('../../static/css/logo-colours.svg');

const Sizes = {
  MD: 1190,
  SM: 990,
}

const getStyles = (props, state, context)=>{
  const theme = context.muiTheme;
  let { isScroll } = props;
  return{
    root:{
      position: isScroll? 'fixed' : 'relative',
      boxShadow: isScroll? '0 2px 8px rgba(0,0,0,0.4)' : 'none',
      top: 0,
      zIndex: 1001,
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 0,
      borderBottom: !isScroll? '1px solid #D8D8D8' : 'none',
    },
    header:{
      display: isScroll? 'none' : 'block',
      width:'100%',
      height:'30px',
      lineHeight: '30px',
      backgroundColor: '#004588',
      overflow: 'hidden',
    },
    container:{
      width: state.deviceSize,
      margin: '0 auto',
      paddingLeft: '24px',
      paddingRight: '24px',
    },
    appBar:{
      height: '76px',
      width: '100%',
    },
    logo:{
      cursor: 'pointer',
      width: 165,
      marginTop: '15px'
    },
    fl: {
      float: 'left',
    },
    fr: {
      float: 'right'
    },
    menu: {
      display: isScroll? 'none' : 'block',
      height: '36px',
      lineHeight: '36px',
    },
    menuItem: {
      float: 'left',
      marginRight: '50px',
      color: 'rgba(0,0,0,.54)',
      fontSize: '16px',
      textTransform: 'capitalize',
      cursor: 'pointer',
    },
    username: {
      color: '#fff',
      marginRight: '22px',
      cursor: 'initial',
    },
    button: {
      color: '#fff',
      fontSize: '14px',
      cursor: 'pointer',
    },
    tel: {
      float: 'right',
      color: '#fff',
      fontSize: '20px',
      fontWeight: '500'
    },
    hotLine: {
      width: '20px',
      height: '20px',
      fill: '#fff',
      marginRight: '10px',
      marginTop: '5px',
    },
    herze: {
      float: 'left',
      height: '12px',
      width: '1px',
      margin: '9px 10px',
      borderRight: '1px solid #79B2EA'
    }
  }
}

@connect(
  state => ({
    user: state.user.user,
    isFetching: state.user.isFetching,
    url: state.user.url,
  }),
  dispatch =>({
    ...bindActionCreators({
      logout:  userActions.logout,
      fetchUrl: userActions.fetchAgencyDeskUrl,
    },dispatch)
  })
)
export default class Header extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      type: 'login',
      hasSearch: true,
      hasMenu: true,
      isLoginPage: false,
      deviceSize: window.innerWidth >= 1366 ? Sizes.MD : Sizes.SM,
    };
  }

  static propTypes = {
    children: PropTypes.element,
    user: PropTypes.object,
    logout: PropTypes.func,
    isFetching: PropTypes.bool,
    isScroll: PropTypes.bool,
  };
  static defaultProps = {
    serviceTel: "400-111-0000",
    isScroll: false,
  }

  static contextTypes = {
    muiTheme: PropTypes.object,
    router: PropTypes.object,
    location: PropTypes.object,
  };

  componentWillMount(){
    // 判断是否登陆注册页面，如果是，隐藏搜索框和导航
    let location = this.context.location;
    let path = _.camelCase(_.lowerCase(location.pathname));
    this.setState({
      isLoginPage: (path === 'login' || path === 'register' || path === 'setPassword' || path === 'status' || path === 'forget')? true : false
    })
    this.props.fetchUrl();
  }

  handleTouchTap(){
    browserHistory.push("/");
  }

  showLogin(){
    this.setState({
      open: true,
      type: 'login',
    })
  }

  showRegister(){
    this.setState({
      open: true,
      type: 'signUp',
    })
  }

  showRetrieve(){
    this.setState({
      open: true,
      type: 'retrievePassword',
    })
  }

  handleClick(type){
    switch (type) {
      case 'login':
        browserHistory.push("/login");
        break;
      case 'signUp':
        browserHistory.push("/register");
        break;
      case 'logout':
        this.props.logout();
        break;
      default:
        break;
    }
  }

  renderLogin(style){
    const {
      user,
    } = this.props;
    return user && user._id ? (
      <span style={_.merge({}, style.fl, style.username)}>{user.username}</span>
    ) : (
      <span
        onClick={this.handleClick.bind(this, 'login')}
        style={_.merge({}, style.button, style.fl)}
      >
        Sign In
      </span>
    );
  }
  renderRegister(style){
    const {
      user,
    } = this.props;
    return (user && user._id ? (
      <div style={style.fl}>
        <span
          style={_.merge({}, style.fl, style.button)}
          onClick={this.handleClick.bind(this, 'logout')}
        >
          Sign Out
        </span>
      <span style={style.herze}></span><span style={style.button} onClick={this._handleClick}>Go To Agency Desk</span></div>
    ) : (
      <div style={style.fl}>
        <span style={style.herze}></span>
        <span
          onClick={this.handleClick.bind(this, 'signUp')}
          style={style.button}
        >
          Sign Up
        </span>
      </div>
    ))
  }
  renderServicePhone(style){
    return(
      <div style={style.tel}>
        <span style={style.fr}>{this.props.serviceTel}</span>
        <ActionTel style={_.merge({}, style.hotLine, style.fr)} />
      </div>
    )
  }
  renderSearch(){
    const { hasSearch } = this.state;
    let query = this.context.location.query;
    return this.state.hasSearch ? (
      <SearchAssembly activeValue={query} />
    ) : null;
  }

  render() {
    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.state, this.context);
    let { isLoginPage } = this.state;
    let location = this.context.location;
    let path = _.lowerCase(location.pathname ? location.pathname.split('/')[1] : '');

    return (
      <Paper style = {styles.root}>
        <EventListener
          target={window}
          onResize={this._updateDeviceSize}
          onLoad={this._updateDeviceSize}
        />
        <div style={styles.header}>
          <ClearFix>
            <div style={styles.container}>
              {this.renderLogin(styles)}
              {this.renderRegister(styles)}
              {/*{this.renderServicePhone(styles)}*/}
            </div>
          </ClearFix>
        </div>
        <div style = {styles.appBar}>
          <ClearFix>
            <div style={styles.container}>
              <a href= '/'>
                <img
                  src={WhiteLogo}
                  style = {styles.logo}
                  onTouchTap = {this.handleTouchTap}
                />
              </a>
              {isLoginPage? null : this.renderSearch(styles)}
            </div>
          </ClearFix>
        </div>
        {isLoginPage? null : (
          <div style={styles.menu}>
            <ClearFix>
              <div style={styles.container}>
                <Menu active={path} />
              </div>
            </ClearFix>
          </div>
        )}
      </Paper>
    );
  }

  _updateDeviceSize = () => {
    let width = window.innerWidth;
    if( width >= 1366) this.setState({deviceSize: Sizes.MD});
    else this.setState({deviceSize: Sizes.SM});
  }

  _handleClick = ()=>{
    if(this.props.url)
    window.open(`${this.props.url}/dashboard`);
  }
};
