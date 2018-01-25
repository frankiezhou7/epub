import React, { Component } from 'react';
import SearchBar from 'epui-md/lib/ep/SearchBar';
import SearchTypes  from 'epui-md/lib/ep/search/SearchTypes';
import { SEARCH_TYPES ,TYPES_CODE } from '../utils/constants';
import { browserHistory } from 'react-router';
import _ from 'eplodash';

const HomeImg = require('../../static/home_banner.jpg');
const HomeLogo = require('../../static/home_logo.svg');
const PropTypes = React.PropTypes;

const getStyles = (props,state,context)=>{
  const styles = {
    root:{
      backgroundImage: 'url('+HomeImg+')',
      backgroundRepeat:'no-repeat',
      backgroundPosition: 'center bottom',
      width: '100%',
      height: 840,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
    container:{
      width: 800,
      color: 'white',
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
      height: 102,
      background:'rgba(0,0,0,0.45)',
      left: -273,
      position: 'relative',
    },
    searchTypes:{
      marginTop: 15,
      marginLeft: 15,
    },
    searchBar:{
        width: 516,
        height: 48,
        marginLeft: 15,
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
  };

  handleItemTouchTap = (value) => {
    this.setState({searchType: value || ''});
  }

  componentDidMount(){
    this.setState({searchType: this.refs.searchTypes.getValue()});
  }

  handleOnSearch = (keywords)=>{
    let path = `/search?type=${this.state.searchType}&keywords=${keywords}&size=20`;
    if(this.state.searchType && this.state.searchType.toUpperCase() === SEARCH_TYPES.COMPANY.toUpperCase()){
      let codes = _.map(_.keys(TYPES_CODE),key=>TYPES_CODE[key]);
      path+=`&rls=${codes.join('-')}`;
    }
    browserHistory.push(path);
  }

  render() {
    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.state, this.context);
    return (
      <div style = {prepareStyles(styles.root)}>
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
    );
  }
}
