import React from 'react';
import {connect} from 'react-redux';
import _ from 'eplodash';
import {bindActionCreators} from 'redux';
import {displayWithLimit} from '../../utils/methods';
import * as newsActions from '../../redux/reducers/news';
import * as newsDetailActions from '../../redux/reducers/newsItem';
import EventListener from 'epui-md/lib/internal/EventListener';
import {browserHistory} from 'react-router';
import Helmet from "react-helmet";
import moment from 'moment';
import MenuCrumbs2 from '../../components/MenuCrumbs2';
import Loading from 'epui-md/lib/ep/RefreshIndicator';

const PropTypes = React.PropTypes;

const getStyles = (props, context) => {

    let styles = {

        root: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginTop: 30,
        },

        middleLeft: {
            float: 'left',
            width: "64%",
            paddingRight: 24
        },

        middleRight: {
            float: 'left',
            width: '30%',
            wordWrap: 'break-word',
            paddingLeft: 27,
            borderLeft: '1px solid #D8D8D8',
            marginBottom: 40,
            // textAlign: 'justify',
        },

        right: {
            float: 'right'
        },

        center: {
            textAlign: 'center'
        },

        clear: {
            clear: 'both'
        },

        breadcrumbNav: {
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.87)',
            letterSpacing: 0
        },

        newsDetailTitle: {
            fontSize: 24,
            color: 'rgba(0, 0, 0, 0.87)',
            letterSpacing: 0
        },

        newsDetailBaseInfo: {
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.54)',
            letterSpacing: 0,
            marginTop: 8,
            marginRight: 20
        },

        newsDetailContent: {
            marginTop: 20,
            marginBottom: 70,
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.87)',
            letterSpacing: 0,
            wordWrap: 'break-word',
            // textAlign: 'justify',
        },

        hotNewsTitle: {
            fontSize: 16,
            color: 'rgba(0, 0, 0, 0.87)',
            letterSpacing: 0,
            wordWrap: 'break-word'
        },

        hotNewsContent: {
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.54)',
            letterSpacing: 0,
            wordWrap: 'break-word',
            marginTop: 4
        },

        newDetailTip: {
            fontWeight: 500,
            fontSize: 24,
            color: 'rgba(0, 0, 0, 0.87)',
            letterSpacing: 0
        },

        noContent: {
            fontSize: 32,
            textAlign: 'center',
            lineHeight: '200px',
            minHeight: 200,
        },

        noRecommended: {
            fontSize: 18,
            textAlign: 'left',
            lineHeight: '50px',
            minHeight: 200,
            fontWeight: 'normal',
        },

        link: {
            textDecoration: 'none',
            display: 'block',
            width: '100%',
            height: '100%',
        },

        cursor: {
            cursor: 'pointer'
        }
    };
    return styles;
};

@connect(
    state => ({
        isFetching: state.newsItem.isFetching,
        newsItem: state.newsItem.newsItem,
        error: state.newsItem.error,
        recommendationNews: state.recommendation.news,
        relatedNews: state.news.relatedNews,
    }),
    dispatch => ({
        ...bindActionCreators({
            findRelatedNews: newsActions.findRelatedNews,
        }, dispatch)
    })
)
export default class NewsDetail extends React.Component {

    static need = [newsDetailActions.findNewsById];

    static propTypes = {
        children: PropTypes.element,
        nLabelRecommendableNews: PropTypes.string,
        nLabelMore: PropTypes.string,
        nLabelNewsHeaderTitle: PropTypes.string,
        nLabelHeaderDescription: PropTypes.string,
        nLabelEPorts: PropTypes.string,
        news: PropTypes.array.isRequired,
        recommendationNews: PropTypes.array.isRequired,
    };

    static contextTypes = {
        muiTheme: PropTypes.object,
        router: PropTypes.object,
    };

    static defaultProps = {
        nLabelHeaderTitle: 'News Detail',
        nLabelHeaderDescription: 'News Detail provided by E-PORTS',
        nLabelEPorts: 'E-PORTS',
        nLabelRecommendableNews: 'Recommendable News Detail',
        nLabelNewsEmpty: 'News Detail aren\'t available',
        nLabelMore: 'more',
        news: [],
        recommendationNews: [],
    };

    constructor(props) {
        super(props);
        this.state = {
            containerWidth: window.innerWidth > 1367 ? 1190 : 990,
        };
    }

    componentDidMount() {
        this.props.findRelatedNews({
            type: _.get(this.props.newsItem, ['type', '_id']),
            _id: {$ne: this.props.newsItem._id}
        });
    }

    renderNewsDetail(styles) {
        let newsDetailDetail = this.props.newsItem;
        let navArr = [
            {
                value: 'Home',
                link: '/'
            },
            {
                value: 'News',
                link: '/news'
            }, {
                value: displayWithLimit(newsDetailDetail.title, 50)
            }
        ];
        return (
            <div key="renderNewsDetail" style={(styles.middleLeft)}>
                <MenuCrumbs2 navArr={navArr}/>
                <div style={{marginTop: 15}}>
                    <span style={(styles.newsDetailTitle)}>{displayWithLimit(newsDetailDetail.title, 100)}</span>
                    <div style={{marginTop: 8}}>
                        <span style={(styles.newsDetailBaseInfo)}>From: {newsDetailDetail.from || "E-Ports"}</span>
                        <span style={(styles.newsDetailBaseInfo)}>Category: {newsDetailDetail.type == undefined ? '--' : newsDetailDetail.type.value}</span>
                        <span style={(styles.newsDetailBaseInfo)}>
                            <span style={(styles.right)}>{moment(newsDetailDetail.dateCreate).format('DD/MMM/YYYY')}</span>
                        </span>
                    </div>
                </div>
                <div style={(styles.newsDetailContent)}
                     dangerouslySetInnerHTML={{__html: newsDetailDetail.content}}
                />
            </div>
        )
    }

    renderHotNews(styles) {
        let relatedNews = this.props.relatedNews != undefined ? this.props.relatedNews : [];
        let relatedNewsElem = relatedNews == 0 ?
            <div style={(styles.noRecommended)}><Loading /></div> : _.map(relatedNews, item => {
                return (
                    <div key={item._id} style={{marginTop: 20}}>
                        <a
                            style={(styles.link)}
                            target='_blank'
                            href={`/news/${item._id}`}
                        >
                            <div style={(styles.hotNewsTitle)}>
                                {displayWithLimit(item.title, 80)}
                            </div>
                            <div style={(styles.hotNewsContent)}>
                                {displayWithLimit(item.summary, 130)}
                            </div>
                        </a>
                    </div>
                )
            });
        return (
            <div key="renderHotNews" style={(styles.middleRight)}>
                <span style={(styles.newDetailTip)}>RELATED NEWS</span>
                {relatedNewsElem}
            </div>
        )
    }

    render() {
        if (this.props.error && this.props.error.status === 404) {
            browserHistory.push('/404');
            return null;
        }

        const {prepareStyles} = this.context.muiTheme;
        const styles = getStyles(this.props, this.context);

        return (
            <div style={(styles.root)}>
                <Helmet
                    title={this.props.nLabelHeaderTitle}
                    titleTemplate={" %s | " + this.props.nLabelEPorts}
                    meta={[
                        {"name": "description", "content": this.props.nLabelHeaderDescription}
                    ]}
                />
                <div style={({width: this.state.containerWidth, margin: '0 auto'})}>
                    {this.renderNewsDetail(styles)}
                    {this.renderHotNews(styles)}
                </div>
                <div style={(styles.clear)}></div>
                <EventListener
                    target={window}
                    onResize={this._updateDeviceSize}
                    onLoad={this._updateDeviceSize}
                />
            </div>
        );
    }

    handlerJump(address) {
        browserHistory.push(address);
    }

    _updateDeviceSize = () => {
        this.setState({containerWidth: window.innerWidth > 1367 ? 1190 : 990})
    };
};
