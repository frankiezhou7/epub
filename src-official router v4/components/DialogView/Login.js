import React from 'react';
import Paper from 'epui-md/lib/Paper';
import keycode from 'keycode';
import EventListener from 'epui-md/lib/internal/EventListener';
import ClearFix from 'epui-md/lib/internal/ClearFix';
import Transitions from 'epui-md/lib/styles/transitions';
import Visible from 'epui-md/lib/svg-icons/action/visible';
import Invisible from 'epui-md/lib/svg-icons/action/invisible';
import _ from 'eplodash';
import Colors from 'epui-md/lib/styles/colors';
import { connect } from 'react-redux';
import Avatar from 'epui-md/lib/Avatar';
import RaisedButton from 'epui-md/lib/RaisedButton';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as userActions from '../../redux/reducers/user';
import TextField from 'epui-md/lib/TextField/TextField';
const USER_NAME_PATTERN = new RegExp('^[A-Za-z0-9@_\\-\\.]*$');
const PropTypes = React.PropTypes;

const getStyles = (props, state, context) => {
  let theme = context.muiTheme;

  let styles = {
    root: {
      float: 'right',
    },
    background: {
      width: '100%',
      height: '100%',
      minWidth: '400px',
      backgroundImage: 'url(' + require(`../../../static/bg.png`) + ')',
      backgroundPosition: 'center 0',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      zoom: 1,
    },
    content: {
      margin: '53px auto auto auto',
      width: '330px',
      height: '610px',
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
      padding: '30px 30px 30px 30px',
      width: '320px',
    },
    login: {
      width: '256px',
    },
    loginContainer: {
      float: 'right',
      position: 'relative',
      right: '50%',
      backgroundColor: 'rgba(0,0,0,0.60)',
      borderRadius: 2,
      padding: '24px',
      width: props.size ? 261 : 302,
      height: props.size ? 270 : 312,
    },
    loginSlogan: {
      fontSize: '24px',
      color: '#fff',
    },
    loginHello: {
      fontSize: '24px',
      color: '#fff',
      marginTop: props.size ? '56px' : '67px',
    },
    loginEmail: {
      fontSize: '20px',
      color: '#fff',
      marginTop: '20px',
      marginBottom: '20px',
    },
    loginButton: {
      minWidth: '100%',
    },
    logoContainer: {
      margin: '0px auto 60px auto',
      width: '148px',
      height: '60px',
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
        fontSize: 13,
      },
      reset: {
        color: '#F5A623',
        fontSize: 14,
        fontFamily: 'Roboto',
        fontWeight: 500,
        display: 'block',
        textDecoration: 'none',
        cursor: 'pointer',
        boxSizing: 'border-box',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        wordBreak: 'keep-all',
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
      marginTop: '8px',
      width: props.size ? '260px' : '294px',
    },
    input: {
      color: '#fff',
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
      color: '#fff',
      display: state.showPassword === false ? 'inline-block' : 'none',
      cursor: 'pointer',
    },
    invisible: {
      width: 18,
      height: 18,
      color: '#fff',
      display: state.showPassword === true ? 'inline-block' : 'none',
      cursor: 'pointer',
    },
    visibleContainer: {
      position: 'absolute',
      right: props.size ? 0 : -30,
      top : props.size ? 32 : 52,
    },
    label:{
      fontSize: 16,
      fontWeight:500,
    },
    bottom: {
      paddingTop: props.size ? 0 : 35,
    },
  };

  if(state.animateAvatar) {
    styles.avatar = _.merge(styles.avatar, styles.avatarAnimated);
  }

  return styles;
};

@connect(
  state => ({
    error: state.user.error,
    user: state.user.user,
    isFetching: state.user.isFetching,
    url: state.user.url,
  }),
  userActions
)
export default class Login extends React.Component{

  static propTypes = {
    close: PropTypes.func,
    user: PropTypes.object,
    error: PropTypes.object,
    isFetching: PropTypes.bool,
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
    nButtonGotoDesktop: PropTypes.string,
    nTextErrorWhenError: PropTypes.string,
    nTextErrorWhenLoginFail: PropTypes.string,
    nTextErrorWhenLoginBanned: PropTypes.string,
    nTextErrorWhenLoginLocked: PropTypes.string,
    nTextErrorUsernameRequired: PropTypes.string,
    nTextErrorUsernameLength: PropTypes.string,
    nTextErrorPasswordRequired: PropTypes.string,
    nTextErrorPasswordLength: PropTypes.string,
    nTextErrorUsernameIsInvalid: PropTypes.string,
    style: PropTypes.object,
    size: PropTypes.number,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
  };

  static defaultProps = {
    isLoginSuccess: false,
    maxPassword: 64,
    maxUsername: 64,
    minPassword: 6,
    minUsername: 6,
    nTextWelcomeYou: 'Welcome,',
    nTextArentYou: 'You are not ',
    nLabelUsername: 'Username',
    nLabelPassword: 'Password',
    nTextErrorUsernameUsed: 'This username is occupied, please choose another one.',
    nTextForgotPassword: 'Forget password?',
    nTextNotRegistered: 'Sign up now',
    nButtonLogin:'Login',
    nButtonGotoDesktop: 'Go To Agency Desk',
    nTextErrorWhenError: 'Sorry, you can not sign in temporarily, please try again later',
    nTextErrorWhenLoginFail:'Login failed, please check your username and password',
    nTextErrorWhenLoginBanned:'Unfortunately, the current user has been blocked, you cannot sign in',
    nTextErrorWhenLoginLocked:'Unfortunately, the current user has been locked, you cannot sign in.',
    nTextErrorUsernameRequired:'Login name is required',
    nTextErrorUsernameLength:'Username length must be between 6 and 64',
    nTextErrorPasswordRequired:'Password is required',
    nTextErrorPasswordLength:'Password length must be between 6 and 64',
    nTextErrorUsernameIsInvalid:'Only numbers, letters, dash, underscore, @ and . are acceptable',
    size: 1,
  };

  constructor(props) {
    super(props);
    this.state = {
      errorTextPassword: null,
      errorTextUsername: null,
      inputusername: null,
      showPassword: false,
      isLoggedIn: false,
    };
  }

  componentDidMount=() => {
    // let { fetchMe } = this.props;
    // if(!this.isLoggedIn()) {
    //   fetchMe();
    // }
  }

  componentWillReceiveProps = (nextProps) =>{
    if(this.isLoggedIn(nextProps)) {
      this.setState({isLoggedIn:true});
      return;
    }

    let error = nextProps.error;

    let errCode = error && error.errorCode;

    let errMsg = null;

    if(errCode && error !== this.props.error) {
      errMsg = this._getErrMsg(errCode);
      this.setState({
        errorTextPassword: errMsg,
      });
      return;
    }
  }

  renderLogo=() => {
    const styles = getStyles(this.props, this.state, this.context);

    return (
      <div style={styles.logoContainer} >
        <img src={require('../../../static/logo.png')} />
      </div>
    );
  }

  isQuick = (props) => {
    props = props || this.props;
    return props.local && props.local.quick;
  }

  isLoggedIn= (props) => {
    props = props || this.props;

    return props.user && props.user._id;
  }

  renderAvatar= () => {
    if(this.isLoggedIn()) { return null; }
    const styles = getStyles(this.props, this.state, this.context);

    return (
      <div style={styles.avatarContainer}>
        <Avatar
          size={80}
          style={styles.avatar}
        />
      </div>
    );
  }

  renderUsername=() => {
    if(this.isLoggedIn()) { return null; }
    const styles = getStyles(this.props, this.state, this.context);


    let fullname = this.props.local && this.props.local.fullname;
    let username = this.props.local && this.props.local.username;

    return this.isQuick() ? (
      <div style={styles.welcomeContainer}>
        <p style={styles.welcome} title={fullname}>{this.props.nTextWelcomeYou}{fullname}</p>
      </div>
    ) : (
      <div style={styles.usernameContainer}>
        <TextField
          ref='username'
          key='username'
          defaultValue={username}
          errorText={this.state.errorTextUsername}
          floatingLabelText={this.props.nLabelUsername}
          floatingLabelStyle={{color:'#fff'}}
          fullWidth={true}
          inputStyle={styles.input}
          underlineFocusStyle={{borderColor: '#f5a623'}}
          onChange={this._validateUsername}
          style={styles.username}
        />
      </div>
    );
  }

  renderPassword=() => {
    const styles = getStyles(this.props, this.state, this.context);

    return this.isLoggedIn() ? null : (
      <div style={styles.container}>
        <TextField
          ref='password'
          key='password'
          type={ this.state.showPassword === true ? 'text' : 'password' }
          errorText={this.state.errorTextPassword}
          floatingLabelText={this.props.nLabelPassword}
          floatingLabelStyle={{color:'#fff'}}
          fullWidth={true}
          style={_.assign({},styles.username, { marginTop: this.props.size ? -22 : 0})}
          inputStyle={styles.input}
          underlineFocusStyle={{borderColor: '#f5a623'}}
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
    );
  }

  renderAction =() => {
    const styles = getStyles(this.props, this.state, this.context);

    return (
      <ClearFix>
        <div style={styles.bottom}>
          {/*{ this.renderHelper() }*/}
          { this.renderButton() }
          <div style={styles.helpContainer}>
            { this.renderPostHelper() }
          </div>
        </div>
      </ClearFix>
    );
  }

  renderHelper=() => {
    const styles = getStyles(this.props, this.state, this.context);

    return this.isLoggedIn() ? null : (
      <div style={styles.helpContainer}>
        <a
          style={styles.a.retrieve}
          onTouchTap={this._retrieve}
        >
          {this.props.nTextForgotPassword}
        </a>
      </div>
    );
  }

  renderButton = () => {
    const styles = getStyles(this.props, this.state, this.context);

    return this.isLoggedIn() ? (
      <RaisedButton
        backgroundColor={'#f5a623'}
        capitalized='capitalize'
        labelStyle={styles.label}
        fullWidth={true}
        label={this.props.nButtonGotoDesktop}
        secondary={true}
        style={styles.loginButton}
        onClick={this._handleClick}
      />
    ): (
      <RaisedButton
        backgroundColor={'#f5a623'}
        capitalized='capitalize'
        labelStyle={styles.label}
        fullWidth={true}
        label={this.props.nButtonLogin}
        secondary={true}
        style={styles.loginButton}
        onClick={this._handleClick}
      />
    );
  }

  renderPostHelper = () => {
    const styles = getStyles(this.props, this.state, this.context);

    if(this.isLoggedIn()) { return null; }

    let name = this.props.local && this.props.local.fullname;
    let nTextArentYou = this.props.nTextArentYou;
    let title = `${nTextArentYou}${name}?`;

    return !this.isLoggedIn() ?
    this.isQuick() ? (
      <a
        style={styles.a.reset}
        onClick={this._reset}
        title={title}
      >
        {title}
      </a>
    ) : (
      <a
        style={styles.a.reset}
        onClick={this._register}
      >
        {this.props.nTextNotRegistered}
      </a>
    ) : null;
  }

  render=() => {
    const styles = getStyles(this.props, this.state, this.context);

    return(
      <div>
        <ClearFix>
          { !this.isLoggedIn() ? (
          <div style = {styles.loginContainer}>
            <div style={styles.loginSlogan}>Welcome to E-PORTS</div>
            { this.renderUsername() }
            { this.renderPassword() }
            { this.renderAction() }
          </div>) : (
            <div style = {styles.loginContainer}>
              <div style={styles.loginSlogan}>Welcome to E-PORTS</div>
              <div style = {styles.loginHello}>Hello,</div>
              <div style = {styles.loginEmail}>
                {this.props.user.username}
              </div>
              { this.renderAction() }
            </div>
          )}
        </ClearFix>
      </div>
      // <EventListener
      //   target={window}
      //   onKeyUp={this._handleWindowKeyUp}
      // >

      // </EventListener>
    );
  }

  _validateUsername = () => {
    let username = this._getUsername();
    username = username && username.trim();
    let len = username ? username.length : 0;
    let state = {
      errorTextUsername: null,
    };

    if(len === 0) {
      state.errorTextUsername = this.props.nTextErrorUsernameRequired;
    } else if (len < this.props.minUsername || len > this.props.maxUsername) {
      state.errorTextUsername = _.template(this.props.nTextErrorUsernameLength)(this.props);
    } else if(!USER_NAME_PATTERN.test(username)) {
      state.errorTextUsername = this.props.nTextErrorUsernameIsInvalid;
    }

    this.setState(state);

    return state.errorTextUsername === null;
  }

  _validatePassword = () => {
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

  _handleWindowKeyUp=(e)=> {
    // if (keycode(e) === 'enter') {
    //   this._handleClick();
    // }
  }

  _handleClick = () => {
    let {
      login,
      url,
    } = this.props;

    if(this.isLoggedIn() && url) {
      window.open(`${url}/dashboard`);
      return;
    }

    if(!this._checkAvailability()) { return; }

    let username = this._getUsername();
    username = this._trim(username);
    let password = this.refs.password.getValue();
    password = this._trim(password);
    if (_.isFunction(login)) {
      login({
        username: username,
        password: password,
      });
    }
  }

  _checkAvailability = () => {
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

  _getUsername = () => {
    return this.refs.username ? this.refs.username.getValue() : this.props.local ? this.props.local.username : '';
  }

  _handleShowPassword = () => {
    this.setState({showPassword:!this.state.showPassword});
  }

  _trim =(str) => {
    if (str) { str = str.replace(/[\r\n\t]/g, ''); }
    if (str) { str = str.replace(/ /g, ''); }

    return str;
  }

  _reset= () => {

    this.setState({
      inputusername: null,
      errorTextUsername: null,
      errorTextPassword: null,
    });

    if(_.isFunction(this.props.reset)) {
      this.props.reset();
    }
  }
  _getErrMsg(errCode) {
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

  _retrieve = () => {
    global.showRetrieve();
  }

  _register = () => {
    browserHistory.push('/register');
  }
};
