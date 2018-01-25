import React, {Component, PropTypes} from 'react';
import _ from 'eplodash';
import CommonForm from '../../components/CommonForm';
import RaisedButton from 'epui-md/lib/RaisedButton';
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
      minHeight: 700
    },
    logo: {
      marginTop: 12,
    },
    leftNode:{
      position: 'absolute',
      top: 6,
    },
    textCenter: {
      textAlign: 'center'
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
      fontSize: '16px',
      marginBottom: '40px'
    }
  }
}

@connect(
  state => ({
    user: state.user,
  }),
  dispatch =>({
    ...bindActionCreators({
      verfiyEmailToken: userActions.verfiyEmailToken,
      resendEmail: userActions.resendEmail,
    }, dispatch)
  })
)

export default class activeEmailSuccess extends Component {

  static contextTypes = {
  	muiTheme: PropTypes.object,
  }

  static propTypes = {
    verfiyEmailToken: PropTypes.func,
    resendEmail: PropTypes.func,
    location: PropTypes.object,
    children: PropTypes.element,
    nTextActiveTokenSuccess: PropTypes.string,
    nTextActiveTokenNot: PropTypes.string,
    nTextActiveTokenNotNormall: PropTypes.string,
    nTextSendRemind: PropTypes.string,
    nTextHeading: PropTypes.string,
  }

  static defaultProps = {
    nTextActiveTokenNot: "The activation link has expired, please resend the link to your mailbox.",
    nTextActiveTokenNotNormall: "You have been activated, please wait patiently",
    nTextSendRemind: "Send Activation Email",
    nTextActiveTokenSuccess: "Your Account has been actived.",
    nTextHeading: "Sign Up",
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      valid: false,
      passed: false,
      resendActiveState: false
    };
  }

  componentWillMount = () =>{
    let query = this.props.location.query;
    if (!query) { return; }
    let username = query.username;
    let token = query.token;
    if (!username || !token || token.length < TOKEN_MIN_LENGTH) {
      this.setState({
        username: username,
        valid: false,
      });
      return;
    }
    let {verfiyEmailToken} = this.props;
    if(_.isFunction(verfiyEmailToken)){
      verfiyEmailToken({
        username: username,
        token: token,
      })
    }
  }

  componentWillReceiveProps = (nextProps) =>{
    if(this.isLoggedIn(nextProps)) {
      this.setState({
        valid: nextProps.user.user.valid,
        username: nextProps.user.user.username,
        passed: true,
      }, () => {
        if(nextProps.user.user.valid){
          setTimeout(function(){
            browserHistory.push("/login");
          }, 3000)
        }
      })
    }
    if(nextProps.user.user && nextProps.user.user.success){
      this.setState({
        resendActiveState: true,
      })
    }
  }

  isLoggedIn(props) {
    props = props || this.props;

    return props.user && props.user.user && props.user.user._id;
  }

  renderSuccess(style){
    return(
      <div style={style.textCenter}>
        <ActionViewSuccess style={style.linkIcon} />
        <p style={style.linkRemind}>{this.props.nTextActiveTokenSuccess}</p>
      </div>
    )
  }
  renderError(style){
    return this.state.passed === true ? (
      <div style={style.textCenter}>
        <p style={style.linkRemind}>{this.props.nTextActiveTokenNotNormall} </p>
      </div>
    ) : (
      <div style={style.textCenter}>
        <p style={style.linkRemind}>{this.props.nTextActiveTokenNot} </p>
        <RaisedButton
          label={this.props.nTextSendRemind}
          secondary={true}
          disabled={this.state.resendActiveState}
          capitalized="capitalized"
          onClick={this._resendActivationEmail}
        />
      </div>
    )
  }
  render(){
    const { valid } = this.state;
    const {prepareStyles} = this.context.muiTheme;
    const style = getStyles(this.props, this.context);
    return(
      <div style={style.root}>
          <CommonForm title={this.props.nTextHeading} content={valid? this.renderSuccess(style) : this.renderError(style)} />
      </div>
    )
  }

  _resendActivationEmail = () =>{
    let {resendEmail} = this.props;
    if(_.isFunction(resendEmail)){
      resendEmail({
        emergencyEmail: this.state.username,
      })
    }
  }
};
