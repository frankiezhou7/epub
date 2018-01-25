import React from 'react';
import Paper   from 'epui-md/lib/Paper';
import NewsItem   from 'epui-md/lib/ep/news/NewsItem';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as newsItemActions from '../../redux/reducers/newsItem';
import * as recommendationActions from '../../redux/reducers/recommendation';
import { browserHistory } from 'react-router';
import { displayWithLimit } from 'epui-md/lib/utils/methods';
import Helmet from "react-helmet";
import moment from 'moment';
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
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      width: '100%',
      color: theme.epColor.primaryColor,
      marginBottom: 15,
    },
    source:{
      display: 'inline-block',
    },
    sourceContainer:{
      color: '#9b9b9b',
      fontSize: 14,
      marginBottom: 5,
    },
    time:{
      display: 'inline-block',
      marginLeft: 20,
    },
    origin:{
      fontSize: 12,
      fontWeight: 500,
      color: theme.epColor.fontColor,
      marginTop: 4,
    },
    title:{
      fontSize: 20,
      fontWeight: 500,
      wordBreak: 'break-word',
    },
    leftRoot:{
      padding: padding,
      marginTop: 10,
      marginRight: 10,
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
    pic:{
      maxWidth: 500,
      maxHeight: 300,
      margin: 'auto',
      display: 'block',
      paddingTop: 30,
      width: '100%',
    },
    content:{
      marginTop: 20,
      fontSize: 16,
      lineHeight: 1.5,
      wordBreak: 'break-word',
    },
    newsItem:{
      flex: '1 1 250px',
      marginRight: 10,
      minWidth: 250,
    },
    notExist:{
      padding: 40,
      textAlign: 'center',
      fontSize: 24,
      color: theme.epColor.primaryColor,
    },
    tag:{
      backgroundColor: '#159008',
      color: theme.epColor.whiteColor,
      borderRadius: 4,
      fontSize: 13,
      padding: 2,
      marginLeft: 140,
      textAlign: 'center',
      minWidth: 35,
    },
  }
  return styles;
};

@connect(
  (state,props) => ({
    isFetching: state.newsItem.isFetching,
    newsItem: state.newsItem.newsItem,
    error: state.newsItem.error,
    recommendationNews : state.recommendation.news
  }),
  dispatch =>({
    ...bindActionCreators({
      findRecommendableNews: recommendationActions.findRecommendableNews
    },dispatch)
  })
)
export default class NewsDetail extends React.Component{

  static need = [newsItemActions.findNewsById];

  static propTypes = {
    children: PropTypes.element,
    nLabelTop : PropTypes.string,
    nLabelRecommendableNews: PropTypes.string,
    nLabelOrigin: PropTypes.string,
    nLabelNewsItemNotExist: PropTypes.string,
    newsItem : PropTypes.object.isRequired,
    recommendationNews:PropTypes.array.isRequired,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
    router: PropTypes.object,
  };

  static defaultProps ={
    nLabelRecommendableNews: 'Recommendable About',
    nLabelOrigin: 'From : ',
    nLabelNewsItemNotExist: 'This About is no longer available.',
    nLabelTop: 'Top',
    newsItem:{},
    recommendationNews:[],
  };

  componentDidMount() {
    this.props.findRecommendableNews();
  }

  render() {

    if(this.props.error && this.props.error.status === 404){
      browserHistory.push('/404');
      return null;
    }

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);
    const headerStyle = prepareStyles(styles.header);
    const sourceStyle = prepareStyles(styles.source);
    const sourceContainerStyle = prepareStyles(styles.sourceContainer);
    const titleStyle = prepareStyles(styles.title);
    const timeStyle = prepareStyles(styles.time);
    const originStyle = prepareStyles(styles.origin);
    const picStyle = prepareStyles(styles.pic);
    const contentStyle = prepareStyles(styles.content);
    const tagStyle = prepareStyles(styles.tag);
    const newsItem = this.props.newsItem;

    const headerElem = (
      <div style = {headerStyle}>
        <div>
          <div style = {titleStyle}>{newsItem.title}</div>
        </div>
        {this.props.newsItem.isOnTop ? <div style = {tagStyle}>{this.props.nLabelTop}</div> : null}
      </div>
    );

    const sourceElem = (
      <div style = {sourceContainerStyle}>
        <div style = {sourceStyle}> From E-PORTS</div>
        <div style = {timeStyle}>
          {this.props.newsItem.dateUpdate ? moment(this.props.newsItem.dateUpdate).format('YYYY-MM-DD') : ''}
        </div>
      </div>
    );

    const recommendableNewsElems = !_.isEmpty(this.props.recommendationNews) ? _.map(this.props.recommendationNews,(item)=>{
      return(
        <NewsItem
          style = {styles.newsItem}
          key = {'re_'+item._id}
          newsItem = {item}
          onTitleTouch = {this.handleTitleTouchTap}
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

    const imgElem = newsItem.pic ? (
        <img
          style = {picStyle}
          src = {'/files/'+newsItem.pic}
        />
    ):null;

    const contentElem = (
      <div style = {contentStyle} dangerouslySetInnerHTML={{__html: newsItem.content}} />
    );

    const newsElem = _.isEmpty(this.props.newsItem) ?
    <div style ={prepareStyles(styles.notExist)}>{this.props.nLabelNewsItemNotExist}</div> :
    <Paper style = {styles.leftRoot}>
      {headerElem}
      {sourceElem}
      {imgElem}
      {contentElem}
    </Paper>

    return (
      <div style = {prepareStyles(styles.root)}>
        <Helmet
            title= {newsItem.title}
            meta={[
                {"name": "description", "content": displayWithLimit(newsItem.content, 20)}
            ]}
        />
        <div style = {prepareStyles(styles.left)}>
          {newsElem}
        </div>
        <div style = {prepareStyles(styles.right)}>
          {rightTitleElem}
          {recommendableNewsElems}
        </div>
      </div>
    );
  }
};
