import React from 'react';
import { TYPES, TYPES_CODE } from '../../utils/constants';
import SearchBar from 'epui-md/lib/ep/SearchBar';
import ChooseContainer from 'epui-md/lib/ep/search/ChooseContainer';
import SearchTypes  from 'epui-md/lib/ep/search/SearchTypes';
import ResultContainer from 'epui-md/lib/ep/search/ResultContainer';
import Loading from 'epui-md/lib/ep/RefreshIndicator';
import {connect} from 'react-redux';
import * as searchActions from '../../redux/reducers/search';
import { browserHistory } from 'react-router';
import Helmet from "react-helmet";
import { displayWithLimit } from 'epui-md/lib/utils/methods';
import _ from 'eplodash';

const PropTypes = React.PropTypes;

const split = '-';
const PAGE_SIZE = 20;

const getStyles =(props,context,state)=>{
  const theme = context.muiTheme;
  const padding = 24;
  let styles = {
    root:{
      marginTop: 12,
    },
    left:{
      width: 1000,
      minHeight: 700,
      margin: 'auto',
      paddingTop: 8,
    },
    searchBar: {
      maxWidth: 600,
      width: '100%',
    },
    next:{
      textAlign: 'center',
      cursor: 'pointer',
      color: theme.epColor.primaryColor,
      fontSize: 16,
      fontWeight: 500,
      marginTop: 20,
    },
    loading:{
      color: theme.epColor.primaryColor,
    }
  }
  return styles;
};

const createItems = (types)=>{
  return _.map(_.keys(types),(key)=>{
    return { name: types[key], value: TYPES_CODE[key] ? TYPES_CODE[key] : key};
  });
};

@connect(
  state =>(
    {
      isFetching : state.search.isFetching,
      pagination : state.search.pagination,
      results : state.search.results
    }
  ),
  searchActions
)
export default class Search extends React.Component{

  static propTypes = {
    children: PropTypes.element,
    nLabelHotKeyWords : PropTypes.string,
    nLabelPortPlaceHolder : PropTypes.string,
    nLabelCompanyPlaceHolder : PropTypes.string,
    nLabelNewsPlaceHolder : PropTypes.string,
    nLabelShipPlaceHolder : PropTypes.string,
    nLabelMore : PropTypes.string,
    nLabelSearchHeaderTitle: PropTypes.string,
    nLabelSearchHeaderDescription: PropTypes.string,
    nLabelEPorts: PropTypes.string,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
    router: PropTypes.object,
  };

  static defaultProps ={
    nLabelSearchHeaderTitle: 'Search Page',
    nLabelSearchHeaderDescription: 'Search Page Description',
    nLabelEPorts: 'E-PORTS',
    nLabelPortPlaceHolder : 'Type name of port',
    nLabelCompanyPlaceHolder : 'Type name of company',
    nLabelNewsPlaceHolder : 'Type keywords of news',
    nLabelShipPlaceHolder : 'Type name of ship',
    nLabelMore: 'more',
  };


  constructor(props,context){
    super(props,context);
    const type =this.props.location.query.type;
    const value = type ? type.toUpperCase() : createItems(TYPES.SEARCH_TYPES)[0].value;
    this.state ={
      chooseItems:createItems(TYPES[value+'_TYPES']),
      searchType : value
    }
  }

  componentDidMount() {
    if(this.props.location.query.type){
       this.props.search(this.props.location.query);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!_.isEqual(this.props.location.query,nextProps.location.query)){
      nextProps.search(nextProps.location.query);
    }
  }

  handleItemTouchTap = (value) => {
    let items = createItems(value ? TYPES[value+'_TYPES'] : TYPES.ALL_TYPES);
    this.setState({
      chooseItems: items,
      searchType: value
    });
  }

  handleMoreTouchTap = ()=>{
    const { location, pagination } = this.props;
    let query = location.query;
    query.cursor = pagination.cursor;
    this.props.searchAndPush(query);
  }

  handleSearch = (keywords)=>{
    const type = this.refs.searchTypes.getValue();
    const roles = this.refs.roles.getValue();
    let searchPath = `/search?type=${type}&keywords=${keywords}`;
    if(roles && roles.length>0){
      searchPath +=`&rls=${roles.join(split)}`;
    }
    searchPath += `&size=${PAGE_SIZE}`;
    browserHistory.push(searchPath);
  }

  render() {
    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);
    const query = this.props.location.query;

    let queryType = query && query.type && query.type.toLowerCase();
    // here to remove pre-search result if search type changed
    let showResult = true;
    if(this.props.results.length > 0 ){
      let category = this.props.results[0].category && this.props.results[0].category.toLowerCase();
      showResult = category === queryType;
    }

    const nextElem = query.type && query.type.toUpperCase() === this.state.searchType.toUpperCase() ?
      this.props.pagination && this.props.pagination.hasNext ?
      this.props.isFetching ? (<Loading style = {styles.loading}/>):
      (
        <div
          style = {prepareStyles(styles.next)}
          onTouchTap = {this.handleMoreTouchTap}
          >
          {this.props.nLabelMore}
        </div>
      ):null:null;

    return (
      <div style = { prepareStyles(styles.root) }>
        <Helmet
            title = {this.props.nLabelSearchHeaderTitle}
            titleTemplate = { " %s | "+this.props.nLabelEPorts}
            meta={[
                {"name": "description", "content": this.props.nLabelSearchHeaderDescription}
            ]}
        />
        <div style = { prepareStyles(styles.left) }>
          <SearchTypes
            ref = 'searchTypes'
            activeColor = '#f5a623'
            onItemTouchTap ={ this.handleItemTouchTap }
            items = { createItems(TYPES.SEARCH_TYPES) }
            value = { query.type ? query.type.toUpperCase(): null }
          />
          <SearchBar
            style = { styles.searchBar }
            iconFillColor = '#f5a623'
            value = { query.keywords ? query.keywords : null }
            inputPlaceHolder = {this.props['nLabel'+_.capitalize(this.state.searchType)+'PlaceHolder'] }
            onSearch = { this.handleSearch }
          />
          <ChooseContainer
            checkedFillColor = '#f5a623'
            ref = 'roles'
            items = { this.state.chooseItems }
            choosedValues = { query.rls && query.rls.split ? query.rls.split(split):[] }
          />
        {
            showResult ?
            <ResultContainer
              titleColor = '#818181'
              results = { this.props.results }
              isFetching = { this.props.isFetching }
              location = { this.props.location }
              searchType = { this.state.searchType }
            />:
            <Loading />
        }
        { showResult ? nextElem : null }
        </div>
      </div>
    );
  }
};
