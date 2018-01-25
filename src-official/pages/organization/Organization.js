import React from 'react';
import Divider from 'epui-md/lib/Divider';
import Paper from 'epui-md/lib/Paper';
import SummaryCard from 'epui-md/lib/ep/SummaryCard';
import Tags from 'epui-md/lib/ep/Tags';
import EventListener from 'epui-md/lib/internal/EventListener';
import OrganizationSummary from 'epui-md/lib/ep/organization/OrganizationSummary';
import Advantage from 'epui-md/lib/ep/organization/Advantage';
import MenuCrumbs2 from '../../components/MenuCrumbs2';
import Certificate from 'epui-md/lib/ep/organization/Certificate';
import ContactUs from 'epui-md/lib/ep/organization/ContactUs';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { displayWithLimit } from 'epui-md/lib/utils/methods';
import * as organizationActions from '../../redux/reducers/organization';
import * as recommendationActions from '../../redux/reducers/recommendation';
import * as regulationActions from '../../redux/reducers/regulation';
import * as homeActions from '../../redux/reducers/home';
import Helmet from "react-helmet";
import { browserHistory } from 'react-router';
import _ from 'eplodash';

const Sizes = {
  MD: 1190,
  SM: 990,
}

const PropTypes = React.PropTypes;

const getStyles =(props, state, context)=>{
  //const showRight = !_.isEmpty(props.mainlyPorts) || !_.isEmpty(props.branch);
  const showRight = true;
  const theme = context.muiTheme;
  const padding = 30;
  let styles = {
    root:{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginTop: 20,
    },
    header:{
    },
    headerLeft:{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      color: theme.epColor.primaryColor,
    },
    title:{
      fontSize: 24,
      fontWeight: 500,
    },
    left:{
      width: state.deviceSize,
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    right:{
      display: 'none',
      marginTop: 10,
      width: showRight ? 336 : 0 ,
    },
    wraper:{
      marginTop: 21,
      // paddingTop: 24,
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
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    summaryCard:{
      width: '100%',
      marginLeft: 0,
      marginRight: 0,
    },
    tag:{
      color: 'white',
      backgroundColor: theme.epColor.primaryColor,
      paddingTop: 3,
      paddingBottom: 3,
      paddingLeft: 5,
      paddingRight: 5,
      fontWeight: 500,
      fontSize: 12,
      marginLeft: 5,
    },
    divider:{
      marginTop: padding,
      marginBottom: padding,
    },
    tips:{
      width: '100%',
      marginTop: '200px',
      marginBottom: '200px',
      fontSize: '24px',
      textAlign: 'center',
    },
    tags:{
      float: 'left',
      paddingTop: '10px',
      marginLeft: '-5px'
    },
    menu: {
      paddingBottom: 10,
    }
  };
  return styles;
};

@connect(
  state => ({
    user: state.user.user,
    userIsFecthing: state.user.isFetching,
    isFetching: state.organization.isFetching,
    organization: state.organization.organization,
    error: state.organization.error,
    mainlyPorts: state.recommendation.mainlyPorts,
    branch : state.recommendation.branch
  }),
  dispatch =>({
    ...bindActionCreators({
      findRecommendableMainlyPorts: recommendationActions.findRecommendableMainlyPorts,
      findRecommendableBranch: recommendationActions.findRecommendableBranch,
    },dispatch)
  })
)
export default class Organization extends React.Component{

  static need = [
    organizationActions.findOrganizationById,
    //recommendationActions.findRecommendableMainlyPorts,
    //recommendationActions.findRecommendableBranch,
    // regulationActions.findRegulations,
    // recommendationActions.findRecommendableRegulations,
    // homeActions.findHomeNews,
  ];

  static propTypes = {
    user: PropTypes.object,
    children: PropTypes.element,
    nLabelMainlyPortsService: PropTypes.string,
    nLabelBranch: PropTypes.string,
    organization : PropTypes.object.isRequired,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
    router: PropTypes.object,
  };

  static defaultProps ={
    nLabelMainlyPortsService: 'Mainly Ports Service For ',
    nLabelBranch: 'Branch',
  };

  componentWillMount(){
    if(this.props.error && this.props.error.status === 404){
      browserHistory.push('/404');
      return null;
    }else if(!__SERVER__ && this.props.organization && this.props.organization.visibleStatus === 2) {
      browserHistory.push('/404');
    }
  }

  componentDidMount() {
    this.props.findRecommendableMainlyPorts({organizationId: this.props.params.organizationId});
    this.props.findRecommendableBranch({organizationId: this.props.params.organizationId});
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user !== this.props.user){
      if(!__SERVER__ && this.props.organization && this.props.organization.visibleStatus === 1 && !this.isLoggedIn(nextProps)) {
        browserHistory.push('/login?' + this.props.location.pathname);
        return null;
      }
    }
  }

  constructor(props){
    super(props);
    this.state = {
      deviceSize: window.innerWidth >= 1366 ? Sizes.MD : Sizes.SM,
    }
  }

  isLoggedIn= (props) => {
    props = props || this.props;
    return props.user && props.user._id;
  }

  handleMainlyPortsTouchTap(event,item){
    browserHistory.push(`/port/${item._id}`);
  }

  handleBranchTouchTap(event,item){
    browserHistory.push(`/organization/${item._id}`);
  }


  render() {
    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.state, this.context);

    const headerStyle = prepareStyles(styles.header);
    const titleStyle = prepareStyles(styles.title);
    const branchStyle = prepareStyles(styles.branch);
    const nameStyle = prepareStyles(styles.name);
    const contentStyle = prepareStyles(styles.content);
    const headerLeftStyle = prepareStyles(styles.headerLeft);
    const tagStyle = prepareStyles(styles.tag);
    const organization = this.props.organization;

    const mainlyPortsElem = !_.isEmpty(this.props.mainlyPorts) ? (
      <div>
        <div style = {nameStyle}>{this.props.nLabelMainlyPortsService}</div>
        <div style = {contentStyle}>
          {
            _.map(this.props.mainlyPorts,(item)=>{
              return (
                <SummaryCard
                  key = {'mainlyPorts_'+item._id}
                  item = {item}
                  style = {styles.summaryCard}
                  category = 'Port'
                  showSummary = {false}
                  onTouchTap = {this.handleMainlyPortsTouchTap}
                />
              );
            })
          }
        </div>
      </div>
    ):null;

    const branchElem = !_.isEmpty(this.props.branch) ? (
      <div style = {branchStyle}>
        <div style = {nameStyle}>{this.props.nLabelBranch}</div>
        <div style = {contentStyle}>
          {
            _.map(this.props.branch,(item)=>{
              return (
                <SummaryCard
                  key = {'branch_'+item._id}
                  item = {item}
                  style = {styles.summaryCard}
                  categories = {item.categories}
                  showSummary = {false}
                  onTouchTap = {this.handleBranchTouchTap}
                />
              );
            })
          }
        </div>
      </div>
    ):null;

    let navArr = [
      {
        value: 'Home',
        link: '/'
      },
      {
        value: 'Company: ' + organization.name,
      }
    ]

    return (
      <div style = {prepareStyles(styles.root)}>
        <Helmet
            title= {organization.name}
            meta={[
                {"name": "description", "content": displayWithLimit(organization.name, 20)}
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
              <span style = {titleStyle}>{organization.name}</span>
            </div>
            <div><Tags codes = {this.props.organization.roles} style={styles.tags} /></div>
          </div>
          <Paper style = {styles.wraper} zDepth={0}>
            <OrganizationSummary summary = {_.pick(organization,'description','address','contactMethods')}/>
            <Divider style = {styles.divider} />
            {/* <Advantage advantages={organization.advantages} />
            <Divider style = {styles.divider} /> */}
            {/* <Certificate
              certificates={organization.certificates}
              fileUrl = '/files/'
            />
            <Divider style = {styles.divider} */}
            {/* /> */}
            <ContactUs infos = {_.pick(organization,'contactMethods','children','address','departments')} />
          </Paper>
        </div>
        <div style = {prepareStyles(styles.right)}>
          {mainlyPortsElem}
          {branchElem}
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
