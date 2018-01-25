import React from 'react';
import _ from 'eplodash';
const PropTypes = React.PropTypes;
import TextField from 'epui-md/lib/TextField/TextField';
import ClearFix from 'epui-md/lib/internal/ClearFix';

const MAX_PASSWORD_LEN = 64;
const MAX_USER_NAME_LEN = 64;
const MIN_PASSWORD_LEN = 6;
const MIN_USER_NAME_LEN = 6;
const USER_NAME_PATTERN = '^[A-Za-z0-9@_\\-\\.]*$';

const getStyles = () => {
  let styles = {
    root: {
    },
    p: {
      color: '#4a4a4a',
      fontSize: '16px',
      padding: '2px',
      margin: 0,
    },
    textField: {
      float: 'left',
      marginBottom: '10px',
    },
    content: {
      height:'380px',
    },
    p1: {
      color: '#4a4a4a',
      fontSize: '16px',
      padding: '4px',
      fontFamily:'Roboto',
      fontWeight: 500,
    },
    p2:{
      fontSize: '14px',
      fontFamily:'Roboto',
    },
  };

  return styles;
};

export default class LoginInfo extends React.Component{

  static propTypes = {
    available: PropTypes.object,
    errorCodeVerifyUsername: PropTypes.string,
    errorTextPassword: PropTypes.string,
    errorTextUsername: PropTypes.string,
    maxPassword: PropTypes.number,
    maxUsername: PropTypes.number,
    minPassword: PropTypes.number,
    minUsername: PropTypes.number,
    nHintPassword: PropTypes.string,
    nHintPasswordConfirm: PropTypes.string,
    nHintUsername: PropTypes.string,
    nLabelPassword: PropTypes.string,
    nLabelPasswordConfirm: PropTypes.string,
    nLabelUsername: PropTypes.string,
    nTextErrorPasswordLength: PropTypes.string,
    nTextErrorPasswordNotMatch: PropTypes.string,
    nTextErrorPasswordRequired: PropTypes.string,
    nTextErrorUsernameInvalid: PropTypes.string,
    nTextErrorUsernameLength: PropTypes.string,
    nTextErrorUsernameRequired: PropTypes.string,
    nTextErrorUsernameUsed: PropTypes.string,
    password: PropTypes.string,
    regexUsername: PropTypes.string,
    userExists: PropTypes.func,
    username: PropTypes.string,
    usernameEditable: PropTypes.bool,
    verifyUsername: PropTypes.func,
    verifyUsernameSuccess: PropTypes.bool,
    wrapperStyle: PropTypes.object,
    exists: PropTypes.object,
  }

  static defaultProps = {
    maxPassword: MAX_PASSWORD_LEN,
    maxUsername: MAX_USER_NAME_LEN,
    minPassword: MIN_PASSWORD_LEN,
    minUsername: MIN_USER_NAME_LEN,
    regexUsername: USER_NAME_PATTERN,
    usernameEditable: true,
    errorTextPassword:'',
    errorTextUsername:'',
    nTextErrorUsernameUsed:'This username is occupied, please choose another one.',
    nLabelUsername:'Login name',
    nHintUsername:'Enter the login name',
    nLabelPassword:'Password',
    nHintPassword:'Enter Password',
    nLabelPasswordConfirm:'Confirm Password',
    nHintPasswordConfirm:'Enter Password again',
    nTextErrorUsernameRequired:'Login name is required',
    nTextErrorUsernameLength:'Username length must be between 6 and 64',
    nTextErrorUsernameInvalid:'Username can only contain numbers, letters, dash (-), underscore (_), (@) and (.)',
    nTextErrorPasswordRequired:'Password is required',
    nTextErrorPasswordLength:'Password length must be between 6 and 64',
    nTextErrorPasswordNotMatch:'Passwords not matched',
    nTextServiceContentPrimary: 'Enter your login information',
    nTextServiceContentSecondary: 'Please fill in the login name and password of company account',
  }

  constructor(props) {
    super(props);
    let {
      errorTextPassword,
      errorTextUsername,
      username,
      password,
    } = this.props;

    this.state = {
      errorTextUsername: errorTextUsername,
      errorTextPassword: errorTextPassword,
      errorTextPasswordConfirm: null,
      password: password || '',
      passwordConfirm: password || '',
      username: username || '',
    };
  }

  componentWillMount() {
    this.regexUsername = new RegExp(this.props.regexUsername);
  }

  componentDidMount() {
    this.refs.username.focus()
  }

  componentWillReceiveProps(nextProps) {
    let exists = nextProps.exists;
    exists = exists.exists;
    if(exists) {
      this.setState({
        errorTextUsername: this.props.nTextErrorUsernameUsed,
      });
    }else if(this.state.errorTextUsername === this.props.nTextErrorUsernameUsed){
      this.setState({
        errorTextUsername: null,
      });
    }
  }

  getValue() {
    if(this._isValid()) {
      let username = this.refs.username.getValue();
      let password = this.refs.password.getValue();

      return {
        username: username,
        password: password,
      };
    }

    return null;
  }

  render() {
    let styles = getStyles();

    let {
      nHintPassword,
      nHintPasswordConfirm,
      nHintUsername,
      nLabelPassword,
      nLabelUsername,
      nLabelPasswordConfirm,
      usernameEditable,
      wrapperStyle,
      nTextServiceContentPrimary,
      nTextServiceContentSecondary,
      ...other,
    } = this.props;

    let {
      errorTextPassword,
      errorTextPasswordConfirm,
      errorTextUsername,
      password,
      passwordConfirm,
      username,
    } = this.state;

    return (
      <div style={Object.assign({},styles.root, wrapperStyle)}>
        <div style={Object.assign({},styles.p1,{fontWeight: 500})}>
          {nTextServiceContentPrimary}
        </div>
        <div style={Object.assign({},styles.p1,styles.p2)}>
          {nTextServiceContentSecondary}
        </div>
        <div style={styles.content}>
          <ClearFix>
            <TextField
              ref='username'
              key='name'
              errorText={errorTextUsername}
              floatingLabelText={this.props.nLabelUsername}
              fullWidth={true}
              hintText={this.props.nHintUsername}
              isWarning={true}
              showIcon={true}
              style={styles.textField}
              onChange={this._handleChangeUserName}
              onBlur={this._handleBlurUsername}
              value={username}
            />
            <TextField
              ref='password'
              key='pass'
              errorText={errorTextPassword}
              floatingLabelText={this.props.nLabelPassword}
              fullWidth={true}
              hintText={this.props.nHintPassword}
              isWarning={true}
              showIcon={true}
              style={styles.textField}
              type='password'
              onChange={this._handleChangePassword}
              onBlur={this._validatePassword}
              value={password}
            />
            <TextField
              ref='passwordConfirm'
              key='passConfirm'
              errorText={errorTextPasswordConfirm}
              floatingLabelText={this.props.nLabelPasswordConfirm}
              fullWidth={true}
              hintText={this.props.nHintPasswordConfirm}
              isWarning={true}
              showIcon={true}
              style={styles.textField}
              type='password'
              onChange={this._handlePasswordConfirm}
              onBlur={this._validatePasswordConfirm}
              value={passwordConfirm}
            />
          </ClearFix>
        </div>
      </div>
    );
  }

  _validateUsername= () => {
    let errorText = null;
    let username = this.refs.username.getValue();
    let len = username ? username.length : 0;

    if(len === 0) {
      errorText = this.props.nTextErrorUsernameRequired;
    } else if(len < this.props.minUsername || len > this.props.maxUsername) {
      errorText = _.template(this.props.nTextErrorUsernameLength)(this.props);
    } else if(!this.regexUsername.test(username)) {
      errorText = this.props.nTextErrorUsernameInvalid;
    }
      this.setState({
        errorTextUsername: errorText,
      });

    return !errorText;
  }

  _handleChangePassword= (event, value) => {
    this.setState({
      password: value,
    }, () => {
      this._validatePassword();
    });
  }

  _validatePassword= () => {
    let pass = this.refs.password.getValue();
    let len = pass ? pass.length : 0;
    let errorText = null;
    if(len === 0) {
      errorText = this.props.nTextErrorPasswordRequired;
    } else if(len < this.props.minPassword || len > this.props.maxPassword) {
      errorText = _.template(this.props.nTextErrorPasswordLength)(this.props);
    }

    this.setState({
      errorTextPassword: errorText,
    });

    return errorText === null;
  }

  _handlePasswordConfirm= (event, value) => {
    this.setState({
      passwordConfirm: value,
    }, () => {
      this._validatePasswordConfirm();
    });
  }

  _validatePasswordConfirm= () => {
    let pass = this.refs.password.getValue();
    let conf = this.refs.passwordConfirm.getValue();
    let errorText = null;

    if(pass !== conf) {
      errorText = this.props.nTextErrorPasswordNotMatch;
    }

    this.setState({
      errorTextPasswordConfirm: errorText,
    });

    return errorText === null;
  }

  _handleChangeUserName= (event, value) => {
    this.setState({
      username: value,
    }, () => {
      this._validateUsername();
    });
  }

  _handleBlurUsername= () => {
    let errorText = null;
    let username = this.refs.username.getValue();
    let len = username ? username.length : 0;

    if(len === 0) {
      errorText = this.props.nTextErrorUsernameRequired;
    } else if(len < this.props.minUsername || len > this.props.maxUsername) {
      errorText = _.template(this.props.nTextErrorUsernameLength)(this.props);
    } else if(!this.regexUsername.test(username)) {
      errorText = this.props.nTextErrorUsernameInvalid;
    }
      this.setState({
        errorTextUsername: errorText,
      });
      if(errorText !== null) return;

    let fn = this.props.userExists;

    if(_.isFunction(fn)) {
      fn({
        username:username,
      })
    }
  }

  _isValid=() => {
    return !this.state.errorTextUsername && this._validatePassword() && this._validatePassword() && this._validatePasswordConfirm();
  }
};
