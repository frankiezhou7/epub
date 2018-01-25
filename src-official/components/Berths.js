import React from 'react';
import BerthItem from 'epui-md/lib/ep/port/BerthItem';
import { display } from '../utils/methods';
import _ from 'eplodash';
import Dialog from 'epui-md/lib/ep/Dialog';
import FlatButton from 'epui-md/lib/FlatButton';
import Berth from 'epui-md/lib/ep/port/Berth';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as berthActions from '../redux/reducers/berth';

const PropTypes = React.PropTypes;

const getStyles =(props,context)=>{
  const theme = context.muiTheme;
  let styles = {
    root:{

    },
    header:{
      marginBottom: 20,
      fontSize: 20,
    },
    itemContainer:{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    button:{
      margin :'5px 10px 5px 0px',
      flex: '1 1 162px',
    },
    icon:{
      fill: theme.epColor.secondaryColor,
    },
    label:{
      color: theme.epColor.fontColor,
    },
    dialogBody:{
      padding: 0,
    },
    dialogTitle:{
      color: theme.epColor.primaryColor,
      padding: '12px 12px 10px 24px',
    },
    content:{
      maxWidth: 960,
    }
  }
  if(props.style){
    styles.root = Object.assign(styles.root,props.style);
  }
  return styles;
};


@connect(
  state => ({
    isFetching: state.berth.isFetching,
    berth: state.berth.berth
  }),
  dispatch =>({
    ...bindActionCreators({
      findBerthById: berthActions.findBerthById
    },dispatch)
  })
)
export default class Berths extends React.Component{

  static propTypes = {
    nLabelBerth : PropTypes.string,
    nLabelClose : PropTypes.string,
    style: PropTypes.object,
    berths : PropTypes.array.isRequired,
    berth : PropTypes.object,
    isFetching : PropTypes.bool,
    params : PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
    router: PropTypes.object,
  };

  static defaultProps = {
    nLabelBerth : 'Berth',
    nLabelClose : 'Close',
    berths: [],
    berth : {},
    params: {},
    isFetching: false,
  };

  state = {
    open : false,
    berth: null,
  }

  componentWillReceiveProps(nextProps) {
    const stateBerth = this.state.berth;
    const prevBerth = this.props.berth;
    const nextBerth = nextProps.berth;
    if(stateBerth && stateBerth._id === nextBerth._id){
      this.setState({open: true});
    }
  }

  handleShowBerth = (berth) => {
    if(!this.props.berth || this.props.berth._id !== berth._id){
      this.props.findBerthById({
        portId: this.props.params.portId,
        terminalId: this.props.params.terminalId,
        berthId: berth._id
      });
      this.setState({
        berth: berth
      });
    }else if(this.props.berth && this.props.berth._id === berth._id){
      this.setState({
        berth: berth,
        open: true
      });
    }
  }

  handleClose = () => {
    this.setState({
      open: false,
      berth: null,
    });
  }

  render() {
    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);
    const berths = this.props.berths;
    // const actions = [
    //   <FlatButton
    //     label={this.props.nLabelClose}
    //     primary={true}
    //     onTouchTap={this.handleClose}
    //   />,
    // ];
    const actions = [];

    const berthsElem = _.isArray(berths) && berths.length > 0 ?(
      <div style = {prepareStyles(styles.itemContainer)}>
        {_.map(this.props.berths,berth=>{return(
          <BerthItem
            key = {berth._id}
            berth = {berth}
            onTouchTap = {this.handleShowBerth}
          />
        );})}
      </div>
    ): (<div> - </div>);

    return (
      <div style = {prepareStyles(styles.root)}>
        <div style = {prepareStyles(styles.header)}>{this.props.nLabelBerth}</div>
        {berthsElem}
        <Dialog
           title={this.state.berth ? this.state.berth.name : ''}
           titleStyle = {styles.dialogTitle}
           bodyStyle = {styles.dialogBody}
           actions={actions}
           modal={false}
           open={this.state.open}
           onRequestClose={this.handleClose}
           autoScrollBodyContent={true}
           repositionOnUpdate= {true}
           contentStyle={styles.content}
           showTopClose={true}
         >
          <Berth
            isFetching ={this.props.isFetching}
            berth = {this.props.berth}
          />
         </Dialog>
      </div>
    );
  }
};
