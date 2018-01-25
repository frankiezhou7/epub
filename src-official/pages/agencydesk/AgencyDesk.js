import React, { Component, PropTypes } from 'react';
import _ from 'eplodash';
import RaisedButton from 'epui-md/lib/RaisedButton';
import EventListener from 'epui-md/lib/internal/EventListener';
import ClearFix from 'epui-md/lib/internal/ClearFix';
import AgencyDeskStep from '../../components/AgencyDeskStep';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Helmet from "react-helmet";

const Sizes = {
  MD: 1190,
  SM: 990,
}

const Banner990 = require('../../../static/agencydesk990.jpg');
const Banner1190 = require('../../../static/agencydesk1190.jpg');

const getStyles = (props, state, context)=>{
  const theme = context.muiTheme;
  let bannerHeight = state.deviceSize === Sizes.MD? '477px' : '383px';
  let bannerUrl = state.deviceSize === Sizes.MD? Banner1190 : Banner990;
  return {
    root: {

    },
    bannerWin: {
      height: bannerHeight,
    },
    banner: {
      position: 'absolute',
      left: 0,
      right: 0,
      width: '100%',
      height: bannerHeight,
      backgroundImage: 'url(' + bannerUrl + ')',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundColor: '#0069aa',
    },
    container:{
      width: state.deviceSize,
      margin: 'auto',
      paddingLeft: 24,
      paddingRight: 24,
      paddingBottom: '100px',
      textAlign: 'center',
    },
    loginButton: {
      float: 'right',
      marginTop: state.deviceSize >= 1190? 100 : 80,
      width:  state.deviceSize >= 1190? 180 : 160,
      height:  state.deviceSize >= 1190? 42 : 38,
    },
    loginButtonCase: {
      textTransform: 'capitalize',
      fontSize: '20px',
      lineHeight:  state.deviceSize >= 1190? '42px' : '38px',
    },
    describe: {
      fontSize: '16px',
      color: 'rgba(0,0,0,0.54)',
      lineHeight: '24px',
      textAlign: 'justify',
    },
    link: {
      color: '#F5A623',
      fontSize: '28px',
      fontWeight: '500',
      paddingLeft: '20px',
      textDecoration: 'none',
    },
  }
}

@connect(
  state => ({
    url: state.user.url,
  }),
)

export default class setPassword extends Component {

  static contextTypes = {
  	muiTheme: PropTypes.object,
  }

  static propTypes = {
    nButtonOrder: PropTypes.string,
  }

  static defaultProps = {
    nButtonOrder: "Quick Order",
  }

  constructor(props) {
    super(props);
    this.state = {
      deviceSize: Sizes.MD,
    }
  }

  renderBanner(style){
    return(
      <div style={style.bannerWin}>
        <div style={style.banner}>
          <div style={style.container}>
            <RaisedButton
              backgroundColor='#F2B654'
              label={this.props.nButtonOrder}
              primary={false}
              secondary={true}
              labelStyle={style.loginButtonCase}
              style={style.loginButton}
              onClick={this._handleClick}
            />
          </div>
        </div>
      </div>
    )
  }

  renderBody(style){
    return(
      <div style={style.describe}>Shipping Agency Desk is a comprehensive management platform for principals and agencies, which provides IT solutions for operation efficiency、cost-saving、 information sharing、 transaction supervision and financial management.<br/><br/>Operating ships on Shipping Agency Desk makes work easier than operating with E-mail. Register on the platform you could get all ports information in China and guide price of services at any ports in 1 minute. Just move your finger and click to create an order, the platform will help you to track and supervise your order and cost.<br/><br/>Have a Try!<a href={`${this.props.url}/dashboard/quickOrder`} style={style.link}>{this.props.nButtonOrder}</a></div>
    )
  }

  render(){
    const { prepareStyles } = this.context.muiTheme;
    const style = getStyles(this.props, this.state, this.context);

    return(
      <div style={style.container}>
        <EventListener
          target={window}
          onResize={this._updateDeviceSize}
          onLoad={this._updateDeviceSize}
        />
        {this.renderBanner(style)}
        <AgencyDeskStep />
        {this.renderBody(style)}
      </div>
    )
  }

  _updateDeviceSize = () => {
    let width = window.innerWidth;
    if( width >= 1366) this.setState({deviceSize: Sizes.MD});
    else this.setState({deviceSize: Sizes.SM});
  }

  _handleClick = ()=>{
    if(this.props.url)
    window.open(`${this.props.url}/dashboard/quickOrder`);
  }
}
