import React from 'react';
import Divider from 'epui-md/lib/Divider';
import PortFunction from 'epui-md/lib/ep/port/PortFunctionSimple';
import Berths from '../../components/Berths';
import MainlyCargo from 'epui-md/lib/ep/port/MainlyCargo';
import ShipLimit from 'epui-md/lib/ep/port/ShipLimit';
import Loading from 'epui-md/lib/ep/RefreshIndicator';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as terminalActions from '../../redux/reducers/terminal';
import * as shipLimitActions from '../../redux/reducers/shipLimit';
import Helmet from "react-helmet";
import { displayWithLimit } from 'epui-md/lib/utils/methods';
import _ from 'eplodash';

const PropTypes = React.PropTypes;

const getStyles =(props,context)=>{
  const theme = context.muiTheme;
  const padding = 30;
  let styles = {
    root:{
      paddingTop: padding,
      paddingBottom: padding,
    },
    divider:{
      marginTop: padding,
      marginBottom: padding,
    },
  }
  if(props.style){
    styles.root = Object.assign(styles.root,props.style);
  }
  return styles;
};

@connect(
  state => ({
    isFetching: state.terminal.isFetching,
    isShipLimitDataFetching: state.shipLimitDatas.isFetching,
    shipLimitDatas: state.shipLimitDatas.datas,
    terminal: state.terminal.terminal,
    error: state.terminal.error
  }),
  dispatch =>({
    ...bindActionCreators({
      findTerminalShipLimitByCargoType: shipLimitActions.findTerminalShipLimitByCargoType
    },dispatch)
  })
)
export default class TerminalDetail extends React.Component{

  static need = [terminalActions.findTerminalById,shipLimitActions.findTerminalShipLimitByCargoType];

  static propTypes = {
    style: PropTypes.object,
    terminal : PropTypes.object.isRequired,
    nLabelTerminalShipLimitDescription : PropTypes.string,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
    router: PropTypes.object,
  };

  static defaultProps = {
    terminal: {},
    nLabelTerminalShipLimitDescription: 'Ship restriction for port : ',
  };

  handleCargoChange = (index,value)=>{
    this.props.findTerminalShipLimitByCargoType({
      portId: this.props.params.portId,
      cargoType: value,
      terminalId : this.props.params.terminalId
    });
  }

  render() {

    if(this.props.error && this.props.error.status === 404){
      this.props.history.push('/404');
      return null;
    }

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);
    const terminal =  this.props.terminal;
    const loadingElem = (<Loading />);
    const menuItems = _.map(terminal.payloadTypes,payloadType=>{
      return _.pick(payloadType.payloadType,'_id','code','name');
    });
    const terminalElem = this.props.isFetching ===true ? loadingElem : _.isEmpty(terminal) ? null : (
      <div>
        <ShipLimit
          item = {terminal}
          menuItems = {menuItems}
          description= {this.props.nLabelTerminalShipLimitDescription + terminal.port.name + ' - '+terminal.name}
          isFetching = {this.props.isShipLimitDataFetching}
          datas = {this.props.shipLimitDatas}
          onCargoChange = {this.handleCargoChange}
        />
        <Divider style = {styles.divider} />
        <PortFunction abilities = {terminal.abilities} />
        <Divider style = {styles.divider} />
        <MainlyCargo payloadTypes = {terminal.payloadTypes} />
        <Divider style = {styles.divider} />
        <Berths berths = {terminal.berths} params = {this.props.params}/>
      </div>
    );
    return (
      <div style = {prepareStyles(styles.root)}>
        <Helmet
            title= {terminal.name}
            meta={[
                {"name": "description", "content": displayWithLimit(terminal.name, 20)}
            ]}
        />
        {terminalElem}
      </div>
    );
  }
};
