import React from 'react';
import _ from 'eplodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {displayWithLimit} from '../../utils/methods';
import * as regulationActions from '../../redux/reducers/regulation';
import * as recommendationActions from '../../redux/reducers/recommendation';
import * as regulationDetailActions from '../../redux/reducers/regulationItem';
import * as homeActions from '../../redux/reducers/home';
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
            paddingRight: 26,
            // textAlign: 'justify',
        },

        middleRight: {
            float: 'left',
            width: '30%',
            wordWrap: 'break-word',
            paddingLeft: 22,
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

        cursor: {
            cursor: 'pointer'
        },

        breadcrumbNav: {
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.87)',
            letterSpacing: 0
        },

        versionChange: {
            fontSize: 16,
            color: '#fff',
            letterSpacing: 0,
            background: '#F2B654',
            borderRadius: 2,
            padding: '6px 10px',
            cursor: 'pointer'
        },

        versionDefault: {
            fontWeight: 500,
            fontSize: 16,
            color: 'rgba(0, 0, 0, 0.87)',
            letterSpacing: 0,
            borderRadius: 2,
            padding: '6px 10px',
            cursor: 'pointer'
        },

        regulationTitle: {
            fontSize: 24,
            color: 'rgba(0, 0, 0, 0.87)',
            letterSpacing: 0
        },

        regulationBaseInfo: {
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.54)',
            letterSpacing: 0,
            marginTop: 8
        },

        regulationContent: {
            marginTop: 20,
            marginBottom: 70,
            fontSize: 14,
            lineHeight: '23px',
            color: 'rgba(0, 0, 0, 0.87)',
            letterSpacing: 0,
            wordWrap: 'break-word'
        },

        recommendationTip: {
            fontWeight: 500,
            fontSize: 24,
            color: 'rgba(0, 0, 0, 0.87)',
            letterSpacing: 0
        },

        recommendationContent: {
            fontSize: 16,
            color: 'rgba(0, 0, 0, 0.87)',
            letterSpacing: 0,
            wordWrap: 'break-word'
        },

        recommendationDate: {
            fontSize: 12,
            color: 'rgba(0, 0, 0, 0.56)',
            letterSpacing: 0,
            wordWrap: 'break-word',
            marginTop: 8
        },

        noContent: {
            fontSize: 32,
            textAlign: 'center',
            // lineHeight: '200px',
            minHeight: 200,
        },

        link: {
            textDecoration: 'none',
            display: 'block',
            width: '100%',
            height: '100%',
        },
    };
    return styles;
};

@connect(
    state => ({
        isFetching: state.regulationItem.isFetching,
        regulationItem: state.regulationItem.regulationItem,
        error: state.regulationItem.error,
        recommendationRegulations: state.recommendation.regulations
    }),
    dispatch => ({
        ...bindActionCreators({
            findRecommendableRegulations: recommendationActions.findRecommendableRegulations,
        }, dispatch)
    })
)

export default class RegulationDetail extends React.Component {

    static need = [
        // regulationActions.findRegulations,
        regulationDetailActions.findRegulationById,
        recommendationActions.findRecommendableRegulations,
        // homeActions.findHomeNews,
        // homeActions.findHomeInspections,
        // homeActions.findHomePorts,
        // homeActions.findHomeRegulations,
        // homeActions.findHomeAgencies,
        // homeActions.findHomeSuppliers,
        // homeActions.findHomeSPROs,
        // homeActions.findHomeWorkshops,
        // homeActions.findHomeShipyards,
        // homeActions.findHomeOthers,
        // homeActions.findHomeBanners,
        // homeActions.findHomePartnership,
        // homeActions.findHomePartnershipDisplay,
    ];

    static propTypes = {
        children: PropTypes.element,
        nLabelRecommendableRegulation: PropTypes.string,
        nLabelMore: PropTypes.string,
        nLabelRegulationHeaderTitle: PropTypes.string,
        nLabelRegulationHeaderDescription: PropTypes.string,
        nLabelEPorts: PropTypes.string,
        regulations: PropTypes.array.isRequired,
        recommendationRegulations: PropTypes.array.isRequired,
    };

    static contextTypes = {
        muiTheme: PropTypes.object,
        router: PropTypes.object,
    };

    static defaultProps = {
        nLabelRegulationHeaderTitle: 'Regulation Detail',
        nLabelRegulationHeaderDescription: 'Regulation Detail provided by E-PORTS',
        nLabelEPorts: 'E-PORTS',
        nLabelRecommendableRegulation: 'Recommendable Regulation Detail',
        nLabelRegulationEmpty: 'Regulation Detail aren\'t available',
        nLabelMore: 'more',
        regulations: [],
        recommendationRegulations: [],
        versions: {
            "english": {
                "Name": "English",
                "From": "From: ",
                "Keypoint": "Keypoint: ",
                "ApplicatePorts": "Applicate ports: ",
                "EffectiveDate": "Effective Date: "
            },
            "chinese": {
                "Name": "中文版",
                "From": "来源: ",
                "Keypoint": "关键词: ",
                "ApplicatePorts": "适用港口: ",
                "EffectiveDate": "生效日期: "
            }
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            versionType: "english",
            containerWidth: window.innerWidth > 1367 ? 1190 : 990,
        };
    }

    createVersionsElem(styles) {
        let versions = this.props.versions;
        let versionElem = [];
        for (let versionType in versions) {
            let versionStyle = styles.versionDefault;
            if (versionType == this.state.versionType) {
                versionStyle = styles.versionChange;
            }
            versionElem.push(
                <span style={(versionStyle)}
                      onClick={this.handlerChangeVersion.bind(this, versionType)}
                >
                    {versions[versionType].Name}
                </span>
            )
        }
        return versionElem;
    }

    renderRegulationDetail(styles) {
        let versions = this.props.versions;
        let regulationDetail = this.props.regulationItem;
        let hasPorts = _.has(regulationDetail, 'ports');
        let navArr = [
            {
                value: 'Home',
                link: '/'
            },
            {
                value: 'Regulations',
                link: '/regulations'
            },
            {
                value: displayWithLimit(regulationDetail.title, 70)
            }
        ];
        let keypoint = _.get(regulationDetail, 'keypoint', '-');
        if(_.isArray(keypoint)) { keypoint = keypoint.map(item => item + ' '); }
        return (
            <div style={(styles.middleLeft)}>
                <MenuCrumbs2 navArr={navArr}/>
                <div style={{marginTop: 20}}>
                    {this.createVersionsElem(styles)}
                </div>
                <div style={{marginTop: 15}}>
                    <span style={(styles.regulationTitle)}>{displayWithLimit(regulationDetail.title, 100)}</span>
                    <div style={{marginTop: 8}}>
                        <span style={(styles.regulationBaseInfo)}>
                            {versions[this.state.versionType].From + regulationDetail.from}
                        </span>
                        <span style={(styles.regulationBaseInfo)}>
                            <span style={(styles.right)}>
                                {moment(regulationDetail.dateUpdate).format('DD/MMM/YYYY')}
                            </span>
                        </span>
                    </div>
                    <div style={(styles.regulationBaseInfo)}>
                        {versions[this.state.versionType].Keypoint + keypoint}
                    </div>
                    <div style={(styles.regulationBaseInfo)}>{versions[this.state.versionType].ApplicatePorts}
                        {hasPorts ? _.map(regulationDetail.ports, port => _.capitalize(port.name) + ' ') : this.state.versionType === 'english' ? 'All Ports' : '所有港口'}
                    </div>
                    <div style={(styles.regulationBaseInfo)}>
                        {versions[this.state.versionType].EffectiveDate}
                        {moment(regulationDetail.dateCreate).format('DD/MMM/YYYY')}
                    </div>
                </div>
                <div style={(styles.regulationContent)}
                     dangerouslySetInnerHTML={{__html: regulationDetail[this.state.versionType]}}
                />
            </div>
        )
    }

    renderRecommendation(styles) {
        let recommendationRegulations = this.props.recommendationRegulations != undefined ? this.props.recommendationRegulations : [];
        let recommendationRegulationsElem = recommendationRegulations.length == 0 ?
            <div style={(styles.noContent)}><Loading /></div> : recommendationRegulations.map(item => {
                return (
                    <div style={{marginTop: 20}} key={item._id}>
                        <a
                            style={(styles.link)}
                            target='_blank'
                            href={`/regulations/${item._id}`}
                        >
                            <div style={(styles.recommendationContent)}>
                                {displayWithLimit(item.title, 130)}
                            </div>
                            <div
                                style={(styles.recommendationDate)}>
                                {moment(item.dateUpdate).format('DD/MMM/YYYY')}
                            </div>
                        </a>
                    </div>
                )
            });

        return (
            <div style={(styles.middleRight)}>
                <span style={(styles.recommendationTip)}>RECOMMENDATION</span>
                {recommendationRegulationsElem}
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
                    title={this.props.nLabelRegulationHeaderTitle}
                    titleTemplate={" %s | " + this.props.nLabelEPorts}
                    meta={[
                        {"name": "description", "content": this.props.nLabelRegulationHeaderDescription}
                    ]}
                />
                <div style={({width: this.state.containerWidth, margin: '0 auto'})}>
                    {this.renderRegulationDetail(styles)}
                    {this.renderRecommendation(styles)}
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

    handlerChangeVersion(versionType) {
        this.setState({versionType})
    }

    handlerJump(address) {
        browserHistory.push(address);
    }

    _updateDeviceSize = () => {
        this.setState({containerWidth: window.innerWidth > 1367 ? 1190 : 990})
    };
};
