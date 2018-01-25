import React from 'react';
import _ from 'eplodash';
import Paper from 'epui-md/lib/Paper';
import ClearFix from 'epui-md/lib/internal/ClearFix';
import { browserHistory } from 'react-router';
import DialogView from './DialogView/Common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../redux/reducers/user';


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
      // paddingLeft: appBar.padding,
      // paddingRight: appBar.padding,
      backgroundColor: epColor.primaryColor,
      height: 120,
      borderRadius: 0,
    },
    button:{
      cursor: 'pointer',
      color: '#004588',
      fontSize:'16px',
      float: 'right',
      textAlign: 'center',
      paddingLeft:'30px',
    },
    userButton:{
      cursor: 'pointer',
      color: '#F5A623',
      fontSize:'16px',
      float: 'right',
      textAlign: 'center',
      paddingLeft:'30px',
      textOverflow:'ellipsis',
      whiteSpace:'nowrap',
      maxWidth:'80px',
      overflow: 'hidden',
    },
    header:{
      width:'100%',
      height:'30px',
      backgroundColor: '#FFFFFF',
    },
    container:{
      maxWidth: '1000px',
      margin: 'auto',
      paddinLeft: '24px',
      paddingRight: '24px',
      lineHeight: '30px',
      height: '30px',
    },
    appBar:{
      maxWidth: 1000,
      width: '100%',
      margin: '30px auto auto',
    },
    logo:{
      cursor: 'pointer',
      width: 165,
    }
  };
  return styles;
}

@connect(
  state => ({
    user: state.user.user,
    isFetching: state.user.isFetching,
  }),
  dispatch =>({
    ...bindActionCreators({
      logout:  userActions.logout
    },dispatch)
  })
)
export default class Header extends React.Component{

  static propTypes = {
    children: PropTypes.element,
    user: PropTypes.object,
    logout: PropTypes.func,
    isFetching: PropTypes.bool,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
    router: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      type: 'login',
    };
  }

  componentWillMount = () =>{
    _.set(global, ['showLogin'], this.showLogin);
    _.set(global, ['showRegister'], this.showRegister);
    _.set(global, ['showRetrieve'], this.showRetrieve);
  }

  handleTouchTap = ()=>{
    browserHistory.push("/");
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  showLogin = () => {
    this.setState({
      open: true,
      type: 'login',
    })
  }

  showRegister = () =>{
    this.setState({
      open: true,
      type: 'signUp',
    })
  }

  showRetrieve = () =>{
    this.setState({
      open: true,
      type: 'retrievePassword',
    })
  }

  handleClick = (type) =>{
    switch (type) {
      case 'login':
        this.setState({
          open: true,
          type: 'login',
        })
        break;
      case 'signUp':
        this.setState({
          open: true,
          type: 'signUp',
        })
        break;
      case 'logout':
        this.props.logout();
        break;
      default:
        break;
    }
  }


  render() {
    const {prepareStyles} = this.context.muiTheme;
    const {
      user,
      isFetching,
    } = this.props;
    let styles = getStyles(this.props,this.context);
    const leftButton = user && user._id ? (
      <span style={prepareStyles(styles.userButton)}>{user.username}</span>
    ) : (
      <span
        onClick={this.handleClick.bind(this, 'signUp')}
        style={prepareStyles(styles.button)}
      >
        Sign up
      </span>
    );
    const rightButton = user && user._id ? (
      <span
        style={prepareStyles(styles.button)}
        onClick={this.handleClick.bind(this, 'logout')}
        >Logout</span>
    ) : (
      <span
        onClick={this.handleClick.bind(this, 'login')}
        style={prepareStyles(styles.button)}
      >
        Login
      </span>
    );
    return (
      <Paper style = {prepareStyles(styles.root)}>
        <div style={prepareStyles(styles.header)}>
          <ClearFix>
            <div style={prepareStyles(styles.container)}>
              {rightButton}
              {leftButton}
            </div>
          </ClearFix>
        </div>
        <div style = {prepareStyles(styles.appBar)}>
          <a href= '/'><img
            src={WhiteLogo}
            style = {prepareStyles(styles.logo)}
            onTouchTap = {this.handleTouchTap}
          /></a>
        </div>
        <DialogView
          open = {this.state.open}
          type = {this.state.type}
          onTouchTap = {this.handleTouch}
          close = {this.handleClose}
        />
      </Paper>
    );
  }
};
