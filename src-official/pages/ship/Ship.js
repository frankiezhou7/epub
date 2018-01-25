import React from 'react';
import Divider from 'epui-md/lib/Divider';
import Paper from 'epui-md/lib/Paper';
import ShipManagement from 'epui-md/lib/ep/ship/ShipManagement';
import GeneralInformation from 'epui-md/lib/ep/ship/GeneralInformation';
import BeamHeightDepth from 'epui-md/lib/ep/ship/BeamHeightDepth';
import LoadWaterLines from 'epui-md/lib/ep/ship/LoadWaterLines';
import MenuCrumbs2 from '../../components/MenuCrumbs2';
import Hold from 'epui-md/lib/ep/ship/Hold';
import EventListener from 'epui-md/lib/internal/EventListener';
import MainEngine from 'epui-md/lib/ep/ship/MainEngine';
import DisplacementTPC from 'epui-md/lib/ep/ship/DisplacementTPC';
import SpeedPropeller from 'epui-md/lib/ep/ship/SpeedPropeller';
import LOA from 'epui-md/lib/ep/ship/LOA';
import Tonnage from 'epui-md/lib/ep/ship/Tonnage';
import Crane from 'epui-md/lib/ep/ship/Crane';
import ContactInfo from 'epui-md/lib/ep/ship/ContactInfo';
import { getNameByCode } from 'epui-md/lib/utils/methods';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as basicTypesActions from '../../redux/reducers/basicTypes';
import * as shipActions from '../../redux/reducers/ship';
import Helmet from "react-helmet";
import { displayWithLimit } from 'epui-md/lib/utils/methods';
import { browserHistory } from 'react-router';

import _ from 'eplodash';

const Sizes = {
  MD: 1190,
  SM: 990,
}

const PropTypes = React.PropTypes;

const getStyles =(props, state, context)=>{
  const theme = context.muiTheme;
  const shipTheme = theme.ship;
  const statusColor = props.ship.status ? shipTheme.statusColor[props.ship.status] : theme.epColor.primaryColor;
  const padding = 30;
  let styles = {
    root:{
    },
    header:{
      marginTop: 20,
      paddingBottom: 30,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderBottom: '1px solid rgb(224, 224, 224)'
    },
    headerLeft:{
      color: theme.epColor.primaryColor,
      flexGrow: 1,
    },
    title:{
      display: 'block',
      fontSize: 24,
      fontWeight: 500,
      color: theme.epColor.primaryColor,
      wordBreak: 'break-word',
    },
    subTitle:{
      marginTop: 10,
      display: 'block',
      fontSize: 18,
      fontWeight: 400,
      color: theme.epColor.fontColor,
      textAlign:'left',
    },
    left:{
      width: state.deviceSize,
      marginBottom: 40
    },
    right:{
      marginTop: 10,
      width: 336,
    },
    wraper:{
      marginTop: 21,
      paddingTop: 10,
    },
    branch:{
      marginTop: 20,
    },
    name:{
      fontSize: 16,
      fontWeight: 500,
      color:theme.epColor.primaryColor,
    },
    content:{
    },
    summaryCard:{
      width: '100%',
      marginLeft: 0,
      marginRight: 0,
    },
    headerRight:{
      flexGrow: 1,
      overflow: 'hidden',
    },
    tag:{
      color: 'white',
      backgroundColor: shipTheme.typeColor,
      paddingTop: 3,
      paddingBottom: 3,
      paddingLeft: 5,
      paddingRight: 5,
      fontWeight: 500,
      fontSize: 12,
      borderRadius: 2,
      marginBottom: 5,
      borderRadius: 2,
      marginLeft: 10,
      display: 'inline-block',
    },
    status:{
      marginLeft: 5,
      color: 'white',
      backgroundColor: statusColor,
      paddingTop: 3,
      paddingBottom: 3,
      paddingLeft: 5,
      paddingRight: 5,
      fontWeight: 500,
      fontSize: 12,
      borderRadius: 2,
      marginBottom: 5,
      borderRadius: 2,
      display: 'inline-block',
    },
    divider:{
      marginTop: padding,
      // marginLeft: -padding,
      // marginRight: -padding,
      marginBottom: padding,
    },
    tips:{
      width: '100%',
      marginTop: '200px',
      marginBottom: '200px',
      fontSize: '24px',
      textAlign: 'center',
    },
    menu: {
      paddingTop: 20,
    }
  };
  return styles;
};

@connect(
  state => ({
    user: state.user.user,
    userIsFecthing:state.user.isFetching,
    isFetching: state.ship.isFetching,
    isBasictypesFetching: state.basicTypes.isFetching,
    basicTypes : state.basicTypes.basicTypes.ship,
    error: state.ship.error,
    ship: state.ship.ship,
  }),
  dispatch =>({
    ...bindActionCreators({
      findShipById: shipActions.findShipById,
      findBasicShipTypes: basicTypesActions.findBasicShipTypes
    },dispatch)
  })
)
export default class Ship extends React.Component{

  static need = [shipActions.findShipById,basicTypesActions.findBasicShipTypes];

  static propTypes = {
    children: PropTypes.element,
    nLabelImo : PropTypes.string,
    ship : PropTypes.object.isRequired,
    user: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
    router: PropTypes.object,
  };

  static defaultProps ={
    nLabelImo: 'IMO : ',
    ship:{}
  };

  constructor(props){
    super(props);
    this.state = {
      deviceSize: window.innerWidth >= 1366 ? Sizes.MD : Sizes.SM,
    }
  }

  componentWillMount(){


    if(this.props.error && this.props.error.status === 404){
      browserHistory.push('/404');
      return null;
    }else if(!__SERVER__ && this.props.ship && this.props.ship.visibleStatus === 2){
      browserHistory.push('/404');
      return null;
    }
  }

  componentDidMount() {
    localStorage ? localStorage.setItem('PREVIOUS_URL', window.location.href) : null;
    const basicTypes = this.props.basicTypes;
    if(_.isEmpty(basicTypes.shipTypes)){
      this.props.findBasicShipTypes();
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user !== this.props.user){
      if(!__SERVER__ && this.props.ship && this.props.ship.visibleStatus === 1 && !this.isLoggedIn(nextProps)) {
        browserHistory.push('/login?' + this.props.location.pathname);
        return null;
      }
    }
  }

  isLoggedIn= (props) => {
    props = props || this.props;

    return props.user && props.user._id;
  }

  render() {
    const { prepareStyles } = this.context.muiTheme;
    const styles = getStyles(this.props, this.state, this.context);

    const ship = this.props.ship;
    const shipTypes = this.props.basicTypes.shipTypes;
    const shipStatusTypes = this.props.basicTypes.shipStatusTypes;
    const classifications = this.props.basicTypes.classifications;
    const organizationRoles = this.props.basicTypes.organizationRoles;
    const piclubs = this.props.basicTypes.piclubs;

    //prepare Styles
    const headerStyle = prepareStyles(styles.header);
    const titleStyle = prepareStyles(styles.title);
    const subTitleStyle = prepareStyles(styles.subTitle);
    const branchStyle = prepareStyles(styles.branch);
    const nameStyle = prepareStyles(styles.name);
    const contentStyle = prepareStyles(styles.content);
    const headerLeftStyle = prepareStyles(styles.headerLeft);
    const headerRightStyle = prepareStyles(styles.headerRight);
    const statusStyle = prepareStyles(styles.status);
    const tagStyle = prepareStyles(styles.tag);

    const shipTypeElem = ship.type ? (
      <span style = {tagStyle}>{getNameByCode(shipTypes,ship.type).toUpperCase()}</span>
    ): null;

    const shipStatusElem = ship.status ? (
      <span style = {statusStyle}>{getNameByCode(shipStatusTypes,ship.status).toUpperCase()}</span>
    ): null;

    let navArr = [
      {
        value: 'Home',
        link: '/'
      },
      {
        value: 'Ship: ' + ship.name,
      }
    ]

    return (
      <div style = {prepareStyles(styles.root)}>
        <Helmet
            title= {ship.name}
            meta={[
                {"name": "description", "content": displayWithLimit(ship.name, 20)}
            ]}
        />
        <EventListener
          target={window}
          onResize={this._updateDeviceSize}
          onLoad={this._updateDeviceSize}
        />
        <div style = {prepareStyles(styles.left)}>
          <div style = {styles.menu}><MenuCrumbs2 navArr={navArr} /></div>
          <div style = {headerStyle} >
            <div style = {headerLeftStyle}>
              <div style = {titleStyle}>{ship.name}</div>
              <div style = {subTitleStyle}>
                {this.props.nLabelImo + ship.imo}
                {shipTypeElem}
                {shipStatusElem}
              </div>
            </div>
          </div>
          <Paper style = {styles.wraper} zDepth='0'>
            <ShipManagement
              managements = {ship.managements}
              organizationRoles = {organizationRoles}
            />
            <Divider style = {styles.divider} />
            <GeneralInformation ship = {_.pick(ship,'contactMethods','nationality','portOfRegistry','officialNo','piClub','classNotation')}
              classifications = {classifications}
              piclubs = {piclubs}
            />
            <Divider style = {styles.divider} />
            <BeamHeightDepth ship = {_.pick(ship,'depth','height','breadth')}/>
            <Divider style = {styles.divider} />
            <LOA shipLength = {ship.length}/>
            <Divider style = {styles.divider} />
            <Tonnage ship = {_.pick(ship,'grt','nrt')}/>
            <Divider style = {styles.divider} />
            <LoadWaterLines loadLines = {ship.loadLines}/>
            <Divider style = {styles.divider} />
            <DisplacementTPC ship = {_.pick(ship,'tpc','displacement')}/>
            <Divider style = {styles.divider} />
            <MainEngine ship = {_.pick(ship,'mainEngine','auxEngines')}/>
            <Divider style = {styles.divider} />
            <SpeedPropeller ship = {_.pick(ship,'speed','propeller')}/>
            <Divider style = {styles.divider} />
            <Hold holds = {ship.holds}/>
            <Divider style = {styles.divider} />
            <Crane crane = {ship.crane}/>
            <Divider style = {styles.divider} />
            <ContactInfo contactMethods = {ship.contactMethods}/>
          </Paper>
        </div>
      </div>
    );
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
