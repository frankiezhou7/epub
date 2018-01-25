import React, {Component, PropTypes} from 'react';
import _ from 'eplodash';
import CommonForm from '../../components/CommonForm';
import RaisedButton from 'epui-md/lib/RaisedButton';
import TextField from 'epui-md/lib/TextField/TextField';
import ClearFix from 'epui-md/lib/internal/ClearFix';
import ActionViewSuccess from 'epui-md/lib/svg-icons/action/view-success';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from "react-helmet";
import * as userActions from '../../redux/reducers/user';

const TOKEN_MIN_LENGTH = 64;

const getStyles =(props, context)=>{
  const theme = context.muiTheme;
  return {
    root: {
    },
    leftNode:{
      position: 'absolute',
      top: 6,
    },
    textCenter: {
      textAlign: 'center'
    },
    marginTop: {
      marginTop: '40px'
    },
    itemHeight: {
      height: '90px',
    },
    setP: {
      margin: 0,
      color: 'rgba(0,0,0,0.87)',
      fontSize: '16px',
      lineHeight: '24px'
    },
    setRemind: {
      paddingTop: '20px',
      color: 'rgba(245,166,35,1)',
      fontSize: '14px',
      fontWeight: '100'
    },
    setError: {
      paddingTop: '20px',
      color: 'red',
      fontSize: '14px',
      fontWeight: '100',
    },
    setPwdText: {
      width: '330px',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: '40px',
      textAlign: 'left'
    },
    setPwdLabel: {
      fontSize: '16px',
      fontWeight: '100'
    }
  }
}

@connect(
  state => ({
    user: state.user,
  }),
  dispatch =>({
    ...bindActionCreators({
      verifyPasswordToken: userActions.verifyPasswordToken,
      resetPassword: userActions.resetPassword,
    }, dispatch)
  })
)

export default class setPassword extends Component {

  static contextTypes = {
  	muiTheme: PropTypes.object,
  }

  static propTypes = {
    verifyPasswordToken: PropTypes.func,
    resetPassword: PropTypes.func,
    valid: PropTypes.bool,
    location: PropTypes.object,
    setPwdUsername: PropTypes.string,
    setPwdEmail: PropTypes.string,
    nSavePsdWelcome: PropTypes.string,
    nSavePsdTips: PropTypes.string,
    nSavePsdRemind: PropTypes.string,
    nErrorPasswordIsInvalid: PropTypes.string,
    nSavePsdToken: PropTypes.string,
    nTextPassword: PropTypes.string,
    nTextSavePsd: PropTypes.string,
    nTextSetPsdHeading: PropTypes.string,
    nErrorPasswordRequired: PropTypes.string,
    nErrorPasswordIsInvalid: PropTypes.string,
    passwordMinLen: PropTypes.number,
    passwordMaxLen: PropTypes.number,
  }

  static defaultProps = {
    setPwdUsername: "Username",
    setPwdEmail: "User Email",
    nTextSetPsdHeading: "Set Password",
    nTextPassword: "Password",
    nErrorPasswordRequired: "Password is required",
    nErrorPasswordIsInvalid: "Password length must be between 6 and 64",
    nTextSavePsd: "Save",
    nSavePsdWelcome: "Hello",
    nSavePsdTips: "Your Sign in email",
    nSavePsdRemind: "Please set your password.",
    nSavePsdToken: "Token is expired",
    passwordMinLen: 6,
    passwordMaxLen: 64,
  }

  constructor(props) {
    super(props);
    let query = this.props.location.query;
    this.state = {
      errorTextSetPassword: null,
      username: query.username,
      token: query.token,
      valid: false,
    }
  }

  componentWillMount = () =>{
    let query = this.props.location.query;
    if (!query) { return; }
    // if (_.isFunction(logout)) {
    //   logout();
    // }
    // if (_.isFunction(logoff)) {
    //   logoff();
    // }
    let username = query.username;
    let token = query.token;
    if (!username || !token || token.length < TOKEN_MIN_LENGTH) {
      this.setState({
        valid: false,
        username: username,
        token: token,
      });
      return;
    }
    this.props.verifyPasswordToken({
      username: username,
      token: token,
    })
  }

  componentWillReceiveProps = (nextProps) =>{
    if(this.isVerify(nextProps)) {
      this.setState({
        valid: nextProps.user.verify.valid,
      })
    }
    if(this.isReset(nextProps) && nextProps.user.reset.success){
      browserHistory.push("/");
    }
  }

  isVerify = (props) => {
    props = props || this.props;
    return props.user && props.user.verify && props.user.verify._id;
  }
  isReset = (props) => {
    props = props || this.props;
    return props.user && props.user.reset && props.user.reset._id;
  }

  renderContent = (style) => {
    let { username, valid } = this.state;
    return (
      <div style={_.assign(style.textCenter, style.marginTop)}>
        <p style={style.setP}>{this.props.nSavePsdWelcome}, {username}</p>
        <p style={style.setP}>{this.props.nSavePsdTips}, {username}</p>
        <p style={style.setP}>{valid && this.props.nSavePsdRemind}</p>
        <p style={valid ? style.setRemind : style.setError}>{valid ? _.template(this.props.nErrorPasswordIsInvalid)(this.props) : this.props.nSavePsdToken}</p>
        {valid && this.renderPassword(style)}
      </div>
    )
  }

  renderPassword = (style) =>{
    return (
      <div>
        <div style={_.assign(style.setPwdText, style.itemHeight)}>
        <ClearFix>
          <TextField
            ref='setPassword'
            key='setPassword'
            type='password'
            fullWidth={true}
            errorText={this.state.errorTextSetPassword}
            floatingLabelText={this.props.nTextPassword}
            onChange={this._validateSetPassword}
            onBlur={this._onFinishSetPassword}
          />
        </ClearFix>
        </div>
        <RaisedButton
          label={this.props.nTextSavePsd}
          secondary={true}
          labelStyle={style.setPwdLabel}
          capitalized="capitalized"
          onClick={this._setPasswordSendClick}
        />
      </div>
    )
  }

  render(){
    let body = {};
    const {prepareStyles} = this.context.muiTheme;
    const style = getStyles(this.props, this.context);

    body.title = this.props.nTextSetPsdHeading;
    body.content = this.renderContent(style);

    return(
      <div style={style.root}>
          <CommonForm title={body.title} content={body.content} />
      </div>
    )
  }

  _validateCommonSetPassword = () =>{
    let setPassword = this.refs.setPassword.getValue().trim();
    if(setPassword == ""){
      this.setState({
        errorTextSetPassword: this.props.nErrorPasswordRequired
      })
    }else if(setPassword.length < this.props.passwordMinLen || setPassword.length > this.props.passwordMaxLen) {
      this.setState({
        errorTextSetPassword: _.template(this.props.nErrorPasswordIsInvalid)(this.props)
      })
    }else {
      this.setState({
        errorTextSetPassword: null
      })
    }
  }
  _validateSetPassword = () =>{
    this._validateCommonSetPassword()
  }

  _onFinishSetPassword = () =>{
    this._validateCommonSetPassword()
  }

  _setPasswordSendClick = () =>{
    let password = this.refs.setPassword.getValue().trim();
    if(password == ""  || this.state.errorTextSetPassword !== null){
      this.refs.setPassword.focus()
    }else {
      let { resetPassword } = this.props;
      let { username, valid, token } = this.state;
      if(valid && _.isFunction(resetPassword)){
        resetPassword({
          username: username,
          token: token,
          password: password,
        })
      }
    }
  }
}
