import React from 'react';
import Paper from 'epui-md/lib/Paper';
import keycode from 'keycode';
import EventListener from 'epui-md/lib/internal/EventListener';
import ClearFix from 'epui-md/lib/internal/ClearFix';
import Transitions from 'epui-md/lib/styles/transitions';
import _ from 'eplodash';
import Colors from 'epui-md/lib/styles/colors';
import { connect } from 'react-redux';
import RaisedButton from 'epui-md/lib/RaisedButton';
import { bindActionCreators } from 'redux';
import * as userActions from '../../redux/reducers/user';
import TextField from 'epui-md/lib/TextField/TextField';
const  USER_NAME_PATTERN = new RegExp('^[A-Za-z0-9@_\\-\\.]*$');
const PropTypes = React.PropTypes;

const getStyles = (props, state, context) => {
  let theme = context.muiTheme;

  let styles = {
    root: {
      position: 'absolute',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
      overflow: 'scroll',
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
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
  };

  static defaultProps = {
    maxUsername: 64,
    minUsername: 6,
    nTextNeedToRetrieveAccount: 'Your username',
    nTextRetrievePassword: 'Retrieve Password',
    nTextErrorUsernameRequired:'Login name is required',
    nTextErrorUsernameLength:'Username length must be between 6 and 64',
    nTextErrorUsernameIsInvalid:'Only numbers, letters, dash, underscore, @ and . are acceptable',
    nTextAccount: 'Username',
    nTextRetrievePasswordWithEmail: 'Retrieve via email',
    nTextLoginEmailToAuthenticate: 'Please check your email box.',
    nTextReturnAndLogin: 'Back to Sign In',
    nErrorTextLoginFail: 'Please check the username',
    nTextRetrievePasswordFaild: 'Please check the username',
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
      <div style={styles.retrieve.root}>
        <div style={styles.retrieve.header}>
          {this.props.nTextNeedToRetrieveAccount}
        </div>
        <div style={styles.retrieve.body}>
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
        </div>
        <div style={styles.retrieve.footer}>
          <RaisedButton
            ref='retrieve'
            disabled={!!doing}
            label={this.props.nTextRetrievePassword}
            primary={true}
            capitalized='capitalize'
            onTouchTap={this._handleTouchTap}
          />
        </div>
      </div>
    );

    let retrieveSuccessEl = (
      <div style={styles.retrieveSuccess.root}>
        <div style={styles.retrieveSuccess.header}>
          {this.props.nTextRetrievePasswordWithEmail}
        </div>
        <div style={styles.retrieveSuccess.h1}>
          {info}
        </div>
        <div style={styles.retrieveSuccess.h2}>
          {this.props.nTextLoginEmailToAuthenticate}
        </div>
        <div style={styles.retrieveSuccess.footer}>
          <RaisedButton
            ref='redirect'
            label={this.props.nTextReturnAndLogin}
            primary={true}
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

    return(
      <EventListener
        target={window}
        onKeyUp={this._handleWindowKeyUp}
      >
        <ClearFix>
          <div style = {styles.container}>
            {this.renderContent(styles)}
          </div>
        </ClearFix>
      </EventListener>
    );
  }

  _handleTouchTapRedirect = () => {
    global.showLogin();
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
    } else if(!USER_NAME_PATTERN.test(username)) {
      errorText = this.props.nTextErrorUsernameIsInvalid;
    }

    this.setState({
      errorText: errorText,
    });

    return errorText === null;
  }
};
