import React, {Component} from 'react';
import _ from 'eplodash';
import SummaryBoard from 'epui-md/lib/ep/SummaryBoard';
import Login from './DialogView/Login';
import EPBulb from 'epui-md/lib/svg-icons/ep/bulb';
import EPChart from 'epui-md/lib/svg-icons/ep/chart';
import EPDivision from 'epui-md/lib/svg-icons/ep/division';
import EPRocket from 'epui-md/lib/svg-icons/ep/rocket';
import newsImage1 from '../../static/newsPreview1.png';
import newsImage2 from '../../static/newsPreview2.png';
import newsImage3 from '../../static/newsPreview3.png';
import Loading from 'epui-md/lib/ep/RefreshIndicator';
import Slider from 'react-slick';
import moment from 'moment';
import {displayWithLimit} from '../utils/methods';
import {browserHistory} from 'react-router';
import {CATEGORY_TYPES, TYPES_CODE,} from '../utils/constants';
import {connect} from 'react-redux';
const previewImg = _.sample([newsImage1, newsImage2, newsImage3]);

const PropTypes = React.PropTypes;

const getStyles = (props, state, context) => {
    let {home: {partnership, ports}} = props;
    let {size} = props;
    let rowNumber = parseInt(partnership.length / 5);
    let addRow = partnership.length % 5 > 0 ? 120 : 0;
    const wallpaperWidth = size ? 990 : 1190;
    const wallpaperHeight = size ? 400 : 500;
    const styles = {
        wrapper: {
            margin: '0px auto',
        },
        resize: {
            width: '100%',
            height: '100%',
            minHeight: wallpaperHeight,
            display: 'inline-block',
            position: 'relative',
            backgroundPosition: '50% 50%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        },
        container: {
            width: '100%',
            minHeight: wallpaperHeight,
            position: 'relative',
            zIndex: 999,
        },
        loginWrapper: {
            width: wallpaperWidth,
            minHeight: wallpaperHeight,
            position: 'absolute',
            zIndex: 999,
            left: '50%',
            top: '50%',
            marginTop: size ? -159 : -180,
        },
        title: {
            fontSize: 24,
            fontWeight: 500,
            color: 'rgba(0,0,0,0.87)',
            paddingBottom: 15,
            textTransform: 'uppercase',
            position: 'relative',
        },
        desc: {
            wrapper: {
                width: wallpaperWidth,
                height: 332,
                margin: '20px auto 30px',
            },
            card: {
                width: 216,
                height: 290,
                float: 'left',
                position: 'relative',
                padding: size ? 15 : '15px 40px 15px',
            },
            line: {
                width: 1,
                height: 216,
                borderRight: '1px solid #d1d1d1',
                position: 'absolute',
                right: 0,
                top: 52,
            },
            icon: {
                width: 48,
                height: 48,
                fill: '#d1d1d1',
                display: 'block',
                margin: '0px auto 25px',
            },
            title: {
                fontSize: 20,
                fontWeight: 500,
                color: 'rgba(0,0,0,0.87)',
                display: 'block',
                marginBottom: 15,
                textAlign: 'center',
                textTransform: 'capitalize',
            },
            intro: {
                fontSize: 16,
                color: 'rgba(0,0,0,0.54)',
                lineHeight: '24px',
                textAlign: 'center',
                width: 218,
                margin: '0px auto',
            },
        },
        summary: {
            wrapper: {
                width: wallpaperWidth,
                minHeight: '100%',
                height: ports && ports.length > 0 ? 570 : 260,
                paddingBottom: 30,
                margin: '0px auto',
            },
            port: {
                width: '100%',
                height: 310,
                marginBottom: 50,
            },
            company: {
                width: '100%',
                height: 210,
            },
        },
        partnership: {
            wrapper: {
                width: wallpaperWidth,
                minHeight: 260,
                margin: '0px auto',
                display: props.home.visibility && props.home.partnership && props.home.partnership.length !== 0 ? 'block' : 'none',
                paddingBottom: 50,
            },
            container: {
                width: '100%',
                minHeight: 120 * rowNumber + addRow,
            },
            item: {
                width: size ? 129 : 127,
                height: 86,
                borderTop: '1px solid #d8d8d8',
                borderBottom: '1px solid #d8d8d8',
                backgroundColor: '#fff',
                textAlign: 'center',
                float: 'left',
                padding: size ? '12px 33px 12px 36px' : '12px 54px 12px 55px',
                position: 'relative',
                marginTop: -1,
            },
            divider: {
                width: 1,
                height: 110,
                position: 'absolute',
                borderLeft: '1px solid #d8d8d8',
                left: 0,
                top: 0,
            },
            logo: {
                width: 129,
                height: 86,
            },
        },
        news: {
            wrapper: {
                width: size ? '67.8%' : '64.8%',
                height: 426,
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
                height: 63,
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
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textTransform: 'capitalize',
            },
            more: {
                color: context.muiTheme.tagColor.defaultColor,
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
                width: size ? '96.4%' : '96.9%',
                height: 111,
                marginBottom: 25,
            },
            divider: {
                width: 1,
                height: 443,
                position: 'absolute',
                borderLeft: '1px solid #d8d8d8',
                right: 0,
                top: 0,
            },
            from: {
                fontSize: 12,
                color: 'rgba(0,0,0,.56)',
                float: 'left',
            },
            date: {
                fontSize: 12,
                color: 'rgba(0,0,0,.56)',
                float: 'right',
            },
            img: {
                width: '100%',
                height: '100%',
            },
            left: {
                width: size ? '73.6%' : '77.9%',
                height: '100%',
                float: 'left',
            },
            right: {
                width: size ? '23.2%' : '20.1%',
                height: 114,
                float: 'right',
                paddingTop: 5,
            },
            noContent: {
                fontSize: 26,
                lineHeight: '400px',
                textAlign: 'center',
            },
        },
        regulation: {
            wrapper: {
                width: size ? '29.8%' : '33%',
                height: 426,
                marginLeft: 23,
                float: 'left',
            },
            list: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: 400,
            },
            item: {
                width: '100%',
                maxHeight: 86,
                marginBottom: 20,
            },
            content: {
                width: '100%',
                fontSize: 16,
                lineHeight: '22px',
                color: 'rgba(0,0,0,.87)',
                maxHeight: 66,
                marginBottom: 8,
                whiteSpace: 'pre-wrap',
                overflow: 'hidden',
            },
            noContent: {
                fontSize: 23,
                lineHeight: '400px',
                textAlign: 'center',
            },
        },
        info: {
            width: wallpaperWidth,
            height: 490,
            margin: '30px auto 0px',
        },
        link: {
            textDecoration: 'none',
        },
        bottom: {
            overflow: 'hidden',
        },
        sliderContainer: {
            width: '100%',
            height: '100%',
            minHeight: wallpaperHeight,
            // overflow: 'hidden',
        }
    }

    return styles;
};

@connect(
    state => ({
        user: state.user.user,
        isFetching: state.home.isFetching,
    }),
)
export default class HomeContent extends Component {

    constructor(props) {
        super();
        this.state = {
            hasNews: true,
            hasRegulation: true,
        }
    }

    static propTypes = {
        home: PropTypes.object.isRequired,
        showLogin: PropTypes.func,
        user: PropTypes.object,
        size: PropTypes.number,
    };

    static contextTypes = {
        muiTheme: PropTypes.object,
        router: PropTypes.object,
    };

    static childContextTypes = {
        muiTheme: PropTypes.object,
    };

    static defaultProps = {
        home: {
            isFetching: false,
            ports: [],
            agencies: [],
            suppliers: [],
            inspections: [],
            shipyards: [],
            others: [],
            news: [],
            counts: {
                ports: 0,
                agencies: 0,
                suppliers: 0,
                inspections: 0,
                ships: 0
            },
        },
        size: window.innerWidth >= 1366 ? 0 : 1,
    };

  componentDidMount = () => {
    // if(this.props.home.news && this.props.home.news.length === 0){
    //   this.setState({hasNews: false});
    // }
    //
    // if(this.props.home.regulations && this.props.home.regulations.length === 0){
    //   this.setState({hasRegulation: false});
    // }
  }

    isLoggedIn = (props) => {
        props = props || this.props;

        return props.user && props.user._id;
    }

    handleSummaryItemTouchTap = (item) => {
        let visibleStatus = item.visibleStatus;
        if (visibleStatus === 1 && !this.isLoggedIn()) {
            return true;
        } else {
            return false;
        }
    }

    renderCardDescription = (styles) => {
        return (
            <div style={styles.desc.wrapper}>
                <div style={styles.desc.card}>
                    <EPChart style={styles.desc.icon}/>
                    <span style={styles.desc.title}>Data-based</span>
                    <div style={styles.desc.intro}>
                        Integrating and analyzing the information of ports in China, provide IT solutions and create
                        value for shipping company of the whole world.
                        <i style={styles.desc.line}></i>
                    </div>
                </div>

                <div style={styles.desc.card}>
                    <EPBulb style={styles.desc.icon}/>
                    <span style={styles.desc.title}>Transparency</span>
                    <div style={styles.desc.intro}>
                        As an independent E-platform provides transparent price system for helping users to understand
                        market price and the cost of each order item.
                        <i style={styles.desc.line}></i>
                    </div>
                </div>

                <div style={styles.desc.card}>
                    <EPDivision style={styles.desc.icon}/>
                    <span style={styles.desc.title}>Standardization</span>
                    <div style={styles.desc.intro}>
                        The quality standardization of international shipping agency is the benchmark of E-PORTS, which
                        supervise and control transactions in order to ensure business security, service quality.
                        <i style={styles.desc.line}></i>
                    </div>
                </div>
                <div style={styles.desc.card}>
                    <EPRocket style={styles.desc.icon}/>
                    <span style={styles.desc.title}>Efficiency</span>
                    <div style={styles.desc.intro}>
                        Real-time order status track,automatic quotes,financial analysis,file management online makes
                        work more efficient, get cost saving and time saving.
                    </div>
                </div>
            </div>
        );
    };

    renderSummaryCards = (styles) => {
        let {home, size} = this.props;
        let navItems = [
            {name: 'Agency', items: home.agencies},
            {name: 'Supplier', items: home.suppliers},
            {name: 'Inspection', items: home.inspections},
            {name: 'SPRO', items: home.spros},
            {name: 'Workshop', items: home.workshops},
            {name: 'Shipyard', items: home.shipyards},
            {name: 'Shipping Company', items: home.others},
        ];

        let ports = (
            <div style={styles.summary.port}>
                <SummaryBoard
                    title='Port'
                    more='ports'
                    items={home.ports}
                    resize={!!size}
                    browserHistory={browserHistory}
                />
            </div>
        );

        return (
            <div style={styles.summary.wrapper}>
                {home.ports && home.ports.length > 0 ? ports : null}
                <div style={styles.summary.company}>
                    <SummaryBoard
                        title='Company'
                        navItems={navItems}
                        resize={!!size}
                        themeColor={this.context.muiTheme.tagColor.COMPANY}
                    />
                </div>
            </div>
        )
    };

  renderNewsRegulation = (styles) => {
    let { home, isFetching } = this.props;
    let news = !isFetching ? _.map(home.news, (item, index) => {
      if(index > 2) return null;
      return (
        <div key={index} style={styles.news.item}>
          <a
            style = {styles.link}
            target ='_blank'
            href = {`/news/${item._id}`}
          >
          <div style={styles.news.left}>
            <div style={styles.news.title}>{item.title}</div>
            <div style={styles.news.content}>{displayWithLimit(item.summary, 260)}</div>
            <div style={styles.bottom}>
              <span style={styles.news.from}>{`From: ${_.get(item, 'from', '-')}`}</span>
              <span style={styles.news.date}>{moment(item.dateCreate).format('DD/MMM/YYYY')}</span>
            </div>
          </div>
          <div style={styles.news.right}>
            <img src={item.pic || previewImg} style={styles.news.img}/>
          </div>
          </a>
        </div>
      );
    })
    : <Loading/>;

    let regulation = !isFetching ? _.map(home.regulations, (item, index) => {
      if(index > 3) return null;
      return (
        <div key={index} style={styles.regulation.item}>
          <a
            style = {styles.link}
            target ='_blank'
            href = {`/regulations/${item._id}`}
          >
            <div style={styles.regulation.content}>{displayWithLimit(item.title, 150)}</div>
            <div style={styles.bottom}>
              <span style={_.assign({},styles.news.from,{float:'right'})}>{moment(item.dateCreate).format('DD/MMM/YYYY')}</span>
            </div>
          </a>
        </div>
      );
    })
    : <Loading/>;

        return (
            <div style={styles.info}>
                <div style={styles.news.wrapper}>
                    <div style={styles.title}>
                        News
                        <a target='_blank' href={`/news`} style={styles.news.more}>More</a>
                    </div>
                    <div>{news}</div>
                    <i style={styles.news.divider}/>
                </div>
                <div style={styles.regulation.wrapper}>
                    <div style={styles.title}>
                        Regulation
                        <a target='_blank' href={`/regulations`}
                           style={_.assign({}, styles.news.more, {right: 0})}>More</a>
                    </div>
                    <div style={styles.regulation.list}>{regulation}</div>
                </div>
            </div>
        )
    };

    renderPartnerShip = (styles) => {
        let partnership = this.props.home.partnership;
        return (
            <div style={styles.partnership.wrapper}>
                <div style={styles.title}>
                    PartnerShip
                </div>
                <div style={styles.partnership.container}>
                    {_.map(partnership, (item, index) => {
                        return (
                            // <a
                            //   style = {styles.link}
                            //   target ='_blank'
                            //   href = {`/partnership/${item._id}`}
                            // >
                            <div key={index} title={item.value.name} style={styles.partnership.item}>
                                <i style={styles.partnership.divider}/>
                                <img style={styles.partnership.logo} src={item.value.img}/>
                                {(index + 1) % 5 === 0 || index === partnership.length - 1 ?
                                    <i style={_.assign({}, styles.partnership.divider, {
                                        left: 'initial',
                                        right: -2
                                    })}/> : null}
                            </div>
                            // </a>
                        );
                    })}
                </div>
            </div>
        )
    };

    renderSlider = (styles) => {
        let {home, size, user, ...others} = this.props;
        let settings = {
            customPaging: function (i) {
                return <i></i>
            },
            infinite: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            dots: true,
            dotsClass: 'slick-dots',
            arrows: false,
            lazyLoad: false,
        };

        let banners =
            home.banners && home.banners.length > 0 ?
                _.map(home.banners, (banner, index) => {
                    return _.get(banner, ['value', 'link']) === '' ? (
                            <div style={_.assign({}, styles.resize, {backgroundImage: `url(${banner.value.img})`})}
                                 key={index}></div>
                        ) : (
                            <a style={styles.resize} target='_blank' key={index} href={banner.value.link}>
                                <div style={_.assign({}, styles.resize, {backgroundImage: `url(${banner.value.img})`})}
                                     key={index}></div>
                            </a>
                        );
                }) :
                _.map([1, 2, 3], (banner, index) => {
                    return (
                        <div
                            style={_.assign({}, styles.resize, {backgroundImage: `url(${require(`../../static/p${banner}-${size ? 990 : 1190}.jpg`)})`})}
                            key={index}></div>
                    );
                });

        return (
            <div style={styles.container}>
                <div style={styles.loginWrapper}>
                    <Login size={size} user={user} {...others}/>
                </div>
                <div style={styles.sliderContainer}>
                    <Slider {...settings}>
                        {banners}
                    </Slider>
                </div>
            </div>
        )
    };

    render = () => {
        const {prepareStyles} = this.context.muiTheme;
        const styles = getStyles(this.props, this.state, this.context);

        return (
            <div style={styles.wrapper}>
                {this.renderSlider(styles)}
                {this.testBtn()}
                {this.renderCardDescription(styles)}
                {this.renderSummaryCards(styles)}
                {this.renderNewsRegulation(styles)}
                {this.renderPartnerShip(styles)}
            </div>
        );
    };

    testBtn(){
        return (
            <div style={{textAlign: 'center', margin: 20}}>
                <button style={{padding: 10, cursor: 'pointer'}} onClick={this.handlerShowDetail}>Detail</button>
            </div>
        )
    }

    handlerShowDetail() {
        let props = {
            title: 'Port Disbursement Account',
            open: true,
        };
        let component = {
            name: 'PortDisbursementAccount',
            props: {
                accountDetail: {
                    estimate_price: 'USD 888,888.00',
                    exchange_rate: '@RATE USD 1/6.9',
                    cost_items: [
                        {
                            cost_item: 'Agency fee for bulk carrier',
                            price_item: 'USD 1,800.00'
                        },
                        {
                            cost_item: 'Chinese Tonnage due',
                            price_item: 'USD 1,800.00',
                            flat: true
                        },
                        {
                            cost_item: 'Pilotage',
                            price_item: 'USD 1,800.00'
                        },
                        {
                            cost_item: 'Pilot transportation',
                            price_item: 'USD 1,800.00'
                        },
                        {
                            cost_item: 'Towage',
                            price_item: 'USD 1,800.00'
                        },
                        {
                            cost_item: 'Towage/boat charge for quarantine inspection at anchorage',
                            price_item: 'USD 1,800.00'
                        },
                        {
                            cost_item: 'Berthage',
                            price_item: 'USD 1,800.00'
                        },
                        {
                            cost_item: 'Anchorage due',
                            price_item: 'USD 1,800.00'
                        },
                    ],
                    total: 'USD 14,400.00'
                },
            }
        };

        if (global.register.dialog) {
            global.register.dialog.generate(props, component)
        }
    }

}
