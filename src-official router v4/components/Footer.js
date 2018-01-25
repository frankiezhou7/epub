import React from 'react';
import EventListener from 'epui-md/lib/internal/EventListener';
import {browserHistory} from 'react-router';

const whale = require('../../static/whale.svg');
const phone = require('../../static/phone.svg');
const logo2 = require('../../static/logo2.png');

const PropTypes = React.PropTypes;

const getStyles = (props, context) => {
    const theme = context.muiTheme;
    const {epColor, appBar, zIndex,} = context.muiTheme;
    const styles = {
        root: {
            background: '#004588',
            padding: '20px 0',
            display: 'inline-block',
            width: '100%'
        },

        container: {
            width: 990,
            margin: '0 auto'
        },

        content: {
            overflow: 'auto',
            background: 'url(' + whale + ') no-repeat center center',
            backgroundSize: '544px 188px'
        },

        contentLeft: {
            float: 'left',
            width: '65%'
        },

        linkTitle: {
            fontWeight: 500,
            fontSize: 14,
            color: '#fff',
            letterSpacing: 0,
            // lineHeight: 14,
            width: '100%',
            padding: '10px 0'
        },

        link: {
            textDecoration: 'none',
            fontSize: 14,
            color: '#A1C4E6',
            letterSpacing: 0,
            cursor: 'pointer',
        },

        linkContent50: {
            float: 'left',
            width: '50%',
            marginTop: 4,
        },

        linkContent100: {
            float: 'left',
            width: '100%',
            marginTop: 4,
        },

        contentMiddle: {
            float: 'left',
            height: 150,
            width: 1,
            margin: '15px 2px',
            background: '#A1C4E6'
        },

        contentRight: {
            float: 'left',
            width: '34%',
        },

        footer: {
            textAlign: 'center'
        },

        left: {
            float: 'left'
        },

        clear: {
            clear: 'both'
        },

        serverHotline: {
            fontWeight: 500,
            fontSize: 32,
            color: '#fff',
            letterSpacing: 1.33,
            verticalAlign: 'middle',
            marginLeft: 5
        },

        email: {
            fontWeight: 500,
            fontSize: 20,
            color: '#fff',
            letterSpacing: 0,
            // lineHeight: 20,
            // marginTop: 25,
            textDecoration: 'none',
        },

        companyInfo: {
            fontSize: 14,
            color: '#fff',
            letterSpacing: 0
        },

        separator: {
            marginLeft: 5,
            marginRight: 5
        },

        phone: {
            width: 40,
            height: 40,
            verticalAlign: 'middle'
        }
    };
    return styles;
};

export default class Footer extends React.Component {

    static propTypes = {
        children: PropTypes.element,
    };

    static contextTypes = {
        muiTheme: PropTypes.object,
        router: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            containerWidth: window.innerWidth > 1367 ? 1190 : 990,
        };
    }

    renderLinks(styles) {
        let useful_links = [
            {name: 'BIMCO', address: 'https://www.bimco.org/'},
            {name: '海洋气象(Sea Weather)', address: 'http://sea.weather.gov.cn/'},
            {name: 'intercargo', address: 'http://www.intercargo.org/en/'},
            {name: '海事局(MSA)', address: 'http://en.msa.gov.cn/'},
            {name: 'intertanko', address: 'http://www.intertanko.com/'},
            {name: '潮汐查询(CNSS)', address: 'http://ocean.cnss.com.cn/'},
            {name: 'Paris Memorandum', address: 'http://www.parismou.org/'},
            {name: 'Tokyo Memorandum', address: 'http://www.tokyo-mou.org/'},
            {name: 'International Maritime Organisation (IMO)', address: 'http://www.imo.org/'},
            {name: 'International Association of Classification Societies', address: 'http://www.iacs.org.uk/'}
        ];

        let quick_links = [
            {name: 'Shipping Agency Desk', address: '/agency-desk'},
            {name: 'News', address: '/news'},
            {name: 'About E-PORTS', address: '/about-us'}
        ];

        return (
            <div style={(styles.contentLeft)}>
                <div style={{float: 'left', width: '50%'}}>
                    <div>
                        <span style={(styles.linkTitle)}>USEFUL LINKS</span>
                    </div>
                    {
                        useful_links.map((link_obj, i) => {
                            let style = styles.linkContent50;
                            if (i > 5) {
                                style = styles.linkContent100;
                            }
                            return (
                                <span style={(style)} key={i}>
                                    <a href={link_obj.address} target="_blank"
                                       style={(styles.link)}>{link_obj.name}
                                    </a>
                                </span>
                            )
                        })
                    }
                </div>
                <div style={{float: 'left', width: '37%'}}>
                    <div><span style={(styles.linkTitle)}>QUICK LINKS</span>
                    </div>
                    {
                        quick_links.map((link_obj, i) => {
                            return (
                                <span style={(styles.linkContent100)} key={i}>
                                     <span style={(styles.link)}
                                           onClick={this.jumpLink.bind(this, link_obj.address)}>{link_obj.name}
                                     </span>
                                 </span>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    renderBasicInfo(styles) {
        return (
            <div style={(styles.contentRight)}>
                <div style={{paddingLeft: 27}}>
                    {/*<div style={{marginTop: 15}}>
                        <img src={phone} style={(styles.phone)}/>
                        <span style={(styles.serverHotline)}>400-111-0000</span>
                    </div>*/}
                    <div style={({marginTop: 34})}>
                        <a style={(styles.email)} href="mailto:contact@e-ports.com">contact@e-ports.com</a>
                    </div>
                    <img src={logo2} style={{marginTop: 20}}/>
                </div>
            </div>
        )
    }

    renderFooter(styles) {
        return (
            <div style={(styles.footer)}>
                <span style={(styles.companyInfo)}>
                    沪ICP备16025182号-122
                    <span style={(styles.separator)}>|</span>
                    ©2016 e-ports.com, All Rights Reserved.
                </span>
            </div>
        )
    }

    render() {
        let styles = getStyles(this.props, this.context);
        return (
            <div style={(styles.root)}>
                <div style={({width: this.state.containerWidth, margin: '0 auto'})}>
                    <div style={(styles.content)}>
                        {this.renderLinks(styles)}
                        <div style={(styles.contentMiddle)}></div>
                        {this.renderBasicInfo(styles)}
                    </div>
                    <div style={(styles.clear)}></div>
                    {this.renderFooter(styles)}
                </div>

                <EventListener
                    target={window}
                    onResize={this._updateDeviceSize}
                    onLoad={this._updateDeviceSize}
                />
            </div>
        );
    }

    jumpLink(address) {
        browserHistory.push(address);
    }

    _updateDeviceSize = () => {
        this.setState({containerWidth: window.innerWidth > 1367 ? 1190 : 990})
    };
};
