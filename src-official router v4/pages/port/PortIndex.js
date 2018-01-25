import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {displayWithLimit} from '../../utils/methods';
import LocationIcon from 'epui-md/lib/svg-icons/communication/location-on';
import MapIcon from 'epui-md/lib/svg-icons/maps/map';
import * as portActions from '../../redux/reducers/port';
import * as homeActions from '../../redux/reducers/home';
import * as regulationActions from '../../redux/reducers/regulation';
import * as recommendationActions from '../../redux/reducers/recommendation';
import EventListener from 'epui-md/lib/internal/EventListener';
import Helmet from "react-helmet";
import MenuCrumbs2 from '../../components/MenuCrumbs2';
import _ from 'lodash';

const PropTypes = React.PropTypes;

const getStyles = (props, context) => {

    let styles = {

        root: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginTop: 20,
        },

        middle: {
            minHeight: 550,
        },

        breadcrumbNav: {
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.87)',
            letterSpacing: 0
        },

        portSortDefault: {
            float: 'left',
            width: 70,
            padding: '4px 4px',
            textAlign: 'center',
            marginBottom: 10,
            cursor: 'pointer'
        },

        portSortChanged: {
            float: 'left',
            width: 70,
            fontFamily: 'Roboto-Medium',
            background: '#00599A',
            color: '#fff',
            padding: '2px 4px',
            textAlign: 'center',
            marginBottom: 10,
            cursor: 'pointer'
        },

        portSortLetter: {
            fontSize: 16,
            color: 'rgba(0, 0, 0, 0.87)',
            letterSpacing: 0,
            verticalAlign: 'middle'
        },

        portSortCount: {
            fontSize: 12,
            color: 'rgba(0, 0, 0, 0.54)',
            letterSpacing: 0,
            marginLeft: 4,
            verticalAlign: 'middle'
        },

        locationBorder: {
            float: 'left',
            border: '1px solid #D1D1D1',
            padding: '20',
            width: '20%',
            // height: 130
        },

        locationBorderLeftTop: {
            float: 'left',
            borderLeft: '1px solid #D1D1D1',
            borderTop: '1px solid #D1D1D1',
            padding: 20,
            width: '20%',
            // height: 130
        },

        locationBorderLeftTopRight: {
            float: 'left',
            borderLeft: '1px solid #D1D1D1',
            borderTop: '1px solid #D1D1D1',
            borderRight: '1px solid #D1D1D1',
            padding: 20,
            width: '20%',
            // height: 130
        },

        locationBorderLeftTopBottom: {
            float: 'left',
            borderLeft: '1px solid #D1D1D1',
            borderTop: '1px solid #D1D1D1',
            borderBottom: '1px solid #D1D1D1',
            padding: 20,
            width: '20%',
            // height: 130
        },

        locationBorderLeftTopRightBottom: {
            float: 'left',
            border: '1px solid #D1D1D1',
            padding: 20,
            width: '20%',
            // height: 130
        },

        locationBorderTop: {
            float: 'left',
            borderTop: '1px solid #D1D1D1',
            padding: 20,
            width: '20%',
            // height: 130
        },

        locationName: {
            fontSize: 16,
            color: 'rgba(0, 0, 0, 0.87)',
            letterSpacing: 0
        },

        locationImg: {
            width: 18,
            height: 18,
            verticalAlign: 'middle'
        },

        locationContent: {
            fontSize: 14,
            color: '4A4A4A',
            letterSpacing: 0,
            verticalAlign: 'middle',
            marginLeft: 5
        },

        noContent: {
            fontSize: 32,
            textAlign: 'center',
            lineHeight: '200px',
            minHeight: 200,
        },

        link: {
            textDecoration: 'none',
            display: 'block',
            width: '100%',
            height: '100%',
            color: '#4a4a4a'
        },

        center: {
            textAlign: 'center'
        },

        clear: {
            clear: 'both'
        },

        cursor: {
            cursor: 'pointer'
        }
    };
    return styles;
};

@connect(
    state => ({
        // isFetching: state.news.isFetching,
        // news: state.news.news,
        // error: state.news.error,
        // pagination: state.news.pagination,
        // recommendationNews: state.recommendation.news
        ports: state.port.ports,
        portIndex: state.port.portIndex,
    }),
    dispatch => ({
        ...bindActionCreators({
            findPortIndex: portActions.findPortIndex,
            findPortsByQuery: portActions.findPortsByQuery,
            findRecommendablePorts: portActions.findRecommendablePorts,
        }, dispatch)
    })
)
export default class PortIndex extends React.Component {

    static need = [
        portActions.findPortIndex,
        portActions.findRecommendablePorts,
        homeActions.findHomeNews,
        regulationActions.findRegulations,
        recommendationActions.findRecommendableRegulations,
    ];

    static propTypes = {
        children: PropTypes.element,
        nLabelMore: PropTypes.string,
        nLabelHeaderTitle: PropTypes.string,
        nLabelHeaderDescription: PropTypes.string,
        nLabelEPorts: PropTypes.string,
    };

    static contextTypes = {
        muiTheme: PropTypes.object,
        router: PropTypes.object,
    };

    static defaultProps = {
        nLabelHeaderTitle: 'Ports',
        nLabelHeaderDescription: 'Ports provided by E-PORTS',
        nLabelEPorts: 'E-PORTS',
        nLabelEmpty: 'Port Index aren\'t available',
        nLabelMore: 'more',
    };

    constructor(props) {
        super(props);
        this.state = {
            sortType: 'HOT',
            containerWidth: window.innerWidth > 1367 ? 1190 : 990,
            isHover: []
        };
    }

    renderPortSortElem(styles) {
        let portIndex = this.props.portIndex;
        let portSorts = portIndex.portIndex == undefined ? [] : portIndex.portIndex;
        let sortTypeElem = [];
        portSorts.map(item => {
            if (item._id == this.state.sortType) {
                sortTypeElem.push(
                    <div key={item._id}
                         style={(styles.portSortChanged)}
                         onClick={this.handlerChangeSortType.bind(this, item._id)}
                    >
                        <span style={({verticalAlign: 'middle'})}>
                            {item._id + ' (' + item.count + ')'}
                        </span>
                    </div>
                );
            } else {
                sortTypeElem.push(
                    <div key={item._id}
                         style={(styles.portSortDefault)}
                         onClick={this.handlerChangeSortType.bind(this, item._id)}
                    >
                        <span style={(styles.portSortLetter)}>{item._id}</span>
                        <span style={(styles.portSortCount)}>({item.count})</span>
                    </div>
                )
            }
        });
        sortTypeElem.push(<div key={'sortClear'} style={(styles.clear)}></div>);

        return <div style={({marginTop: 20})}>{sortTypeElem}</div>;
    }

    renderPortLocationElem(styles) {
        let locationElem = [];
        let ports = this.props.ports;
        if (ports.length == 0) {
            locationElem.push(<div style={(styles.noContent)}>Sorry, No ports...</div>);
        } else {
            let column = 4;
            let rows = Math.ceil(ports.length / column);
            ports.map((item, i) => {
                let index = i + 1;
                let borderStyle;
                if (index == ports.length) {
                    borderStyle = styles.locationBorderLeftTopRightBottom;
                } else if (Math.ceil(index / column) == rows) {
                    borderStyle = styles.locationBorderLeftTopBottom;
                } else if (index % column == 0) {
                    borderStyle = styles.locationBorderLeftTopRight;
                } else {
                    borderStyle = styles.locationBorderLeftTop;
                }

                locationElem.push(
                    <div key={item._id}
                         style={_.merge({}, borderStyle, this.state.isHover[i] ? {backgroundColor: '#f7f7f7'} : {backgroundColor: '#fff'})}
                         onMouseEnter={() => this.handlerMouseMove(i, true)}
                         onMouseLeave={() => this.handlerMouseMove(i, false)}
                    >
                        <a
                            style={(styles.link)}
                            target='_blank'
                            href={`/port/${item._id}`}
                        >
                            <span style={(styles.locationName)}>{item.name}</span>
                            <div style={{marginTop: 18}}>
                                <LocationIcon style={(styles.locationImg)} color='#00599a'/>
                                <span style={(styles.locationContent)}>
                                    {displayWithLimit(item.lineOne, 20) || '-'}
                                </span>
                            </div>
                            <div style={{marginTop: 14}}>
                                <MapIcon style={(styles.locationImg)} color='#00599a'/>
                                <span style={(styles.locationContent)}>
                                    {displayWithLimit(item.lineTwo, 20) || '-'}
                                </span>
                            </div>
                        </a>
                    </div>
                );
            });

            if (ports.length > column) {
                for (let i = 0; i < column - ports.length % column; i++) {
                    locationElem.push(
                        <div key={`borderTop${i}`} style={(styles.locationBorderTop)}></div>
                    )
                }
            }

            locationElem.push(<div key={'locationClear'} style={(styles.clear)}></div>);
        }

        return <div style={({margin: '30px 0', minHeight: 400})}>{locationElem}</div>;

    }

    render() {
        if (this.props.error && this.props.error.status === 404) {
            this.props.history.push('/404');
            return null;
        }

        const {prepareStyles} = this.context.muiTheme;
        const styles = getStyles(this.props, this.context);

        let navArr = [{value: 'Home', link: '/'}, {value: 'Port Index'}];

        return (
            <div style={(styles.root)}>
                <Helmet
                    title={this.props.nLabelHeaderTitle}
                    titleTemplate={" %s | " + this.props.nLabelEPorts}
                    meta={[
                        {"name": "description", "content": this.props.nLabelHeaderDescription}
                    ]}
                />
                <div style={{width: this.state.containerWidth, margin: '0 auto'}}>
                    <MenuCrumbs2 navArr={navArr}/>
                    {this.renderPortSortElem(styles)}
                    {this.renderPortLocationElem(styles)}
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

    handlerChangeSortType(sortType) {
        this.setState({sortType});
        if (sortType == "HOT") {
            this.props.findRecommendablePorts();
        } else {
            this.props.findPortsByQuery({name: {$regex: `^${sortType}`, $options: 'i'}}); //点击其他字母
        }
    }

    handlerJump(address) {
        this.props.history.push(address);
    }

    handlerMouseMove(index, isShow) {
        let ports = this.props.ports;
        let isHover = this.state.isHover;
        if (isHover.length == 0) {
            isHover = new Array(ports.length);
        }
        isHover[index] = isShow;
        this.setState({
            isHover
        })
    }

    _updateDeviceSize = () => {
        this.setState({containerWidth: window.innerWidth > 1367 ? 1190 : 990})
    };
};
