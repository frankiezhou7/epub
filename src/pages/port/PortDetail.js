import React from 'react';
import Divider from 'epui-md/lib/Divider';
import PortInfo from 'epui-md/lib/ep/port/PortInfo';
import PortFunction from 'epui-md/lib/ep/port/PortFunction';
import Tug from 'epui-md/lib/ep/port/Tug';
import Tide from 'epui-md/lib/ep/port/Tide';
import PilotStation from 'epui-md/lib/ep/port/PilotStation';
import MainlyCargo from 'epui-md/lib/ep/port/MainlyCargo';
import ShipLimit from 'epui-md/lib/ep/port/ShipLimit';
import Loading from 'epui-md/lib/ep/RefreshIndicator';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as portActions from '../../redux/reducers/port';
import * as shipLimitActions from '../../redux/reducers/shipLimit';
import Helmet from "react-helmet";
import { displayWithLimit } from 'epui-md/lib/utils/methods';
import { browserHistory } from 'react-router';
import _ from 'eplodash';

const PropTypes = React.PropTypes;

const getStyles =(props,context)=>{
  const theme = context.muiTheme;
  const padding = 24;
  let styles = {
    root:{
      padding: padding,
    },
    divider:{
      marginTop: padding,
      marginLeft: -padding,
      marginRight: -padding,
      marginBottom: padding,
    },
    loading:{
      fontSize: 16,
      textAlign: 'center',
      color: theme.epColor.primaryColor,
    }
  }
  if(props.style){
    styles.root = Object.assign(styles.root,props.style);
  }
  return styles;
};

@connect(
  state => ({
    isFetching: state.port.isFetching,
    isShipLimitDataFetching: state.shipLimitDatas.isFetching,
    shipLimitDatas: state.shipLimitDatas.datas,
    port: state.port.port,
    error: state.port.error
  }),
  dispatch =>({
    ...bindActionCreators({
      findPortShipLimitByCargoType: shipLimitActions.findPortShipLimitByCargoType
    },dispatch)
  })
)
export default class PortDetail extends React.Component{

  static need = [portActions.findPortById,shipLimitActions.findPortShipLimitByCargoType]

  static propTypes = {
    style: PropTypes.object,
    port : PropTypes.object.isRequired,
    nLabelPortShipLimitDescription:  PropTypes.string,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
    router: PropTypes.object,
  };

  static childContextTypes = {
    muiTheme: PropTypes.object,
    location: React.PropTypes.object
  };

  getChildContext() {
    return {
      location: this.props.location
    };
  }

  static defaultProps = {
    nLabelPortShipLimitDescription: 'Max ship limit for port : ',
    port: {}
  };

  handleCargoChange = (index,value)=>{
    this.props.findPortShipLimitByCargoType({cargoType: value, portId : this.props.params.portId});
  }

  render() {

    if(this.props.error && this.props.error.status === 404){
      browserHistory.push('/404');
      return null;
    }

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);
    const port = this.props.port;
    const loadingElem = (<Loading />);
    const menuItems = _.map(port.payloadTypes,payloadType=>{
      return _.pick(payloadType.payloadType,'_id','code','name');
    });
    const portElem = this.props.isFetching ===true ? loadingElem : _.isEmpty(port) ? null : (
      <div>
        <PortInfo port = {port} />
        <Divider style = {styles.divider} />
        <ShipLimit
          item = {port}
          menuItems ={menuItems}
          description= {this.props.nLabelPortShipLimitDescription + port.name}
          isFetching = {this.props.isShipLimitDataFetching}
          datas = {this.props.shipLimitDatas}
          onCargoChange = {this.handleCargoChange}
        />
        <Divider style = {styles.divider} />
        <PortFunction abilities = {port.abilities} />
        <Divider style = {styles.divider} />
        <MainlyCargo payloadTypes = {port.payloadTypes} />
        <Divider style = {styles.divider} />
        <Tug tugs = {port.tugs} />
        <Divider style = {styles.divider} />
        <PilotStation pilotStation = {port.pilotStation} />
        <Divider style = {styles.divider} />
        <Tide tide = {port.tide} waterDensity={port.waterDensity}/>
      </div>
    );
    return (
      <div style = {prepareStyles(styles.root)}>
        <Helmet
            title= {port.name}
            meta={[
                {"name": "description", "content": displayWithLimit(port.name, 20)}
            ]}
        />
        {portElem}
      </div>
    );
  }
};
