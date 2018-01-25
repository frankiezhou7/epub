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
      background: '#f5f5f5',
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

  getChildContext() {
    return {
      location: this.props.location
    };
  }

  render() {
    const {prepareStyles} = this.context.muiTheme;
    let styles = getStyles(this.props,this.state,this.context);
    const home = this.props.home;
    return (
      <div style = {prepareStyles(styles.root)}>
        <Helmet
            title= {this.props.nLabelHomeHeaderTitle}
            titleTemplate={" %s | "+this.props.nLabelEPorts}
            meta={[
                {"name": "description", "content": this.props.nLabelHomeHeaderDescription}
            ]}
        />
        <HomeHeader
          totalServices = {home.counts.agencies+home.counts.suppliers+home.counts.inspections}
          totalPorts = {home.counts.ports}
        />
        <HomeContent home = {home}/>
        <Footer/>
      </div>
    );
  }
}
