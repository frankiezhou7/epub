import _ from 'eplodash';
import React from 'react';
import LoginInfo from './LoginInfo';
import CompanyInfo from './CompanyInfo';
import ServiceContent from './ServiceContent';
import UploadAvatar from './UploadAvatar';
import RaisedButton from 'epui-md/lib/RaisedButton';
import ClearFix from 'epui-md/lib/internal/ClearFix';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../redux/reducers/user';

const PropTypes = React.PropTypes;

let STEPS = {
  serviceContent: 0,
  loginInfo: 1,
  companyInfo: 2,
  uploadAvatar: 3,
  waitEmail: 4,
}

let STEPS_TO = {
  0:'serviceContent',
  1:'loginInfo',
  2:'companyInfo',
  3:'uploadAvatar',
  4:'waitEmail',
}

let prevText = {
  serviceContent: 'Disagree',
  loginInfo: 'Back',
  companyInfo: 'Back',
  uploadAvatar: 'Back',
}

let nextText = {
  serviceContent: 'Agree',
  loginInfo: 'Next',
  companyInfo: 'Next',
  uploadAvatar: 'Next',
  waitEmail: 'Ok',
}

const getStyles = () =>  {
  let styles = {
    root: {
      fontSize: 14,
      fontFamily:'Roboto',
      padding: '0px 40px 39px 40px',
    },
    footer:{
      position: 'absolute',
      bottom: '20px',
      boxSizing: 'border-box',
      width: '540px',
      height: '36px',
    },
    next:{
      float: 'right',
    },
    jump:{
      float: 'right',
      marginRight:'20px',
    },
    prev:{
      float: 'left',
    },
    label:{
      fontSize: 18,
      fontFamily: 'Roboto',
      fontWeight: 500,
    },
    waitEmail:{
      root: {
        height: '430px'
      },
      p: {
        color: '#4a4a4a',
        fontSize: '14px',
        fontFamily:'Roboto',
        padding: '4px',
        margin: 0,
      },
    }
  };

  return styles;
};

@connect(
  state => ({
    exists:state.user.exists,
    registerError:state.user.registerError,
  }),
  userActions
)
export default class RegisterDialog extends React.Component{

  static propTypes = {
    close: PropTypes.func,
    percent: PropTypes.number,
    register: PropTypes.func,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
  };

  static defaultProps = {
    nTextJump: 'Skip',
  };

  constructor(props) {
    super(props);
    this.state = {
      step: 'serviceContent',
      username: '',
      password: '',
      email:'',
      company:'',
      address:'',
      tel:'',
    };
  }

  renderButtons() {
    let {step} = this.state;
    const styles = getStyles(this.props, this.state, this.context);

    if(STEPS[step] === 4) {
      return (
        <RaisedButton
          capitalized = {'capitalized'}
          labelStyle = {styles.label}
          key='next'
          label={nextText[step]}
          backgroundColor='#F5A623'
          labelColor='#FFFFFF'
          style={styles.next}
          onTouchTap={this._handleTouchTap.bind(this,'next')} />
      )
    }else if(STEPS[step] === 3) {
      return [(
        <RaisedButton
          capitalized = {'capitalized'}
          labelStyle = {styles.label}
          key='prev'
          label={prevText[step]}
          backgroundColor='#00599A'
          labelColor='#FFFFFF'
          style={styles.prev}
          onTouchTap={this._handleTouchTap.bind(this,'prev')} />
      ),(
        <RaisedButton
          capitalized = {'capitalized'}
          labelStyle = {styles.label}
          key='next'
          label={nextText[step]}
          backgroundColor='#F5A623'
          labelColor='#FFFFFF'
          style={styles.next}
          onTouchTap={this._handleTouchTap.bind(this,'next')} />
      ),(
        <RaisedButton
          capitalized = {'capitalized'}
          labelStyle = {styles.label}
          key='jump'
          label={this.props.nTextJump}
          backgroundColor='#F5A623'
          labelColor='#FFFFFF'
          style={styles.jump}
          onTouchTap={this._handleTouchTap.bind(this,'jump')} />
      )]
    }else {
      return [(
        <RaisedButton
          capitalized = {'capitalized'}
          labelStyle = {styles.label}
          key='prev'
          label={prevText[step]}
          style={styles.prev}
          backgroundColor='#00599A'
          labelColor='#FFFFFF'
          onTouchTap={this._handleTouchTap.bind(this,'prev')} />
      ),(
        <RaisedButton
          capitalized = {'capitalized'}
          labelStyle = {styles.label}
          key='next'
          label={nextText[step]}
          backgroundColor='#F5A623'
          labelColor='#FFFFFF'
          style={styles.next}
          onTouchTap={this._handleTouchTap.bind(this,'next')} />
      )]
    }
  }

  render=() => {
    const styles = getStyles(this.props, this.state, this.context);
    let {
      step,
      username,
      password,
      email,
      company,
      address,
      tel,
    } = this.state;
    let error = this.props.registerError;

    let errCode = error && error.errorCode;
    let msg = errCode ? 'Register Failed,please try again later' : `Register success,please wait your account to be verified`;
    let body;
    switch (step) {
      case 'serviceContent':
        body = (<ServiceContent />)
        break;
      case 'loginInfo':
        body = (
          <LoginInfo
            ref='loginInfo'
            username={username}
            password={password}
            userExists={this.props.userExists}
            exists={this.props.exists}
          />
        )
        break;
      case 'companyInfo':
        body = (
          <CompanyInfo
            ref='companyInfo'
            email={email}
            company={company}
            address={address}
            tel={tel}
          />
        )
        break;
      case 'uploadAvatar':
        body = (
          <UploadAvatar
            ref='UploadAvatar'
            file={this.state.avatar}
            percent={this.props.percent}
            uploadAvatar={this._onUploadAvatar}
          />
        )
        break;
      case 'waitEmail':
        body = (
          <div
            style={styles.waitEmail.root}
          >
            <p
              style={styles.waitEmail.p}
            >
              {msg}
            </p>
          </div>
        )
        break;
      default:
        body = (<ServiceContent/>)
        break;
    }
    return(
      <div
        ref='root'
        style={styles.root}
      >
        {body}
        <div style={styles.footer}>
          <ClearFix>
            {this.renderButtons()}
          </ClearFix>
        </div>
      </div>
    );
  }

  _handleTouchTap = (token) => {
    let {step} = this.state;
    switch (step) {
      case 'serviceContent':
        if(token === 'prev') {
          this.props.close();
        }else if(token === 'next') {
          this.setState({
            step: 'loginInfo'
          })
        }
        break;
      case 'loginInfo':
        if(token === 'prev') {
          this.setState({
            step: 'serviceContent'
          })
        }else if(token === 'next') {
          let loginInfoForm = this.refs.loginInfo;
          let loginInfo = loginInfoForm.getValue();

          if (loginInfo) {
            let username = loginInfo.username;
            username = this._trim(username);
            let password = loginInfo.password;
            password = this._trim(password);

            let user = {
              username: username,
              password: password,
            };

            let state = _.merge(user, { step: 'companyInfo' });

            this.setState(state);
          }
        }
        break;
      case 'companyInfo':
        if(token === 'prev') {
          this.setState({
            step: 'loginInfo'
          })
        }else if(token === 'next') {
          let companyInfoForm = this.refs.companyInfo;
          let companyInfo = companyInfoForm.getValue();
          if (companyInfo) {
            let email = companyInfo.email;
            email = this._trim(email);
            let company = companyInfo.company;
            company = this._trim(company);
            let address = companyInfo.address;
            address = this._trim(address);
            let tel = companyInfo.tel;
            tel = this._trim(tel);
            let country = companyInfo.country;
            let role = companyInfo.role;
            let form = {
              country:country,
              email:email,
              company:company,
              address:address,
              tel:tel,
              role:role,
            };

            let state = _.merge(form, { step: 'uploadAvatar' });

            this.setState(state);
          }
        }
        break;
      case 'uploadAvatar':
        if(token === 'prev') {
          this.setState({
            step: 'companyInfo'
          })
        }else if(token === 'next' || token === 'jump') {
          let { register } = this.props;
          if(register) {
            let obj = {
              user:{
                username: this.state.username,
                password: this.state.password,
                name:{
                  surname: this.state.username,
                }
              },
              organization:{
                name: this.state.company,
                contactMethods:[{
                  type: 'email',
                  value: this.state.email,
                },{
                  type: 'phone',
                  value: this.state.tel,
                }],
                address: {
                  line1:this.state.address,
                },
                country: this.state.country,
                type: 'byRegister',
                verifyStatus: 0,
                role: this.state.role,
              },
              avatar:this.state.avatar,
              role:this.state.role,
            }
            register(obj);
          }
          this.setState({
            step: 'waitEmail'
          })
        }
        break;
      case 'waitEmail':
        if(token === 'next') {
          this.props.close();
        }
        break;
      default:
        break;
    }
  }

  _onUploadAvatar = (file) => {
    this.setState({
      avatar: file,
    });
  }

  _trim = (str) => {
    if (str) { str = str.replace(/[\r\n\t]/g, ''); }
    if (str) { str = str.replace(/ /g, ''); }

    return str;
  }

}
