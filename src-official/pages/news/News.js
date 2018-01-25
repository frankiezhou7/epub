import React from 'react';
import {connect} from 'react-redux';
import _ from 'eplodash';
import {bindActionCreators} from 'redux';
import * as newsActions from '../../redux/reducers/news';
import * as recommendationActions from '../../redux/reducers/recommendation';
import newsImage2 from '../../../static/newsPreview2.png';
import EventListener from 'epui-md/lib/internal/EventListener';
import {browserHistory} from 'react-router';
import {displayWithLimit} from '../../utils/methods';
import Slider from 'react-slick';
import Helmet from "react-helmet";
import moment from 'moment';
import IconMenu from 'epui-md/lib/IconMenu/IconMenu';
import MenuItem from 'epui-md/lib/MenuItem/MenuItem';
import IconButton from 'epui-md/lib/IconButton/IconButton';
import Loading from 'epui-md/lib/ep/RefreshIndicator';

import drop_down from '../../../static/drop-down.svg';

const PropTypes = React.PropTypes;

const getStyles = (props, context) => {
    const showRight = true;
    const theme = context.muiTheme;
    const padding = 24;
    let styles = {

        root: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginTop: 30,
        },
        middle: {
            minHeight: 550,
        },
        middleLeft: {
            float: 'left',
            width: '64%',
            paddingRight: 22,
            paddingBottom: 70,
            // height: 900,
            // overflowY: 'auto',
        },
        middleRight: {
            float: 'left',
            width: '30%',
            borderLeft: '1px solid #D8D8D8',
            wordWrap: 'break-word',
            paddingLeft: 22,
            // textAlign: 'justify'
        },
        hotNewsTip: {
            fontWeight: 500,
            fontSize: 24,
            color: 'rgba(0, 0, 0, 0.87)',
            letterSpacing: 0,
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
        categoryContainer: {
            display: 'inline-flex',
            justifyContent: 'space-between',
            width: '90%',
            verticalAlign: 'middle',
        },
        categoryContainerDownDrop: {
            display: 'inline-block',
            verticalAlign: 'middle',
            marginLeft: 10
        },
        categoryDefault: {
            fontSize: 16,
            color: 'rgba(0, 0, 0, 0.54)',
            letterSpacing: 0,
            padding: '6px 10px',
            marginRight: 15,
            cursor: 'pointer',
            // width: '17%',
            display: 'inline-block',
            textAlign: 'center',
        },
        categoryChanged: {
            fontSize: 16,
            color: '#fff',
            letterSpacing: 0,
            background: '#F2B654',
            padding: '6px 10px',
            borderRadius: 2,
            marginRight: 15,
            cursor: 'pointer',
            // width: '17%',
            display: 'inline-block',
            textAlign: 'center',
        },
        dropDown: {
            width: 24,
            height: 24,
            verticalAlign: 'middle'
        },
        newsContainer: {
            float: 'left',
            width: 'calc(100% - 150px)'
        },
        newsTitle: {
            fontWeight: 500,
            fontSize: 20,
            color: 'rgba(0, 0, 0, 0.87)',
            letterSpacing: 0,
            wordWrap: 'break-word'
        },
        newsContent: {
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.87)',
            letterSpacing: 0,
            wordWrap: 'break-word',
            marginTop: 8,
            marginRight: 20,
        },
        newsImg: {
            float: 'right',
            width: 150,
            height: 108,
        },
        newsFrom: {
            fontSize: 12,
            color: 'rgba(0, 0, 0, 0.56)',
            letterSpacing: 0,
        },
        newsCategory: {
            fontSize: 12,
            color: 'rgba(0, 0, 0, 0.56)',
            letterSpacing: 0,
            marginLeft: 30,
        },
        newsDate: {
            float: 'right',
            fontSize: 12,
            color: 'rgba(0, 0, 0, 0.56)',
            letterSpacing: 0,
            marginRight: 20
        },
        bannerImg990: {
            width: '100%',
            height: 360
        },
        bannerImg1190: {
            width: '100%',
            height: 426
        },
        link: {
            textDecoration: 'none',
            display: 'block',
            width: '100%',
            height: '100%',
        },
        center: {
            textAlign: 'center'
        },
        clear: {
            clear: 'both'
        },
        resize: {
            width: '65%',
            display: 'inline-block',
            overflow: 'hidden',
        },
        bannerTitle: {
            width: '100%',
            position: 'absolute',
            bottom: 4,
            backgroundColor: 'rgba(0,0,0,0.59)',
            padding: '12px 15px',
            fontWeight: 500,
            fontSize: 20,
            color: '#FFFFFF',
            letterSpacing: 0,
        },
        noContent: {
            fontSize: 32,
            textAlign: 'center',
            // lineHeight: '200px',
            minHeight: 200,
        },
        noRecommended: {
            fontSize: 18,
            textAlign: 'left',
            lineHeight: '50px',
            minHeight: 200,
        },
        loading: {
            color: '#f00',
            marginBottom: '30px',
        },
    };
    return styles;
};

@connect(
    state => ({
        isFetching: state.news.isFetching,
        news: state.news.news,
        error: state.news.error,
        pagination: state.news.pagination,
        recommendationNews: state.recommendation.news,
        types: state.news.types,
        banners: state.news.banners,
    }),
    dispatch => ({
        ...bindActionCreators({
            findNews: newsActions.findNews,
            findNewsAndPush: newsActions.findNewsAndPush,
        }, dispatch)
    })
)

export default class News extends React.Component {

    static need = [
        newsActions.findNewsBanners,
        newsActions.findNewsTypes,
        newsActions.findNews,
        recommendationActions.findRecommendableNews
    ];

    static propTypes = {
        children: PropTypes.element,
        nLabelRecommendableNews: PropTypes.string,
        nLabelMore: PropTypes.string,
        nLabelNewsHeaderTitle: PropTypes.string,
        nLabelNewsHeaderDescription: PropTypes.string,
        nLabelEPorts: PropTypes.string,
        news: PropTypes.array.isRequired,
        recommendationNews: PropTypes.array.isRequired
    };

    static contextTypes = {
        muiTheme: PropTypes.object,
        router: PropTypes.object,
    };

    static defaultProps = {
        nLabelNewsHeaderTitle: 'News',
        nLabelNewsHeaderDescription: 'Latest News provided by E-PORTS',
        nLabelEPorts: 'E-PORTS',
        nLabelRecommendableNews: 'Recommendable News',
        nLabelNewsEmpty: 'News aren\'t available',
        nLabelMore: 'more',
        news: [],
        recommendationNews: [],
        fileUrl: '/files/',
        defaultType: {_id: 'latest news', value: 'Latest News'}
    };

    constructor(props) {
        super(props);
        this.state = {
            containerWidth: window.innerWidth > 1367 ? 1190 : 990,
            newsIsLoad: true,
            newsIsLoading: true,
            hotNewsIsLoading: true,
            categoryType: 'latest news',
        }
    }

    componentWillMount() {
        let news = this.props.news != undefined ? this.props.news : [];
        let recommendationNews = this.props.recommendationNews != undefined ? this.props.recommendationNews : [];
        let [newsIsLoading, hotNewsIsLoading] = [true, true];
        if (news.length > 0) {
            newsIsLoading = false;
        }
        if (recommendationNews.length > 0) {
            hotNewsIsLoading = false;
        }
        this.setState({
            newsIsLoading,
            hotNewsIsLoading
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.news !== this.props.news) {
            this.setState({
                newsIsLoad: true,
                newsIsLoading: false
            });
        }
        if (nextProps.recommendationNews != this.props.recommendationNews) {
            this.setState({hotNewsIsLoading: false})
        }
    }

    createBannerElem = (styles) => {
        let settings = {
            customPaging: function (i) {
                return <i></i>
            },
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3500,
            speed: 200,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            dots: true,
            dotsClass: 'news-slick-dots',
            arrows: false,
            swipeToSlide: false,
            lazyLoad: false,
        };

        let banners = this.props.banners;

        let sliderElem = [];
        banners.map((item, index) => {
            sliderElem.push(
                <a style={styles.resize} target='_blank' key={index} href={item.value.link}>
                    <img src={item.value.img}
                         style={(styles[`bannerImg${this.state.containerWidth}`])}
                    />
                    {item.value.title == "" ? null : <div style={styles.bannerTitle}>{item.value.title}</div>}
                </a>
            );
        });
        sliderElem = sliderElem.length == 0 ? [] : <Slider {...settings}>{sliderElem}</Slider>;
        return (
            <div style={({width: '100%', overflow: 'hidden'})}>
                {sliderElem}
            </div>
        )
    };

    createCategoryElem = (styles) => {
        let categories = [this.props.defaultType, ...this.props.types];
        let maxShow = 5;
        let showCategory = [];
        let dropDownCategory = [];
        categories.map((item, i) => {
            if (i < maxShow) {
                let categoryStyle = styles.categoryDefault;
                if (item._id == this.state.categoryType) {
                    categoryStyle = styles.categoryChanged;
                }
                showCategory.push(
                    <span key={item._id} style={(categoryStyle)}
                          onClick={this.handlerChangeCategoryType.bind(this, null, item._id)}>{displayWithLimit(item.value, 11)}</span>
                );
            } else {
                dropDownCategory.push(
                    <MenuItem key={item._id} value={item._id} primaryText={displayWithLimit(item.value, 11)}/>
                );
            }
        });

        let categoryElem = [];
        categoryElem.push(
            <div key='categoryContainer' style={_.assign({}, styles.categoryContainer, {justifyContent: categories.length < maxShow ? 'flex-start' : 'space-between'})}>
              {showCategory}
            </div>
        );
        if (dropDownCategory.length > 0) {
            categoryElem.push(
                <div key={'dropDownCategory'} style={(styles.categoryContainerDownDrop)}>
                    <IconMenu
                        iconButtonElement={<IconButton><img src={drop_down}
                                                            style={(styles.dropDown)}/></IconButton>}
                        onChange={this.handlerChangeCategoryType}
                        value={this.state.categoryType}
                    >
                        {dropDownCategory}
                    </IconMenu>
                </div>
            );
        }
        return (
            <div style={{marginTop: 20}}>
                {categoryElem}
            </div>
        )
    };

    renderNews = (styles) => {
        let newsElem;
        if (this.state.newsIsLoading) {
            newsElem = <Loading />;
        } else {
            newsElem = _.map(this.props.news, item => {
                return (
                    <div key={item._id} style={({marginTop: 25, minHeight: 130})}>
                        <a
                            style={(styles.link)}
                            target='_blank'
                            href={`/news/${item._id}`}
                        >
                            <div>
                                <div style={(styles.newsContainer)}>
                                    <div style={(styles.newsTitle)}>
                                        {displayWithLimit(item.title, 50)}
                                    </div>
                                    <div style={(styles.newsContent)}>
                                        {displayWithLimit(item.summary, 200)}
                                    </div>
                                    <div style={{marginTop: 8}}>
                                        <span style={(styles.newsFrom)}>
                                            From: {item.from || "E-Ports"}
                                        </span>
                                        <span style={(styles.newsCategory)}>
                                            Category: {item.type == undefined ? '--' : item.type.value}
                                        </span>
                                        <span style={(styles.newsDate)}>
                                            {moment(item.dateCreate).format('DD/MMM/YYYY')}
                                        </span>
                                    </div>
                                    <div style={(styles.clear)}></div>
                                </div>
                                <img src={item.pic || newsImage2}
                                     style={(styles.newsImg)}
                                />
                            </div>
                            <div style={(styles.clear)}></div>
                        </a>
                    </div>
                );
            });
        }

        return (
            <div style={(styles.middleLeft)}>
                {this.createBannerElem(styles)}
                {this.createCategoryElem(styles)}
                <div id='wrapper'>
                    {newsElem}
                </div>
            </div>
        )
    };

    renderHotNews = (styles) => {
        let hotNewsContent;
        if (this.state.hotNewsIsLoading) {
            hotNewsContent = <Loading />;
        } else {
            hotNewsContent = _.map(this.props.recommendationNews, item => {
                return (
                    <div key={item._id} style={({marginTop: 20})}>
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
        }

        return (
            <div style={(styles.middleRight)}>
                <span style={(styles.hotNewsTip)}>HOT NEWS</span>
                {hotNewsContent}
            </div>
        )
    };

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
                    title={this.props.nLabelNewsHeaderTitle}
                    titleTemplate={" %s | " + this.props.nLabelEPorts}
                    meta={[
                        {"name": "description", "content": this.props.nLabelNewsHeaderDescription}
                    ]}
                />
                <div style={({width: this.state.containerWidth, margin: '0 auto'})}>
                    {this.renderNews(styles)}
                    {this.renderHotNews(styles)}
                </div>
                <div style={(styles.clear)}></div>
                <EventListener
                    target={window}
                    onResize={this._updateDeviceSize}
                    onLoad={this._updateDeviceSize}
                    onScroll={this._handleMoreScroll}
                />
            </div>
        );
    }

    handlerChangeCategoryType = (event, categoryType) => {
        document.getElementById('wrapper').scrollTop = 0;
        if (categoryType == 'latest news') {
            this.props.findNews();
        } else {
            this.props.findNews({query: {type: categoryType}});
        }
        this.setState({
            categoryType,
            newsIsLoading: true
        });
    };

    _handleMoreScroll = () => {
        const {location, pagination} = this.props;
        let hasNext = pagination.hasNext;
        let query = location.query;
        query.cursor = pagination.cursor;
        let wrapper = document.getElementById('wrapper');
        if (this.state.newsIsLoad && document.body.scrollHeight <= (document.body.clientHeight + document.body.scrollTop + 180) && hasNext) {
            if (this.state.categoryType != 'latest news') {
                query.query = {type: this.state.categoryType};
            }
            this.props.findNewsAndPush(query);
            this.setState({newsIsLoad: false});
        }
    };

    _updateDeviceSize = () => {
        this.setState({containerWidth: window.innerWidth > 1367 ? 1190 : 990})
    };
};
