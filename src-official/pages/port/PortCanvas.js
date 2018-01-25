import React from 'react';
import Paper from 'epui-md/lib/Paper';
import DropDownMenu from 'epui-md/lib/ep/EPDropDownMenu';
import MenuItem from 'epui-md/lib/MenuItem';
import EventListener from 'epui-md/lib/internal/EventListener';
import SummaryCard from 'epui-md/lib/ep/SummaryCard';
import ChineseFlag from 'epui-md/lib/svg-icons/ep/port/ChineseFlag';
import Loading from 'epui-md/lib/ep/RefreshIndicator';
import MenuCrumbs2 from '../../components/MenuCrumbs2';
import Tabs from 'epui-md/lib/Tabs/TabsSimple';
import Tab from 'epui-md/lib/Tabs/TabSimple';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as portActions from '../../redux/reducers/port';
import * as regulationActions from '../../redux/reducers/regulation';
import * as homeActions from '../../redux/reducers/home';
import * as recommendationActions from '../../redux/reducers/recommendation';
import { browserHistory } from 'react-router';
import _ from 'eplodash';

const Sizes = {
  MD: 1190,
  SM: 990,
}

const TAB_VALUE = {
  PORT : 'port',
  TERMINAL: 'terminal',
  ANCHORAGE: 'anchorage'
};
const PropTypes = React.PropTypes;

const getStyles = (props, state, context) => {
  //const showRight = !_.isEmpty(props.serviceProviders.suppliers) || !_.isEmpty(props.serviceProviders.agencies);
  const showRight = true;
  const theme = context.muiTheme;
  const padding = 24;
  let styles = {
    root:{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    flag:{
      width: 36,
      height: 18,
    },
    header:{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      color: theme.epColor.primaryColor,
      marginBottom: 10,
    },
    name:{
      fontSize: 24,
      fontWeight: 500,
      marginRight: 10,
    },
    title:{
      fontSize: 16,
      fontWeight: 500,
      marginLeft: 10,
      height: 28,
    },
    portInfo:{
      marginTop: 20,
      position: 'relative',
    },
    left:{
      marginRight: 'auto',
      marginLeft: 'auto',
      width: state.deviceSize,
      marginBottom: '30px'
    },
    leftContainer:{
      width: '100%',
    },
    right:{
      display: 'none',
      marginTop: 20,
      width: showRight ? 336 : 0,
    },
    recommendation:{

    },
    subTitle:{
      display: 'block',
      color: theme.epColor.fontColor,
      fontSize: 12,
      marginLeft: 10,
    },
    tab:{
      fontSize: 14,
      color: theme.epColor.primaryColor,
      float: 'left',
    },
    inkBar: _.merge({}, theme.inkBar, {
      height: 48,
      marginTop: 30,
      backgroundColor: '#EDF5FE'
    }),
    tabItemContainer:{
      backgroundColor: 'none',
      borderBottom: '1px solid #D8D8D8',
      position: 'absolute',
      height: 48,
      zIndex: 99,
    },
    underline:{
      display: 'none',
    },
    label:{
      color: theme.epColor.primaryColor,
    },
    icon:{
      fill: theme.epColor.primaryColor,
    },
    control:{
      cursor: 'pointer',
    },
    card:{
      width: '100%',
    },
      tips:{
      width: '100%',
      marginTop: '200px',
      marginBottom: '200px',
      fontSize: '24px',
      textAlign: 'center',
    },
    menu: {
      paddingBottom: 20,
    }

  }
  return styles;
};

@connect(
  state => ({
    userIsFetching: state.user.isFetching,
    user: state.user.user,
    isFetching: state.port.isFetching,
    port: state.port.port,
    error: state.port.error,
    serviceProviders : state.recommendation.serviceProviders
  }),
  dispatch =>({
    ...bindActionCreators({
      findPortById: portActions.findPortById,
      findServiceProviders: recommendationActions.findRecommendableServiceProviders,
      findRecommendableServiceProviders: recommendationActions.findRecommendableServiceProviders
    },dispatch)
  })
)
export default class PortCanvas extends React.Component{

  static need = [
    regulationActions.findRegulations,
    recommendationActions.findRecommendableRegulations,
    homeActions.findHomeNews,
  ];

  static propTypes = {
    children: PropTypes.element,
    nLabelRecommendableProvider: PropTypes.string,
    nLabelAgency: PropTypes.string,
    nLabelSupplyer: PropTypes.string,
    port : PropTypes.object.isRequired,
    error: PropTypes.object,
    serviceProviders: PropTypes.object.isRequired,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
    router: PropTypes.object,
  };

  static childContextTypes = {
    muiTheme: PropTypes.object,
    location: React.PropTypes.object
  };

  static defaultProps ={
    nLabelRecommendableProvider: 'Recommendable Service Provider',
    nLabelAgency: 'Agency : ',
    nLabelSupplyer: 'Supplyer : ',
    serviceProviders:{
      agencies:[],
      suppliers:[]
    },
    port : {}
  };

  constructor(props,context){
    super(props,context);
    let tabValue = TAB_VALUE.PORT;
    const currPath = this.props.location.pathname;
    const params = this.props.params;
    const port = this.props.port;
    const hasTerminal = port && _.isArray(port.terminals) && port.terminals.length > 0;
    const hasAnchorage = port && _.isArray(port.anchorages) && port.anchorages.length > 0;
    let  terminalId = hasTerminal && port.terminals[0] ? port.terminals[0]._id : '';
    let  anchorageId = hasAnchorage && port.anchorages[0] ? port.anchorages[0]._id : '';
    if(this.props.params.terminalId){
      tabValue = TAB_VALUE.TERMINAL;
      terminalId = this.props.params.terminalId;
    }else if(this.props.params.anchorageId){
      tabValue = TAB_VALUE.ANCHORAGE;
      anchorageId = this.props.params.terminalId;
    }
    this.state = {
      value: tabValue,
      terminalId:terminalId,
      anchorageId : anchorageId,
      deviceSize: window.innerWidth >= 1366 ? Sizes.MD : Sizes.SM,
    }
  }

  getChildContext() {
    return {
      location: this.props.location
    };
  }

  componentWillMount() {
    const { port,
            serviceProviders,
            findRecommendableServiceProviders,
            findPortById,
            findServiceProviders,
            params
          } = this.props;
    // if(!port || _.isEmpty(port)){
    //   findPortById(_.pick(params,'portId'));
    // }
    // if(!serviceProviders || (_.isEmpty(serviceProviders.agencies) && _.isEmpty(serviceProviders.suppliers))){
    //   findServiceProviders(_.pick(params,'portId'));
    // }
    //
    // findRecommendableServiceProviders(_.pick(params,'portId'));

    if(this.props.error && this.props.error.status === 404){
      browserHistory && browserHistory.push('/404');
      return null;
    }else if(!__SERVER__ && this.props.port && this.props.port.visibleStatus === 2){
      browserHistory && browserHistory.push('/404');
      return null;
    }
  }

  componentDidMount(){
    localStorage ? localStorage.setItem('PREVIOUS_URL', window.location.href) : null;
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user !== this.props.user && !this.isLoggedIn(nextProps)){
      browserHistory && browserHistory.push('/login?' + this.props.location.pathname);
    }
  }

  handleChange = (value) =>{
    this.setState({value: value},()=>{
      const params = this.props.params;
      const portId = this.props.port ? this.props.port._id : undefined;
      const terminalId = this.refs.terminalMenu && this.refs.terminalMenu.getValue();
      const anchorageId = this.refs.anchorageMenu && this.refs.anchorageMenu.getValue();
      switch (value) {
        case TAB_VALUE.PORT:
            if(portId) browserHistory.push(`/port/${portId}`);
          break;
        case TAB_VALUE.TERMINAL:
            if(terminalId) browserHistory.push(`/port/${portId}/terminal/${terminalId}`);
          break;
        case TAB_VALUE.ANCHORAGE:
            if(anchorageId) browserHistory.push(`/port/${portId}/anchorage/${anchorageId}`);
          break;
        default:
          browserHistory.push(`/port/${portId}`);
      }
    });
  }

  handleSummaryCardTouchTap = (event,item)=>{
    browserHistory.push(`/organization/${item._id}`);
  }

  handleTeminalChange = (event, index, value)=>{
    browserHistory.push(`/port/${this.props.port._id}/terminal/${value}`);
  }

  handleAnchorageChange = (event, index, value)=>{
    browserHistory.push(`/port/${this.props.port._id}/anchorage/${value}`);
  }

  isLoggedIn = (props) => {
    props = props || this.props;

    return props.user && !!props.user._id;
  }

  renderBody(){

  }

  render() {
    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.state, this.context);

    const headerStyle = prepareStyles(styles.header);
    const nameStyle = prepareStyles(styles.name);
    const titleStyle = prepareStyles(styles.title);
    const recommendationStyle = prepareStyles(styles.recommendation);
    const subTitleStyle = prepareStyles(styles.subTitle);
    const port = this.props.port;
    const params = this.props.params;
    const hasTerminal = port && _.isArray(port.terminals) && port.terminals.length > 0;
    const hasAnchorage = port && _.isArray(port.anchorages) && port.anchorages.length > 0;
    const terminalMenu = hasTerminal ? (
      <DropDownMenu
        ref = 'terminalMenu'
        value={params.terminalId ? params.terminalId : port.terminals[0]._id}
        onChange={this.handleTeminalChange}
        labelStyle={styles.label}
        iconStyle={styles.icon}
        controlStyle ={styles.control}
        underlineStyle={styles.underline}
        disabled={this.state.value !== TAB_VALUE.TERMINAL}
      >
        {
          _.map(port.terminals,(terminal)=>{
            return (<MenuItem key = {terminal._id} value={terminal._id} primaryText={terminal.name} />);
          })
        }
      </DropDownMenu>
    ):null;

    const anchorageMenu =   hasAnchorage ? (
      <DropDownMenu
        ref = 'anchorageMenu'
        value={params.anchorageId ? params.anchorageId : port.anchorages[0]._id }
        onChange={this.handleAnchorageChange}
        labelStyle={styles.label}
        iconStyle={styles.icon}
        controlStyle ={styles.control}
        underlineStyle={styles.underline}
        disabled={this.state.value !== TAB_VALUE.ANCHORAGE}
      >
        {
          _.map(port.anchorages,(anchorage)=>{
            return (<MenuItem key = {anchorage._id} value={anchorage._id} primaryText={anchorage.name} />);
          })
        }
      </DropDownMenu>
    ):null;


    const agenciesElem = !_.isEmpty(this.props.serviceProviders.agencies) ?(
      <div style = {recommendationStyle}>
          <span style = {subTitleStyle}>{this.props.nLabelAgency}</span>
          {_.map(this.props.serviceProviders.agencies,agency =>{
            return (
              <SummaryCard
                style = {styles.card}
                key = {agency._id}
                categories = {agency.categories}
                showSummary = {false}
                onTouchTap = {this.handleSummaryCardTouchTap}
                item = {agency}
              />
            );
          })}
      </div>
    ):null;

    const suppliersElem = !_.isEmpty(this.props.serviceProviders.suppliers) ?(
      <div style = {recommendationStyle}>
          <span style = {subTitleStyle}>{this.props.nLabelSupplyer}</span>
            {_.map(this.props.serviceProviders.suppliers,supplier =>{
              return (
                <SummaryCard
                  style = {styles.card}
                  key = {supplier._id}
                  categories = {supplier.categories}
                  showSummary = {false}
                  onTouchTap = {this.handleSummaryCardTouchTap}
                  item = {supplier}
                />
              );
            })}
      </div>
    ):null;

    const recommendationTitle = !_.isEmpty(this.props.serviceProviders.suppliers) ||
    !_.isEmpty(this.props.serviceProviders.agencies) ?
    (
      <div style = {headerStyle}>
        <span style = {titleStyle}>{this.props.nLabelRecommendableProvider}</span>
      </div>
    ):null;

    let navArr = [
      {
        value: 'Home',
        link: '/'
      },
      {
        value: 'Port: ' + (port ? port.name : ' - ')
      }
    ]

    return (
      <div style = {prepareStyles(styles.root)}>
        <EventListener
          target={window}
          onResize={this._updateDeviceSize}
          onLoad={this._updateDeviceSize}
        />
        {!!_.get(this.props.user, '_id') ? <div style = {prepareStyles(styles.left)}>
          <div style = {prepareStyles(styles.portInfo)}>
            <div style = {styles.menu}><MenuCrumbs2 navArr={navArr} /></div>
            <div style = {headerStyle}>
              <span style = {nameStyle}>{port ? port.name : ' - '}</span>
              <ChineseFlag style = {styles.flag} viewBox = {'0 0 36 24'} />
            </div>
            <Paper style = {styles.leftContainer} zDepth={0} >
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                inkBarStyle = {styles.inkBar}
                tabItemContainerStyle = {styles.tabItemContainer}
              >
                <Tab label="OVERALL" value={TAB_VALUE.PORT}  style = {styles.tab} />
                <Tab label={terminalMenu} value={TAB_VALUE.TERMINAL} style = {styles.tab} />
                <Tab label={anchorageMenu} value={TAB_VALUE.ANCHORAGE} style = {styles.tab} />
              </Tabs>
              <div>
                {this.props.children}
              </div>
            </Paper>
           </div>
         </div> : <div style={{margin: '200px auto'}}>Checking loging status, please wait ...</div>}
        <div style = {prepareStyles(styles.right)}>
          {recommendationTitle}
          {agenciesElem}
          {suppliersElem}
        </div>
      </div>
    )
  }
  _updateDeviceSize = () => {
    let width = window.innerWidth;
    if( width > 1366) {
      this.setState({deviceSize: Sizes.MD})
    }else {
      this.setState({deviceSize: Sizes.SM})
    }
  }
};
