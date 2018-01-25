import React from 'react';
import NewsItem from 'epui-md/lib/ep/news/NewsItem';
import Loading from 'epui-md/lib/ep/RefreshIndicator';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as newsActions from '../../redux/reducers/news';
import * as recommendationActions from '../../redux/reducers/recommendation';
import { browserHistory } from 'react-router';
import Helmet from "react-helmet";
import _ from 'eplodash';

const PropTypes = React.PropTypes;

const getStyles =(props,context)=>{
  //const showRight = !_.isEmpty(props.recommendationNews);
  const showRight = true;
  const theme = context.muiTheme;
  const padding = 24;
  let styles = {
    root:{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginTop: 30,
    },
    header:{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      color: theme.epColor.primaryColor,
    },
    title:{
      fontSize: 16,
      fontWeight: 500,
      marginLeft: 10,
      height: 28,
    },
    left:{
      marginRight: 'auto',
      marginLeft: 'auto',
      width: 1000,
    },
    right:{
      display: 'none',
      marginTop: 10,
      width: showRight ? 336 : 0,
    },
    next:{
      textAlign: 'center',
      cursor: 'pointer',
      color: theme.epColor.primaryColor,
      fontSize: 16,
      marginTop: 20,
      marginBottom: 40,
    },
    loading:{
      color: theme.epColor.primaryColor,
    },
    empty:{
      fontSize: 30,
      paddingTop: 50,
      textAlign: 'center',
    },
  }
  return styles;
};

@connect(
  state => ({
    isFetching: state.news.isFetching,
    news: state.news.news,
    error: state.news.error,
    pagination : state.news.pagination,
    recommendationNews : state.recommendation.news
  }),
  dispatch =>({
    ...bindActionCreators({
      findRecommendableNews: recommendationActions.findRecommendableNews,
      findNewsAndPush: newsActions.findNewsAndPush
    },dispatch)
  })
)
export default class News extends React.Component{

  static need = [newsActions.findNews];

  static propTypes = {
    children: PropTypes.element,
    nLabelRecommendableNews: PropTypes.string,
    nLabelMore: PropTypes.string,
    nLabelNewsHeaderTitle: PropTypes.string,
    nLabelNewsHeaderDescription: PropTypes.string,
    nLabelEPorts: PropTypes.string,
    news : PropTypes.array.isRequired,
    recommendationNews : PropTypes.array.isRequired,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
    router: PropTypes.object,
  };

  static defaultProps ={
    nLabelNewsHeaderTitle: 'News List',
    nLabelNewsHeaderDescription: 'Latest News provided by E-PORTS',
    nLabelEPorts: 'E-PORTS',
    nLabelRecommendableNews: 'Recommendable News',
    nLabelNewsEmpty: 'News aren\'t available',
    nLabelMore: 'more',
    news:[],
    recommendationNews :[],
  };

  componentDidMount() {
    this.props.findRecommendableNews();
  }

  handleTitleTouchTap = (news)=>{
    browserHistory.push(`/news/${news._id}`);
  }

  handleMoreTouchTap = ()=>{
    const { location, pagination } = this.props;
    let query = location.query;
    query.cursor = pagination.cursor;
    this.props.findNewsAndPush(query);
  }

  render() {

    if(this.props.error && this.props.error.status === 404){
      browserHistory.push('/404');
      return null;
    }

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);
    const headerStyle = prepareStyles(styles.header);
    const titleStyle = prepareStyles(styles.title);
    const emptyStyle = prepareStyles(styles.empty);
    const newsElems = this.props.news && this.props.news.length >0 ? _.map(this.props.news,(item)=>{
      return(
        <NewsItem
          key = {item._id}
          newsItem = {item}
          isRecommendable = {item.isRecommendable}
          onTitleTouchTap = {this.handleTitleTouchTap}
          showTop ={item.isOnTop||false}
        />
      );
    }) : (
      <div style = {emptyStyle}>{this.props.nLabelEmpty}</div>
    );
    const recommendableNewsElems = !_.isEmpty(this.props.recommendationNews) ? _.map(this.props.recommendationNews,(item)=>{
      return(
        <NewsItem
          key = {'re_'+item._id}
          newsItem = {item}
          onTitleTouchTap = {this.handleTitleTouchTap}
          showPic ={false}
          isRecommendable = {true}
          showSource = {false}
        />
      );
    }):null;

    const rightTitleElem = !_.isEmpty(this.props.recommendationNews) ? (
      <div style = {headerStyle}>
        <span style = {titleStyle}>{this.props.nLabelRecommendableNews}</span>
      </div>
    ):null;

    const nextElem =this.props.news && this.props.news.length >0 ? this.props.pagination && this.props.pagination.hasNext ?
    this.props.isFetching ? (<Loading style = {styles.loading}/>):
    (
      <div
        style = {prepareStyles(styles.next)}
        onTouchTap = {this.handleMoreTouchTap}
        >
        {this.props.nLabelMore}
      </div>
    ):null : null;

    return (
      <div style = {prepareStyles(styles.root)}>
        <Helmet
            title= {this.props.nLabelNewsHeaderTitle}
            titleTemplate={" %s | "+this.props.nLabelEPorts}
            meta={[
                {"name": "description", "content": this.props.nLabelNewsHeaderDescription}
            ]}
        />
        <div style = {prepareStyles(styles.left)}>
          {newsElems}
          {nextElem}
        </div>
        <div style = {prepareStyles(styles.right)}>
          {rightTitleElem}
          {recommendableNewsElems}
        </div>
      </div>
    );
  }
};
