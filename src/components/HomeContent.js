import React, { Component } from 'react';
import SummarySection from 'epui-md/lib/ep/SummarySection';
import NewsBoard from 'epui-md/lib/ep/NewsBoard';
import { browserHistory } from 'react-router';
import { CATEGORY_TYPES, TYPES_CODE } from '../utils/constants';

const PropTypes = React.PropTypes;

const getStyles = (props,state,context)=>{

  const styles = {
    container:{
      margin: 'auto',
      maxWidth: 1000,
    },
    href:{
      marginTop: 40,
      textAlign: 'center',
      color: context.muiTheme.epColor.primaryColor,
      fontSize: 18,
      display: 'block',
      width: '100%',
    }
  }

  return styles;
};

export default class HomeContent extends Component {

  static propTypes = {
    home : React.PropTypes.object.isRequired,
    nLabelMoreNews : React.PropTypes.string,
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

  handleSummaryItemTouchTap = (item)=>{
    const path = _.includes(item.categories,'PORT') ? 'port': 'organization';
    if(path) browserHistory.push(`/${path.toLowerCase()}/${item._id}`);
  }

  render() {
    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.state, this.context);
    const containerStyle = prepareStyles(styles.container);

    const hrefStyle = prepareStyles(styles.href);
    const home = this.props.home;
    const counts = home.counts;

    const moreNewsElem = (
      <a
        href = '/news'
        target='_blank'
        style = {hrefStyle}
      >
        {this.props.nLabelMoreNews}
      </a>
    );

    return (
      <div style = {containerStyle}>
        <div>
          <SummarySection category = {TYPES_CODE.PORT} items = {home.ports} onItemTouchTap ={this.handleSummaryItemTouchTap}/>
          <NewsBoard items = {home.news} newsPath ='/news' moreNews = {moreNewsElem}/>
          <SummarySection category = {TYPES_CODE.RECOMMENDATION} items = {home.agencies.concat(home.suppliers,home.inspections)} onItemTouchTap ={this.handleSummaryItemTouchTap}/>
        </div>
      </div>
    );
  }
}
