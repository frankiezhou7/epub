import React, {Component, PropTypes} from 'react';
import _ from 'eplodash';
import ClearFix from 'epui-md/lib/internal/ClearFix';
import Paper from 'epui-md/lib/Paper';
import RaisedButton from 'epui-md/lib/RaisedButton';
import CommonForm from '../../components/CommonForm';
import RadioButton from 'epui-md/lib/RadioButton';
import RadioButtonGroup from 'epui-md/lib/RadioButton/RadioButtonGroup';
import ActionViewSuccess from 'epui-md/lib/svg-icons/action/view-success';
import Checkbox from 'epui-md/lib/Checkbox';
import Dialog from 'epui-md/lib/ep/Dialog/Dialog';
import ServerDialog from '../../components/ServerDialog';
import TextField from 'epui-md/lib/TextField/TextField';
import Transitions from 'epui-md/lib/styles/transitions';
import keycode from 'keycode';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from "react-helmet";
import * as userActions from '../../redux/reducers/user';

const SAFE_EMAIL_REGEXP = new RegExp('^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$', 'i');

const getStyles = (props, state, context)=>{
  return {
    textCenter: {
      textAlign: 'center'
    },
    createBtn: {
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    createBtnLabel: {
      color: '#fff',
      fontSize: '16px',
      fontWeight: 'normal',
      textTransform: 'capitalize'
    },
    itemHeight: {
      height: '90px',
    },
    roleTitle: {
      marginTop: 0,
      fontSize: '16px',
      color: 'rgba(0,0,0, 0.38)'
    },
    radio: {
      float: 'left',
      width: '140px'
    },
    radioLabel: {
      fontSize: '16px',
      textTransform: 'capitalize'
    },
    radioIcon: {
      marginRight: '10px',
      color: '#5A5A5A'
    },
    radioRemind: {
      marginTop: '5px',
      marginBottom: 0,
      color: '#F5A623',
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: '300'
    },
    radiotips: {
      fontSize: '12px',
      color: 'rgb(244, 67, 54)',
      transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
    },
    serverCheck: {
      width: '20px',
      float: 'left'
    },
    serverTerm: {
      float: 'left',
      marginLeft: '-10px',
      paddingTop: '3px',
      color: '#004588',
      fontSize: '16px',
      fontWeight: '400'
    },
    serverMargin: {
      marginTop: '14px',
      marginBottom: '54px'
    },
    linkIcon: {
      width: '100px',
      height: '100px',
      marginLeft: 'auto',
      marginRight: 'auto',
      color: '#004588',
      paddingTop: '80px'
    },
    linkRemind: {
      color: 'rgba(0,0,0, 0.87)',
      fontSize: '16px'
    },
    linkSend: {
      color: state.resendEmailIsClick ? '#004588' : 'rgba(0, 0, 0, 0.380392)',
      textTransform: 'capitalize',
      fontSize: '16px',
      cursor: state.resendEmailIsClick ? 'pointer' : 'auto',
    },
    margintop: {
      marginTop: '44px'
    },
    setP: {
      margin: '0',
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
    },
  }
}

@connect(
  state => ({
    exists: state.user.exists,
    userRegister: state.user.userRegister,
    userResendEmail: state.user.userResendEmail,
    registerError: state.user.registerError,
  }),
  userActions
)

export default class Register extends Component{
  static contextTypes = {
    muiTheme: PropTypes.object,
  }

  static childContextTypes = {
    muiTheme: PropTypes.object,
  }

  static propTypes = {
    register: PropTypes.func,
    userExists: PropTypes.func,
    resendEmail: PropTypes.func,
    exists: PropTypes.object,
    nTextHeading: PropTypes.string,
    nTextSetPsdHeading: PropTypes.string,
    nTextCompany: PropTypes.string,
    nErrorCompanyRequired: PropTypes.string,
    nLabelRoleTitle: PropTypes.string,
    nLabelRolePrincipal: PropTypes.string,
    nLabelRolePrincipalValue: PropTypes.string,
    nLabelRoleAgent: PropTypes.string,
    nLabelRoleAgentValue: PropTypes.string,
    nLabelRolePrincipalRemind: PropTypes.string,
    nLabelRoleAgentRemind: PropTypes.string,
    nErrorTextRole: PropTypes.string,
    nTextCompanyEmail: PropTypes.string,
    nErrorCompanyEmailRequired: PropTypes.string,
    nErrorCompanyEmailIsInvalid: PropTypes.string,
    nTextPassword: PropTypes.string,
    nErrorPasswordRequired: PropTypes.string,
    nErrorPasswordIsInvalid: PropTypes.string,
    nLabelServer: PropTypes.string,
    nTextButtonSend: PropTypes.string,
    nTextActiveRemind: PropTypes.string,
    nTextResendRemind: PropTypes.string,
    nTextActiveTokenNot: PropTypes.string,
    nTextActiveTokenNotNormall: PropTypes.string,
    nTextSendRemind: PropTypes.string,
    nTextActiveTokenSuccess: PropTypes.string,
    nTextSavePsd: PropTypes.string,
    nSavePsdWelcome: PropTypes.string,
    nSavePsdTips: PropTypes.string,
    nSavePsdRemind: PropTypes.string,
    nSavePsdToken: PropTypes.string,
    nTextExitsUser: PropTypes.string,
    passwordMinLen: PropTypes.number,
    passwordMaxLen: PropTypes.number,
  }
  static defaultProps = {
      nTextHeading: "Sign Up",
      nTextSetPsdHeading: "Set Password",
      nTextCompany: "Company",
      nErrorCompanyRequired: "Please enter your Company Name",
      nLabelRoleTitle: "Type",
      nLabelRolePrincipal: "Principal",
      nLabelRolePrincipalValue: "Principal",
      nLabelRoleAgent: "Agent",
      nLabelRoleAgentValue: "Agent",
      nLabelRolePrincipalRemind: "Ship Owner,Ship Management,Crew Manning,Technical Management, Financial Management,Consigner,Consignee,Charterer,Logistics,Customs Clearance",
      nLabelRoleAgentRemind: "Owner's agent, Charterer's agent, General agency, Other agent.",
      nErrorTextRole: "Please select your Company Type",
      nTextCompanyEmail: "Company Email",
      nErrorCompanyEmailRequired: "Please enter your Company Email",
      nErrorCompanyEmailIsInvalid: "Please enter your Email address correctly",
      nTextPassword: "Password",
      nErrorPasswordRequired: "Please enter your Password",
      nErrorPasswordIsInvalid: "Password length must be between 6 and 12",
      nLabelServer: "By creating an account, you agree to E-PORTS’s Terms of Service.",
      nTextButtonSend: "Create Account",
      nTextActiveRemind: "Please active your registration at your mailbox  ",
      nTextResendRemind: "Resend Activation Email",
      nTextActiveTokenNot: "The activation link has expired, please resend the link to your mailbox.",
      nTextActiveTokenNotNormall: "You have been activated, please wait patiently",
      nTextSendRemind: "Send Activation Email",
      nTextActiveTokenSuccess: "Your Account has been actived.",
      nTextSavePsd: "Save",
      nSavePsdWelcome: "Hello",
      nSavePsdTips: "Your Sign in email",
      nSavePsdRemind: "Please set your password.",
      nSavePsdToken: "Token is expired",
      nTextExitsUser: "Email already in use, please Sign in",
      passwordMinLen: 6,
      passwordMaxLen: 12,
  }
  constructor(props) {
    super(props);
    this.state = {
      step: 'infoEntering',
      errorTextCompany: null,
      errorTextCompanyEmail: null,
      errorTextPassword: null,
      roleMessageRemind: "",
      roleTips: null,
      serverDialogShow: false,
      serverCheck: true,
      errorTextSetPassword: null,
      email: 'yourname@email.com',
      userExistsFlag: false,
      resendEmailIsClick: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    let exists = nextProps.exists && nextProps.exists.exists;
    this.setState({
      userExistsFlag: exists,
      errorTextCompanyEmail: exists? this.props.nTextExitsUser : null,
    })
    // 判断是否注册成功
    if(this.isLoggedIn(nextProps)) {
      this.setState({
        email: nextProps.userRegister.username,
        step: 'activeEmail',
      })
    }
    //重新发送邮件状态，第二次重新发送无效
    if(nextProps.userResendEmail && nextProps.userResendEmail.success){
      this.setState({
        resendEmailIsClick: false,
      })
    }
  }

  isLoggedIn(props) {
    props = props || this.props;
    return props.userRegister && props.userRegister._id;
  }

  renderCompany(styles){
    return (
      <div style={styles.itemHeight}>
        <TextField
          ref='company'
          key='company'
          errorText={this.state.errorTextCompany}
          floatingLabelText={this.props.nTextCompany}
          fullWidth={true}
          onBlur={this._onFinishCompany}
        />
      </div>
    )
  }
  renderCheckbox(styles){
    return (
      <ClearFix>
        <p style={styles.roleTitle}>{this.props.nLabelRoleTitle}</p>
        <ClearFix>
          <RadioButtonGroup name="radioGroup" onChange={this._radioClick} ref='radioGroup'>
            <RadioButton value={this.props.nLabelRolePrincipalValue} label={this.props.nLabelRolePrincipal} labelStyle={styles.radioLabel} iconStyle={styles.radioIcon} style={styles.radio} />
          <RadioButton value={this.props.nLabelRoleAgentValue} label={this.props.nLabelRoleAgent} labelStyle={styles.radioLabel} iconStyle={styles.radioIcon} style={styles.radio} />
          </RadioButtonGroup>
        </ClearFix>
        <p style={styles.radioRemind}>{this.state.roleMessageRemind}</p>
      <div style={{display: this.state.roleMessageRemind? 'none':'block'}}><p style={styles.radiotips}>{this.state.roleTips}</p></div>
      </ClearFix>
    )
  }
  renderCompanyEmail(styles){
    return (
      <div style={styles.itemHeight}>
        <TextField
          ref='email'
          key='email'
          errorText={this.state.errorTextCompanyEmail}
          floatingLabelText={this.props.nTextCompanyEmail}
          fullWidth={true}
          onBlur={this._onFinishCompanyEmail}
        />
      </div>
    )
  }
  renderPassword(styles){
    return (
      <div style={styles.itemHeight}>
        <TextField
          ref='password'
          key='password'
          type='password'
          errorText={this.state.errorTextPassword}
          floatingLabelText={this.props.nTextPassword}
          fullWidth={true}
          onChange={this._validatePassword}
          onBlur={this._onFinishPassword}
        />
      </div>
    )
  }
  renderServerTerm(styles){
    return (
      <ClearFix style={styles.serverMargin}>
        <Checkbox style={styles.serverCheck} checked={this.state.serverCheck} onCheck={this._handleServerCheck} />
      <a href="javascript:;" style={styles.serverTerm} onClick={this._handleServer}>{this.props.nLabelServer}</a>
      </ClearFix>
    )
  }
  renderFooter(styles){
    return (
      <div style={styles.textCenter}>
        <RaisedButton
          label={this.props.nTextButtonSend}
          secondary={true}
          disabled={!this.state.serverCheck}
          style={styles.createBtn}
          labelStyle={styles.createBtnLabel}
          onClick={this._createBtnClick}
        />
      </div>
    )
  }

  randerBody(styles){
    let body = {};
    let { step } = this.state;
    switch (step) {
      case 'infoEntering':
        body.title = this.props.nTextHeading;
        body.content = (
          <div>
            {this.renderCompany(styles)}
            {this.renderCheckbox(styles)}
            {this.renderCompanyEmail(styles)}
            {this.renderPassword(styles)}
            {this.renderServerTerm(styles)}
            {this.renderFooter(styles)}
          </div>
        )
        break;
      case 'activeEmail':
        body.title = this.props.nTextHeading;
        body.content = (
          <div style={styles.textCenter}>
            <ActionViewSuccess style={styles.linkIcon} />
            <p style={styles.linkRemind}>{this.props.nTextActiveRemind}{this.state.email}</p>
            <p><a style={styles.linkSend} onClick={this._resendActivationEmail}>{this.props.nTextResendRemind}</a></p>
          </div>
        )
        break;
    }

    return body;
  }
  render(){
    const { prepareStyles } = this.context.muiTheme;
    const styles = getStyles(this.props, this.state, this.context);
    let body = this.randerBody(styles);
    return(
      <div style={{minHeight: '660px'}}>
      <Helmet
          title= 'register'
          meta={[
              {"name": "description", "content": 'register'}
          ]}
        />
        <CommonForm title={body.title} content={body.content} />
        <ServerDialog serverDialogShow={this.state.serverDialogShow} onCloseDialog={this._handleCloseDialog} />
      </div>
    )
  }
  _onFinishCompany = () =>{
    let company = this.refs.company.getValue().trim();
    if(company.length === 0){
      this.setState({
        errorTextCompany: this.props.nErrorCompanyRequired
      })
    }else {
      this.setState({
        errorTextCompany: null
      })
    }
  }
  _userExists = (email) =>{
    let { userExists } = this.props;
    userExists({
      username: email,
    })
  }
  // 光标离开邮箱输入框 验证
  _onFinishCompanyEmail = () =>{
    let companyEmail = this.refs.email.getValue().trim();
    if(companyEmail.length === 0){
      this.setState({
        errorTextCompanyEmail: this.props.nErrorCompanyEmailRequired
      })
    }else {
      let validationFlag = SAFE_EMAIL_REGEXP.test(companyEmail);
      if(validationFlag){
        this._userExists(companyEmail);
      }else {
        this.setState({
          errorTextCompanyEmail: this.props.nErrorCompanyEmailIsInvalid
        })
      }
    }
  }
  _validateCommonPassword = (password) =>{
    if(password.length < this.props.passwordMinLen || password.length > this.props.passwordMaxLen){
      this.setState({
        errorTextPassword: _.template(this.props.nErrorPasswordIsInvalid)(this.props)
      })
    }else {
      this.setState({
        errorTextPassword: null
      })
    }
  }
  // 密码输入框val改变触发
  _validatePassword = () =>{
    let password = this.refs.password.getValue().trim();
    this._validateCommonPassword(password);
  }
  // 光标离开密码输入框 验证
  _onFinishPassword = () =>{
    let password = this.refs.password.getValue().trim();
    if(password.length === 0){
      this.setState({
        errorTextPassword: this.props.nErrorPasswordRequired
      })
    }else {
      this._validateCommonPassword(password);
    }
  }
  _radioClick = (evt, val) =>{
    let regRoleMsg = "";
    if(val === this.props.nLabelRolePrincipalValue){
      regRoleMsg = this.props.nLabelRolePrincipalRemind;
    }else if(val === this.props.nLabelRoleAgentValue){
      regRoleMsg = this.props.nLabelRoleAgentRemind;
    }
    this.setState({
      roleMessageRemind: regRoleMsg,
      roleTips: null
    })
  }
  // 弹出服务条款
  _handleServer = () =>{
    this.setState({
      serverDialogShow: true
    })
  }
  _handleCloseDialog = () =>{
    this.setState({
      serverDialogShow: false
    })
  }
  _handleServerCheck = () =>{
    this.setState({
      serverCheck: !this.state.serverCheck
    })
  }
  _createBtnSuccess = () =>{
    let background = {};
    if(!this.state.serverCheck){
      background.background = "#004588"
    }else {
      background.background = "#000"
    }
    return background;
  }
  _createBtnClick = () =>{
    let roleTips = this.props.nErrorTextRole;
    let radioGroupValue = this.refs.radioGroup.getSelectedValue();
    let company = this.refs.company.getValue().trim();
    let email = this.refs.email.getValue().trim();
    let password = this.refs.password.getValue().trim();
    let validationFlag = SAFE_EMAIL_REGEXP.test(email);
    this._userExists(email);

    if(company == "" || this.state.errorTextCompany !== null){
      this.refs.company.focus()
    }else if(radioGroupValue === "") {
      this.setState({
        roleTips: roleTips
      })
    }else if(email == "" || this.state.errorTextCompanyEmail !== null || !validationFlag) {
      this.refs.email.focus();
    }else if(password == "" || this.state.errorTextPassword !== null) {
      this.refs.password.focus()
    }else {
      let {register} = this.props;
      if(_.isFunction(register)) {
        register({
          company: company,
          type: radioGroupValue,
          email: email,
          password: password,
        });
      }
    }
  }
  _resendActivationEmail = () =>{
    let {resendEmail} = this.props;
    if(_.isFunction(resendEmail) && this.state.resendEmailIsClick){
      resendEmail({
        emergencyEmail: this.state.email,
      })
    }
  }

  _register() {
    this.props.history.push("/register");
  }

  _retrieve() {
    this.props.history.push("/forget");
  }

  _trim(str) {
    if (str) { str = str.replace(/[\r\n\t]/g, ''); }
    if (str) { str = str.replace(/ /g, ''); }

    return str;
  }
}
