import React from 'react';
import Paper from 'epui-md/lib/Paper';
import keycode from 'keycode';
import EventListener from 'epui-md/lib/internal/EventListener';
import ClearFix from 'epui-md/lib/internal/ClearFix';
import Transitions from 'epui-md/lib/styles/transitions';
import CommonForm from '../../components/CommonForm';
import _ from 'eplodash';
import Colors from 'epui-md/lib/styles/colors';
import { connect } from 'react-redux';
import RaisedButton from 'epui-md/lib/RaisedButton';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as userActions from '../../redux/reducers/user';
import TextField from 'epui-md/lib/TextField/TextField';
const PropTypes = React.PropTypes;

const SAFE_EMAIL_REGEXP = new RegExp('^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$', 'i');

const getStyles = (props, state, context) => {
  let theme = context.muiTheme;

  let styles = {
    root: {
      minHeight: 700
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
    },
    container: {
      width: '538px',
      margin: '0px auto',
      minHeight: '450px',
    },
    retrieve: {
      root: {
        fontSize: '18px',
      },
      account: {
        display: 'block',
        width: '380px',
      },
      header: {
        marginTop: '20px',
      },
      body: {
        marginTop: '20px',
      },
      footer: {
        position: 'relative',
        marginTop: '50px',
      },
    },
    retrieveSuccess: {
      root: {
        fontSize: '18px',
      },
      header: {
        marginTop: '20px',
      },
      h1: {
        color: '#757575',
        fontSize: '16px',
        marginTop: '30px',
      },
      h2: {
        color: '#757575',
        fontSize: '14px',
        marginTop: '10px',
      },
      footer: {
        marginTop: '30px',
      },
    },
  };

  return styles;
};

@connect(
  state => ({
    info: state.user.info,
    error: state.user.error,
  }),
  dispatch =>({
    ...bindActionCreators({
      retrievePassword: userActions.retrievePassword,
    },dispatch)
  })
)
export default class RetrieveDialog extends React.Component{

  static propTypes = {
    close: PropTypes.func,
    user: PropTypes.object,
    maxUsername: PropTypes.number,
    minUsername: PropTypes.number,
    nTextNeedToRetrieveAccount: PropTypes.string,
    nTextRetrievePassword: PropTypes.string,
    nTextErrorUsernameRequired: PropTypes.string,
    nTextErrorUsernameLength: PropTypes.string,
    nTextErrorUsernameIsInvalid: PropTypes.string,
    nTextInformation: PropTypes.string,
    nTextAccount: PropTypes.string,
    nTextRetrievePasswordWithEmail: PropTypes.string,
    nTextLoginEmailToAuthenticate: PropTypes.string,
    nTextReturnAndLogin: PropTypes.string,
    nErrorTextLoginFail: PropTypes.string,
    nTextRetrievePasswordFaild: PropTypes.string,
    nTextRetrieveLoginPassword: PropTypes.string,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
  };

  static defaultProps = {
    maxUsername: 64,
    minUsername: 6,
    nTextNeedToRetrieveAccount: 'Your Register Email',
    nTextRetrievePassword: 'Retrieve Password',
    nTextErrorUsernameRequired:'Email is required',
    nTextErrorUsernameLength:'Please enter your Email address correctly',
    nTextErrorUsernameIsInvalid:'Please enter your Email address correctly',
    nTextAccount: 'Email',
    nTextRetrievePasswordWithEmail: 'Retrieve via email',
    nTextLoginEmailToAuthenticate: 'Please check your email box.',
    nTextReturnAndLogin: 'Back to Sign In',
    nErrorTextLoginFail: 'Please check the email',
    nTextRetrievePasswordFaild: 'Please check the email',
    nTextRetrieveLoginPassword: 'Reset Password',
  };

  constructor(props) {
    super(props);
    this.state = {
      doing: false,
      error: null,
      errorText: null,
      email: null,
      ttl: null,
      token: false,
    };
  }

  componentDidMount = () => {

  }

  componentWillReceiveProps = (nextProps) =>{
    if(_.get(nextProps.error,'status') === 'NOK' && !_.has(nextProps.info,'email')){
      this.setState({
        errorText: this.props.nTextRetrievePasswordFaild,
        email: null,
        token: false,
        ttl: null,
        doing: false,
      });
    }else if(_.has(nextProps.info,'email')){
      this.setState({
        errorText: null,
        email: nextProps.info.email,
        token: true,
        ttl: nextProps.info.ttl,
        doing: false,
      });
    }
  }

  renderContent(styles) {
    let {
      doing,
      email,
      errorText,
      token,
      ttl,
    } = this.state;

    let {
      retrieve,
    } = this.props;

    let validPeriod = ttl ? ttl / 60 : null;
    let info = `An email with information of resetting password has been sent to ${email}, it will be valid in ${validPeriod} minutes.`;

    let retrieveEl = (
      <div style={_.assign(styles.textCenter, styles.marginTop)}>
        <div style={styles.setP}>
          {this.props.nTextNeedToRetrieveAccount}
        </div>
        <div style={_.assign(styles.setPwdText, styles.itemHeight)}>
          <ClearFix>
            <TextField
              ref='account'
              disabled={!!doing}
              errorText={errorText}
              floatingLabelText={this.props.nTextAccount}
              loading={doing}
              style={styles.retrieve.account}
              onBlur={this._handleBlur}
              onChange={this._handleChange}
            />
          </ClearFix>
        </div>
        <RaisedButton
          ref='retrieve'
          disabled={!!doing}
          label={this.props.nTextRetrievePassword}
          secondary={true}
          labelStyle={styles.setPwdLabel}
          capitalized='capitalize'
          onTouchTap={this._handleTouchTap}
        />
      </div>
    );

    let retrieveSuccessEl = (
      <div style={_.assign(styles.textCenter, styles.marginTop)}>
        <div style={styles.setP}>
          {info}
        </div>
        <div style={styles.setP}>
          {this.props.nTextLoginEmailToAuthenticate}
        </div>
        <div style={styles.marginTop}>
          <RaisedButton
            ref='redirect'
            label={this.props.nTextReturnAndLogin}
            secondary={true}
            capitalized='capitalize'
            onTouchTap={this._handleTouchTapRedirect}
          />
        </div>
      </div>
    );

    return token ? retrieveSuccessEl : retrieveEl;
  }


  render=() => {
    const styles = getStyles(this.props, this.state, this.context);

    return (
      <div
        ref="root"
        style={styles.root}
      >
        <EventListener
          target={window}
          onKeyUp={this._handleWindowKeyUp}
        >
          <CommonForm
            ref="baseForm"
            title={this.props.nTextRetrieveLoginPassword}
            content={this.renderContent(styles)}
          />
        </EventListener>
      </div>
    );
  }

  _handleTouchTapRedirect = () => {
    browserHistory.push("/login");
  }

  _handleWindowKeyUp = (e) => {
    // if (e.keyCode === KeyCode.ENTER && !this.state.token) {
    //   this._handleTouchTap();
    // }
  }

  _handleBlur = (e) => {
    let username = e.target.value;
    this._validateUserName(username);
  }

  _handleChange = (e) => {
    let username = e.target.value;
    this._validateUserName(username);
  }

  _handleTouchTap = () => {
    let el = this.refs.account;
    let username = el.getValue();

    if (!this._validateUserName(username)) {
      el.focus();
      return;
    }

    this.setState({
      doing: true,
    }, () => {
      this.props.retrievePassword({username:username});
    });
  }
    // , err => {
    //   this.setState({
    //     errorText: this.props.nErrorTextLoginFail,
    //     email: null,
    //     token: false,
    //     ttl: null,
    //     doing: false,
    //   });
    // });

  _trim = (str) => {
    if (str) { str = str.replace(/[\r\n\t]/g, ''); }
    if (str) { str = str.replace(/ /g, ''); }

    return str;
  }

  _validateUserName = (username) => {
    username = this._trim(username);
    let len = username ? username.length : 0;
    let errorText = null;

    if (!username) {
      errorText = this.props.nTextErrorUsernameRequired;
    } else if(len < this.props.minUsername || len > this.props.maxUsername) {
      errorText = _.template(this.props.nTextErrorUsernameLength)(this.props);
    } else if(!SAFE_EMAIL_REGEXP.test(username)) {
      errorText = this.props.nTextErrorUsernameIsInvalid;
    }

    this.setState({
      errorText: errorText,
    });

    return errorText === null;
  }
};
