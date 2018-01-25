import React from 'react';
import _ from 'eplodash';
import Loading from 'epui-md/lib/ep/RefreshIndicator';
import EventListener from 'epui-md/lib/internal/EventListener';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as homeActions from '../../redux/reducers/home';
import * as regulationActions from '../../redux/reducers/regulation';
import * as recommendationActions from '../../redux/reducers/recommendation';
import { displayWithLimit } from '../../utils/methods';
import moment from 'moment';
import Helmet from "react-helmet";
const Sizes = {
  MD: 0,
  SM: 1,
}

const PropTypes = React.PropTypes;

const getStyles = (props, state, context)=>{
  const theme = context.muiTheme;
  let { size } = state;
  if(size === 990) { size = 1; }
  if(size === 1190) { size = 0; }
  const wallpaperWidth = size ? 990 : 1190;
  const wallpaperHeight = size ? 400 : 500;
  let styles = {
    root:{

    },
    title: {
      fontSize: 24,
      fontWeight: 500,
      color: 'rgba(0,0,0,0.87)',
      paddingBottom: 15,
      textTransform: 'uppercase',
      position: 'relative',
    },
    regulation: {
      wrapper: {
        // width: size ? '67.87%' : '66.55%',
        width: '64%',
        overflowY: 'auto',
        position: 'relative',
        float: 'left',
      },
      content: {
        fontSize: 14,
        color: 'rgba(0,0,0,0.87)',
        lineHeight: '21px',
        marginBottom: 8,
        wordBreak: 'break-word',
        width: '100%',
        maxHeight: 63,
        overflow: 'hidden',
        whiteSpace: 'pre-wrap',
      },
      title: {
        fontSize: 20,
        fontWeight: 500,
        color: 'rgba(0,0,0,0.87)',
        marginBottom: 8,
        wordBreak: 'break-word',
        width: '100%',
        overflow: 'hidden',
        whiteSpace: 'pre-wrap',
        textTransform: 'capitalize',
        maxHeight: 48,
      },
      more: {
        color: theme.tagColor.defaultColor,
        fontSize: 16,
        position: 'absolute',
        right: 25,
        top: 10,
        cursor: 'pointer',
        textDecoration: 'none',
        textTransform: 'capitalize',
        fontWeight: 'normal',
      },
      item: {
        width: size ? '96.27%' : '96.84%',
        height: 'auto',
        marginBottom: 40,
      },
      from: {
        fontSize: 12,
        color: 'rgba(0,0,0,.56)',
        float: 'left',
        marginRight: 30,
      },
      date: {
        fontSize: 12,
        color: 'rgba(0,0,0,.56)',
        float: 'right',
      },
      noContent: {
        fontSize: 32,
        textAlign: 'center',
        lineHeight: '120px',
        minHeight: 120,
      },
    },
    recommendation: {
      wrapper: {
        // width: size ? '29.29%' : '31.51%',
        width: '30%',
        marginLeft: 23,
        float: 'left',
        position: 'relative',
      },
      item: {
        width: '100%',
        maxHeight: 86,
        marginBottom: 20,
      },
      divider: {
        width: 1,
        height: '100%',
        maxHeight: 800,
        position: 'absolute',
        borderLeft: '1px solid #d8d8d8',
        left: -25,
        top: 0,
      },
      content: {
        width: '100%',
        fontSize: 16,
        lineHeight: '22px',
        color: 'rgba(0,0,0,.87)',
        maxHeight: 66,
        marginBottom: 8,
        overflow: 'hidden',
      },
      noContent: {
        fontSize: 18,
        lineHeight: '25px',
        minHeight: 80,
      },
    },
    info: {
      width: wallpaperWidth,
      margin: '0px auto',
      paddingTop: 30,
    },
    link: {
      textDecoration: 'none',
      display: 'block',
      width: '100%',
      height: '100%',
    },
    bottom: {
      overflow: 'hidden',
    },
    loading: {
      padding: '30px 0px',
    }
  }
  return styles;
};

@connect(
  state => ({
    isFetching: state.regulations.isFetching,
    regulations: state.regulations.regulations,
    error: state.regulations.error,
    pagination : state.regulations.pagination,
    recommendationRegulations : state.recommendation.regulations
  }),
  dispatch =>({
    ...bindActionCreators({
      findRegulations: regulationActions.findRegulations,
      findRecommendableRegulations: recommendationActions.findRecommendableRegulations,
      findRegulationsAndPush: regulationActions.findRegulationsAndPush
    },dispatch)
  })
)
export default class Regulation extends React.Component{

  constructor(props){
    super();
    this.state = {
      isLoad: false,
      size: window.innerWidth >=1366 ? 0 : 1,
    };
  }

  static need = [
    regulationActions.findRegulations,
    recommendationActions.findRecommendableRegulations,
    // homeActions.findHomeNews,
  ];

  static propTypes = {
    children: PropTypes.element,
    regulations : PropTypes.array.isRequired,
    nLabelEPorts: PropTypes.string,
    nLabelRegulationHeaderTitle : PropTypes.string,
    nLabelRegulationHeaderDescription: PropTypes.string,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
    router: PropTypes.object,
    size: PropTypes.number,
  };

  static defaultProps ={
    regulations: [],
    nLabelEPorts: 'E-PORTS',
    nLabelRegulationHeaderTitle: 'Regulation Page For E-Ports',
    nLabelRegulationHeaderDescription: 'Regulation Page Meta Description',
  };

  componentDidMount = () => {

  }

  componentWillReceiveProps(nextProps) {
      if(nextProps.regulations !== this.props.regulations){
          this.setState({isLoad:true});
      }
  }

  renderRegulations = (styles) => {
    let { regulations, recommendationRegulations, isFetching } = this.props;
    let noContent = regulations && regulations.length === 0 && recommendationRegulations && recommendationRegulations.length === 0;
    let recommendation = _.map(recommendationRegulations, (item, index) => {
      return (
        <div key={index} style={styles.recommendation.item}>
          <a
            style = {styles.link}
            target ='_blank'
            href = {`/regulations/${item._id}`}
          >
            <div style={styles.recommendation.content}>{displayWithLimit(item.title, 150)}</div>
            <div style={styles.bottom}>
              <span style={styles.regulation.from}>{moment(item.dateCreate).format('DD/MMM/YYYY')}</span>
            </div>
          </a>
        </div>
      );
    });

    let regulationWrapper = (
      <div style={styles.info}>
        <div id='regulationWrapper' style={styles.regulation.wrapper}>
          <div>
            {_.map(regulations, (item, index) => {
              let keypoint = _.get(item, 'keypoint', '-');
              let from = _.get(item, 'from', '-');
              if(_.isArray(keypoint)) { keypoint = keypoint.join(' '); }
              if(keypoint === '') keypoint = '-';
              if(from === '') from = '-';
              return (
                <div key={index} style={styles.regulation.item}>
                  <a
                    style = {styles.link}
                    target ='_blank'
                    href = {`/regulations/${item._id}`}
                  >
                    <div>
                      <div style={styles.regulation.title}>{displayWithLimit(item.title, 155)}</div>
                      <div style={styles.regulation.content}>{displayWithLimit(item.summary, 355)}</div>
                      <div style={styles.bottom}>
                        <span style={styles.regulation.from}>{`Keypoint: ${keypoint}`}</span>
                        <span style={styles.regulation.from}>{`From: ${from}`}</span>
                        <span style={styles.regulation.date}>{moment(item.dateCreate).format('DD/MMM/YYYY')}</span>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
             {/*: (<div style={styles.regulation.noContent}>Sorry, No Regulations...</div>)*/}
          </div>
          {isFetching ? <Loading style={styles.loading}/> : null}
        </div>
        <div style={styles.recommendation.wrapper}>
          <i style={styles.recommendation.divider} />
          <div style={styles.title}>
            Recommendation
          </div>
          <div>
            {recommendation}
          </div>
        </div>
      </div>
    );

    return regulationWrapper;
  };

  render() {
    if(this.props.error && this.props.error.status === 404){
      browserHistory.push('/404');
      return null;
    }

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.state, this.context);

    return (
      <div style = {prepareStyles(styles.root)}>
        <Helmet
            title= {this.props.nLabelRegulationHeaderTitle}
            titleTemplate={" %s | "+this.props.nLabelEPorts}
            meta={[
                {"name": "description", "content": this.props.nLabelRegulationHeaderDescription}
            ]}
        />
        <EventListener
          target={window}
          onResize={this._updateDeviceSize}
          onLoad={this._updateDeviceSize}
          onScroll={this._handleMoreScroll}
        />
        {this.renderRegulations(styles)}
      </div>
    );
  }

  _updateDeviceSize = () => {
    let width = window.innerWidth;
    if( width >= 1366) this.setState({size: Sizes.MD});
    else this.setState({size: Sizes.SM});
  }

  _handleTitleTouchTap = (regulation)=>{
    browserHistory.push(`/regulation/${regulation._id}`);
  }

  _handleMoreScroll = () => {
    const { location, pagination } = this.props;
    let hasNext = pagination.hasNext;
    let query = location.query;
    query.cursor = pagination.cursor;
    let { isLoad, hasRegulation } = this.state;
    if(isLoad && document.body.scrollHeight <= (document.body.clientHeight + document.body.scrollTop + 220) && hasNext && hasRegulation){
      this.props.findRegulationsAndPush(query);
      this.setState({isLoad: false});
    }
  }
};
