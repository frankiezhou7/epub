import React from 'react';
import Divider from 'epui-md/lib/Divider';
import Paper from 'epui-md/lib/Paper';
import SummaryCard from 'epui-md/lib/ep/SummaryCard';
import Tags from 'epui-md/lib/ep/Tags';
import OrganizationSummary from 'epui-md/lib/ep/organization/OrganizationSummary';
import Advantage from 'epui-md/lib/ep/organization/Advantage';
import Certificate from 'epui-md/lib/ep/organization/Certificate';
import ContactUs from 'epui-md/lib/ep/organization/ContactUs';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { displayWithLimit } from 'epui-md/lib/utils/methods';
import * as organizationActions from '../../redux/reducers/organization';
import * as recommendationActions from '../../redux/reducers/recommendation';
import Helmet from "react-helmet";
import { browserHistory } from 'react-router';
import _ from 'eplodash';

const PropTypes = React.PropTypes;

const getStyles =(props,context)=>{
  //const showRight = !_.isEmpty(props.mainlyPorts) || !_.isEmpty(props.branch);
  const showRight = true;
  const theme = context.muiTheme;
  const padding = 24;
  let styles = {
    root:{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginTop: 30,
    },
    header:{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
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
      maxWidth: showRight ? 1005 : '100%',
      width: 1000,
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
      paddingLeft: padding,
      paddingRight: padding,
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
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 10,
      paddingRight: 10,
      fontWeight: 500,
      fontSize: 14,
      marginLeft: 5,
    },
    divider:{
      marginTop: padding,
      marginLeft: -padding,
      marginRight: -padding,
      marginBottom: padding,
    },
  };
  return styles;
};

@connect(
  state => ({
    isFetching: state.organization.isFetching,
    organization: state.organization.organization,
    error: state.organization.error,
    mainlyPorts: state.recommendation.mainlyPorts,
    branch : state.recommendation.branch
  }),
  dispatch =>({
    ...bindActionCreators({
      findRecommendableMainlyPorts: recommendationActions.findRecommendableMainlyPorts,
      findRecommendableBranch: recommendationActions.findRecommendableBranch
    },dispatch)
  })
)
export default class Organization extends React.Component{

  static need = [
    organizationActions.findOrganizationById,
    //recommendationActions.findRecommendableMainlyPorts,
    //recommendationActions.findRecommendableBranch
  ];

  static propTypes = {
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

  componentDidMount() {
    this.props.findRecommendableMainlyPorts({organizationId: this.props.params.organizationId});
    this.props.findRecommendableBranch({organizationId: this.props.params.organizationId});
  }

  handleMainlyPortsTouchTap(event,item){
    browserHistory.push(`/port/${item._id}`);
  }

  handleBranchTouchTap(event,item){
    browserHistory.push(`/organization/${item._id}`);
  }

  render() {

    if(this.props.error && this.props.error.status === 404){
      browserHistory.push('/404');
      return null;
    }

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);
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

    return (
      <div style = {prepareStyles(styles.root)}>
        <Helmet
            title= {organization.name}
            meta={[
                {"name": "description", "content": displayWithLimit(organization.name, 20)}
            ]}
        />
        <div style = {prepareStyles(styles.left)}>
          <div style = {headerStyle} >
            <div style = {headerLeftStyle}>
              <span style = {titleStyle}>{organization.name}</span>
            </div>
            <Tags codes = {this.props.organization.roles}/>
          </div>
          <Paper style = {styles.wraper}>
            <OrganizationSummary summary = {_.pick(organization,'description','address','contactMethods',)}/>
            <Divider style = {styles.divider} />
            <Advantage advantages={organization.advantages} />
            <Divider style = {styles.divider} />
            <Certificate
              certificates={organization.certificates}
              fileUrl = '/files/'
            />
            <Divider style = {styles.divider}
            />
            <ContactUs infos = {_.pick(organization,'contactMethods','children','address')} />
          </Paper>
        </div>
        <div style = {prepareStyles(styles.right)}>
          {mainlyPortsElem}
          {branchElem}
        </div>
      </div>
    );
  }
};
