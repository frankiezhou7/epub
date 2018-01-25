import React, { Component, PropTypes } from 'react';
import SearchBar from 'epui-md/lib/ep/SearchBarSimple';
import SearchTypesSimple  from 'epui-md/lib/ep/search/SearchTypesSimple';
import ClearFix from 'epui-md/lib/internal/ClearFix';
import { SEARCH_TYPES, TYPES, TYPES_CODE } from '../utils/constants';
import { browserHistory } from 'react-router';
import _ from 'eplodash';

const PAGE_SIZE = 20;
const split = '-';

const getStyles = (props, state, context)=>{
  return {
    search:{
      float: 'right',
      marginTop: 15,
      textAlign: 'left',
      width: '660px',
      height: '44px',
      position: 'relative',
      border: '1px solid #D8D8D8',
      borderRadius: '2px',
      background: '#fff',
    },
    searchTypes:{
      float: 'left',
      width: '104px',
      height: '44px',
      lineHeight: '44px',
      backgroundColor: '#F0F0F0',
      borderRadius: '2px',

    },
    searchBar:{
      width: '516px',
    },
  }
}

const createItems = (types)=>{
  return _.map(_.keys(types),(key)=>{
    return { name: types[key], value: key};
  })
}

export default class SearchAssembly extends Component {

  static propTypes = {
    nLabelHotKeyWords : PropTypes.string,
    nLabelPortPlaceHolder : PropTypes.string,
    nLabelCompanyPlaceHolder : PropTypes.string,
    nLabelNewsPlaceHolder : PropTypes.string,
    nLabelShipPlaceHolder : PropTypes.string,
    activeValue: PropTypes.object,
  }

  static contextTypes = {
    muiTheme: PropTypes.object,
    router: PropTypes.object,
  }

  static childContextTypes = {
    muiTheme: PropTypes.object,
  }

  static defaultProps ={
    nLabelHotKeyWords : 'Hot keywords : ',
    nLabelPortPlaceHolder : 'Search Ports',
    nLabelCompanyPlaceHolder : 'search workshop,agency,supplier,shipyard,spro,inspection,management,shipper ect',
    nLabelNewsPlaceHolder : 'Search News',
    nLabelShipPlaceHolder : 'Search Ships',
    nLabelRegulationsPlaceHolder: 'Search Regulations',
  }

  constructor(props) {
    super(props);
    this.state = {
      searchType: '',
    }
  }

  componentDidMount(){
    this.setState({searchType: this.refs.searchTypes.getValue()});
  }

  render() {
    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.state, this.context);
    let { activeValue } = this.props;

    return (
      <div style = {prepareStyles(styles.search)}>
        <SearchTypesSimple
          ref = 'searchTypes'
          value = {activeValue.type? activeValue.type : null}
          onItemTouchTap ={this.handleItemTouchTap}
          items = {createItems(SEARCH_TYPES)}
          style = {prepareStyles(styles.searchTypes)}
          activeColor = {'#f5a623'}
          disactiveColor = {'#ffffff'}
        />
        <SearchBar
          inputPlaceHolder = {this.props['nLabel'+_.capitalize(this.state.searchType)+'PlaceHolder']}
          onSearch = {this.handleOnSearch}
          value = {activeValue.keywords? activeValue.keywords : null}
          style = {prepareStyles(styles.searchBar)}
          iconFillColor = {'#fff'}
        />
      </div>
    )
  }

  handleItemTouchTap = (value) => {
    this.setState({searchType: value || ''});
  }

  handleOnSearch = (keywords)=>{
    let searchType = this.state.searchType;
    let searchPath = '';
    let path = `/search?type=${searchType.toUpperCase()}&keywords=${keywords}`;
    if(this.state.searchType && searchType.toUpperCase() === SEARCH_TYPES.COMPANY.toUpperCase()){
      let roles = global.roles;
      const allLength = _.keys(TYPES.COMPANY_TYPES).length;
      if(roles && roles.length>0){
        searchPath = path + ((roles.length === allLength) ? '&rls=All' : `&rls=${roles.join(split)}`);
      }else if(roles && roles.length === 0){
        searchPath = path;
      }else{
        searchPath = path + '&rls=All';
      }
    }
    browserHistory.push((searchPath.length > 0 ? searchPath : path) + `&size=${PAGE_SIZE}`);
  }
}
