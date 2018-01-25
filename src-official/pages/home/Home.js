import React, { Component } from 'react';
import HomeHeader from '../../components/HomeHeader';
import HomeContent from '../../components/HomeContent';
import EventListener from 'epui-md/lib/internal/EventListener';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {connect} from 'react-redux';
import * as homeActions from '../../redux/reducers/home';
import * as regulationActions from '../../redux/reducers/regulation';
import * as recommendationActions from '../../redux/reducers/recommendation';
import Helmet from "react-helmet";
import _ from 'eplodash';

const PropTypes = React.PropTypes;

const Sizes = {
  SMALL: 1,
  LARGE: 0,
};

const getStyles = ()=>{
  const styles = {
    root:{
      overflowY: 'auto',
      overflowX: 'hidden',
      // height: '100%',
    },
  };
  return styles;
};

@connect(state => ({home: state.home}),homeActions)
export default class Home extends Component {

  static need = [
    homeActions.findHomeNews,
    homeActions.findHomeInspections,
    homeActions.findHomePorts,
    homeActions.findHomeRegulations,
    homeActions.findHomeAgencies,
    homeActions.findHomeSuppliers,
    homeActions.findHomeSPROs,
    homeActions.findHomeWorkshops,
    homeActions.findHomeShipyards,
    homeActions.findHomeOthers,
    homeActions.findHomeBanners,
    homeActions.findHomePartnership,
    homeActions.findHomePartnershipDisplay,
    regulationActions.findRegulations,
    recommendationActions.findRecommendableRegulations,
  ];

  static propTypes = {
    home : React.PropTypes.object.isRequired,
    nLabelHomeHeaderTitle:React.PropTypes.string,
    nLabelEPorts:React.PropTypes.string,
    nLabelHomeHeaderDescription:React.PropTypes.string,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
    router: PropTypes.object,
  };

  static childContextTypes = {
    muiTheme: PropTypes.object,
    location: React.PropTypes.object,
  };

  static defaultProps ={
    home:{ },
    nLabelEPorts: 'E-PORTS',
    nLabelHomeHeaderTitle: 'Home Page For E-Ports',
    nLabelHomeHeaderDescription: 'Home Page Meta Description',
  };

  constructor(props) {
    super(props);

    this.state = {
      isScroll: false,
    };
  }

  getChildContext() {
    return {
      location: this.props.location
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this._handleWindowScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._handleWindowScroll);
  }

  render() {
    const {prepareStyles} = this.context.muiTheme;
    let styles = getStyles(this.props,this.state,this.context);
    const home = this.props.home;
    let { deviceSize } = this.state;
    return (
      <div style = {prepareStyles(styles.root)}>
        <Helmet
            title= {this.props.nLabelHomeHeaderTitle}
            titleTemplate={" %s | "+this.props.nLabelEPorts}
            meta={[
                {"name": "description", "content": this.props.nLabelHomeHeaderDescription}
            ]}
        />
          <EventListener
            target={window}
            onResize={this._updateDeviceSize}
            onLoad={this._updateDeviceSize}
          />
          <div>
            {/*<HomeHeader
              ref='header'
              totalServices = {home.counts.agencies+home.counts.suppliers+home.counts.inspections}
              totalPorts = {home.counts.ports}
            />*/}
            <Header isScroll={this.state.isScroll} deviceSize={deviceSize ? 990 : 1190}/>
            <HomeContent
              ref='content'
              home = {home}
              size = {this.state.deviceSize}
              showLogin = {this._handleShowLogin}
            />
          </div>
        <Footer/>
      </div>
    );
  }

  _handleShowLogin = () =>{
    this.refs.header.getWrappedInstance().showLogin();
  }

  _updateDeviceSize = () => {
    let width = window.innerWidth;
    if( width >= 1366) { this.setState({deviceSize: Sizes.LARGE}); }
    else this.setState({deviceSize: Sizes.SMALL});
  }

  _handleWindowScroll = (e) => {
    let target = e.target;
    let scrollingElement = target.scrollingElement
    let scrollTop = scrollingElement.scrollTop;
    let size = this.state.deviceSize ? 400 : 500;
    this.setState({
      isScroll: scrollTop > 142 + size,
    });
  }
}
