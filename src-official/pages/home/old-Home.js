import React, { Component } from 'react';
import HomeHeader from '../../components/HomeHeader';
import HomeContent from '../../components/HomeContent';
import Footer from '../../components/Footer';
import {connect} from 'react-redux';
import * as homeActions from '../../redux/reducers/home';
import Helmet from "react-helmet";
import _ from 'eplodash';

const PropTypes = React.PropTypes;

const getStyles = ()=>{
  const styles = {
    root:{
      background: '#e3effb',
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
    homeActions.findHomeAgencies,
    homeActions.findHomeSuppliers,
    homeActions.findHomeShipyards,
    homeActions.findHomeOthers,
    homeActions.findHomeCounts,
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
    let window = window;
    let This = this;
    return (
      <div style = {prepareStyles(styles.root)}>
        <Helmet
            title= {this.props.nLabelHomeHeaderTitle}
            titleTemplate={" %s | "+this.props.nLabelEPorts}
            meta={[
                {"name": "description", "content": this.props.nLabelHomeHeaderDescription}
            ]}
        />
          <div>
            <HomeHeader
              ref='header'
              totalServices = {home.counts.agencies+home.counts.suppliers+home.counts.inspections}
              totalPorts = {home.counts.ports}
              isScroll={this.state.isScroll}
            />
            <HomeContent
              home = {home}
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

  _handleWindowScroll = (e) => {
    let target = e.target;
    let scrollingElement = target.scrollingElement
    let scrollTop = scrollingElement.scrollTop;
    this.setState({
      isScroll: scrollTop > 100,
    })
  }
}
