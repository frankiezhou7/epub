import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as newsActions from '../../redux/reducers/news';
import * as recommendationActions from '../../redux/reducers/recommendation';
import Helmet from "react-helmet";
import EventListener from 'epui-md/lib/internal/EventListener';

const PropTypes = React.PropTypes;

const getStyles = (props, context) => {

    let styles = {

        root: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginTop: 30,
            paddingBottom: 30,
        },

        middle: {
            minHeight: 550,
        },

        middleLeft: {
            float: 'left',
            // width: "50%"
        },

        middleRight990: {
            float: 'left',
            width: '50%',
            wordWrap: 'break-word',
            paddingLeft: 40
        },

        middleRight1190: {
            float: 'right',
            width: '47%',
            wordWrap: 'break-word',
            // paddingLeft: 40
        },

        themeTip: {
            width: 8,
            height: 16,
            background: '#004588',
            verticalAlign: 'middle',
            display: 'inline-block'
        },

        themeTitle: {
            fontSize: 20,
            fontWeight: 500,
            color: 'rgba(0, 0, 0, 0.87)',
            letterSpacing: 0,
            marginLeft: 8,
            verticalAlign: 'middle'
        },

        companyImg990: {
            width: 450,
            height: 314,
        },

        companyImg1190: {
            width: 596,
            height: 334
        },

        introductionHead: {
            fontWeight: 500,
            fontSize: 20,
            color: 'rgba(0, 0, 0, 0.87)',
            letterSpacing: 0,
        },

        introduction1: {
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.87)',
            letterSpacing: 0,
            lineHeight: '27px',
            marginBottom: 10,
        },

        introduction2: {
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.87)',
            letterSpacing: 0,
            marginTop: 10,
            lineHeight: '27px',
        },

        contact: {
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.87)',
            letterSpacing: 0,
            marginBottom: 15
        },

        managementLeft: {
            float: 'left',
            width: '14%'
        },

        managementRight: {
            float: 'left',
            width: '84%',
            marginLeft: 12
        },

        managementName: {
            fontSize: 20,
            color: 'rgba(0, 0, 0, 0.87)',
            letterSpacing: 0
        },

        managementPosition: {
            fontWeight: 500,
            fontSize: 16,
            color: '#F5A623',
            letterSpacing: 0,
            marginTop: 8
        },

        managementIntroduction: {
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.54)',
            letterSpacing: 0,
            marginTop: 3
        },

        managementImg: {
            width: '100%',
            height: 150
        },

        center: {
            textAlign: 'center'
        },

        clear: {
            clear: 'both'
        }
    };
    return styles;
};

@connect(
    state => ({
        isFetching: state.news.isFetching,
        news: state.news.news,
        error: state.news.error,
        pagination: state.news.pagination,
        recommendationNews: state.recommendation.news
    }),
    dispatch => ({
        ...bindActionCreators({
            findRecommendableNews: recommendationActions.findRecommendableNews,
            findNewsAndPush: newsActions.findNewsAndPush
        }, dispatch)
    })
)
export default class About extends React.Component {

    static need = [newsActions.findNews];

    static propTypes = {
        children: PropTypes.element,
        nLabelRecommendableNews: PropTypes.string,
        nLabelMore: PropTypes.string,
        nLabelHeaderTitle: PropTypes.string,
        nLabelHeaderDescription: PropTypes.string,
        nLabelEPorts: PropTypes.string,
        news: PropTypes.array.isRequired
    };

    static contextTypes = {
        muiTheme: PropTypes.object,
        router: PropTypes.object,
    };

    static defaultProps = {
        nLabelHeaderTitle: 'About',
        nLabelHeaderDescription: 'About provided by E-PORTS',
        nLabelEPorts: 'E-PORTS',
        nLabelRecommendableNews: 'Recommendable About',
        nLabelEmpty: 'About aren\'t available',
        nLabelMore: 'more',
        news: [],
    };

    constructor(props) {
        super(props);
        this.state = {
            containerWidth: window.innerWidth > 1367 ? 1190 : 990,
        }
    }

    renderAbout(styles) {
        let containerWidth = this.state.containerWidth;
        return (
            <div style={{textAlign: 'justify'}}>
                <div>
                    <span style={(styles.themeTip)}></span>
                    <span style={(styles.themeTitle)}>About E-PORTS</span>
                </div>
                <div style={({marginTop: 30})}>
                    <div style={(styles.middleLeft)}>
                        <img src={require(`../../../static/company-${containerWidth}.jpg`)}
                             style={(styles[`companyImg${containerWidth}`])}/>
                    </div>
                    <div style={(styles[`middleRight${containerWidth}`])}>
                        <div style={(styles.introduction1)}>
                            <span style={(styles.introductionHead)}>E-PORTS</span>
                            , as a leading e-commerce platform for integrating and analyzing information of ports
                            throughout China, provides IT solutions for international shipping agency industry. The aim
                            of developing E-PORTS is to create a new business model for the innovation of international
                            shipping agency industry in worldwide to drive upgrading industrial structure of
                            port-related services.
                        </div>
                        <div style={(styles.introduction1)}>
                            For various reasons, Chinese shipping agency industry has been facing a series of problems,
                            such as irregular operation、opaque pricing、 information asymmetry and lack of channel to
                            find agencies with world-class service etc.. E-PORTS digs deeper into these problems of
                            shipping agency industry in China and searches for a good way to innovate shipping industry.
                            Turnout traditional shipping agency Industry need to be changed. It is time to move forward
                            internet-led business pattern. E-commerce is better serve traditional industry.
                        </div>
                    </div>
                    <div style={(styles.clear)}></div>
                </div>
                <div style={(styles.introduction2)}>
                    We deeply integrate IT technology and traditional shipping industry with 12-year in-depth
                    experience in international shipping agency services. After one and half years’ R&D, E-PORTS
                    launches the first platform” Shipping Agency Desk”, which will help principals reducing
                    operating cost、increasing efficiency、supervising agency and getting real-time tracking.
                </div>
                <div style={(styles.introduction2)}>
                    E-PORTS will lead Chinese shipping agency industry to a new trend by implementing
                    standardization. The international shipping agency industrial standardization is the
                    benchmark of E-ports, which supervise and control processes in order to ensure business
                    security、service quality、information facticity、data security.
                </div>
                <div style={(styles.introduction2)}>
                    In many ways, E-PORTS could be the future for the shipping industry.
                </div>
            </div>
        )
    }

    renderContact(styles) {
        return (
            <div>
                <div style={({marginTop: 60})}>
                    <span style={(styles.themeTip)}></span>
                    <span style={(styles.themeTitle)}>Contact Us</span>
                </div>
                <div style={({marginTop: 20})}>
                    <div style={(styles.contact)}>Tel:&nbsp;&nbsp;400-111-0000</div>
                    <div style={(styles.contact)}>Email: contact@e-ports.com</div>
                    <div style={(styles.contact)}>
                        Address: Room 101, Port Building, Fenghe Road, Pudong New District, Shanghai, PRC
                    </div>
                </div>
            </div>
        )
    }

    renderManagement(styles) {
        let management = [1, 2, 3, 4, 5];
        return (
            <div>
                <div style={({marginTop: 35})}>
                    <span style={(styles.themeTip)}></span>
                    <span style={(styles.themeTitle)}>Management Team</span>
                </div>
                <div style={({paddingBottom: 70})}>
                    {
                        management.map((item, i) => {
                            return (
                                <div key={i} style={{marginTop: 25}}>
                                    <div style={{marginBottom: 20}}>
                                        <div style={(styles.managementLeft)}>
                                            <img src="" style={(styles.managementImg)}/>
                                        </div>
                                        <div style={(styles.managementRight)}>
                                            <div style={(styles.managementName)}>Ricky Huang</div>
                                            <div style={(styles.managementPosition)}>Founder & CEO
                                            </div>
                                            <div style={(styles.managementIntroduction)}>American
                                                colleges
                                                and
                                                universities awarded about one
                                                million
                                                seven hundred thousand bachelor's degrees in the school year ending
                                                in
                                                twenty ten.
                                                Fifty - seven
                                                percent of the recipients were female. Yet only eighteen percent of
                                                the
                                                women earned
                                                degrees in computer and information sciences.Reshma Saujani would
                                                like
                                                to change
                                                that. She
                                                launched an organization called "Girls Who Code" in two thousand
                                                eleven.
                                                Her goal to
                                                get more
                                                girls interested in science and technology.
                                            </div>
                                        </div>
                                        <div style={(styles.clear)}></div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    render() {
        if (this.props.error && this.props.error.status === 404) {
            this.props.history.push('/404');
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
                    {this.renderAbout(styles)}
                    {/*{this.renderContact(styles)}*/}
                    {/*{this.renderManagement(styles)}*/}
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

    _updateDeviceSize = () => {
        this.setState({containerWidth: window.innerWidth > 1367 ? 1190 : 990})
    };
};
