import React from 'react';
import { TYPES, TYPES_CODE } from '../../utils/constants';
import SearchBar from 'epui-md/lib/ep/SearchBar';
import ChooseContainer from 'epui-md/lib/ep/search/ChooseContainer';
import SearchTypes  from 'epui-md/lib/ep/search/SearchTypes';
import ResultContainerSimple from 'epui-md/lib/ep/search/ResultContainerSimple';
import EventListener from 'epui-md/lib/internal/EventListener';
import MenuCrumbs from 'epui-md/lib/ep/MenuCrumbs';
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
const Sizes = {
  MD: 1190,
  SM: 990,
}

const createItems = (types)=>{
  return _.map(_.keys(types),(key)=>{
    return { name: types[key], value: TYPES_CODE[key] ? TYPES_CODE[key] : key};
  });
};

const getStyles =(props, state, context)=>{
  return {
    root:{
      width: state.deviceSize,
      margin: '0 auto',
      marginBottom: 40,
    },
    left:{
      width: '100%',
      minHeight: 500,
      margin: '0 auto',
    },
    searchBar: {

    },
    search: {
    },
    searchContainer: {
    },
    next:{
      textAlign: 'center',
      cursor: 'pointer',
      color: '#f00',
      fontSize: 16,
      fontWeight: 500,
      marginTop: 20,
    },
    loading:{
      color: '#f00',
      marginBottom: '30px',
    },
    nothing: {
      color: 'rgba(0, 0, 0, 0.560784)',
      fontSize: '14px',
      padding: '20px',
      textAlign:'center',
    }
  }
}

@connect(
  state =>(
    {
      isFetching : state.search.isFetching,
      pagination : state.search.pagination,
      results : state.search.results,
      user: state.user.user,
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
  }

  static contextTypes = {
    muiTheme: PropTypes.object,
    router: PropTypes.object,
  }

  static defaultProps ={
    nLabelSearchHeaderTitle: 'Search Page',
    nLabelSearchHeaderDescription: 'Search Page Description',
    nLabelEPorts: 'E-PORTS',
    nLabelPortPlaceHolder : 'Type name of port',
    nLabelCompanyPlaceHolder : 'Type name of company',
    nLabelNewsPlaceHolder : 'Type keywords of news',
    nLabelShipPlaceHolder : 'Type name of ship',
    nLabelMore: 'more',
  }


  constructor(props,context){
    super(props,context);
    const type =this.props.location.query.type;
    const value = type ? type.toUpperCase() : createItems(TYPES.SEARCH_TYPES)[0].value;
    this.state ={
      chooseItems:createItems(TYPES[value+'_TYPES']),
      searchType : value,
      results: this.props.results,
      index: 1,
      deviceSize: window.innerWidth >= 1366 ? Sizes.MD : Sizes.SM,
      isLoad: true,
    }
  }

  componentDidMount() {
    if(this.props.location.query.type){
       this.props.search(this.props.location.query);
    }
    window.addEventListener('scroll', this._handleWindowScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._handleWindowScroll);
  }

  componentWillReceiveProps(nextProps) {
    if(!_.isEqual(this.props.location.query,nextProps.location.query) || !_.isEqual(this.props.location.query.type,nextProps.location.query.type)){
      nextProps.search(nextProps.location.query);
    }

    if(nextProps.results && nextProps.results.length >= 0){
      this.setState({
        results: nextProps.results,
        searchType: nextProps.location.query.type,
        isLoad: true,
      })
    }
    if(nextProps.location.query.type !== this.props.location.query.type && nextProps.location.query.type === "COMPANY"){
      this.setState({
        chooseItems:createItems(TYPES[nextProps.location.query.type + '_TYPES']),
      })
    }
  }

  isLoggedIn= (props) => {
     props = props || this.props;

     return props.user && props.user._id;
   }

  render() {
    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.state, this.context);
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
        <div>
        </div>
      ):(<div style={styles.nothing}></div>):null;

    let choosedValues = query.rls;
    if(choosedValues === 'All') {
      choosedValues = _.map(this.state.chooseItems,'value');
    }else {
      choosedValues = choosedValues && choosedValues.split ? choosedValues.split(split):[];
    }
    return (
      <div style = { styles.root }>
        <Helmet
            title = {this.props.nLabelSearchHeaderTitle}
            titleTemplate = { " %s | "+this.props.nLabelEPorts}
            meta={[
                {"name": "description", "content": this.props.nLabelSearchHeaderDescription}
            ]}
        />
        <EventListener
          target={window}
          onResize={this._updateDeviceSize}
          onLoad={this._updateDeviceSize}
        />
        <div style = { styles.left }>
          <div style={styles.searchContainer}>
            <MenuCrumbs query={query} />
            <div style={styles.search}>
              {queryType === 'company'?
                <ChooseContainer
                  checkedFillColor = '#004588'
                  ref = 'roles'
                  items = { this.state.chooseItems }
                  location = { this.props.location }
                  choosedValues = {choosedValues}
                  style={styles.search}
                />: null}
            </div>
          </div>
        {
            showResult ?
            <ResultContainerSimple
              titleColor = '#818181'
              results = { this.state.results }
              isFetching = { this.props.isFetching }
              location = { this.props.location }
              searchType = { this.state.searchType }
            />:
            <Loading />
        }
        { showResult ? nextElem : null }
        </div>
      </div>
    )
  }

  _updateDeviceSize = () => {
    let width = window.innerWidth;
    if( width > 1366) {
      this.setState({deviceSize: Sizes.MD})
    }else {
      this.setState({deviceSize: Sizes.SM})
    }
  }

  _handleWindowScroll = (e) => {
    const { location, pagination } = this.props;
    let hasNext = pagination.hasNext;
    let query = location.query;
    query.cursor = pagination.cursor;
    let { isLoad } = this.state;

    if(isLoad && document.body.scrollHeight <= (document.body.clientHeight + document.body.scrollTop + 220) && hasNext){
      this.props.searchAndPush(query);
      this.setState({isLoad: false});
    }
  }
}
