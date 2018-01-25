import React from 'react';
import _ from 'eplodash';
import Dialog from 'epui-md/lib/ep/Dialog';
import ServiceContent from './ServiceContentNew';
import CloseButton from 'epui-md/lib/svg-icons/navigation/close';
const PropTypes = React.PropTypes;

export default class ServerDialog extends React.Component{
  static propTypes = {
    onCloseDialog: PropTypes.func,
    serverDialogShow: PropTypes.bool,
  }
  getStyles() {
    let styles = {
      root: {},
      closeBtn:{
        position: 'absolute',
        top: 10,
        right: 10,
        width: 18,
        height: 18,
        fill:'#4d4d4d',
        cursor: 'pointer',
        zIndex: 2000,
      }
    }
    return styles;
  }
  render(){
    let styles = this.getStyles();
    return(
      <div>
        <Dialog
          ref="dialog"
          maxWidth={550}
          modal={true}
          open={this.props.serverDialogShow}
          autoDetectWindowHeight={true}
          autoScrollBodyContent={true}
          repositionOnUpdate={true}
          setZIndex={1001}
          maxHeight={650}
          marginTop={-70}
        >
        <CloseButton style={styles.closeBtn} onClick={this._handleCloseDialog} />
        <ServiceContent />
        </Dialog>
      </div>
    )
  }
  _handleCloseDialog = ()=>{
    let { onCloseDialog } = this.props;
    if (_.isFunction(onCloseDialog)) { onCloseDialog(); }
  }
}
