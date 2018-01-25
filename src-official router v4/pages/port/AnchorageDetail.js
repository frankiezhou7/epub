import React from 'react';
import Divider from 'epui-md/lib/Divider';
import AnchorageInfo from 'epui-md/lib/ep/port/AnchorageInfo';
import AnchorageRegion from 'epui-md/lib/ep/port/AnchorageRegion';
import PortFunction from 'epui-md/lib/ep/port/PortFunctionSimple';
import Loading from 'epui-md/lib/ep/RefreshIndicator';
import {connect} from 'react-redux';
import * as anchorageActions from '../../redux/reducers/anchorage';
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
      marginTop: 40,
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
    isFetching: state.anchorage.isFetching,
    anchorage: state.anchorage.anchorage,
    error: state.anchorage.error
  })
)
export default class AnchorageDetail extends React.Component{

  static need = [anchorageActions.findAnchorageById];

  static propTypes = {
    style: PropTypes.object,
    anchorage : PropTypes.object.isRequired,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
    router: PropTypes.object,
  };

  static defaultProps = {
    anchorage: {}
  };

  render() {


    if(this.props.error && this.props.error.status === 404){
      this.props.history.push('/404');
      return null;
    }

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);
    const anchorage = this.props.anchorage;
    const loadingElem = (<Loading />);
    const anchorageElem = this.props.isFetching ===true ? loadingElem : _.isEmpty(anchorage) ? null : (
      <div>
        <AnchorageInfo anchorage = {anchorage} />
        <Divider style = {styles.divider} />
        <AnchorageRegion region = {anchorage.region} />
        <Divider style = {styles.divider} />
        <PortFunction abilities = {anchorage.abilities} />
      </div>
    );
    return (
      <div style = {prepareStyles(styles.root)}>
        <Helmet
            title= {anchorage.name}
            meta={[
                {"name": "description", "content": displayWithLimit(anchorage.name, 20)}
            ]}
        />
        { anchorageElem }
      </div>
    );
  }
};
