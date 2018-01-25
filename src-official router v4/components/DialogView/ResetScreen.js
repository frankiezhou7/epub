import React, { PropTypes } from 'react';
import _ from 'eplodash';
import BaseForm from './BaseForm';
import ErrorIcon from 'epui-md/lib/svg-icons/alert/error';
import InfoIcon from 'epui-md/lib/svg-icons/action/info';
import RaisedButton from 'epui-md/lib/RaisedButton';
import TextField from 'epui-md/lib/TextField/TextField';
import Helmet from "react-helmet";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as userActions from '../../redux/reducers/user';

const TOKEN_MIN_LENGTH = 64;

const getStyles = (props, state, context) => {
  let theme = context.muiTheme;
  let {
    error,
    success,
    valid,
  } = state;

  let visible = valid ? (success ? 'visible' : (error ? 'visible' : 'hidden')) : (valid === undefined ? 'hidden' : 'visible');

  let styles = {
    root: {

    },
    errorIcon: {
      float: 'left',
      fill: '#f44336',
    },
    errorText: {
      display: 'inline-block',
      lineHeight: '24px',
      marginLeft: '5px',
    },
    infoIcon: {
      float: 'left',
      fill: '#2196f3',
    },
    password: {
      display: 'block',
      marginBottom: '20px',
      width: '300px',
    },
    passwordConfirm: {
      display: 'block',
      width: '300px',
    },
    resetPass: {
      marginTop: '30px',
    },
    subHeader: {
      marginTop: '20px',
      fontSize: '18px',
    },
    zone: {
      marginTop: '20px',
      color: success ? 'rgba(0, 0, 0, 0.87)' : '#f44336',
      visibility: visible,
      fontSize: '16px',
    },
  };

  return styles;
};

@connect(
  state => ({
    reset: state.user.reset,
    verify: state.user.verify,
    invalid: state.user.error,
    failed: state.user.failed,
  }),
  dispatch =>({
    ...bindActionCreators({
      resetPassword: userActions.resetPassword,
      verifyPasswordToken: userActions.verifyPasswordToken,
    },dispatch)
  })
)

export default class ResetScreen extends React.Component{

  static propTypes = {
    location: PropTypes.object,
    errorTextPassword: PropTypes.string,
    maxPassword: PropTypes.number,
    minPassword: PropTypes.number,
    nHintPassword: PropTypes.string,
    nHintPasswordConfirm: PropTypes.string,
    nLabelPassword: PropTypes.string,
    nLabelPasswordConfirm: PropTypes.string,
    nTextErrorPasswordLength: PropTypes.string,
    nTextErrorPasswordNotMatch: PropTypes.string,
    nTextErrorPasswordRequired: PropTypes.string,
    nTextResetPassword: PropTypes.string,
    nTextResetPasswordFail: PropTypes.string,
    nTextResetPasswordSuccess: PropTypes.string,
    nTextReturnToLogin: PropTypes.string,
    nTextTokenOutOfDate: PropTypes.string,
    resetPass: PropTypes.object,
    resetPassword: PropTypes.func,
    verifyPasswordToken: PropTypes.func,
    verifyToken: PropTypes.object,
    nLabelEPorts: PropTypes.string,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
  };

  static defaultProps = {
    minPassword: 6,
    maxPassword: 64,
    nTextResetPassword: "Reset Password",
    nTextResetPasswordFail: "Reset password failed",
    nTextResetPasswordSuccess: "Reset password succeeded",
    nTextErrorPasswordLength: "Password length must be filled in between <%=minPassword%> and <%=maxPassword%>",
    nTextTokenOutOfDate: "Invalid link",
    nTextErrorPasswordNotMatch: "Passwords not matched",
    nTextErrorPasswordRequired: "Password is required",
    nLabelPassword: "Login Password",
    nLabelPasswordConfirm: "Confirm Password",
    nHintPassword: "Enter Password",
    nHintPasswordConfirm: "Enter password again",
    nTextReturnToLogin: "Back To Login",
    errorTextPassword: "Incorrect password",
    nLabelEPorts: 'E-PORTS',
  };

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorTextPassword: null,
      errorTextPasswordConfirm: null,
      password: '',
      valid: false,
    };
  }

  componentWillMount() {
    let query = this.props.location.query;
    if (!query) { return; }
    let username = query.username;
    let token = query.token;
    if (!username || !token || token.length < TOKEN_MIN_LENGTH) {
      this.setState({
        loading: false,
        valid: false,
      });

      return;
    }
    let { verifyPasswordToken } = this.props;

    if (_.isFunction(verifyPasswordToken)) {
      this.setState({
        username: username,
        token: token,
        loading: true,
      }, () => {
        verifyPasswordToken({username:username, token:token});
      });
    }
  };

  componentWillReceiveProps = (nextProps) =>{
    if(_.get(nextProps.invalid,'status') === 'NOK'){
      this.setState({
        loading: false,
        valid: false,
      });
      return;
    }

    if(_.get(nextProps.failed,'status') === 'NOK'){
      this.setState({
        loading: false,
        success: false,
      });
      return;
    }

    if(_.has(nextProps.verify,'valid')){
      this.setState({
        loading: false,
        valid: nextProps.verify.valid,
      });
    }

    if(_.get(nextProps.reset,'success') === true){
      this.setState({
        loading: false,
        success: true,
      });
    }
  }

  renderContent = (styles) => {
    let {
      loading,
      success,
      valid,
    } = this.state;

    let {
      nTextResetPasswordSuccess,
      nTextResetPasswordFail,
      nTextTokenOutOfDate,
      nTextResetPassword,
      nTextReturnToLogin,
    } = this.props;

    let disabled = !valid || success || loading;
    let errorText = valid ? (success ? nTextResetPasswordSuccess : nTextResetPasswordFail) : nTextTokenOutOfDate;
    let label = valid ? (success ? nTextReturnToLogin : nTextResetPassword) : nTextReturnToLogin;

    return (
      <div style={styles.root}>
        <Helmet
            title = {this.props.nTextResetPassword}
            titleTemplate = { " %s | "+this.props.nLabelEPorts}
        />
        <TextField
          ref='password'
          key='1'
          disabled={disabled}
          errorText={this.state.errorTextPassword}
          floatingLabelText={this.props.nLabelPassword}
          hintText={this.props.nHintPassword}
          fullWidth={true}
          isWarning={true}
          onBlur={this._validatePassword}
          onChange={this._handleChangePassword}
          showIcon={true}
          style={styles.password}
          type='password'
          value={this.state.password}
        />
        <TextField
          ref='passwordConfirm'
          key='2'
          disabled={disabled}
          errorText={this.state.errorTextPasswordConfirm}
          floatingLabelText={this.props.nLabelPasswordConfirm}
          hintText={this.props.nHintPasswordConfirm}
          fullWidth={true}
          isWarning={true}
          onBlur={this._validatePasswordConfirm}
          onChange={this._validatePasswordConfirm}
          showIcon={true}
          style={styles.passwordConfirm}
          type='password'
        />
        <div style={styles.zone}>
          { success ? <InfoIcon style={styles.infoIcon} /> : <ErrorIcon style={styles.errorIcon} /> }
          <div style={styles.errorText}>
            {errorText}
          </div>
        </div>
        <div style={styles.resetPass}>
          <RaisedButton
            ref='resetPass'
            disabled={loading}
            label={label}
            primary={true}
            capitalized='capitalize'
            onTouchTap={this._handleTouchTapResetPassWord}
          />
        </div>
      </div>
    );
  };


  render = () => {
    let styles = getStyles(this.props, this.state, this.context);

    return (
      <BaseForm
        ref="baseForm"
        title={this.props.nTextResetPassword}
        content={this.renderContent(styles)}
      />
    );
  };

  _handleChangePassword = (event, value) => {
    this.setState({
      password: value,
    });
  };

  _handleTouchTapResetPassWord = () => {
    let {
      success,
      valid,
    } = this.state;

    if (valid && !success) {
      if (this._isValid()) {
        let {
          password,
          token,
          username,
        } = this.state;

        username = this._trim(username);
        password = this._trim(password);
        const { resetPassword } = this.props;

        if (_.isFunction(resetPassword)) {
          this.setState({
            loading: true,
          }, () => {
            resetPassword({username: username, token: token, password: password});
          });
        }
      }
    } else {
      browserHistory.push('/');
    }
  };

  _isValid = () => {
    let valid = this._validatePassword() && this._validatePasswordConfirm();

    return valid;
  };

  _validatePassword = () => {
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
  };

  _validatePasswordConfirm = () => {
    let pass = this.refs.password.getValue();
    let conf = this.refs.passwordConfirm.getValue();
    let errorText = null;

    if(pass !== conf) {
      errorText = this.props.nTextErrorPasswordNotMatch;
    }

    this.setState({
      error: null,
      errorTextPasswordConfirm: errorText,
    });

    return errorText === null;
  };

  _trim = (str) => {
    if (str) { str = str.replace(/[\r\n\t]/g, ''); }
    if (str) { str = str.replace(/ /g, ''); }

    return str;
  };
};
