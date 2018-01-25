import React from 'react';
import TextField from 'epui-md/lib/TextField/TextField';
import DropDownCountries from '../DropDown/DropDownCountries';
import DropDownRoles from '../DropDown/DropDownRoles';
import ClearFix from 'epui-md/lib/internal/ClearFix';

const PropTypes = React.PropTypes;
const regexEmail = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

const getStyles = (props, state, context) => {
  let theme = context.muiTheme;
  let styles = {
    root: {},
    p: {
      color: '#4a4a4a',
      fontSize: '16px',
      padding: '2px',
      margin: 0,
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
    textField: {
      float: 'left',
      marginBottom: '10px',
    },
    content: {

    },
  };

  return styles;
}

export default class CompanyInfo extends React.Component{

  static contextTypes = {
  	muiTheme: PropTypes.object,
  }

  static propTypes = {
    nTextServiceContentPrimary: PropTypes.string,
    nTextServiceContentSecondary: PropTypes.string,
  }

  static defaultProps = {
    nTextServiceContentPrimary: 'Enter the Information of company',
    nTextServiceContentSecondary: 'Please make sure your company information is true and correct.',
    nTextErrorEmailAddress: 'Please fill in the correct E-mail address',
    nTextIsRequired: 'It is required',
    nLabelEmail:'Company Email Address',
    nHintEmail:'Enter Company Email Address',
    nLabelCompany:'Company Name',
    nHintCompany:'Enter Company Name',
    nLabelAddress:'Company Address',
    nHintAddress:'Enter Company Address',
    nLabelTel:'Company Tel.',
    nHintTel:'Enter Company Tel.',
  }

  constructor(props) {
    super(props);
    let {
      email,
      company,
      address,
      tel,
    } = this.props;

    this.state = {
      errorTextEmail:null,
      errorTextCompany:null,
      errorTextAddress:null,
      errorTextTel:null,
      errorTextRole:null,
      errorTextCountry:null,
      email:email || '',
      company:company || '',
      address:address || '',
      tel:tel || '',
    };
  }

  getValue() {
    if(this._isValid()) {
      let email = this.refs.email.getValue();
      let company = this.refs.company.getValue();
      let address = this.refs.address.getValue();
      let tel = this.refs.tel.getValue();
      let country = this.refs.country.getWrappedInstance().getValue();
      let role =  this.refs.role.getValue();
      return {
        country:country,
        email: email,
        company: company,
        address: address,
        tel: tel,
        role:role,
      };
    }

    return null;
  }

  render() {
    const styles = getStyles(this.props, this.state, this.context);

    let {
      nTextServiceContentPrimary,
      nTextServiceContentSecondary,

    } = this.props;
    let {
      errorTextEmail,
      errorTextCompany,
      errorTextAddress,
      errorTextTel,
      errorTextRole,
      errorTextCountry,
      email,
      company,
      address,
      tel,
    } = this.state;

    return (
      <div
        style={styles.root}
      >
        <div
          style={Object.assign({},styles.p1,{fontWeight: 500})}
        >
          {nTextServiceContentPrimary}
        </div>
        <div
          style={Object.assign({},styles.p1,styles.p2)}
        >
          {nTextServiceContentSecondary}
        </div>
        <div
          style={styles.content}
        >
          <ClearFix>
            <TextField
              ref='email'
              key='email'
              errorText={errorTextEmail}
              floatingLabelText={this.props.nLabelEmail}
              fullWidth={true}
              hintText={this.props.nHintEmail}
              isWarning={true}
              showIcon={true}
              style={styles.textField}
              onChange={this._handleChange.bind(this, 'email')}
              onBlur={this._validate.bind(this, 'email')}
              value={email}
            />
            <TextField
              ref='company'
              key='company'
              errorText={errorTextCompany}
              floatingLabelText={this.props.nLabelCompany}
              fullWidth={true}
              hintText={this.props.nHintCompany}
              isWarning={true}
              showIcon={true}
              style={styles.textField}
              onChange={this._handleChange.bind(this, 'company')}
              onBlur={this._validate.bind(this, 'company')}
              value={company}
            />
            <DropDownCountries
              ref='country'
              key='country'
              onChange={this._handleChange.bind(this, 'country')}
              errorText={errorTextCountry}
            />
            <DropDownRoles
              ref='role'
              key='role'
              errorText={errorTextRole}
              onChange={this._handleChange.bind(this, 'role')}
            />
            <TextField
              ref='address'
              key='address'
              errorText={errorTextAddress}
              floatingLabelText={this.props.nLabelAddress}
              fullWidth={true}
              hintText={this.props.nHintAddress}
              isWarning={true}
              showIcon={true}
              style={styles.textField}
              onChange={this._handleChange.bind(this, 'address')}
              onBlur={this._validate.bind(this, 'address')}
              value={address}
            />
            <TextField
              ref='tel'
              key='tel'
              errorText={errorTextTel}
              floatingLabelText={this.props.nLabelTel}
              fullWidth={false}
              hintText={this.props.nHintTel}
              isWarning={true}
              showIcon={true}
              style={styles.textField}
              onChange={this._handleChange.bind(this, 'tel')}
              onBlur={this._validate.bind(this, 'tel')}
              value={tel}
            />
          </ClearFix>
        </div>
      </div>
    );
  }

  _handleChange = (token ,event, value) =>{
    this.setState({
      [token]: value,
    }, () => {
      this._validate(token);
    });
  }

  _validate = (token) =>{
    let key = 'errorText' + _.capitalize(token);
    if(!this.state[token] || this.state[token].length <=0){
      this.setState({
        [key]: this.props.nTextIsRequired,
      })
      return false;
    }else if(token === 'email' && !regexEmail.test(this.state[token])) {
      this.setState({
        [key]: this.props.nTextErrorEmailAddress,
      })
      return false;
    }
    this.setState({
      [key]: null,
    })
    return true;
  }

  _isValid = ()=> {
    return this._validate('email') && this._validate('company') && this._validate('address') && this._validate('tel') && this._validate('country') && this._validate('role');
  }

};
