import React, { PropTypes } from 'react';
import AgencyShip from 'epui-md/lib/svg-icons/ep/agency-ship';
import AgencyVoyage from 'epui-md/lib/svg-icons/ep/agency-voyage';
import AgencyCart from 'epui-md/lib/svg-icons/ep/agency-cart';
import AgencyRight from 'epui-md/lib/svg-icons/ep/agency-right';
import _ from 'eplodash';

const getStyles =(props, context)=>{
  return {
    root: {
      padding: '40px 0',
      textAlign: 'center',
      overflow: 'hidden',
    },
    icon: {
      width: '63px',
      height: '63px',
      fill: '#7C7C7C',
      display: 'block',
      margin: '0 auto',
    },
    iconRight: {
      width: '28px',
      height: '33px',
      fill: '#F2B654',
      display: 'block',
      marginTop: '100px',
    },
    content: {
      float: 'left',
      width: '30%',
      height: '170px',
    },
    content2: {
      float: 'left',
      width: '5%',
      height: '170px',
    },
    order: {
      fontSize: '22px',
      color: '#F5A623',
      fontWeight: '500',
      marginTop: '40px',
      textTransform: 'uppercase'
    },
    title: {
      marginTop: '14px',
      fontSize: '16px',
      color: 'rgba(0,0,0,.54)',
    }
  }
}

export default class agencyDeskStep extends React.Component{

  static contextTypes = {
  	muiTheme: PropTypes.object,
  }

  static propTypes = {
    nStep1: PropTypes.string,
    nStep2: PropTypes.string,
    nStep3: PropTypes.string,
    nStepShip: PropTypes.string,
    nStepVoyage: PropTypes.string,
    nStepCart: PropTypes.string,
  }

  static defaultProps = {
    nStep1: "step 1",
    nStep2: "step 2",
    nStep3: "step 3",
    nStepShip: "Search/Register Your Ship",
    nStepVoyage: "Create an Voyage",
    nStepCart: "Create Order",
  }

  renderShip(style){
    const { nStep1, nStepShip } = this.props;
    return (
      <div style={style.content}>
        <AgencyShip style={style.icon} />
        <div style={style.order}>{nStep1}</div>
        <div style={style.title}>{nStepShip}</div>
      </div>
    )
  }

  renderVoyage(style){
    const { nStep2, nStepVoyage } = this.props;
    return (
      <div style={style.content}>
        <AgencyVoyage style={style.icon} />
        <div style={style.order}>{nStep2}</div>
        <div style={style.title}>{nStepVoyage}</div>
      </div>
    )
  }

  renderCart(style){
    const { nStep3, nStepCart } = this.props;
    return (
      <div style={style.content}>
        <AgencyCart style={style.icon} />
        <div style={style.order}>{nStep3}</div>
        <div style={style.title}>{nStepCart}</div>
      </div>
    )
  }

  renderRight(style){
    return (
      <div style={style.content2}>
        <AgencyRight style={style.iconRight} />
      </div>
    )
  }

  render(){
    const { prepareStyles } = this.context.muiTheme;
    const style = getStyles(this.props, this.context);
    return(
      <div style={style.root}>
        {this.renderShip(style)}
        {this.renderRight(style)}
        {this.renderVoyage(style)}
        {this.renderRight(style)}
        {this.renderCart(style)}
      </div>
    )
  }
}
