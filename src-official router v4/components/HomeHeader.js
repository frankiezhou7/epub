import React, { Component } from 'react';
import SearchBar from 'epui-md/lib/ep/SearchBar';
import SearchTypes  from 'epui-md/lib/ep/search/SearchTypes';
import ClearFix from 'epui-md/lib/internal/ClearFix';
import { SEARCH_TYPES ,TYPES_CODE } from '../utils/constants';
import { browserHistory } from 'react-router';
import _ from 'eplodash';
import DialogView from './DialogView/Common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../redux/reducers/user';

const HomeImg = require('../../static/home_banner.jpg');
const HomeLogo = require('../../static/home_logo.svg');
const PropTypes = React.PropTypes;

const getStyles = (props,state,context)=>{
  let isScroll = props.isScroll;
  const styles = {
    root:{
      backgroundImage: 'url('+HomeImg+')',
      backgroundRepeat:'no-repeat',
      width: '100%',
      height: 825,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      boxShadow: '0px 5px 11px 0px rgba(0,0,0,0.36)',
    },
    header:{
      position: 'fixed',
      zIndex: 1999,
      top: 0,
      width:'100%',
      height: isScroll ? '30px' : '70px',
      background: isScroll ? '#FFF' : 'transparent',
      boxShadow: isScroll ? '0 2px 4px 0 rgba(0,0,0,0.50)' :null,
    },
    fixContainer:{
      maxWidth: '1000px',
      margin: 'auto',
      paddinLeft: '24px',
      paddingRight: '24px',
      lineHeight: isScroll ? '30px' :null,
      marginTop: isScroll ? '0px' : '27px',
    },
    button:{
      cursor: 'pointer',
      color: isScroll ? '#004588' : '#FFF',
      fontSize:'16px',
      float: 'right',
      textAlign: 'center',
      marginLeft:'30px',
      width:'60px',
      height: '25px',
    },
    loginButton:{
      cursor: 'pointer',
      color: isScroll ? '#004588' : '#FFF',
      fontSize:'16px',
      float: 'right',
      textAlign: 'center',
      marginLeft:'30px',
      width:'58px',
      height: '23px',
      border: isScroll ? 'none' : '1px solid #fff',
    },
    userButton:{
      cursor: 'pointer',
      color: '#F5A623',
      fontSize:'16px',
      float: 'right',
      textAlign: 'center',
      paddingLeft:'30px',
      height: '25px',
      textOverflow:'ellipsis',
      whiteSpace:'nowrap',
      maxWidth:'80px',
      overflow: 'hidden',
    },
    paper:{
      width: '100%'
    },
    container:{
      width: 800,
      color: 'white',
      margin: 'auto',
      marginTop: -40
    },
    core:{
      fontSize: 32,
      fontWeight: 500,
      textShadow : '0px 7px 6px rgba(0, 0, 0, 0.5)',
      marginTop: 40,
    },
    search:{
      marginTop: 90,
      marginLeft: '50%',
      textAlign: 'left',
      width: 546,
      background:'rgba(0,0,0,0.45)',
      left: -273,
      position: 'relative',
      paddingBottom: 15,
    },
    searchTypes:{
      marginTop: 15,
      marginLeft: 15,
    },
    searchBar:{
        width: 516,
        height: 48,
    },
    logo:{
      width: 515,
    },
    infoContainer:{
      paddingLeft :15,
      paddingRight: 15,
    },
  }
  return styles;
}

const createItems = (types)=>{
  return _.map(_.keys(types),(key)=>{
    return { name: types[key], value: key};
  });
};

@connect(
  state => ({
    user: state.user.user,
    isFetching: state.user.isFetching,
  }),
  dispatch =>({
    ...bindActionCreators({
      logout:  userActions.logout
    },dispatch)
  }),
  null,
  {withRef: true}
)
export default class HomeHeader extends Component {

  static propTypes = {
    totalServices: PropTypes.number,
    totalPorts: PropTypes.number,
    nLabelCoreInfo: PropTypes.string,
    nLabelSubInfo: PropTypes.string,
    nLabelHotKeyWords : PropTypes.string,
    nLabelPortPlaceHolder : PropTypes.string,
    nLabelCompanyPlaceHolder : PropTypes.string,
    nLabelNewsPlaceHolder : PropTypes.string,
    nLabelShipPlaceHolder : PropTypes.string,
    isScroll: PropTypes.bool,
    user: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
    router: PropTypes.object,
  };

  static childContextTypes = {
    muiTheme: PropTypes.object,
  };

  static defaultProps ={
    totalServices: 1030,
    totalPorts: 68,
    nLabelCoreInfo : 'A Valuable Information Platform for Chinese Ports',
    nLabelSubInfo : ` (1) shipping service providers, data of (2) ports`,
    nLabelHotKeyWords : 'Hot keywords : ',
    nLabelPortPlaceHolder : 'Type name of port',
    nLabelCompanyPlaceHolder : 'Type name of company',
    nLabelNewsPlaceHolder : 'Type keywords of news',
    nLabelShipPlaceHolder : 'Type name of ship',
  };

  state ={
    searchType: '',
    open: false,
    type: 'login',
  };

  componentWillMount = () =>{
    _.set(global, ['showLogin'], this.showLogin);
    _.set(global, ['showRegister'], this.showRegister);
    _.set(global, ['showRetrieve'], this.showRetrieve);
  }

  handleItemTouchTap = (value) => {
    this.setState({searchType: value || ''});
  }

  componentDidMount(){
    this.setState({searchType: this.refs.searchTypes.getValue()});
  }

  handleOnSearch = (keywords)=>{
    let path = `/search?type=${this.state.searchType}&keywords=${keywords}&size=20`;
    if(this.state.searchType && this.state.searchType.toUpperCase() === SEARCH_TYPES.COMPANY.toUpperCase()){
      path+=`&rls=All`;
    }
    browserHistory.push(path);
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  handleTouch = () => {

  }

  render() {
    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.state, this.context);
    const {user} = this.props;
    const leftButton = user && user._id ? (
      <span style={prepareStyles(styles.userButton)}>{user.username}</span>
    ) : (
      <span
        onClick={this.handleClick.bind(this, 'signUp')}
        style={prepareStyles(styles.button)}
      >
        Sign up
      </span>
    );
    const rightButton = user && user._id ? (
      <span
        style={prepareStyles(styles.button)}
        onClick={this.handleClick.bind(this, 'logout')}
        >Logout</span>
    ) : (
      <span
        onClick={this.handleClick.bind(this, 'login')}
        style={prepareStyles(styles.loginButton)}
      >
        Login
      </span>
    );

    return (
      <div style = {prepareStyles(styles.root)}>
        <div style={prepareStyles(styles.header)}>
          <ClearFix>
            <div style={prepareStyles(styles.fixContainer)}>
              {rightButton}
              {leftButton}
            </div>
          </ClearFix>
        </div>
        <div style = {prepareStyles(styles.paper)}>
          <div style = {prepareStyles(styles.container)}>
            <img src ={HomeLogo} style = {prepareStyles(styles.logo)}/>
            <div style = {prepareStyles(styles.infoContainer)}>
              <div style = {prepareStyles(styles.core)}>{this.props.nLabelCoreInfo}</div>
              <div style = {prepareStyles(styles.search)}>
                <SearchTypes
                  ref = 'searchTypes'
                  onItemTouchTap ={this.handleItemTouchTap}
                  items = {createItems(SEARCH_TYPES)}
                  style = {prepareStyles(styles.searchTypes)}
                  activeColor = {'#f5a623'}
                  disactiveColor = {'#ffffff'}
                />
                <SearchBar
                  inputPlaceHolder = {this.props['nLabel'+_.capitalize(this.state.searchType)+'PlaceHolder']}
                  onSearch = {this.handleOnSearch}
                  style = {prepareStyles(styles.searchBar)}
                  iconFillColor = {'#f5a623'}
                />
              </div>
            </div>
          </div>
        </div>
        <DialogView
          open = {this.state.open}
          type = {this.state.type}
          onTouchTap = {this.handleTouch}
          close = {this.handleClose}
        />
      </div>
    );
  }

  showLogin = () => {
    this.setState({
      open: true,
      type: 'login',
    })
  }

  showRegister = () =>{
    this.setState({
      open: true,
      type: 'signUp',
    })
  }

  showRetrieve = () =>{
    this.setState({
      open: true,
      type: 'retrievePassword',
    })
  }

  handleClick = (type) => {
    switch (type) {
      case 'login':
        this.setState({
          open: true,
          type: 'login',
        })
        break;
      case 'signUp':
        this.setState({
          open: true,
          type: 'signUp',
        })
        break;
      case 'logout':
        this.props.logout();
        break;
      default:
        break;
    }
  }
}
