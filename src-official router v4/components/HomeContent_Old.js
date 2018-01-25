import React, { Component } from 'react';
import SummarySection from 'epui-md/lib/ep/SummarySection';
import NewsBoard from 'epui-md/lib/ep/NewsBoard';
import { browserHistory } from 'react-router';
import { CATEGORY_TYPES, TYPES_CODE } from '../utils/constants';
import { connect } from 'react-redux';

const PropTypes = React.PropTypes;

const getStyles = (props,state,context)=>{

  const styles = {
    container:{
      margin: 'auto',
      maxWidth: 1000,
    },
  }

  return styles;
};

@connect(
  state => ({
    user: state.user.user,
  }),
)
export default class HomeContent extends Component {

  static propTypes = {
    home : React.PropTypes.object.isRequired,
    nLabelMoreNews : React.PropTypes.string,
    showLogin: React.PropTypes.func,
    user: React.PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
    router: PropTypes.object,
  };

  static childContextTypes = {
    muiTheme: PropTypes.object,
  };

  static defaultProps ={
    home:{
      isFetching:false,
      ports:[],
      agencies:[],
      suppliers:[],
      inspections:[],
      shipyards:[],
      others:[],
      news: [],
      counts:{
        ports: 0,
        agencies: 0,
        suppliers: 0,
        inspections: 0,
        ships: 0
      },
    },
    nLabelMoreNews: 'more news',
  };

  isLoggedIn= (props) => {
    props = props || this.props;

    return props.user && props.user._id;
  }

  handleSummaryItemTouchTap = (item)=>{
      let visibleStatus = item.visibleStatus;
      if(visibleStatus === 1 && !this.isLoggedIn()){
        this.props.showLogin();
        return true;
      }else {
        return false;
      }
  }

  render() {
    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.state, this.context);
    const containerStyle = prepareStyles(styles.container);
    const home = this.props.home;
    const counts = home.counts;

    return (
      <div style = {containerStyle}>
        <div>
          <SummarySection category = {TYPES_CODE.PORT} items = {home.ports} onClickHref ={this.handleSummaryItemTouchTap}/>
          <NewsBoard items = {home.news} newsPath ='/news' moreNewsLabel = {this.props.nLabelMoreNews}/>
          <SummarySection category = {TYPES_CODE.AGENCY} items = {home.agencies} onClickHref ={this.handleSummaryItemTouchTap}/>
          <SummarySection category = {TYPES_CODE.SUPPLIER} items = {home.suppliers} onClickHref ={this.handleSummaryItemTouchTap}/>
          <SummarySection category = {TYPES_CODE.INSPECTION} items = {home.inspections} onClickHref ={this.handleSummaryItemTouchTap}/>
          <SummarySection category = {TYPES_CODE.SHIPYARD} items = {home.shipyards} onClickHref ={this.handleSummaryItemTouchTap}/>
          <SummarySection category = {TYPES_CODE.OTHERS} items = {home.others} onClickHref ={this.handleSummaryItemTouchTap}/>
        </div>
      </div>
    );
  }
}
