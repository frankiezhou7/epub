import React, { PropTypes, Component } from 'react';
import _ from 'eplodash';
import Avatar from 'epui-md/lib/Avatar';
import ClearFix from 'epui-md/lib/internal/ClearFix';
import Colors from 'epui-md/lib/styles/colors';
import EventListener from 'epui-md/lib/internal/EventListener';
import Paper from 'epui-md/lib/Paper';
import RaisedButton from 'epui-md/lib/RaisedButton';
import TextField from 'epui-md/lib/TextField/TextField';
import Transitions from 'epui-md/lib/styles/transitions';
import Visible from 'epui-md/lib/svg-icons/action/visible';
import Invisible from 'epui-md/lib/svg-icons/action/invisible';
import keycode from 'keycode';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from "react-helmet";
import * as userActions from '../../redux/reducers/user';

const USER_EMAIL_PATTERN = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i);

const getStyles = (props, state, context)=>{
  let theme = context.muiTheme;
  let styles = {
    root: {
      position: 'relative',
      height: '100%',
    },
    background: {
    },
    content: {
      margin: '53px auto auto auto',
      width: '330px',
      height: '480px',
      overflow: 'hidden',
    },
    container: {
      paddingTop: '12px',
      width: '260px',
      height: '88px',
      boxSizing: 'border-box',
      position: 'relative',
    },
    paper: {
      margin: '0px auto',
      padding: '0px 30px 30px 30px',
      width: '320px',
    },
    login: {
      width: '256px',
    },
    loginContainer: {
      width: '260px',
    },
    loginButton: {
      marginTop: '10px',
      minWidth: '100%',
    },
    logoContainer: {
      margin: '0px auto 38px',
      width: '139px',
      height: '136px',
    },
    avatarContainer: {
      margin: '0 auto',
      width: '100%',
      height: '80px',
      textAlign: 'center',
    },
    avatar: {
    },
    avatarAnimated: {
      animationName: 'loginAvatar',
      animationDuration: '500ms',
    },
    helpContainer: {
      float: 'right',
      marginTop: '14px',
      maxWidth: '200px',
      overflow: 'hidden',
    },
    a: {
      retrieve: {
        color: '#004588',
        textDecoration: 'none',
        cursor: 'pointer',
        fontSize: '14px',
      },
      reset: {
        color: '#F5A623',
        display: 'block',
        textDecoration: 'none',
        cursor: 'pointer',
        boxSizing: 'border-box',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        wordBreak: 'keep-all',
        fontSize: '14px',
      },
    },
    unregistered: {
      // color: Colors.amberA400,
      color:'red',
    },
    welcome: {
      display: 'inline-block',
      margin: '40px auto 20px',
      width: '260px',
      textAlign: 'center',
      color: '#212121',
      fontSize: '18px',
      lineHeight: '25px',
      boxSizing: 'border-box',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      wordBreak: 'keep-all',
    },
    welcomeContainer: {
      width: '260px',
      height: '88px',
      boxSizing: 'border-box',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      wordBreak: 'keep-all',
    },
    reloadEaseOut: {
      transform: 'translateX(-260px)',
      opacity: 0,
      transition: Transitions.easeOut('1500ms', 'opacity', '200ms') + ', ' +
                  Transitions.easeOut('1500ms', 'transform', '200ms'),
    },
    usernameContainer: {
      width: '260px',
      height: '88px',
    },
    username: {
      marginTop: '24px',
    },
    reloadusernameEaseOut: {
      transform: 'translateX(-260px)',
      opacity: 1,
      transition: Transitions.easeOut('1500ms', 'opacity', '200ms') + ', ' +
                  Transitions.easeOut('1500ms', 'transform', '200ms'),
    },
    overflow: {
      overflow: 'hidden',
    },
    preparing: {
      textAlign: 'center',
    },
    errorMessage: {
      color: theme.palette.errorColor,
      marginBottom: 10,
    },
    visible: {
      width: 18,
      height: 18,
      color: '#004588',
      display: state.showPassword === false ? 'inline-block' : 'none',
      cursor: 'pointer',
    },
    invisible: {
      width: 18,
      height: 18,
      color: '#004588',
      display: state.showPassword === true ? 'inline-block' : 'none',
      cursor: 'pointer',
    },
    visibleContainer: {
      position: 'absolute',
      right: 0,
      top : 55,
    },
    slogan: {
      color: '#004588',
      textTransform: 'uppercase',
      fontSize: 26,
      fontWeight: '500',
      paddingLeft: 15,
      marginBottom: 40,
    },
    loginButtonCase: {
      textTransform: 'capitalize'
    },
  }

  if(state.animateAvatar) {
    styles.avatar = _.merge(styles.avatar, styles.avatarAnimated);
  }
  return styles;
}

@connect(
  state => ({
    error: state.user.error,
    user: state.user.user,
  }),
  dispatch =>({
    ...bindActionCreators({
      login: userActions.login
    }, dispatch)
  })
)

export default class Login extends Component {

  static contextTypes = {
    muiTheme: PropTypes.object,
  }

  static propTypes = {
    login: PropTypes.func,
    user: PropTypes.object,
    error: PropTypes.object,
    maxPassword: PropTypes.number,
    maxUsername: PropTypes.number,
    minPassword: PropTypes.number,
    minUsername: PropTypes.number,
    isLoginSuccess: PropTypes.bool,
    nLabelUsername: PropTypes.string,
    nLabelPassword: PropTypes.string,
    nTextErrorUsernameUsed: PropTypes.string,
    nTextForgotPassword: PropTypes.string,
    nTextNotRegistered: PropTypes.string,
    nButtonLogin: PropTypes.string,
    nTextErrorWhenError: PropTypes.string,
    nTextErrorWhenLoginFail: PropTypes.string,
    nTextErrorWhenLoginBanned: PropTypes.string,
    nTextErrorWhenLoginLocked: PropTypes.string,
    nTextErrorUsernameRequired: PropTypes.string,
    nTextErrorPasswordRequired: PropTypes.string,
    nTextErrorPasswordLength: PropTypes.string,
    nTextErrorUsernameIsInvalid: PropTypes.string,
  }

  static defaultProps = {
      isLoginSuccess: false,
      maxPassword: 12,
      maxUsername: 64,
      minPassword: 6,
      minUsername: 6,
      nTextWelcome: 'ALL PORTS, ONE E-PORTS!',
      nLabelUsername: 'Email',
      nLabelPassword: 'Password',
      nTextErrorUsernameUsed: 'This Email is occupied, please choose another one.',
      nTextForgotPassword: 'Forget password?',
      nTextNotRegistered: 'Create new E-PORTS account?',
      nButtonLogin:'Sign In',
      nTextErrorWhenError: 'Sorry, you can not sign in temporarily, please try again later',
      nTextErrorWhenLoginFail:'Login failed, please check your username and password',
      nTextErrorWhenLoginBanned:'Unfortunately, the current user has been blocked, you cannot sign in',
      nTextErrorWhenLoginLocked:'Unfortunately, the current user has been locked, you cannot sign in.',
      nTextErrorUsernameRequired:'Email is required',
      nTextErrorPasswordRequired:'Password is required',
      nTextErrorPasswordLength:'Password length must be between 6 and 12',
      nTextErrorUsernameIsInvalid:'Please enter your Email address correctly',
  }

  constructor(props){
    super(props)
    this.state = {
      errorTextPassword: null,
      errorTextUsername: null,
      inputusername: null,
      showPassword: false,
      loginState: true,
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.isLoggedIn(nextProps)) {
      const pathname = _.replace(window.location.search, '?', '');
      pathname ? this.props.history.push(pathname) : this.props.history.push('/');
    }

    let error = nextProps.error;
    let errCode = error && error.errorCode;
    let errMsg = null;
    if(errCode) {
      errMsg = this._getErrMsg(errCode);
      this.setState({
        errorTextPassword: errMsg,
        loginState: true,
      })
      return;
    }
  }

  isLoggedIn(props) {
    props = props || this.props;
    return props.user && props.user._id;
  }

  renderAvatar(styles) {
    return (
      <div style={styles.avatarContainer}>
        <Avatar
          size={80}
          style={styles.avatar}
        />
      </div>
    )
  }

  renderUsername(styles) {
    // let fullname = this.props.local.get('fullname');
    // let username = this.props.local.get('username');
    return (
      <div style={styles.usernameContainer}>
        <TextField
          ref='username'
          key='username'
          errorText={this.state.errorTextUsername}
          floatingLabelText={this.props.nLabelUsername}
          fullWidth={true}
          onChange={this._validateUsername}
          onBlur={this._onFinishUsername}
          style={styles.username}
        />
      </div>
    )
  }

  focusUsername() {
    if(this.refs.username) {
      this.refs.username.focus();
      return true;
    }
    return false;
  }

  renderPassword(styles) {
    return (
      <div style={styles.container}>
        <TextField
          ref='password'
          key='password'
          type={ this.state.showPassword === true ? 'text' : 'password' }
          errorText={this.state.errorTextPassword}
          floatingLabelText={this.props.nLabelPassword}
          fullWidth={true}
          width='88%'
          onChange={this._validatePassword}/>
        <div style={styles.visibleContainer}>
          <Invisible
            style={styles.invisible}
            onClick={this._handleShowPassword}
          />
          <Visible
            style={styles.visible}
            onClick={this._handleShowPassword}
          />
        </div>
      </div>
    )
  }

  focusPassword() {
    if(this.refs.password) {
      this.refs.password.focus();
      return true;
    }
    return false;
  }

  renderHelper(styles) {
    return (
      <div style={styles.helpContainer}>
        <a
          style={styles.a.retrieve}
          onTouchTap={this._retrieve}
        >
          {this.props.nTextForgotPassword}
        </a>
      </div>
    )
  }

  renderAction(styles) {
    return (
      <ClearFix>
        <div style={styles.loginContainer}>
          { this.renderHelper(styles) }
          { this.renderButton(styles) }
          <div style={styles.helpContainer}>
            { this.renderPostHelper(styles) }
          </div>
        </div>
      </ClearFix>
    )
  }

  renderPostHelper(styles) {
    // if(!this.isInited() || this.isLoggedIn()) { return null; }
    return (
      <a
        style={styles.a.reset}
        onClick={this._register}
      >
        {this.props.nTextNotRegistered}
      </a>
    )
  }

  renderButton(styles) {
    return (
      <RaisedButton
        fullWidth={true}
        label={this.props.nButtonLogin}
        primary={false}
        secondary={true}
        labelStyle={styles.loginButtonCase}
        disabled={!this.state.loginState}
        style={styles.loginButton}
        onClick={this._handleClick}
      />
    )
  }

  render() {
    const { prepareStyles } = this.context.muiTheme;
    const styles = getStyles(this.props, this.state, this.context);
    return(
      <div style={styles.root}>
        <Helmet
            title= 'login'
            meta={[
                {"name": "description", "content": 'login'}
            ]}
        />
        <div style={styles.background}>
          <EventListener
            target={window}
            onKeyUp={this._handleWindowKeyUp}
          >
            <ClearFix>
              <div style={styles.content}>
                <div style={styles.slogan}>{this.props.nTextWelcome}</div>
                { this.renderAvatar(styles) }
                <Paper
                  zDepth={0}
                  style={styles.paper}
                >
                  { this.renderUsername(styles) }
                  { this.renderPassword(styles) }
                  { this.renderAction(styles) }
                </Paper>
              </div>
            </ClearFix>
          </EventListener>
        </div>
      </div>
    )
  }

  _handleShowPassword = () =>{
    this.setState({showPassword:!this.state.showPassword});
  }

  _handleClick = () =>{
    if(!this._checkAvailability()) { return; }
    let {
      login,
    } = this.props;

    let username = this._getUsername();
    username = this._trim(username);
    let password = this.refs.password.getValue();
    password = this._trim(password);
    if (_.isFunction(login)) {
      login({
        username: username,
        password: password,
      });
      this.setState({
        loginState: false,
      })
    }
  }

  _getErrMsg = (errCode) =>{
    let errMsg = this.props.nTextErrorWhenError;

    switch (errCode) {
      case 'LOGIN_FAILED':
        errMsg = this.props.nTextErrorWhenLoginFail;
        break;
      case 'USER_IS_BANNED':
        errMsg = this.props.nTextErrorWhenLoginBanned;
        break;
      case 'USER_IS_LOCKED':
        errMsg = this.props.nTextErrorWhenLoginLocked;
        break;
      default:
    }

    return errMsg;
  }

  _getUsernameNode = () =>{
    return this.refs.username && this.refs.username.getDOMNode();
  }

  _getPasswordNode = () =>{
    return this.refs.password && this.refs.password.getDOMNode();
  }

  _handleWindowKeyUp = (e) =>{
    if (keycode(e) === 'enter') {
      this._handleClick();
    }
  }

  _getUsername = () =>{
    return this.refs.username ? this.refs.username.getValue() : this.props.local.get('username');
  }

  _validateUsername = () =>{
    let username = this._getUsername();
    username = username && username.trim();
    let len = username ? username.length : 0;
    let state = {
      errorTextUsername: null,
    };

    if(len === 0) {
      state.errorTextUsername = this.props.nTextErrorUsernameRequired;
    }else if(!USER_EMAIL_PATTERN.test(username)) {
      state.errorTextUsername = this.props.nTextErrorUsernameIsInvalid;
    }

    this.setState(state);

    return state.errorTextUsername === null;
  }

  _validatePassword = () =>{
    let password = this.refs.password.getValue();
    password = password && password.trim();
    let len = password ? password.length : 0;
    let state = {
      errorTextPassword: null
    };

    if(len === 0) {
      state.errorTextPassword = this.props.nTextErrorPasswordRequired;
    } else if(len < this.props.minPassword || len > this.props.maxPassword) {
      state.errorTextPassword = _.template(this.props.nTextErrorPasswordLength)(this.props);
    }

    this.setState(state);

    return state.errorTextPassword === null;
  }

  _onFinishUsername = () =>{
    if(!this._validateUsername()) { return; }

    let newName = this.refs.username.getValue();
    if(this.state.inputusername !== newName) {
      if(_.isFunction(this.props.usernameChange)) {
        this.props.usernameChange(newName);
      }
      this.setState({
        inputusername: newName
      });
    }
  }

  _checkAvailability = () =>{
    let { errorTextUsername, errorTextPassword } = this.state;

    let valid = this._validateUsername() && this._validatePassword();

    let name = this.refs.username;
    let pass = this.refs.password;
    if(errorTextUsername) {
      return name.focus();
    }
    if(errorTextPassword) {
      return pass.focus();
    }

    return valid;
  }

  _reset = () =>{
    this.setState({
      inputusername: null,
      errorTextUsername: null,
      errorTextPassword: null,
    });

    if(_.isFunction(this.props.reset)) {
      this.props.reset();
    }
  }

  _register = () =>{
    this.props.history.push("/register");
  }

  _retrieve = () =>{
    this.props.history.push("/forget");
  }

  _trim = (str) =>{
    if (str) { str = str.replace(/[\r\n\t]/g, ''); }
    if (str) { str = str.replace(/ /g, ''); }

    return str;
  }
}
